import Link from "next/link";
import { getArticles } from "@/lib/content";
import { getMarkdownArticles } from "@/lib/github-articles";
import { DataLabel, EmptyNotice } from "@/components/UI";

export const metadata = {
  title: "Cinema Articles | Cine Connect",
  description: "Latest Indian cinema news, exclusive stories, craft insights and regional film updates.",
};

export default async function ArticlesPage() {
  const mdResult = getMarkdownArticles();
  const result = mdResult.items.length > 0 ? mdResult : await getArticles();
  const articles = result.items;

  return (
    <section className="section" style={{ paddingTop: "40px" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> » <span>Cinema Articles</span>
        </nav>

        <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", marginBottom: "30px", fontWeight: 800 }}>
          Cinema Articles
        </h1>

        <DataLabel live={result.live} error={result.error} />

        {articles.length ? (
          <div className="cinema-layout">
            {/* Left Main 2-Column Article Grid */}
            <div className="cinema-grid">
              {articles.map((item) => (
                <article className="cinema-card" key={item.id}>
                  <Link href={`/articles/${encodeURIComponent(item.id)}`} className="cinema-card-media">
                    <img
                      src={
                        (item as any).coverImage ||
                        item.imageName ||
                        "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80"
                      }
                      alt={item.title}
                      loading="lazy"
                    />
                  </Link>
                  <div className="cinema-card-content">
                    <h2 className="cinema-card-title">
                      <Link href={`/articles/${encodeURIComponent(item.id)}`}>{item.title}</Link>
                    </h2>
                    <p className="cinema-card-excerpt">{item.excerpt}</p>
                    <span className="cinema-card-date">
                      {(item as any).date || "August 4, 2026 | 04:00 PM"}
                    </span>
                  </div>
                </article>
              ))}
            </div>

            {/* Right Sidebar: Latest News */}
            <aside className="latest-news-panel">
              <h3 className="latest-news-header">Latest News</h3>
              <div className="news-list">
                {articles.map((item) => (
                  <Link href={`/articles/${encodeURIComponent(item.id)}`} className="news-item" key={"side-" + item.id}>
                    <h4>{item.title}</h4>
                    <span className="news-item-time">
                      {(item as any).date || "August 4, 2026 | 04:00 PM"}
                    </span>
                  </Link>
                ))}
              </div>
              <Link href="/articles" className="red-btn">
                ఇంకా చదవండి / View All News ↗
              </Link>
            </aside>
          </div>
        ) : (
          <EmptyNotice message="No published articles are available at present." />
        )}
      </div>
    </section>
  );
}
