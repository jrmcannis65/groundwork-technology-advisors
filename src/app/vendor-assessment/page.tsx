import type { Metadata } from "next";
import { generatePageMetadata } from "@/lib/metadata";
import VendorAssessment from "@/components/VendorAssessment";

export const metadata: Metadata = generatePageMetadata(
  "Vendor Security Assessment Questions",
  "Enter a technology vendor you are evaluating and get a structured set of security, compliance, integration, and contract questions tailored to your industry.",
  "/vendor-assessment/"
);

export default function VendorAssessmentPage() {
  return <VendorAssessment />;
}
