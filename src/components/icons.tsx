import {
  BadgeCheck,
  Bitcoin,
  Briefcase,
  Building2,
  ChartCandlestick,
  CircleHelp,
  ClipboardCheck,
  Clapperboard,
  Cpu,
  CreditCard,
  Factory,
  FileCode,
  GraduationCap,
  Handshake,
  HeartPulse,
  History,
  House,
  Landmark,
  LayoutGrid,
  Megaphone,
  RadioTower,
  Scale,
  Search,
  ShieldCheck,
  ShoppingBag,
  Truck,
  Wallet,
  type LucideIcon,
} from "lucide-react";
import { cn } from "../lib/utils";
import type { PageId, Verdict } from "../types";

// One icon per industry code in src/data/industries.json; unknown codes fall back to a question mark.
const industryIcons: Record<string, LucideIcon> = {
  BNK: Landmark,
  CRY: Bitcoin,
  EDU: GraduationCap,
  GOV: Scale,
  HLT: HeartPulse,
  HW: Factory,
  INS: ShieldCheck,
  MED: Clapperboard,
  PAY: CreditCard,
  PRO: Briefcase,
  REP: Building2,
  RET: ShoppingBag,
  SEC: ChartCandlestick,
  TEC: Cpu,
  TEL: RadioTower,
  UNK: CircleHelp,
  UTL: Truck,
};

const verdictIcons: Record<Verdict | "all", LucideIcon> = {
  all: LayoutGrid,
  examined: BadgeCheck,
  account: Wallet,
  sales: Handshake,
  marketing: Megaphone,
  later: History,
};

const pageIcons: Record<PageId, LucideIcon> = {
  home: House,
  search: Search,
  companies: Building2,
  coverage: ClipboardCheck,
  technical: FileCode,
};

// Icons are decoration: the visible text is always the accessible name.
const decorative = (className?: string) => ({
  "aria-hidden": true as const,
  className: cn("size-4 shrink-0", className),
});

export function IndustryIcon({ code, className }: { code: string; className?: string }) {
  const Icon = industryIcons[code] ?? CircleHelp;
  return <Icon {...decorative(className)} />;
}

export function VerdictIcon({
  verdict,
  className,
}: {
  verdict: Verdict | "all";
  className?: string;
}) {
  const Icon = verdictIcons[verdict];
  return <Icon {...decorative(className)} />;
}

export function PageIcon({ page, className }: { page: PageId; className?: string }) {
  const Icon = pageIcons[page];
  return <Icon {...decorative(className)} />;
}
