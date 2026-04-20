import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import Soc2Checklist from "@/components/Soc2Checklist";

export const metadata: Metadata = generatePageMetadata(
  "SOC 2 Readiness Checklist",
  "Answer a few questions about your company and get a personalized SOC 2 readiness checklist. Takes about 2 minutes.",
  "/soc2-checklist/"
);

export default function Soc2ChecklistPage() {
  return <Soc2Checklist />;
}
