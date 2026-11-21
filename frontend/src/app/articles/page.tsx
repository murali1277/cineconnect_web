import Link from "next/link";
import {getArticles,editorialImageUrl} from "@/lib/content";
import {getMarkdownArticles} from "@/lib/github-articles";
import {PageHero,DataLabel,EditorialCover,EmptyNotice} from "@/components/UI";
export const metadata={title:"Articles"};
export default async function Articles(){
  const mdResult = getMarkdownArticles();
  const result = mdResult.items.length > 0 ? mdResult : await getArticles();
  return <><PageHero eyebrow="MAGAZINE / CINE EDITORIAL" title="Stories behind the stories." subtitle="Exploring creativity, technique, people and ideas from across the cinema industry."/><section className="section"><div className="container"><DataLabel live={result.live} error={result.error}/>{result.items.length?<div className="editorial-grid">{result.items.map(x=><Link className="editorial-card" href={`/articles/${encodeURIComponent(x.id)}`} key={x.id}><EditorialCover label="CINE EDITORIAL" image={x.imageName || (result.live ? editorialImageUrl("articles",x.id,"thumbnail") : null)}/><span className="micro">ARTICLES / FEATURE</span><h2>{x.title}</h2><p>{x.excerpt}</p><span className="read-link">Read article ↗</span></Link>)}</div>:<EmptyNotice message="No published articles are available at present."/>}</div></section></>
}
