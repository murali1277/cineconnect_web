import fs from "fs";
import path from "path";
import type { LoadResult } from "./content";

export type MovieReview = {
  id: string;
  title: string;
  movieTitle: string;
  rating: number; // e.g. 3.5 or 4.0
  verdict: string;
  director?: string;
  cast?: string;
  genre?: string;
  coverImage: string;
  date: string;
  public: boolean;
  sort: number;
  body: string;
};

export type WebStorySlide = {
  image: string;
  caption: string;
  link?: string;
};

export type WebStory = {
  id: string;
  title: string;
  coverImage: string;
  date: string;
  public: boolean;
  sort: number;
  slides: WebStorySlide[];
  body?: string;
};

export type EPaper = {
  id: string;
  title: string;
  editionTitle: string;
  coverImage: string;
  pdfUrl: string;
  date: string;
  public: boolean;
  sort: number;
};

function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) return { data: {}, content: fileContent.trim() };

  const rawYaml = match[1];
  const content = match[2].trim();
  const data: Record<string, any> = {};

  rawYaml.split(/\r?\n/).forEach((line) => {
    const colonIndex = line.indexOf(":");
    if (colonIndex !== -1) {
      const key = line.slice(0, colonIndex).trim();
      let value = line.slice(colonIndex + 1).trim();
      if ((value.startsWith('"') && value.endsWith('"')) || (value.startsWith("'") && value.endsWith("'"))) {
        value = value.slice(1, -1);
      }
      if (value === "true") data[key] = true;
      else if (value === "false") data[key] = false;
      else if (!isNaN(Number(value)) && value !== "") data[key] = Number(value);
      else data[key] = value;
    }
  });

  return { data, content };
}

function getContentDir(subfolder: string): string {
  const cwd = process.cwd();
  const c1 = path.join(cwd, "content", subfolder);
  if (fs.existsSync(c1)) return c1;
  const c2 = path.join(cwd, "frontend", "content", subfolder);
  if (fs.existsSync(c2)) return c2;
  return c1;
}

export function getMovieReviews(): LoadResult<MovieReview> {
  try {
    const dir = getContentDir("reviews");
    if (!fs.existsSync(dir)) return { items: [], live: false, error: "Reviews folder not found" };

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    const items: MovieReview[] = files.map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      return {
        id: data.id || file.replace(/\.md$/, ""),
        title: data.title || "Untitled Review",
        movieTitle: data.movieTitle || data.title || "Movie",
        rating: typeof data.rating === "number" ? data.rating : 3.5,
        verdict: data.verdict || "",
        director: data.director || "",
        cast: data.cast || "",
        genre: data.genre || "",
        coverImage: data.coverImage || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        date: data.date || "August 2026",
        public: data.public !== false,
        sort: typeof data.sort === "number" ? data.sort : 999,
        body: content,
      };
    });

    return { items: items.filter((x) => x.public).sort((a, b) => a.sort - b.sort), live: true };
  } catch (e) {
    return { items: [], live: false, error: e instanceof Error ? e.message : "Error reading reviews" };
  }
}

export function getWebStories(): LoadResult<WebStory> {
  try {
    const dir = getContentDir("web-stories");
    if (!fs.existsSync(dir)) return { items: [], live: false, error: "Web stories folder not found" };

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    const items: WebStory[] = files.map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data, content } = parseFrontmatter(raw);
      return {
        id: data.id || file.replace(/\.md$/, ""),
        title: data.title || "Web Story",
        coverImage: data.coverImage || "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
        date: data.date || "August 2026",
        public: data.public !== false,
        sort: typeof data.sort === "number" ? data.sort : 999,
        slides: Array.isArray(data.slides) ? data.slides : [],
        body: content,
      };
    });

    return { items: items.filter((x) => x.public).sort((a, b) => a.sort - b.sort), live: true };
  } catch (e) {
    return { items: [], live: false, error: e instanceof Error ? e.message : "Error reading web stories" };
  }
}

export function getEPapers(): LoadResult<EPaper> {
  try {
    const dir = getContentDir("epapers");
    if (!fs.existsSync(dir)) return { items: [], live: false, error: "E-Paper folder not found" };

    const files = fs.readdirSync(dir).filter((f) => f.endsWith(".md"));
    const items: EPaper[] = files.map((file) => {
      const raw = fs.readFileSync(path.join(dir, file), "utf-8");
      const { data } = parseFrontmatter(raw);
      return {
        id: data.id || file.replace(/\.md$/, ""),
        title: data.title || "E-Paper Issue",
        editionTitle: data.editionTitle || "Digital Edition",
        coverImage: data.coverImage || "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
        pdfUrl: data.pdfUrl || "#",
        date: data.date || "August 2026",
        public: data.public !== false,
        sort: typeof data.sort === "number" ? data.sort : 999,
      };
    });

    return { items: items.filter((x) => x.public).sort((a, b) => a.sort - b.sort), live: true };
  } catch (e) {
    return { items: [], live: false, error: e instanceof Error ? e.message : "Error reading epapers" };
  }
}
