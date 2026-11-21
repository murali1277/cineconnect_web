"use client";
import Link from "next/link";
import {useState} from "react";
import {navigation} from "@/lib/navigation";
export function Header(){
 const [open,setOpen]=useState(false);
 return <header className="site-header"><div className="container nav-shell">
  <Link href="/" className="wordmark" onClick={()=>setOpen(false)} aria-label="Cine Connect home"><span className="mark">CC</span><span>CINE <b>CONNECT</b><small>THE INDUSTRY NETWORK</small></span></Link>
  <button className="menu-trigger" type="button" aria-controls="primary-nav" aria-expanded={open} onClick={()=>setOpen(!open)}>{open?"Close":"Menu"}<span aria-hidden="true">{open?" ×":" ☰"}</span></button>
  <nav id="primary-nav" aria-label="Primary navigation" className={open?"primary-nav active":"primary-nav"}>{navigation.map(x=><Link key={x.href} href={x.href} onClick={()=>setOpen(false)}>{x.label}</Link>)}</nav>
  <Link className="nav-cta" href="/contact">Get Connected <span aria-hidden="true">↗</span></Link>
 </div></header>
}
