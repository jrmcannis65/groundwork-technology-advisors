import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import DiagnosticTool from "@/components/DiagnosticTool";

export const metadata: Metadata = generatePageMetadata(
  "Technology Problem Diagnostic",
  "Describe your technology challenge and get a specific recommendation on where to start. Takes about 3 minutes.",
  "/diagnostic/"
);

export default function DiagnosticPage() {
  return <DiagnosticTool />;
}
