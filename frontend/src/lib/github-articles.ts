import fs from "fs";
import path from "path";
import type { Article, LoadResult } from "./content";

export type MarkdownArticle = Article & {
  date?: string;
  coverImage?: string;
};

function parseFrontmatter(fileContent: string): { data: Record<string, any>; content: string } {
  const frontmatterRegex = /^---\r?\n([\s\S]*?)\r?\n---\r?\n([\s\S]*)$/;
  const match = frontmatterRegex.exec(fileContent);

  if (!match) {
    return { data: {}, content: fileContent.trim() };
  }

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

function getArticlesDirectory(): string {
  const cwd = process.cwd();
  const candidate1 = path.join(cwd, "content", "articles");
  if (fs.existsSync(candidate1)) return candidate1;
  const candidate2 = path.join(cwd, "frontend", "content", "articles");
  if (fs.existsSync(candidate2)) return candidate2;
  return candidate1;
}

export function getMarkdownArticles(): LoadResult<MarkdownArticle> {
  try {
    const dir = getArticlesDirectory();
    if (!fs.existsSync(dir)) {
      return { items: [], live: false, error: "Markdown directory not found" };
    }

    const fileNames = fs.readdirSync(dir).filter((file) => file.endsWith(".md"));
    const articles: MarkdownArticle[] = fileNames.map((fileName) => {
      const filePath = path.join(dir, fileName);
      const rawContent = fs.readFileSync(filePath, "utf-8");
      const { data, content } = parseFrontmatter(rawContent);

      const id = data.id || fileName.replace(/\.md$/, "");
      const title = data.title || "Untitled Article";
      const header = data.header || "";
      const excerpt = data.excerpt || content.slice(0, 160);
      const sort = typeof data.sort === "number" ? data.sort : 999;
      const isPublic = data.public !== false;

      return {
        id,
        title,
        header,
        excerpt,
        body: content,
        sort,
        public: isPublic,
        imageName: data.coverImage || null,
        coverImage: data.coverImage || undefined,
        date: data.date || undefined,
      };
    });

    const publicArticles = articles
      .filter((a) => a.public)
      .sort((a, b) => a.sort - b.sort);

    return { items: publicArticles, live: true };
  } catch (error) {
    return {
      items: [],
      live: false,
      error: error instanceof Error ? error.message : "Failed to load Markdown articles",
    };
  }
}

export function getMarkdownArticleById(id: string): MarkdownArticle | null {
  const result = getMarkdownArticles();
  return result.items.find((item) => item.id === id) || null;
}
