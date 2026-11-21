import Link from "next/link";
import { getArticles } from "@/lib/content";
import { getMarkdownArticles } from "@/lib/github-articles";
import { getMovieReviews, getWebStories, getEPapers } from "@/lib/github-cms";
import { DataLabel, EmptyNotice } from "@/components/UI";

export const metadata = {
  title: "Cinema Articles & News | Cine Connect",
  description: "Latest Indian cinema news, movie reviews, visual web stories, and e-paper issues.",
};

function renderStars(rating: number) {
  const full = Math.floor(rating);
  const half = rating % 1 >= 0.5 ? "½" : "";
  return "★".repeat(full) + half;
}

export default async function ArticlesPage() {
  const mdResult = getMarkdownArticles();
  const result = mdResult.items.length > 0 ? mdResult : await getArticles();
  const articles = result.items;

  const reviewsResult = getMovieReviews();
  const reviews = reviewsResult.items;

  const webStoriesResult = getWebStories();
  const webStories = webStoriesResult.items;

  const epapersResult = getEPapers();
  const epapers = epapersResult.items;

  return (
    <section className="section" style={{ paddingTop: "40px" }}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className="breadcrumb" aria-label="Breadcrumb">
          <Link href="/">Home</Link> » <span>Cinema Articles</span>
        </nav>

        <h1 style={{ fontSize: "clamp(2.4rem, 4vw, 3.8rem)", marginBottom: "16px", fontWeight: 800 }}>
          Cinema Articles & Media Portal
        </h1>

        {/* Category Navigation Bar */}
        <div
          style={{
            display: "flex",
            gap: "12px",
            flexWrap: "wrap",
            marginBottom: "30px",
            paddingBottom: "16px",
            borderBottom: "1px solid var(--stroke)",
          }}
        >
          <Link href="/articles" className="button button-primary" style={{ padding: "8px 16px", fontSize: "12px" }}>
            All Cinema Articles
          </Link>
          <Link href="/reviews" className="button button-outline" style={{ padding: "8px 16px", fontSize: "12px" }}>
            Movie Reviews ({reviews.length})
          </Link>
          <Link href="/articles" className="button button-outline" style={{ padding: "8px 16px", fontSize: "12px" }}>
            Web Stories ({webStories.length})
          </Link>
          <Link href="/articles" className="button button-outline" style={{ padding: "8px 16px", fontSize: "12px" }}>
            USA / NRI Cinema
          </Link>
        </div>

        <DataLabel live={result.live} error={result.error} />

        {articles.length ? (
          <div className="cinema-layout">
            {/* Left Column: Articles Grid & Load More */}
            <div>
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

              {/* Dynamic Load More Button */}
              <div style={{ textAlign: "center", marginTop: "40px" }}>
                <button className="button button-outline" style={{ padding: "12px 28px", fontSize: "13px" }}>
                  Load More Articles / ఇంకా చదవండి 🔄
                </button>
              </div>
            </div>

            {/* Right Sidebar Widgets */}
            <aside style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {/* Widget 1: Latest News */}
              <div className="latest-news-panel">
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
              </div>

              {/* Widget 2: Latest Movie Reviews */}
              {reviews.length > 0 && (
                <div className="latest-news-panel" style={{ borderTop: "3px solid #a33dff" }}>
                  <h3 className="latest-news-header">Movie Reviews</h3>
                  <div className="news-list">
                    {reviews.map((rev) => (
                      <Link href="/reviews" className="news-item" key={"rev-" + rev.id}>
                        <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center" }}>
                          <span style={{ fontSize: "10px", color: "#d6ae63", fontWeight: 700 }}>{rev.movieTitle}</span>
                          <span style={{ fontSize: "11px", color: "#e1bbff", fontWeight: 800 }}>
                            {renderStars(rev.rating)} {rev.rating}
                          </span>
                        </div>
                        <h4 style={{ marginTop: "4px" }}>{rev.title}</h4>
                      </Link>
                    ))}
                  </div>
                  <Link href="/reviews" className="red-btn" style={{ background: "#a33dff" }}>
                    View All Movie Reviews ↗
                  </Link>
                </div>
              )}

              {/* Widget 3: Visual Web Stories */}
              {webStories.length > 0 && (
                <div className="latest-news-panel" style={{ borderTop: "3px solid #d6ae63" }}>
                  <h3 className="latest-news-header">Web Stories</h3>
                  {webStories.map((ws) => (
                    <div key={ws.id} style={{ borderRadius: "10px", overflow: "hidden", position: "relative" }}>
                      <img src={ws.coverImage} alt={ws.title} style={{ width: "100%", height: "160px", objectFit: "cover" }} />
                      <div
                        style={{
                          position: "absolute",
                          inset: 0,
                          background: "linear-gradient(0deg, rgba(0,0,0,0.85), transparent)",
                          padding: "12px",
                          display: "flex",
                          flexDirection: "column",
                          justifyContent: "flex-end",
                        }}
                      >
                        <span style={{ fontSize: "9px", color: "#d6ae63", fontWeight: 800 }}>WEB STORY</span>
                        <h4 style={{ fontSize: "14px", margin: "2px 0 0", color: "#fff" }}>{ws.title}</h4>
                      </div>
                    </div>
                  ))}
                </div>
              )}

              {/* Widget 4: E-Paper Preview */}
              {epapers.length > 0 && (
                <div className="latest-news-panel" style={{ textAlign: "center" }}>
                  <h3 className="latest-news-header">Digital E-Paper</h3>
                  {epapers.map((ep) => (
                    <div key={ep.id}>
                      <img src={ep.coverImage} alt={ep.title} style={{ width: "100%", height: "180px", objectFit: "cover", borderRadius: "8px" }} />
                      <p style={{ fontSize: "13px", fontWeight: 700, margin: "10px 0 4px" }}>{ep.title}</p>
                      <small style={{ color: "var(--muted)" }}>{ep.editionTitle}</small>
                    </div>
                  ))}
                </div>
              )}
            </aside>
          </div>
        ) : (
          <EmptyNotice message="No published articles are available at present." />
        )}
      </div>
    </section>
  );
}
