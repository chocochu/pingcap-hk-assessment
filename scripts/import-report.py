#!/usr/bin/env python3
"""Import reviewed bilingual report HTML as structured, React-renderable data.

Only public report text, links, counts and table values are imported. CSS,
scripts, arbitrary attributes and raw HTML are never included in the output.
The importer fails on unexpected content rather than silently dropping prose.
"""
from __future__ import annotations

import argparse
from dataclasses import dataclass, field
import hashlib
from html.parser import HTMLParser
import json
from pathlib import Path
import re
from typing import Any
from urllib.parse import urlsplit

PACKAGE_ROOT = Path(__file__).resolve().parents[1]
ROOT = PACKAGE_ROOT.parent
DEFAULT_SOURCE = ROOT / "analysis/output/report/hong_kong_exposure_assessment.html"
DEFAULT_OUTPUT = PACKAGE_ROOT / "src/data/report.json"
VOID_TAGS = {
    "area", "base", "br", "col", "embed", "hr", "img", "input", "link",
    "meta", "param", "source", "track", "wbr",
}


@dataclass
class Node:
    tag: str
    attrs: dict[str, str] = field(default_factory=dict)
    children: list[Node | str] = field(default_factory=list)

    def elements(self, tag: str | None = None) -> list[Node]:
        return [child for child in self.children
                if isinstance(child, Node) and (tag is None or child.tag == tag)]

    def has_class(self, name: str) -> bool:
        return name in self.attrs.get("class", "").split()


def text(node: Node | str) -> str:
    if isinstance(node, str):
        return node
    return "".join(text(child) for child in node.children)


def plain(node: Node) -> str:
    return text(node).strip()


def descendants(node: Node, tag: str | None = None):
    for child in node.elements():
        if tag is None or child.tag == tag:
            yield child
        yield from descendants(child, tag)


def one(nodes: list[Node], description: str) -> Node:
    if len(nodes) != 1:
        raise ValueError(f"Expected one {description}; found {len(nodes)}")
    return nodes[0]


class Document(HTMLParser):
    def __init__(self):
        super().__init__(convert_charrefs=True)
        self.root = Node("document")
        self.stack = [self.root]

    def handle_starttag(self, tag: str, attrs):
        node = Node(tag, {key: value or "" for key, value in attrs})
        self.stack[-1].children.append(node)
        if tag not in VOID_TAGS:
            self.stack.append(node)

    def handle_startendtag(self, tag: str, attrs):
        self.handle_starttag(tag, attrs)
        if tag not in VOID_TAGS:
            self.handle_endtag(tag)

    def handle_endtag(self, tag: str):
        for position in range(len(self.stack) - 1, 0, -1):
            if self.stack[position].tag == tag:
                del self.stack[position:]
                return

    def handle_data(self, value: str):
        self.stack[-1].children.append(value)


def canonical_id(value: str) -> str:
    return value.removesuffix("-zh")


def safe_href(value: str) -> str:
    parsed = urlsplit(value)
    if parsed.scheme and parsed.scheme not in {"http", "https"}:
        raise ValueError("Report contains an unsupported link scheme")
    if not parsed.scheme and (parsed.netloc or value.startswith("//")):
        raise ValueError("Protocol-relative links are not supported")
    if value.startswith("#"):
        return "#" + canonical_id(value[1:])
    return value


def inline(node: Node) -> list[dict[str, Any]]:
    result = []
    for child in node.children:
        if isinstance(child, str):
            if child:
                result.append({"type": "text", "text": child})
        elif child.tag == "a":
            result.append({"type": "link", "href": safe_href(child.attrs["href"]),
                           "children": inline(child)})
        elif child.tag in {"b", "strong"}:
            result.append({"type": "strong", "children": inline(child)})
        elif child.tag == "br":
            result.append({"type": "text", "text": "\n"})
        elif child.tag in {"span", "small"}:
            result.extend(inline(child))
        else:
            raise ValueError(f"Unsupported inline element: {child.tag}")
    return result


def inline_text(parts: list[dict[str, Any]]) -> str:
    return "".join(part["text"] if part["type"] == "text"
                   else inline_text(part["children"]) for part in parts)


def verified_inline(node: Node) -> list[dict[str, Any]]:
    value = inline(node)
    if inline_text(value) != text(node):
        raise ValueError("Inline conversion changed source prose")
    return value


def table(node: Node) -> dict[str, Any]:
    head = one(node.elements("thead"), "table head")
    body = one(node.elements("tbody"), "table body")
    heading_row = one(head.elements("tr"), "table heading row")
    headers = [plain(cell) for cell in heading_row.elements("th")]
    rows = [[plain(cell) for cell in row.elements("td")] for row in body.elements("tr")]
    if any(len(row) != len(headers) for row in rows):
        raise ValueError("Report table row width differs from its headers")
    return {"type": "table", "headers": headers, "rows": rows}


def findings(node: Node) -> dict[str, Any]:
    items = []
    for article in node.elements("article"):
        allowed = {"div", "h3", "p", "small"}
        if any(child.tag not in allowed for child in article.elements()):
            raise ValueError("Unexpected content in a finding card")
        tag = one([child for child in article.elements() if child.has_class("tag")], "finding tag")
        label = one(article.elements("h3"), "finding label")
        sources = one(article.elements("small"), "finding source references")
        items.append({"label": plain(label), "tag": plain(tag),
                      "paragraphs": [verified_inline(p) for p in article.elements("p")],
                      "sources": verified_inline(sources)})
    if not items:
        raise ValueError("Finding card collection is empty")
    return {"type": "findings", "items": items}


def slug(value: str) -> str:
    return re.sub(r"[^a-z0-9]+", "-", value.lower()).strip("-")


def extract_locale(edition: Node, english_ids: list[str] | None = None):
    locale: dict[str, Any] = {"sections": []}
    current = None
    directory_rows = None
    heading_index = 0
    source_paragraphs = []

    def new_section(heading: Node):
        nonlocal current, heading_index
        explicit_id = canonical_id(heading.attrs.get("id", ""))
        if english_ids is None:
            section_id = explicit_id or slug(plain(heading))
        else:
            if heading_index >= len(english_ids):
                raise ValueError("Traditional Chinese has additional report sections")
            section_id = english_ids[heading_index]
            if explicit_id and explicit_id != section_id:
                raise ValueError("Language editions disagree on explicit section IDs")
        heading_index += 1
        current = {"id": section_id, "title": plain(heading), "blocks": []}
        locale["sections"].append(current)

    def paragraph(node: Node):
        if current is None:
            raise ValueError("Paragraph is outside a report section")
        source_paragraphs.append(text(node))
        current["blocks"].append({"type": "paragraph", "content": verified_inline(node)})

    for child in edition.children:
        if isinstance(child, str):
            if child.strip():
                raise ValueError("Unexpected free text between report blocks")
            continue
        if child.has_class("eyebrow"):
            locale["eyebrow"] = plain(child)
        elif child.tag == "h1":
            locale["title"] = plain(child)
        elif child.tag == "p" and child.has_class("lede"):
            locale["lead"] = verified_inline(child)
        elif child.tag == "p" and child.has_class("note"):
            locale["caution"] = verified_inline(child)
        elif child.tag == "section" and child.has_class("release-note"):
            locale["release"] = {
                "label": child.attrs.get("aria-label", ""),
                "title": plain(one(child.elements("h2"), "release heading")),
                "paragraphs": [verified_inline(p) for p in child.elements("p")],
            }
            if any(element.tag not in {"h2", "p"} for element in child.elements()):
                raise ValueError("Unexpected release-note content")
        elif child.tag == "nav":
            locale["nav"] = []
            for link in child.elements("a"):
                href = safe_href(link.attrs["href"])
                if not href.startswith("#"):
                    raise ValueError("Report navigation must link to local sections")
                locale["nav"].append({"id": href[1:], "label": plain(link)})
        elif child.has_class("metrics"):
            locale["metrics"] = []
            for metric in child.elements():
                locale["metrics"].append({
                    "value": plain(one(metric.elements("b"), "metric value")),
                    "label": plain(one(metric.elements("span"), "metric label")),
                })
        elif child.tag == "h2":
            new_section(child)
        elif child.tag == "p" and canonical_id(child.attrs.get("id", "")) == "shown":
            locale.setdefault("directory", {})["initialCountLabel"] = plain(child)
        elif child.tag == "p":
            paragraph(child)
        elif child.has_class("cards"):
            if current is None:
                raise ValueError("Finding cards are outside a section")
            current["blocks"].append(findings(child))
        elif child.has_class("scroll"):
            source_table = one(child.elements("table"), "scroll container table")
            converted = table(source_table)
            if current is None:
                raise ValueError("Table is outside a section")
            if source_table.has_class("catalog"):
                if directory_rows is not None:
                    raise ValueError("Multiple business directories found")
                directory_rows = converted["rows"]
                locale.setdefault("directory", {})["headers"] = converted["headers"]
                current["blocks"].append({"type": "directory"})
            else:
                current["blocks"].append(converted)
        elif child.tag == "label":
            locale.setdefault("directory", {})["label"] = plain(child)
        elif child.tag == "input":
            if child.attrs.get("type") != "search":
                raise ValueError("Unexpected report input type")
            locale.setdefault("directory", {})["placeholder"] = child.attrs.get("placeholder", "")
        elif child.tag == "br":
            continue
        elif child.tag == "a" and child.has_class("download"):
            if current is None:
                raise ValueError("Download link is outside a section")
            if not current["blocks"] or current["blocks"][-1]["type"] != "downloads":
                current["blocks"].append({"type": "downloads", "items": []})
            current["blocks"][-1]["items"].append({"href": safe_href(child.attrs["href"]), "label": plain(child)})
        elif child.tag == "section" and child.has_class("updates"):
            for element in child.elements():
                if element.tag == "h2":
                    new_section(element)
                elif element.tag == "p":
                    paragraph(element)
                else:
                    raise ValueError("Unexpected release-history content")
        elif child.tag == "footer":
            locale["footer"] = verified_inline(child)
        else:
            raise ValueError(f"Unsupported report block: {child.tag}")

    required = {"eyebrow", "title", "lead", "caution", "release", "nav", "metrics", "sections", "directory", "footer"}
    if set(locale) != required:
        raise ValueError(f"Locale fields differ from schema: {set(locale) ^ required}")
    if english_ids is not None and heading_index != len(english_ids):
        raise ValueError("Traditional Chinese is missing report sections")
    ids = [section["id"] for section in locale["sections"]]
    if len(ids) != len(set(ids)):
        raise ValueError("Section IDs are not unique")
    if any(link["id"] not in ids for link in locale["nav"]):
        raise ValueError("Navigation refers to a missing report section")
    if directory_rows is None or set(locale["directory"]) != {"label", "placeholder", "initialCountLabel", "headers"}:
        raise ValueError("Business directory content is incomplete")
    converted_paragraphs = [inline_text(block["content"]) for section in locale["sections"]
                            for block in section["blocks"] if block["type"] == "paragraph"]
    if converted_paragraphs != source_paragraphs:
        raise ValueError("Paragraph order or prose changed during conversion")
    return locale, directory_rows


def collect_data_links(value: Any):
    if isinstance(value, dict):
        if "href" in value:
            yield value["href"]
        if set(value) == {"id", "label"}:
            yield "#" + value["id"]
        for child in value.values():
            yield from collect_data_links(child)
    elif isinstance(value, list):
        for child in value:
            yield from collect_data_links(child)


def build(source: Path) -> dict[str, Any]:
    raw = source.read_bytes()
    document = Document()
    document.feed(raw.decode("utf-8"))
    document.close()
    editions = {}
    for language in ("en", "zh-Hant"):
        editions[language] = one([node for node in descendants(document.root, "section")
                                  if node.attrs.get("id") == language and node.has_class("edition")],
                                 f"{language} edition")
    en, english_rows = extract_locale(editions["en"])
    zh, chinese_rows = extract_locale(editions["zh-Hant"], [section["id"] for section in en["sections"]])
    if len(english_rows) != len(chinese_rows):
        raise ValueError("Business-directory row counts differ across languages")
    businesses = []
    for position, (left, right) in enumerate(zip(english_rows, chinese_rows, strict=True), 1):
        if len(left) != 5 or len(right) != 5:
            raise ValueError("Business directory must have five columns")
        if [left[i] for i in (0, 1, 3, 4)] != [right[i] for i in (0, 1, 3, 4)]:
            raise ValueError(f"Source label/count/country/domain changed in translated row {position}")
        if not re.fullmatch(r"[0-9]+(?:,[0-9]{3})*", left[1]):
            raise ValueError(f"Directory observation count is not numeric at row {position}")
        businesses.append({"label": left[0], "observations": int(left[1].replace(",", "")),
                           "categories": {"en": left[2], "zh-Hant": right[2]},
                           "countries": left[3], "domains": left[4]})
    locales = {"en": en, "zh-Hant": zh}
    for language, locale in locales.items():
        original_links = sorted(safe_href(link.attrs["href"]) for link in descendants(editions[language], "a"))
        if sorted(collect_data_links(locale)) != original_links:
            raise ValueError(f"Link loss or duplication in {language} edition")
    try:
        source_path = source.resolve().relative_to(ROOT).as_posix()
    except ValueError:
        source_path = source.name
    return {"schemaVersion": 1, "source": {"path": source_path, "sha256": hashlib.sha256(raw).hexdigest()},
            "locales": locales, "businesses": businesses}


def main():
    parser = argparse.ArgumentParser(description=__doc__)
    parser.add_argument("--source", type=Path, default=DEFAULT_SOURCE)
    parser.add_argument("--output", type=Path, default=DEFAULT_OUTPUT)
    parser.add_argument("--check", action="store_true", help="Check current data without writing it")
    args = parser.parse_args()
    data = build(args.source)
    if args.check:
        if not args.output.exists() or json.loads(args.output.read_text()) != data:
            raise SystemExit("Report data is missing or differs from the reviewed HTML; run the importer")
    else:
        args.output.parent.mkdir(parents=True, exist_ok=True)
        args.output.write_text(json.dumps(data, ensure_ascii=False, indent=2) + "\n", encoding="utf-8")
    summary = {"mode": "check" if args.check else "write", "locales": list(data["locales"]),
               "businesses": len(data["businesses"]),
               "sections_per_locale": {key: len(value["sections"]) for key, value in data["locales"].items()},
               "source_sha256": data["source"]["sha256"]}
    print(json.dumps(summary, ensure_ascii=False))


if __name__ == "__main__":
    main()
