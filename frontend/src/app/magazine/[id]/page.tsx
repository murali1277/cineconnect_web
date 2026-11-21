import Link from "next/link";
import {notFound} from "next/navigation";
import {getMagazines,editorialImageUrl} from "@/lib/content";
import {Kicker,DataLabel,EditorialCover} from "@/components/UI";

export async function generateStaticParams() {
  const res = await getMagazines();
  return res.items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({params}:{params:Promise<{id:string}>}){const {id}=await params;const res=await getMagazines();const issue=res.items.find(x=>x.id===id);return{title:issue?.title||"Magazine issue unavailable"};}
export default async function Issue({params}:{params:Promise<{id:string}>}){const {id}=await params;const res=await getMagazines();const issue=res.items.find(x=>x.id===id);if(!issue||!issue.public)notFound();return <section className="section"><div className="container issue-layout"><div><Link className="back-link" href="/magazine">← All magazine issues</Link><Kicker>THE CINE CONNECT MAGAZINE</Kicker><h1>{issue.title}</h1><p className="lead">Discover the stories behind the people and crafts of cinema.</p><DataLabel live={res.live} error={res.error}/><p className="section-footnote">V1 displays the published issue cover. A complete issue reader will be added when its approved content model and links are available.</p></div><EditorialCover label={issue.title} image={res.live?editorialImageUrl("magazines",issue.id,"cover"):null}/></div></section>}
