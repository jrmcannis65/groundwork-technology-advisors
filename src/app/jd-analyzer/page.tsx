import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import JdAnalyzer from "@/components/JdAnalyzer";

export const metadata: Metadata = generatePageMetadata(
  "Technology Leadership Role Analyzer",
  "Paste a job description for a Director, VP, CTO, or CIO role and get an honest assessment of whether the role is structured correctly for your stage of growth.",
  "/jd-analyzer/"
);

export default function JdAnalyzerPage() {
  return <JdAnalyzer />;
}
