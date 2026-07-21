import React, { useState } from "react";
import { useNavigate } from "react-router-dom";
import { usePortfolioData } from "../hooks/usePortfolioData";
import type { PortfolioDataType, ThemeColors } from "../hooks/usePortfolioData";
import { useAuth } from "../hooks/useAuth";
import { savePortfolioData, uploadPhoto } from "../utils/api";

const PALETTES: Record<string, ThemeColors> = {
  default: {
    primary: "#ec4899",
    primaryText: "#000000",
    background: "#09090b",
    surface: "#18181b",
    text: "#ffffff",
    textMuted: "#a1a1aa",
    border: "#000000",
    cardBg: "#ffffff",
    cardText: "#000000",
    accentSecondary: "#22d3ee",
  },
  cyberNeon: {
    primary: "#00ff88",
    primaryText: "#000000",
    background: "#0a0a0f",
    surface: "#141420",
    text: "#ffffff",
    textMuted: "#a1a1aa",
    border: "#000000",
    cardBg: "#1a1a2e",
    cardText: "#ffffff",
    accentSecondary: "#ff00ff",
  },
  sunsetBlaze: {
    primary: "#ff6b35",
    primaryText: "#000000",
    background: "#1a0a00",
    surface: "#2d1600",
    text: "#ffffff",
    textMuted: "#d4a373",
    border: "#000000",
    cardBg: "#fff8f0",
    cardText: "#1a0a00",
    accentSecondary: "#ffd700",
  },
  oceanDeep: {
    primary: "#06b6d4",
    primaryText: "#000000",
    background: "#0c1222",
    surface: "#162032",
    text: "#ffffff",
    textMuted: "#94a3b8",
    border: "#000000",
    cardBg: "#f0f9ff",
    cardText: "#0c1222",
    accentSecondary: "#a78bfa",
  },
  emeraldKnight: {
    primary: "#10b981",
    primaryText: "#000000",
    background: "#0a1a14",
    surface: "#142d22",
    text: "#ffffff",
    textMuted: "#6ee7b7",
    border: "#000000",
    cardBg: "#f0fdf4",
    cardText: "#0a1a14",
    accentSecondary: "#f59e0b",
  },
  bloodMoon: {
    primary: "#ef4444",
    primaryText: "#ffffff",
    background: "#0f0000",
    surface: "#1f0a0a",
    text: "#ffffff",
    textMuted: "#fca5a5",
    border: "#000000",
    cardBg: "#fef2f2",
    cardText: "#0f0000",
    accentSecondary: "#f97316",
  },
  royalPurple: {
    primary: "#8b5cf6",
    primaryText: "#ffffff",
    background: "#0f0520",
    surface: "#1a0e30",
    text: "#ffffff",
    textMuted: "#c4b5fd",
    border: "#000000",
    cardBg: "#faf5ff",
    cardText: "#0f0520",
    accentSecondary: "#ec4899",
  },
  arcticFrost: {
    primary: "#38bdf8",
    primaryText: "#000000",
    background: "#0c1929",
    surface: "#172a3f",
    text: "#ffffff",
    textMuted: "#7dd3fc",
    border: "#000000",
    cardBg: "#f0f9ff",
    cardText: "#0c1929",
    accentSecondary: "#e2e8f0",
  },
};

type TabType =
  | "profile"
  | "stats"
  | "typing"
  | "ticker"
  | "skills"
  | "projects"
  | "experience"
  | "contact"
  | "theme";

export default function AdminDashboard() {
  const { data, updateData } = usePortfolioData();
  const { isAuthenticated, logout } = useAuth();
  const navigate = useNavigate();

  const [formData, setFormData] = useState<PortfolioDataType>(JSON.parse(JSON.stringify(data)));
  const [activeTab, setActiveTab] = useState<TabType>("profile");
  const [saving, setSaving] = useState(false);
  const [saveStatus, setSaveStatus] = useState<{ type: "success" | "error"; msg: string } | null>(null);
  const [commitMsg, setCommitMsg] = useState("");

  if (!isAuthenticated) {
    return (
      <div className="min-h-screen bg-zinc-950 text-white flex flex-col items-center justify-center p-6">
        <div className="bg-zinc-900 border-4 border-red-500 p-8 max-w-md w-full text-center">
          <h1 className="text-3xl font-black mb-2 text-red-500">ACCESS DENIED</h1>
          <p className="font-bold mb-6 text-zinc-400">Please log in from the portfolio page first.</p>
          <button
            onClick={() => navigate("/")}
            className="btn-press bg-pink-500 text-black font-black uppercase px-6 py-3 border-4 border-black cursor-pointer"
          >
            ← Back to Portfolio
          </button>
        </div>
      </div>
    );
  }

  const handleSave = async () => {
    setSaving(true);
    setSaveStatus(null);

    try {
      updateData(formData);
      const res = await savePortfolioData(formData, commitMsg || "chore: update portfolio content from CMS");
      if (res.success) {
        setSaveStatus({ type: "success", msg: res.message || "Changes saved & auto-committed!" });
        setCommitMsg("");
      } else {
        setSaveStatus({ type: "error", msg: res.error || "Failed to save data" });
      }
    } catch (err: any) {
      setSaveStatus({ type: "error", msg: err.message || "Error connecting to admin API backend." });
    } finally {
      setSaving(false);
    }
  };

  const handleFileUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    try {
      const photoUrl = await uploadPhoto(file);
      setFormData((prev) => ({
        ...prev,
        profile: { ...prev.profile, photoUrl },
      }));
      setSaveStatus({ type: "success", msg: "Photo uploaded successfully!" });
    } catch (err: any) {
      setSaveStatus({ type: "error", msg: "Photo upload failed: " + err.message });
    }
  };

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans flex flex-col">
      {/* HEADER */}
      <header className="bg-zinc-900 border-b-4 border-pink-500 px-6 py-4 flex flex-wrap items-center justify-between gap-4 sticky top-0 z-50">
        <div className="flex items-center gap-4">
          <button
            onClick={() => navigate("/")}
            className="bg-zinc-800 text-white font-bold px-3 py-1 border-2 border-white hover:border-pink-500 text-sm cursor-pointer"
          >
            ← Portfolio
          </button>
          <div>
            <h1 className="text-xl font-black text-white uppercase tracking-tight">
              PORTFOLIO CMS <span className="text-pink-500 text-sm">管理パネル</span>
            </h1>
          </div>
        </div>

        <div className="flex items-center gap-3">
          <button
            onClick={() => {
              logout();
              navigate("/");
            }}
            className="bg-red-600 text-white font-bold text-xs uppercase px-3 py-2 border-2 border-black hover:bg-red-500 cursor-pointer"
          >
            Logout
          </button>
        </div>
      </header>

      {/* STATUS NOTIFICATION */}
      {saveStatus && (
        <div
          className={`px-6 py-3 border-b-2 font-bold flex justify-between items-center ${
            saveStatus.type === "success"
              ? "bg-emerald-950 border-emerald-500 text-emerald-300"
              : "bg-red-950 border-red-500 text-red-300"
          }`}
        >
          <span>{saveStatus.msg}</span>
          <button onClick={() => setSaveStatus(null)} className="font-black hover:text-white">
            ✕
          </button>
        </div>
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col md:flex-row">
        {/* SIDEBAR TABS */}
        <aside className="w-full md:w-64 bg-zinc-900 border-r-0 md:border-r-4 border-pink-500 flex flex-row md:flex-col overflow-x-auto shrink-0">
          {(
            [
              ["profile", "📝 Profile"],
              ["stats", "📊 Stats"],
              ["typing", "⌨️ Typing Words"],
              ["ticker", "📰 Marquee Ticker"],
              ["skills", "🛠️ Skills"],
              ["projects", "🚀 Projects"],
              ["experience", "💼 Experience"],
              ["contact", "📬 Contact"],
              ["theme", "🎨 Theme & Colors"],
            ] as [TabType, string][]
          ).map(([key, label]) => (
            <button
              key={key}
              onClick={() => setActiveTab(key)}
              className={`px-5 py-3 text-left font-black uppercase text-sm border-b md:border-b-0 md:border-l-4 transition-colors whitespace-nowrap cursor-pointer ${
                activeTab === key
                  ? "bg-pink-500 text-black border-black md:border-l-black"
                  : "text-zinc-400 hover:text-white hover:bg-zinc-800 border-transparent"
              }`}
            >
              {label}
            </button>
          ))}
        </aside>

        {/* TAB PANELS */}
        <main className="flex-1 p-6 max-w-4xl overflow-y-auto">
          {/* 1. PROFILE TAB */}
          {activeTab === "profile" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                Profile Information
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Display Name</label>
                  <input
                    type="text"
                    value={formData.profile.name}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, name: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Japanese Name</label>
                  <input
                    type="text"
                    value={formData.profile.nameJp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, nameJp: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Title</label>
                  <input
                    type="text"
                    value={formData.profile.title}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, title: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Japanese Title</label>
                  <input
                    type="text"
                    value={formData.profile.titleJp}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, titleJp: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Tagline</label>
                <input
                  type="text"
                  value={formData.profile.tagline}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profile: { ...formData.profile, tagline: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">About Me Description</label>
                <textarea
                  rows={4}
                  value={formData.profile.about}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      profile: { ...formData.profile, about: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Photo / Avatar Image</label>
                <div className="flex items-center gap-4">
                  {formData.profile.photoUrl ? (
                    <img
                      src={formData.profile.photoUrl}
                      alt="Avatar"
                      className="w-16 h-16 object-cover border-2 border-pink-500 rounded"
                    />
                  ) : (
                    <div className="w-16 h-16 bg-zinc-800 border-2 border-zinc-700 flex items-center justify-center text-xs text-zinc-500 font-bold">
                      No Photo
                    </div>
                  )}
                  <input
                    type="file"
                    accept="image/*"
                    onChange={handleFileUpload}
                    className="bg-zinc-800 border-2 border-white p-2 text-xs font-bold cursor-pointer"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 2. STATS TAB */}
          {activeTab === "stats" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                About Section Statistics
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Years Experience Stat</label>
                  <input
                    type="text"
                    value={formData.profile.yearsExperience}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, yearsExperience: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                    placeholder="e.g. 2+"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Projects Shipped Stat</label>
                  <input
                    type="text"
                    value={formData.profile.projectsShipped}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        profile: { ...formData.profile, projectsShipped: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                    placeholder="e.g. 10+"
                  />
                </div>
              </div>
            </div>
          )}

          {/* 3. TYPING WORDS TAB */}
          {activeTab === "typing" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                Hero Typing Animation Words
              </h2>

              <div className="flex flex-col gap-3">
                {formData.typingWords.map((word, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={word}
                      onChange={(e) => {
                        const updated = [...formData.typingWords];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, typingWords: updated });
                      }}
                      className="flex-1 bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                    />
                    <button
                      onClick={() => {
                        const updated = formData.typingWords.filter((_, i) => i !== idx);
                        setFormData({ ...formData, typingWords: updated });
                      }}
                      className="bg-red-600 px-4 py-2 font-black border-2 border-black hover:bg-red-500 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    typingWords: [...formData.typingWords, "New Specialty"],
                  })
                }
                className="btn-press bg-pink-500 text-black font-black uppercase px-4 py-2 border-2 border-black self-start cursor-pointer"
              >
                + Add Word
              </button>
            </div>
          )}

          {/* 4. TICKER TAB */}
          {activeTab === "ticker" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                Marquee Ticker Items
              </h2>

              <div className="flex flex-col gap-3">
                {formData.tickerItems.map((item, idx) => (
                  <div key={idx} className="flex gap-2">
                    <input
                      type="text"
                      value={item}
                      onChange={(e) => {
                        const updated = [...formData.tickerItems];
                        updated[idx] = e.target.value;
                        setFormData({ ...formData, tickerItems: updated });
                      }}
                      className="flex-1 bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none focus:border-pink-500"
                    />
                    <button
                      onClick={() => {
                        const updated = formData.tickerItems.filter((_, i) => i !== idx);
                        setFormData({ ...formData, tickerItems: updated });
                      }}
                      className="bg-red-600 px-4 py-2 font-black border-2 border-black hover:bg-red-500 cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                ))}
              </div>

              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    tickerItems: [...formData.tickerItems, "NEW TICKER ITEM"],
                  })
                }
                className="btn-press bg-pink-500 text-black font-black uppercase px-4 py-2 border-2 border-black self-start cursor-pointer"
              >
                + Add Ticker Item
              </button>
            </div>
          )}

          {/* 5. SKILLS TAB */}
          {activeTab === "skills" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                Skill Groups
              </h2>

              {formData.skills.map((group, groupIdx) => (
                <div key={groupIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 flex flex-col gap-4">
                  <div className="flex justify-between items-center gap-2">
                    <input
                      type="text"
                      value={group.group}
                      onChange={(e) => {
                        const updated = [...formData.skills];
                        updated[groupIdx].group = e.target.value;
                        setFormData({ ...formData, skills: updated });
                      }}
                      className="bg-zinc-800 border-2 border-pink-500 p-2 font-black text-pink-500 uppercase outline-none"
                      placeholder="Group Title"
                    />
                    <input
                      type="text"
                      value={group.jp}
                      onChange={(e) => {
                        const updated = [...formData.skills];
                        updated[groupIdx].jp = e.target.value;
                        setFormData({ ...formData, skills: updated });
                      }}
                      className="bg-zinc-800 border-2 border-zinc-600 p-2 font-bold text-zinc-400 outline-none text-right"
                      placeholder="Japanese translation"
                    />
                    <button
                      onClick={() => {
                        const updated = formData.skills.filter((_, i) => i !== groupIdx);
                        setFormData({ ...formData, skills: updated });
                      }}
                      className="bg-red-600 text-white font-bold px-3 py-2 border-2 border-black hover:bg-red-500 cursor-pointer"
                    >
                      Delete Group
                    </button>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-2">Skill Badges</label>
                    <div className="flex flex-wrap gap-2 mb-3">
                      {group.items.map((item, itemIdx) => (
                        <span key={itemIdx} className="bg-white text-black font-bold text-xs px-2 py-1 flex items-center gap-1 border border-black">
                          {item}
                          <button
                            onClick={() => {
                              const updated = [...formData.skills];
                              updated[groupIdx].items = updated[groupIdx].items.filter((_, i) => i !== itemIdx);
                              setFormData({ ...formData, skills: updated });
                            }}
                            className="text-red-600 hover:text-black font-black ml-1"
                          >
                            ×
                          </button>
                        </span>
                      ))}
                    </div>

                    <div className="flex gap-2">
                      <input
                        type="text"
                        id={`new-skill-${groupIdx}`}
                        placeholder="Add skill..."
                        className="bg-zinc-800 border border-zinc-600 p-1 text-xs text-white outline-none"
                        onKeyDown={(e) => {
                          if (e.key === "Enter") {
                            const val = e.currentTarget.value.trim();
                            if (val) {
                              const updated = [...formData.skills];
                              updated[groupIdx].items.push(val);
                              setFormData({ ...formData, skills: updated });
                              e.currentTarget.value = "";
                            }
                          }
                        }}
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    skills: [
                      ...formData.skills,
                      { group: "New Category", jp: "新規", items: ["Skill 1"] },
                    ],
                  })
                }
                className="btn-press bg-pink-500 text-black font-black uppercase px-4 py-2 border-2 border-black self-start cursor-pointer"
              >
                + Add Skill Group
              </button>
            </div>
          )}

          {/* 6. PROJECTS TAB */}
          {activeTab === "projects" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                Projects Shipped
              </h2>

              {formData.projects.map((proj, projIdx) => (
                <div key={projIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-lg text-white">Project #{projIdx + 1}</h3>
                    <button
                      onClick={() => {
                        const updated = formData.projects.filter((_, i) => i !== projIdx);
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="bg-red-600 text-white font-bold text-xs px-3 py-1 border-2 border-black hover:bg-red-500 cursor-pointer"
                    >
                      Delete Project
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Title</label>
                      <input
                        type="text"
                        value={proj.title}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[projIdx].title = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Episode (JP)</label>
                      <input
                        type="text"
                        value={proj.jp}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[projIdx].jp = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">SFX Badge</label>
                      <input
                        type="text"
                        value={proj.sfx}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[projIdx].sfx = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={proj.desc}
                      onChange={(e) => {
                        const updated = [...formData.projects];
                        updated[projIdx].desc = e.target.value;
                        setFormData({ ...formData, projects: updated });
                      }}
                      className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                    />
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Project Link URL</label>
                      <input
                        type="text"
                        value={proj.link}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[projIdx].link = e.target.value;
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Tags (comma-separated)</label>
                      <input
                        type="text"
                        value={proj.tags.join(", ")}
                        onChange={(e) => {
                          const updated = [...formData.projects];
                          updated[projIdx].tags = e.target.value.split(",").map((t) => t.trim()).filter(Boolean);
                          setFormData({ ...formData, projects: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                      />
                    </div>
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    projects: [
                      ...formData.projects,
                      {
                        title: "New Project",
                        jp: "新章",
                        desc: "Description of the new awesome project.",
                        tags: ["React", "AI"],
                        link: "#",
                        sfx: "ドン!",
                      },
                    ],
                  })
                }
                className="btn-press bg-pink-500 text-black font-black uppercase px-4 py-2 border-2 border-black self-start cursor-pointer"
              >
                + Add Project
              </button>
            </div>
          )}

          {/* 7. EXPERIENCE TAB */}
          {activeTab === "experience" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                Work Experience
              </h2>

              {formData.experience.map((exp, expIdx) => (
                <div key={expIdx} className="bg-zinc-900 border-2 border-zinc-700 p-4 flex flex-col gap-3">
                  <div className="flex justify-between items-center">
                    <h3 className="font-black text-lg text-white">Experience #{expIdx + 1}</h3>
                    <button
                      onClick={() => {
                        const updated = formData.experience.filter((_, i) => i !== expIdx);
                        setFormData({ ...formData, experience: updated });
                      }}
                      className="bg-red-600 text-white font-bold text-xs px-3 py-1 border-2 border-black hover:bg-red-500 cursor-pointer"
                    >
                      Delete Entry
                    </button>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-3 gap-3">
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Role</label>
                      <input
                        type="text"
                        value={exp.role}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[expIdx].role = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Company</label>
                      <input
                        type="text"
                        value={exp.company}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[expIdx].company = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                      />
                    </div>
                    <div>
                      <label className="block text-xs font-bold uppercase mb-1">Period</label>
                      <input
                        type="text"
                        value={exp.period}
                        onChange={(e) => {
                          const updated = [...formData.experience];
                          updated[expIdx].period = e.target.value;
                          setFormData({ ...formData, experience: updated });
                        }}
                        className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-bold uppercase mb-1">Description</label>
                    <textarea
                      rows={2}
                      value={exp.desc}
                      onChange={(e) => {
                        const updated = [...formData.experience];
                        updated[expIdx].desc = e.target.value;
                        setFormData({ ...formData, experience: updated });
                      }}
                      className="w-full bg-zinc-800 border border-zinc-600 p-2 font-bold text-white outline-none"
                    />
                  </div>
                </div>
              ))}

              <button
                onClick={() =>
                  setFormData({
                    ...formData,
                    experience: [
                      ...formData.experience,
                      {
                        role: "New Role",
                        company: "Company Name",
                        period: "2025 — Present",
                        desc: "Responsibilities and achievements.",
                      },
                    ],
                  })
                }
                className="btn-press bg-pink-500 text-black font-black uppercase px-4 py-2 border-2 border-black self-start cursor-pointer"
              >
                + Add Experience
              </button>
            </div>
          )}

          {/* 8. CONTACT TAB */}
          {activeTab === "contact" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                Contact & Links
              </h2>

              <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Email</label>
                  <input
                    type="text"
                    value={formData.contact.email}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, email: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">GitHub URL</label>
                  <input
                    type="text"
                    value={formData.contact.github}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, github: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none"
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold uppercase mb-1">LinkedIn URL</label>
                  <input
                    type="text"
                    value={formData.contact.linkedin}
                    onChange={(e) =>
                      setFormData({
                        ...formData,
                        contact: { ...formData.contact, linkedin: e.target.value },
                      })
                    }
                    className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none"
                  />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Contact Heading</label>
                <input
                  type="text"
                  value={formData.contact.contactHeading}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, contactHeading: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none"
                />
              </div>

              <div>
                <label className="block text-xs font-bold uppercase mb-1">Contact Subtext</label>
                <input
                  type="text"
                  value={formData.contact.contactSubtext}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      contact: { ...formData.contact, contactSubtext: e.target.value },
                    })
                  }
                  className="w-full bg-zinc-800 border-2 border-white p-2 font-bold text-white outline-none"
                />
              </div>
            </div>
          )}

          {/* 9. THEME TAB */}
          {activeTab === "theme" && (
            <div className="flex flex-col gap-6">
              <h2 className="text-2xl font-black text-pink-500 uppercase border-b-2 border-zinc-800 pb-2">
                Color Palette Customization
              </h2>

              <div>
                <label className="block text-xs font-bold uppercase mb-2">Preset Palettes</label>
                <div className="flex flex-wrap gap-2">
                  {Object.keys(PALETTES).map((name) => (
                    <button
                      key={name}
                      onClick={() =>
                        setFormData({
                          ...formData,
                          theme: {
                            preset: name,
                            colors: { ...PALETTES[name] },
                          },
                        })
                      }
                      className="px-3 py-1 font-bold text-xs uppercase border-2 border-black bg-zinc-800 hover:border-pink-500 flex items-center gap-2 cursor-pointer"
                    >
                      <span
                        className="w-3 h-3 rounded-full border border-black"
                        style={{ backgroundColor: PALETTES[name].primary }}
                      />
                      {name}
                    </button>
                  ))}
                </div>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {(Object.keys(formData.theme.colors) as (keyof ThemeColors)[]).map((key) => (
                  <div key={key} className="flex items-center gap-3 bg-zinc-900 p-2 border border-zinc-800">
                    <input
                      type="color"
                      value={formData.theme.colors[key]}
                      onChange={(e) =>
                        setFormData({
                          ...formData,
                          theme: {
                            ...formData.theme,
                            colors: { ...formData.theme.colors, [key]: e.target.value },
                          },
                        })
                      }
                      className="w-8 h-8 rounded border-none cursor-pointer"
                    />
                    <div className="flex-1">
                      <label className="block text-xs font-bold uppercase">{key}</label>
                      <input
                        type="text"
                        value={formData.theme.colors[key]}
                        onChange={(e) =>
                          setFormData({
                            ...formData,
                            theme: {
                              ...formData.theme,
                              colors: { ...formData.theme.colors, [key]: e.target.value },
                            },
                          })
                        }
                        className="w-full bg-zinc-800 border border-zinc-700 px-2 py-1 text-xs font-mono text-white outline-none"
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* SAVE & COMMIT FOOTER BAR */}
          <div className="mt-8 pt-4 border-t-2 border-zinc-800 flex flex-col sm:flex-row gap-4 justify-between items-center">
            <input
              type="text"
              placeholder="Git commit message (optional)..."
              value={commitMsg}
              onChange={(e) => setCommitMsg(e.target.value)}
              className="w-full sm:w-80 bg-zinc-800 border-2 border-zinc-600 p-2 text-xs font-bold text-white outline-none"
            />

            <button
              onClick={handleSave}
              disabled={saving}
              className="w-full sm:w-auto btn-press bg-pink-500 text-black font-black uppercase px-8 py-3 border-4 border-black shadow-lg hover:bg-pink-400 disabled:opacity-50 cursor-pointer"
              style={{ boxShadow: "4px 4px 0 #000" }}
            >
              {saving ? "Saving & Committing..." : "💾 SAVE & COMMIT →"}
            </button>
          </div>
        </main>
      </div>
    </div>
  );
}
