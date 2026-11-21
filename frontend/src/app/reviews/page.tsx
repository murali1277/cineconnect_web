import Link from "next/link";
import { PageHero, DataLabel, EmptyNotice } from "@/components/UI";
import { getMovieReviews } from "@/lib/github-cms";

export const metadata = {
  title: "Movie Reviews | Cine Connect",
  description: "Authentic cinema & movie reviews, ratings, box office verdicts, and critical analysis.",
};

function renderStars(rating: number) {
  const fullStars = Math.floor(rating);
  const hasHalf = rating % 1 >= 0.5;
  const stars = "★".repeat(fullStars) + (hasHalf ? "½" : "") + "☆".repeat(5 - Math.ceil(rating));
  return stars;
}

export default function ReviewsPage() {
  const result = getMovieReviews();
  const reviews = result.items;

  return (
    <>
      <PageHero
        eyebrow="CINEMA & CRITIQUE"
        title="Movie Reviews & Ratings"
        subtitle="Unbiased critical analysis, star ratings, and verdicts on the latest theatrical & OTT releases."
      />
      <section className="section">
        <div className="container">
          <nav className="breadcrumb" aria-label="Breadcrumb">
            <Link href="/">Home</Link> » <span>Movie Reviews</span>
          </nav>

          <DataLabel live={result.live} error={result.error} />

          {reviews.length ? (
            <div className="editorial-grid">
              {reviews.map((rev) => (
                <div className="editorial-card" key={rev.id} style={{ display: "flex", flexDirection: "column" }}>
                  <div className="cinema-card-media" style={{ borderRadius: "10px", marginBottom: "16px" }}>
                    <img src={rev.coverImage} alt={rev.movieTitle} loading="lazy" />
                  </div>

                  <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginBottom: "8px" }}>
                    <span style={{ font: "700 11px Manrope", color: "#d6ae63", letterSpacing: ".1em" }}>
                      {rev.genre || "CINEMA REVIEW"}
                    </span>
                    <span
                      style={{
                        background: "rgba(163,61,255,0.2)",
                        border: "1px solid #a33dff",
                        borderRadius: "20px",
                        padding: "2px 10px",
                        fontSize: "12px",
                        fontWeight: 800,
                        color: "#e1bbff",
                      }}
                    >
                      {renderStars(rev.rating)} {rev.rating} / 5.0
                    </span>
                  </div>

                  <h2 style={{ fontSize: "20px", lineHeight: 1.3, marginBottom: "8px" }}>{rev.title}</h2>
                  <p style={{ fontSize: "13px", color: "var(--muted)", marginBottom: "16px", flex: 1 }}>{rev.verdict}</p>

                  <div style={{ fontSize: "11px", color: "#a99bb8", borderTop: "1px solid var(--stroke)", paddingTop: "12px" }}>
                    {rev.director && <div><strong>Director:</strong> {rev.director}</div>}
                    {rev.cast && <div><strong>Cast:</strong> {rev.cast}</div>}
                    <div style={{ marginTop: "4px" }}>{rev.date}</div>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <EmptyNotice message="No published movie reviews available at present." />
          )}
        </div>
      </section>
    </>
  );
}
