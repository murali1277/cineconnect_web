import type {Metadata,Viewport} from "next";
import {Header} from "@/components/Header";
import {Footer} from "@/components/Footer";
import "@/styles/globals.css";
export const metadata: Metadata={metadataBase:new URL(process.env.NEXT_PUBLIC_SITE_URL||"https://www.cineconnect.cc"),title:{default:"Cine Connect | The Industry. In Sync.",template:"%s | Cine Connect"},description:"A connected professional ecosystem for India's cinema industry. Explore every craft, stories, learning and creative collaboration.",openGraph:{title:"Cine Connect — The Industry. In Sync.",description:"One Industry. Every Craft. Endless Opportunities.",type:"website",siteName:"Cine Connect"},robots:{index:process.env.NEXT_PUBLIC_SITE_URL?.includes("staging")?false:true,follow:true}};
export const viewport:Viewport={themeColor:"#09050f",width:"device-width",initialScale:1};
export default function RootLayout({children}:{children:React.ReactNode}){return <html lang="en"><body><a className="skip-link" href="#main">Skip to content</a><Header/><main id="main">{children}</main><Footer/></body></html>}
