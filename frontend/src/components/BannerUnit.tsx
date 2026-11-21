import Link from "next/link";
import type { Banner } from "@/lib/banner-engine";

export function BannerUnit({ banner, compact = false }: { banner: Banner; compact?: boolean }) {
  if (!banner || !banner.enabled) return null;

  if (banner.type === "adsense") {
    return (
      <div className={compact ? "adslot compact-adslot" : "adslot"}>
        <span className="adslot-tag">ADVERTISEMENT SPACE</span>
        <p className="adslot-title">Google AdSense Placement</p>
        <small className="adslot-sub">Live ad units will load here automatically</small>
      </div>
    );
  }

  const isExternal = banner.url?.startsWith("http://") || banner.url?.startsWith("https://");
  const href = banner.url || "#";

  const content = (
    <div className={compact ? "custombanner compact-banner" : "custombanner"}>
      {banner.image && (
        <div className="banner-media">
          <img src={banner.image} alt={banner.name} loading="lazy" />
        </div>
      )}
      <div className="bannerinfo">
        <span className="banner-kicker">
          {banner.type === "related" ? "RELATED CONTENT" : "CINE CONNECT PROMOTION"}
        </span>
        <strong>{banner.name}</strong>
        {banner.caption && <small>{banner.caption}</small>}
      </div>
      <span className="banner-arrow" aria-hidden="true">
        ↗
      </span>
    </div>
  );

  if (isExternal) {
    return (
      <a href={href} target="_blank" rel="noopener noreferrer" className="banner-click">
        {content}
      </a>
    );
  }

  return (
    <Link href={href} className="banner-click">
      {content}
    </Link>
  );
}
