import type {MetadataRoute} from "next";
export const dynamic = "force-static";
export default function robots():MetadataRoute.Robots{const host=process.env.NEXT_PUBLIC_SITE_URL||"https://www.cineconnect.cc";const isStaging=host.includes("staging")||host.includes("localhost");return {rules:{userAgent:"*",allow:isStaging?undefined:"/",disallow:isStaging?"/":undefined},sitemap:isStaging?undefined:`${host}/sitemap.xml`}}
