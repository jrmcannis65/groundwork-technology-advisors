export type ArticleMeta = {
  slug: string;
  title: string;
  description: string;
  serviceId: string;
};

export const articles: ArticleMeta[] = [
  {
    slug: "fractional-cio",
    title: "What Does a Fractional CIO Do and When Does Your Company Need One",
    description:
      "A fractional CIO provides part-time senior technology leadership without the cost of a full-time executive hire. Here is what the role actually involves and how to know when your company needs one.",
    serviceId: "fractional-cio-cto-services",
  },
  {
    slug: "technology-assessment",
    title: "How to Do a Technology Assessment for Your Business",
    description:
      "A technology assessment gives your leadership team a clear, honest picture of your current technology environment. Here is what the process involves and what you should walk away with.",
    serviceId: "technology-ecosystem-assessment",
  },
  {
    slug: "engineering-team-performance",
    title: "Why Your Engineering Team Is Underperforming and How to Fix It",
    description:
      "When engineering delivery is slow or inconsistent, the problem is rarely the engineers. Here is how to diagnose what is actually happening and what to do about it.",
    serviceId: "engineering-organization-assessment",
  },
  {
    slug: "when-to-hire-cto",
    title: "When to Hire a CTO: What the Role Should Actually Look Like",
    description:
      "Hiring a CTO is one of the most consequential technology decisions a company makes. Here is how to know when you need one and what the role should actually involve at your stage of growth.",
    serviceId: "technology-role-organizational-design",
  },
  {
    slug: "soc2-audit-preparation",
    title: "How to Prepare for a SOC 2 Audit Without Losing Six Months of Productivity",
    description:
      "SOC 2 preparation does not have to derail your organization. Here is a practical approach to getting audit-ready without treating compliance as a full-time job.",
    serviceId: "security-compliance-readiness",
  },
  {
    slug: "technology-roadmap",
    title: "How to Build a Technology Roadmap That Actually Gets Used",
    description:
      "Most technology roadmaps end up in a shared drive and never get referenced again. Here is what makes the difference between a roadmap that drives decisions and one that does not.",
    serviceId: "technology-roadmap-development",
  },
  {
    slug: "ai-readiness",
    title: "Is Your Company Ready for AI: What to Check Before You Invest",
    description:
      "Most companies are using AI before they are ready for it. Here is a practical framework for understanding where your organization actually stands and what needs to be in place before AI investment delivers real returns.",
    serviceId: "ai-readiness-assessment",
  },
];
