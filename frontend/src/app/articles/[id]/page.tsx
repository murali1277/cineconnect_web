import {notFound} from "next/navigation";
import Link from "next/link";
import {getArticles,editorialImageUrl} from "@/lib/content";
import {getMarkdownArticles,getMarkdownArticleById} from "@/lib/github-articles";
import {getBanners,getSortedPlacements,getBannerById} from "@/lib/banner-engine";
import {BannerUnit} from "@/components/BannerUnit";
import {DataLabel,EditorialCover,Kicker} from "@/components/UI";

export async function generateStaticParams() {
  const mdResult = getMarkdownArticles();
  const res = mdResult.items.length > 0 ? mdResult : await getArticles();
  return res.items.map((item) => ({ id: item.id }));
}

export async function generateMetadata({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const mdArticle = getMarkdownArticleById(id);
  if (mdArticle) return {title: mdArticle.title, description: mdArticle.excerpt};
  const res=await getArticles();
  const a=res.items.find(x=>x.id===id);
  return {title:a?.title||"Article unavailable",description:a?.excerpt||"Cine Connect editorial"};
}

export default async function ArticleDetail({params}:{params:Promise<{id:string}>}){
  const {id}=await params;
  const mdArticle = getMarkdownArticleById(id);
  let a = mdArticle;
  let live = true;
  let error: string | undefined = undefined;

  if (!a) {
    const res = await getArticles();
    a = res.items.find(x=>x.id===id) || null;
    live = res.live;
    error = res.error;
  }

  if(!a||!a.public)notFound();

  const banners = getBanners();
  const inlinePlacements = getSortedPlacements("inline", true);
  const sidebarPlacements = getSortedPlacements("sidebar", true);

  const paragraphs = a.body.split(/\n\s*\n/).map(x=>x.trim()).filter(Boolean);

  return (
    <section className="section article-detail">
      <div className="container article-width">
        <Link href="/articles" className="back-link">← All articles</Link>
        <Kicker>CINE CONNECT / EDITORIAL</Kicker>
        <h1>{a.title}</h1>
        <p className="lead">{a.header}</p>
        <DataLabel live={live} error={error}/>
        <EditorialCover label={a.title} image={a.imageName || (live?editorialImageUrl("articles",a.id,"image"):null)}/>

        <div className="article-layout">
          <div className="article-prose">
            {paragraphs.map((p, i) => {
              const paragraphNumber = i + 1;
              const matchingPlacements = inlinePlacements.filter((item) => item.position === paragraphNumber);
              return (
                <div key={i}>
                  <p>{p}</p>
                  {matchingPlacements.map((placement) => {
                    const b = getBannerById(placement.bannerId, banners);
                    return b ? <BannerUnit key={placement.id} banner={b} /> : null;
                  })}
                </div>
              );
            })}
          </div>

          <aside className="article-sidebar">
            <div className="sidebar-title">FEATURED & SPONSORED</div>
            {sidebarPlacements.map((placement) => {
              const b = getBannerById(placement.bannerId, banners);
              return b ? <BannerUnit key={placement.id} banner={b} compact /> : null;
            })}
          </aside>
        </div>
      </div>
    </section>
  );
}
