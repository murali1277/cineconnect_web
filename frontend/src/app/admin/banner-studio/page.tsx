"use client";

import { useState } from "react";
import Link from "next/link";
import { PageHero, Kicker } from "@/components/UI";
import type { Banner, BannerPlacement } from "@/lib/banner-engine";

const initialBanners: Banner[] = [
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

const initialPlacements: BannerPlacement[] = [
  { id: "p1", bannerId: "b1", area: "inline", position: 1, enabled: true },
  { id: "p2", bannerId: "b3", area: "inline", position: 2, enabled: true },
  { id: "p3", bannerId: "b2", area: "sidebar", position: 1, enabled: true },
  { id: "p4", bannerId: "b4", area: "sidebar", position: 2, enabled: true },
];

export default function BannerStudioPage() {
  const [banners, setBanners] = useState<Banner[]>(initialBanners);
  const [placements, setPlacements] = useState<BannerPlacement[]>(initialPlacements);

  const [editingBannerId, setEditingBannerId] = useState<string | null>(null);
  const [formName, setFormName] = useState("");
  const [formType, setFormType] = useState<"promotion" | "related" | "adsense">("promotion");
  const [formImage, setFormImage] = useState("");
  const [formUrl, setFormUrl] = useState("");
  const [formCaption, setFormCaption] = useState("");
  const [formEnabled, setFormEnabled] = useState(true);

  const [placementArea, setPlacementArea] = useState<"inline" | "sidebar">("inline");
  const [placementBannerId, setPlacementBannerId] = useState("b1");
  const [placementPosition, setPlacementPosition] = useState(1);

  const handleSelectBanner = (b: Banner) => {
    setEditingBannerId(b.id);
    setFormName(b.name);
    setFormType(b.type);
    setFormImage(b.image || "");
    setFormUrl(b.url || "");
    setFormCaption(b.caption || "");
    setFormEnabled(b.enabled);
  };

  const handleClearForm = () => {
    setEditingBannerId(null);
    setFormName("");
    setFormType("promotion");
    setFormImage("");
    setFormUrl("");
    setFormCaption("");
    setFormEnabled(true);
  };

  const handleSaveBanner = () => {
    if (!formName.trim()) {
      alert("Please enter a banner name");
      return;
    }

    if (editingBannerId) {
      setBanners((prev) =>
        prev.map((b) =>
          b.id === editingBannerId
            ? {
                ...b,
                name: formName.trim(),
                type: formType,
                image: formImage.trim(),
                url: formUrl.trim(),
                caption: formCaption.trim(),
                enabled: formEnabled,
              }
            : b
        )
      );
    } else {
      const newId = "b" + Date.now().toString(36);
      const newBanner: Banner = {
        id: newId,
        name: formName.trim(),
        type: formType,
        image: formImage.trim(),
        url: formUrl.trim(),
        caption: formCaption.trim(),
        enabled: formEnabled,
      };
      setBanners((prev) => [...prev, newBanner]);
      setEditingBannerId(newId);
    }
  };

  const handleDeleteBanner = (id: string) => {
    if (!confirm("Are you sure you want to delete this banner and its placements?")) return;
    setBanners((prev) => prev.filter((b) => b.id !== id));
    setPlacements((prev) => prev.filter((p) => p.bannerId !== id));
    if (editingBannerId === id) handleClearForm();
  };

  const handleAddPlacement = () => {
    if (!banners.length) return;
    const newPlacement: BannerPlacement = {
      id: "p" + Date.now().toString(36),
      bannerId: placementBannerId,
      area: placementArea,
      position: Math.max(1, Number(placementPosition) || 1),
      enabled: true,
    };
    setPlacements((prev) => [...prev, newPlacement]);
  };

  const handleTogglePlacement = (id: string) => {
    setPlacements((prev) =>
      prev.map((p) => (p.id === id ? { ...p, enabled: !p.enabled } : p))
    );
  };

  const handleRemovePlacement = (id: string) => {
    setPlacements((prev) => prev.filter((p) => p.id !== id));
  };

  const filteredPlacements = placements
    .filter((p) => p.area === placementArea)
    .sort((a, b) => a.position - b.position);

  return (
    <>
      <PageHero
        eyebrow="ADMINISTRATION & MEDIA"
        title="N-Banner Studio"
        subtitle="Configure banner inventory and dynamically place inline article ads and sidebar promo slots."
      />
      <section className="section">
        <div className="container">
          <Kicker>STUDIO CONTROLS</Kicker>

          <div className="contact-grid" style={{ marginTop: "24px" }}>
            {/* Left Column: Banner Inventory & Form */}
            <div>
              <div className="contact-form">
                <h2>1. Banner Inventory ({banners.length})</h2>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", margin: "16px 0" }}>
                  {banners.map((b) => (
                    <div
                      key={b.id}
                      style={{
                        display: "flex",
                        justifyContent: "space-between",
                        alignItems: "center",
                        padding: "10px 14px",
                        background: editingBannerId === b.id ? "#2b1442" : "#0d0814",
                        border: "1px solid " + (editingBannerId === b.id ? "#b45fae" : "#3d2b4d"),
                        borderRadius: "8px",
                      }}
                    >
                      <div>
                        <strong>{b.name}</strong>
                        <small style={{ display: "block", color: "#a99bb8", fontSize: "11px" }}>
                          {b.type.toUpperCase()} · {b.enabled ? "Visible" : "Hidden"}
                        </small>
                      </div>
                      <div style={{ display: "flex", gap: "8px" }}>
                        <button className="button button-outline" style={{ padding: "6px 12px", fontSize: "10px" }} onClick={() => handleSelectBanner(b)}>
                          Edit
                        </button>
                        <button className="button button-outline" style={{ padding: "6px 12px", fontSize: "10px", color: "#f87171" }} onClick={() => handleDeleteBanner(b.id)}>
                          ✕
                        </button>
                      </div>
                    </div>
                  ))}
                </div>

                <div style={{ borderTop: "1px solid var(--stroke)", paddingTop: "16px", marginTop: "16px" }}>
                  <h3>{editingBannerId ? "Edit Banner" : "Add New Banner"}</h3>
                  <label>
                    Name
                    <input type="text" value={formName} onChange={(e) => setFormName(e.target.value)} placeholder="e.g. Learning Hub Banner" />
                  </label>
                  <label>
                    Type
                    <select
                      value={formType}
                      onChange={(e) => setFormType(e.target.value as any)}
                      style={{ width: "100%", padding: "10px", background: "#0d0814", color: "#fff", border: "1px solid #554164", borderRadius: "8px" }}
                    >
                      <option value="promotion">Promotion (Cine Connect Promo)</option>
                      <option value="related">Related Content</option>
                      <option value="adsense">Google AdSense Placeholder</option>
                    </select>
                  </label>
                  <label>
                    Image URL
                    <input type="text" value={formImage} onChange={(e) => setFormImage(e.target.value)} placeholder="https://..." />
                  </label>
                  <label>
                    Destination Link URL
                    <input type="text" value={formUrl} onChange={(e) => setFormUrl(e.target.value)} placeholder="/learning or https://..." />
                  </label>
                  <label>
                    Caption Subtitle
                    <input type="text" value={formCaption} onChange={(e) => setFormCaption(e.target.value)} placeholder="Short banner caption..." />
                  </label>
                  <label style={{ display: "flex", alignItems: "center", gap: "8px", cursor: "pointer" }}>
                    <input type="checkbox" checked={formEnabled} onChange={(e) => setFormEnabled(e.target.checked)} />
                    Enabled / Visible
                  </label>

                  <div style={{ display: "flex", gap: "10px", marginTop: "16px" }}>
                    <button className="button button-primary" onClick={handleSaveBanner}>
                      {editingBannerId ? "Update Banner" : "Save Banner"}
                    </button>
                    <button className="button button-outline" onClick={handleClearForm}>
                      Reset Form
                    </button>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Dynamic Placement Manager */}
            <div>
              <div className="contact-form">
                <h2>2. Article Placement Controls ({placements.length})</h2>
                <p>Position banners after paragraph $N$ or inside the article sidebar.</p>

                <div style={{ margin: "16px 0" }}>
                  <label>
                    Placement Area
                    <select
                      value={placementArea}
                      onChange={(e) => setPlacementArea(e.target.value as any)}
                      style={{ width: "100%", padding: "10px", background: "#0d0814", color: "#fff", border: "1px solid #554164", borderRadius: "8px" }}
                    >
                      <option value="inline">Inline (In Article Paragraphs)</option>
                      <option value="sidebar">Sidebar Slot</option>
                    </select>
                  </label>

                  <label style={{ marginTop: "12px" }}>
                    Select Banner
                    <select
                      value={placementBannerId}
                      onChange={(e) => setPlacementBannerId(e.target.value)}
                      style={{ width: "100%", padding: "10px", background: "#0d0814", color: "#fff", border: "1px solid #554164", borderRadius: "8px" }}
                    >
                      {banners.map((b) => (
                        <option key={b.id} value={b.id}>
                          {b.name} ({b.type})
                        </option>
                      ))}
                    </select>
                  </label>

                  <label style={{ marginTop: "12px" }}>
                    {placementArea === "inline" ? "After Paragraph Number" : "Sidebar Slot Index"}
                    <input
                      type="number"
                      min="1"
                      value={placementPosition}
                      onChange={(e) => setPlacementPosition(Number(e.target.value))}
                    />
                  </label>

                  <button className="button button-primary" style={{ marginTop: "16px", width: "100%" }} onClick={handleAddPlacement}>
                    + Add Placement Slot
                  </button>
                </div>

                <h3 style={{ marginTop: "24px" }}>Active {placementArea.toUpperCase()} Placements</h3>
                <div style={{ display: "flex", flexDirection: "column", gap: "10px", marginTop: "10px" }}>
                  {filteredPlacements.map((p) => {
                    const b = banners.find((item) => item.id === p.bannerId);
                    return (
                      <div
                        key={p.id}
                        style={{
                          display: "flex",
                          justifyContent: "space-between",
                          alignItems: "center",
                          padding: "10px 14px",
                          background: "#0d0814",
                          border: "1px solid #3d2b4d",
                          borderRadius: "8px",
                        }}
                      >
                        <div>
                          <strong>{b?.name || "Missing banner"}</strong>
                          <small style={{ display: "block", color: "#a99bb8", fontSize: "11px" }}>
                            {placementArea === "inline" ? "After Paragraph" : "Sidebar Slot"} {p.position} · {p.enabled ? "Visible" : "Hidden"}
                          </small>
                        </div>
                        <div style={{ display: "flex", gap: "8px" }}>
                          <button className="button button-outline" style={{ padding: "4px 8px", fontSize: "10px" }} onClick={() => handleTogglePlacement(p.id)}>
                            {p.enabled ? "Hide" : "Show"}
                          </button>
                          <button className="button button-outline" style={{ padding: "4px 8px", fontSize: "10px", color: "#f87171" }} onClick={() => handleRemovePlacement(p.id)}>
                            ✕
                          </button>
                        </div>
                      </div>
                    );
                  })}
                </div>
              </div>
            </div>
          </div>

          <div style={{ marginTop: "40px" }}>
            <Link className="button button-primary" href="/articles/evolution-of-indian-storytelling">
              Preview Live Article with Banners ↗
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
