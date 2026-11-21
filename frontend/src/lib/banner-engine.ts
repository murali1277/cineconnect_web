import fs from "fs";
import path from "path";

export type BannerType = "promotion" | "related" | "adsense";

export type Banner = {
  id: string;
  name: string;
  type: BannerType;
  image?: string;
  url?: string;
  caption?: string;
  enabled: boolean;
};

export type BannerPlacement = {
  id: string;
  bannerId: string;
  area: "inline" | "sidebar";
  position: number; // For inline: after paragraph number. For sidebar: slot index
  enabled: boolean;
};

export type BannerEngineData = {
  banners: Banner[];
  placements: BannerPlacement[];
};

function getBannersFilePath(): string {
  const cwd = process.cwd();
  const candidate1 = path.join(cwd, "content", "banners", "banners.json");
  if (fs.existsSync(candidate1)) return candidate1;
  const candidate2 = path.join(cwd, "frontend", "content", "banners", "banners.json");
  if (fs.existsSync(candidate2)) return candidate2;
  return candidate1;
}

function getPlacementsFilePath(): string {
  const cwd = process.cwd();
  const candidate1 = path.join(cwd, "content", "banners", "placements.json");
  if (fs.existsSync(candidate1)) return candidate1;
  const candidate2 = path.join(cwd, "frontend", "content", "banners", "placements.json");
  if (fs.existsSync(candidate2)) return candidate2;
  return candidate1;
}

const fallbackBanners: Banner[] = [
  {
    id: "b1",
    name: "Cine Connect Learning Hub",
    type: "promotion",
    image: "https://images.unsplash.com/photo-1517604931442-7e0c8ed2963c?auto=format&fit=crop&w=800&q=80",
    url: "/learning",
    caption: "Professional workshops and masterclasses for cinema creators",
    enabled: true,
  },
  {
    id: "b2",
    name: "Production Services Spotlight",
    type: "promotion",
    image: "https://images.unsplash.com/photo-1489599849927-2ee91cede3ba?auto=format&fit=crop&w=800&q=80",
    url: "/collaboration",
    caption: "Find gear, locations and crew for your next set",
    enabled: true,
  },
  {
    id: "b3",
    name: "Craft Spotlight: 24 Filmmaking Crafts",
    type: "related",
    image: "https://images.unsplash.com/photo-1440404653325-ab127d49abc1?auto=format&fit=crop&w=800&q=80",
    url: "/crafts",
    caption: "Explore professional profiles across all cinema crafts",
    enabled: true,
  },
  {
    id: "b4",
    name: "Google AdSense Placeholder",
    type: "adsense",
    image: "",
    url: "",
    caption: "Reserved advertisement space — live ads will render here",
    enabled: true,
  },
];

const fallbackPlacements: BannerPlacement[] = [
  { id: "p1", bannerId: "b1", area: "inline", position: 1, enabled: true },
  { id: "p2", bannerId: "b3", area: "inline", position: 2, enabled: true },
  { id: "p3", bannerId: "b2", area: "sidebar", position: 1, enabled: true },
  { id: "p4", bannerId: "b4", area: "sidebar", position: 2, enabled: true },
];

export function getBanners(): Banner[] {
  try {
    const file = getBannersFilePath();
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, "utf-8");
      return JSON.parse(content);
    }
  } catch {
    // fallback if unreadable
  }
  return fallbackBanners;
}

export function getPlacements(): BannerPlacement[] {
  try {
    const file = getPlacementsFilePath();
    if (fs.existsSync(file)) {
      const content = fs.readFileSync(file, "utf-8");
      return JSON.parse(content);
    }
  } catch {
    // fallback if unreadable
  }
  return fallbackPlacements;
}

export function getBannerData(): BannerEngineData {
  return {
    banners: getBanners(),
    placements: getPlacements(),
  };
}

export function getBannerById(id: string, banners?: Banner[]): Banner | undefined {
  const list = banners || getBanners();
  return list.find((b) => b.id === id);
}

export function getSortedPlacements(
  area: "inline" | "sidebar",
  enabledOnly = true,
  data?: BannerEngineData
): BannerPlacement[] {
  const currentData = data || getBannerData();
  return currentData.placements
    .filter((p) => {
      if (p.area !== area) return false;
      if (!enabledOnly) return true;
      if (!p.enabled) return false;
      const b = getBannerById(p.bannerId, currentData.banners);
      return b && b.enabled;
    })
    .sort((a, b) => a.position - b.position);
}
