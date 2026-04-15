import Link from "next/link";
import Image from "next/image";
import type { Service } from "@/data/services";

type Props = {
  service: Service;
  linkToDetail?: boolean;
};

export default function ServiceCard({ service, linkToDetail = true }: Props) {
  const card = (
    <div className="service-card" style={{ flexDirection: "row", alignItems: "flex-start", gap: "16px" }}>
      {/* Service graphic */}
      <div style={{ width: "160px", flexShrink: 0 }}>
        <Image
          src={`/assets/brand/services/${service.graphic}`}
          alt=""
          width={160}
          height={160}
          style={{ width: "160px", height: "160px", objectFit: "contain", display: "block" }}
          aria-hidden="true"
        />
      </div>

      {/* Content */}
      <div className="flex flex-col gap-2 flex-1">
        <h3
          className="text-sm"
          style={{
            fontFamily: "var(--font-serif)",
            fontWeight: 700,
            color: "var(--color-navy)",
            lineHeight: 1.3,
          }}
        >
          {service.title}
        </h3>
        <p
          className="text-[11px] leading-relaxed"
          style={{ fontFamily: "var(--font-sans)", color: "var(--color-gray)" }}
        >
          {service.shortDescription}
        </p>

        {/* Link hint */}
        {linkToDetail && (
          <span
            className="text-[11px] flex items-center gap-1 mt-auto pt-2"
            style={{ fontFamily: "var(--font-sans)", fontWeight: 500, color: "var(--color-blue)" }}
          >
            Learn more
            <svg className="w-3.5 h-3.5" fill="none" stroke="currentColor" strokeWidth={2} viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="m8.25 4.5 7.5 7.5-7.5 7.5" />
            </svg>
          </span>
        )}
      </div>
    </div>
  );

  if (linkToDetail) {
    return (
      <Link href={`/services/#${service.id}`} className="service-card-link">
        {card}
      </Link>
    );
  }

  return card;
}
