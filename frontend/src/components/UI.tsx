import Link from "next/link";
import type {ReactNode} from "react";
export function Kicker({children}: {children:ReactNode}){return <div className="kicker"><span className="kicker-dot"/>{children}</div>}
export function PageHero({eyebrow,title,subtitle}: {eyebrow:string;title:string;subtitle:string}){return <section className="page-hero"><div className="container"><Kicker>{eyebrow}</Kicker><h1>{title}</h1><p className="lead">{subtitle}</p></div></section>}
export function EmptyNotice({message}:{message:string}){return <div className="empty-notice" role="status">{message}</div>}
export function DataLabel({live,error}:{live:boolean;error?:string}){return <p className="data-label" role="status">{error?`Live content unavailable: ${error}`:live?"LIVE • PUBLISHED CINE CONNECT CONTENT":"ILLUSTRATIVE PREVIEW • CONNECT SUPABASE TO GO LIVE"}</p>}
export function Action({href,children,outline=false}:{href:string;children:ReactNode;outline?:boolean}){return <Link className={outline?"button button-outline":"button button-primary"} href={href}>{children}<span aria-hidden="true">↗</span></Link>}
export function EditorialCover({label,image}: {label:string;image?:string|null}){return <div className="editorial-cover" style={image?{backgroundImage:`linear-gradient(0deg,rgba(14,6,28,.85),transparent), url("${image}")`}:undefined}><span className="cover-label">CINE CONNECT / EDITORIAL</span><span className="cover-type">{label}</span></div>}
