import Link from "next/link";
import type { Service } from "@/data/services";

type Props = {
  service: Service;
  linkToDetail?: boolean;
};

export default function ServiceCard({ service, linkToDetail = true }: Props) {
  const card = (
    <div
      className={`bg-white border border-slate-lighter rounded-lg p-6 flex flex-col gap-4 h-full ${
        linkToDetail ? "hover:border-slate hover:shadow-sm transition-all" : ""
      }`}
    >
      {/* Icon */}
      <div className="w-10 h-10 rounded-md bg-off-white flex items-center justify-center flex-shrink-0">
        <svg
          className="w-5 h-5 text-navy"
          fill="none"
          stroke="currentColor"
          strokeWidth={1.5}
          viewBox="0 0 24 24"
          aria-hidden="true"
        >
          <path strokeLinecap="round" strokeLinejoin="round" d={service.icon} />
        </svg>
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3 className="text-navy font-semibold text-base leading-snug">
          {service.title}
        </h3>
        <p className="text-charcoal text-sm leading-relaxed">
          {service.shortDescription}
        </p>
      </div>

      {/* Link hint */}
      {linkToDetail && (
        <span className="text-slate text-sm font-medium flex items-center gap-1 mt-auto pt-2">
          Learn more
          <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
          </svg>
        </span>
      )}
    </div>
  );

  if (linkToDetail) {
    return (
      <Link href={`/services/#${service.id}`} className="block h-full">
        {card}
      </Link>
    );
  }

  return card;
}
