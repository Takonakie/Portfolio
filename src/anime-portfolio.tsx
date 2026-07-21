import { useState, useEffect, useRef, ReactNode } from "react";

// ============ INTERFACES ============
interface SkillGroup {
  group: string;
  jp: string;
  items: string[];
}

interface Project {
  title: string;
  jp: string;
  desc: string;
  tags: string[];
  link: string;
  sfx: string;
}

interface Experience {
  role: string;
  company: string;
  period: string;
  desc: string;
}

interface PortfolioData {
  name: string;
  nameJp: string;
  title: string;
  titleJp: string;
  tagline: string;
  email: string;
  github: string;
  linkedin: string;
  about: string;
  skills: SkillGroup[];
  projects: Project[];
  experience: Experience[];
}

interface RevealProps {
  children: ReactNode;
  delay?: number;
  className?: string;
}

interface SpeechBubbleProps {
  children: ReactNode;
  className?: string;
}

interface SectionTitleProps {
  en: string;
  jp: string;
}

interface StarConfig {
  left: string;
  size: number;
  dur: number;
  delay: number;
}

// ============ PLACEHOLDER DATA — edit these ============
const DATA: PortfolioData = {
  name: "RIVAN",
  nameJp: "リヴァン",
  title: "AI ENGINEER",
  titleJp: "AIエンジニア",
  tagline: "I build LLM-powered products & intelligent agents",
  email: "sadvan945@gmail.com",
  github: "https://github.com/yourusername",
  linkedin: "https://linkedin.com/in/yourusername",
  about:
    "AI Engineer specializing in large language models, retrieval systems, and autonomous agents. I turn research papers into production systems — and I do it with style.",
  skills: [
    { group: "ML & DL", jp: "機械学習", items: ["PyTorch", "TensorFlow", "Scikit-learn", "Hugging Face"] },
    { group: "LLM Stack", jp: "大規模言語モデル", items: ["LangChain", "RAG", "Fine-tuning", "Vector DBs", "Prompt Eng."] },
    { group: "Engineering", jp: "エンジニアリング", items: ["Python", "FastAPI", "Docker", "AWS", "PostgreSQL"] },
  ],
  projects: [
    {
      title: "Sensei-GPT",
      jp: "第一話",
      desc: "RAG-powered study assistant that answers questions from 10k+ documents with cited sources. 92% answer accuracy on eval set.",
      tags: ["LangChain", "Pinecone", "FastAPI"],
      link: "#",
      sfx: "ドン!",
    },
    {
      title: "Mecha-Vision",
      jp: "第二話",
      desc: "Real-time object detection pipeline for factory QA. YOLOv8 fine-tuned on custom dataset, deployed at 45 FPS on edge devices.",
      tags: ["YOLOv8", "ONNX", "Edge AI"],
      link: "#",
      sfx: "バン!",
    },
    {
      title: "Agent-Zero",
      jp: "第三話",
      desc: "Multi-agent workflow system that automates research reports — planner, retriever, and writer agents collaborating via tool calls.",
      tags: ["Agents", "OpenAI", "Redis"],
      link: "#",
      sfx: "ゴゴゴ",
    },
    {
      title: "Waifu-Diffusion Lab",
      jp: "第四話",
      desc: "Fine-tuned Stable Diffusion with LoRA for consistent character generation. Custom training pipeline + Gradio demo app.",
      tags: ["Diffusion", "LoRA", "Gradio"],
      link: "#",
      sfx: "キラ✦",
    },
  ],
  experience: [
    { role: "AI Engineer", company: "TechCorp Inc.", period: "2024 — Now", desc: "Shipping LLM features used by 100k+ users. Built internal RAG platform and eval framework." },
    { role: "ML Engineer Intern", company: "StartupXYZ", period: "2023 — 2024", desc: "Built recommendation models and data pipelines. Reduced inference latency by 60%." },
  ],
};
// =======================================================

const ANIM_CSS = `
/* 1. Slash-in page load */
@keyframes slashWipeOut {
  0% { transform: translateX(0) skewX(-14deg); }
  100% { transform: translateX(160%) skewX(-14deg); }
}
.wipe-layer {
  position: fixed; top: 0; bottom: 0; left: -30%; width: 160%;
  z-index: 100; pointer-events: none;
  animation: slashWipeOut 0.9s cubic-bezier(0.8, 0, 0.2, 1) forwards;
}
.wipe-pink { animation-delay: 0.12s; }

/* 2. Scroll-reveal panels */
.reveal { opacity: 0; transform: translateY(48px) rotate(2.5deg) scale(0.97); }
.reveal.visible {
  opacity: 1; transform: translateY(0) rotate(0deg) scale(1);
  transition: opacity 0.45s ease-out, transform 0.55s cubic-bezier(0.2, 0.9, 0.25, 1.15);
}

/* 3. Jagged hover pop */
.card-pop { transition: transform 0.2s cubic-bezier(0.3, 1.4, 0.5, 1), box-shadow 0.2s; }
.card-pop:hover { transform: rotate(0deg) scale(1.035) !important; z-index: 10; }
@keyframes sfxWobble {
  0%, 100% { transform: rotate(6deg) scale(1); }
  30% { transform: rotate(-8deg) scale(1.25); }
  60% { transform: rotate(10deg) scale(1.1); }
}
.card-pop:hover .sfx-badge { animation: sfxWobble 0.45s ease; }

/* 4. Nav link strike */
.nav-strike { position: relative; }
.nav-strike::after {
  content: ""; position: absolute; left: -8%; top: 55%; height: 3px; width: 0;
  background: #ec4899; transform: rotate(-6deg); transition: width 0.18s ease-out;
  pointer-events: none;
}
.nav-strike:hover::after { width: 116%; }

/* 5. Glitch flicker on name */
@keyframes glitchFlicker {
  0%, 92%, 100% { transform: none; text-shadow: 6px 6px 0 #ec4899, 12px 12px 0 #27272a; }
  93% { transform: translate(4px, -2px) skewX(-4deg); text-shadow: -4px 2px 0 #ec4899, 12px 12px 0 #27272a; }
  95% { transform: translate(-4px, 2px); text-shadow: 4px -3px 0 #22d3ee, 12px 12px 0 #27272a; }
  97% { transform: none; }
}
.glitch-name { animation: glitchFlicker 4.5s infinite; }

/* 6. Marquee ticker */
@keyframes marqueeScroll { 0% { transform: translateX(0); } 100% { transform: translateX(-50%); } }
.marquee-track { display: inline-flex; white-space: nowrap; animation: marqueeScroll 22s linear infinite; }

/* 7. Button press effect */
.btn-press { transition: transform 0.12s ease, box-shadow 0.12s ease; }
.btn-press:active { transform: translate(5px, 5px) !important; box-shadow: 0 0 0 #000 !important; }

/* 8. Floating stars */
@keyframes starDrift {
  0% { transform: translateY(20px) rotate(0deg); opacity: 0; }
  15% { opacity: 0.5; }
  85% { opacity: 0.5; }
  100% { transform: translateY(-90vh) rotate(180deg); opacity: 0; }
}
.star { position: absolute; color: #ec4899; animation: starDrift linear infinite; pointer-events: none; user-select: none; }

@media (prefers-reduced-motion: reduce) {
  .wipe-layer, .glitch-name, .marquee-track, .star, .card-pop:hover .sfx-badge { animation: none !important; }
  .reveal { opacity: 1; transform: none; }
}
`;

function useTyping(words: string[]): string {
  const [text, setText] = useState < string > ("");
  const [wordIdx, setWordIdx] = useState < number > (0);
  const [deleting, setDeleting] = useState < boolean > (false);

  useEffect(() => {
    const word = words[wordIdx % words.length];
    const t = setTimeout(
      () => {
        if (!deleting) {
          const next = word.slice(0, text.length + 1);
          setText(next);
          if (next === word) setTimeout(() => setDeleting(true), 1400);
        } else {
          const next = word.slice(0, text.length - 1);
          setText(next);
          if (next === "") {
            setDeleting(false);
            setWordIdx((i) => i + 1);
          }
        }
      },
      deleting ? 45 : 90
    );
    return () => clearTimeout(t);
  }, [text, deleting, wordIdx, words]);

  return text;
}

// 2. Scroll-reveal wrapper
function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef < HTMLDivElement | null > (null);
  const [vis, setVis] = useState < boolean > (false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const ob = new IntersectionObserver(
      ([e]) => {
        if (e.isIntersecting) {
          setVis(true);
          ob.disconnect();
        }
      },
      { threshold: 0.12 }
    );
    ob.observe(el);
    return () => ob.disconnect();
  }, []);

  return (
    <div ref={ref} className={`reveal ${vis ? "visible" : ""} ${className} `} style={{ transitionDelay: `${delay} ms` }}>
      {children}
    </div>
  );
}

// 6. Marquee ticker
function Ticker() {
  const items = ["AI ENGINEER", "★", "リヴァン", "★", "TAKE YOUR TIME", "★", "LLM × AGENTS × VISION", "★", "全力疾走", "★"];
  const row = items.join("    ");
  return (
    <div className="overflow-hidden bg-pink-500 text-black font-black uppercase text-sm py-2 border-y-4 border-black select-none">
      <div className="marquee-track">
        <span className="px-4">{row}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="px-4">{row}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}

// 8. Floating stars
function Stars() {
  const stars: StarConfig[] = [
    { left: "6%", size: 18, dur: 14, delay: 0 },
    { left: "18%", size: 12, dur: 18, delay: 3 },
    { left: "38%", size: 22, dur: 12, delay: 6 },
    { left: "62%", size: 14, dur: 16, delay: 1.5 },
    { left: "78%", size: 20, dur: 13, delay: 8 },
    { left: "92%", size: 12, dur: 19, delay: 4.5 },
  ];
  return (
    <div className="absolute inset-0 overflow-hidden pointer-events-none">
      {stars.map((s, i) => (
        <span key={i} className="star" style={{ left: s.left, bottom: "-30px", fontSize: s.size, animationDuration: `${s.dur} s`, animationDelay: `${s.delay} s` }}>
          ✦
        </span>
      ))}
    </div>
  );
}

function SpeechBubble({ children, className = "" }: SpeechBubbleProps) {
  return (
    <div className={`relative bg - white text - black border - 4 border - black rounded - 3xl px - 6 py - 4 font - bold shadow - lg ${className} `}>
      {children}
      <div className="absolute -bottom-4 left-10 w-0 h-0 border-l-8 border-r-8 border-l-transparent border-r-transparent border-t-black"
        style={{ borderTopWidth: "16px", borderTopStyle: "solid" }} />
      <div className="absolute left-10 w-0 h-0 border-l-8 border-r-8 border-l-transparent border-r-transparent"
        style={{ bottom: "-11px", borderTopWidth: "13px", borderTopStyle: "solid", borderTopColor: "white", marginLeft: "0px" }} />
    </div>
  );
}

function SectionTitle({ en, jp }: SectionTitleProps) {
  return (
    <Reveal>
      <div className="flex items-end gap-4 mb-10">
        <h2 className="text-4xl sm:text-5xl font-black text-white uppercase tracking-tight" style={{ textShadow: "4px 4px 0 #ec4899" }}>
          {en}
        </h2>
        <span className="text-pink-500 text-xl font-bold mb-1">{jp}</span>
        <div className="flex-1 h-1 bg-white mb-3" style={{ clipPath: "polygon(0 0, 100% 0, 98% 100%, 0 100%)" }} />
      </div>
    </Reveal>
  );
}

const halftone = {
  backgroundImage: "radial-gradient(circle, #1f1f1f 1px, transparent 1px)",
  backgroundSize: "8px 8px",
};
const halftonePink = {
  backgroundImage: "radial-gradient(circle, rgba(236,72,153,0.35) 1.5px, transparent 1.5px)",
  backgroundSize: "10px 10px",
};

export default function AnimePortfolio() {
  const typed = useTyping(["LLM Applications", "RAG Systems", "AI Agents", "Computer Vision"]);
  const [menuOpen, setMenuOpen] = useState < boolean > (false);

  return (
    <div className="min-h-screen bg-zinc-950 text-white font-sans overflow-x-hidden" style={{ fontFamily: "'Segoe UI', system-ui, sans-serif" }}>
      <style>{ANIM_CSS}</style>

      {/* 1. slash-in page load */}
      <div className="wipe-layer bg-black" />
      <div className="wipe-layer wipe-pink bg-pink-500" />

      {/* speed lines background */}
      <div className="fixed inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(115deg, transparent 0px, transparent 40px, #fff 40px, #fff 41px)" }} />

      {/* NAV */}
      <nav className="sticky top-0 z-50 bg-zinc-950 border-b-4 border-pink-500">
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <span className="bg-pink-500 text-black font-black px-2 py-1 text-lg" style={{ clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)" }}>
              {DATA.name}
            </span>
            <span className="text-pink-500 font-bold">{DATA.nameJp}</span>
          </div>
          <div className="hidden sm:flex gap-6 font-bold uppercase text-sm">
            {["About", "Skills", "Projects", "Experience", "Contact"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()} `} className="nav-strike hover:text-pink-500 transition-colors">
                {s}
              </a>
            ))}
          </div>
          <button className="sm:hidden text-pink-500 font-black text-2xl" onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="sm:hidden flex flex-col gap-3 px-6 pb-4 font-bold uppercase text-sm bg-zinc-950">
            {["About", "Skills", "Projects", "Experience", "Contact"].map((s) => (
              <a key={s} href={`#${s.toLowerCase()} `} onClick={() => setMenuOpen(false)} className="hover:text-pink-500">
                {s}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO — manga cover page */}
      <header className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
        {/* 8. floating stars */}
        <Stars />
        <div className="absolute top-8 right-6 text-8xl sm:text-9xl font-black text-pink-500 opacity-20 select-none" style={{ writingMode: "vertical-rl" }}>
          {DATA.titleJp}
        </div>
        <p className="text-pink-500 font-bold tracking-widest mb-2">第一章 — CHAPTER 01</p>
        {/* 5. glitch flicker */}
        <h1 className="glitch-name text-6xl sm:text-8xl font-black uppercase leading-none mb-2">
          {DATA.name}
        </h1>
        <p className="text-2xl sm:text-3xl font-black text-pink-500 uppercase mb-8 tracking-wide">{DATA.title}</p>

        <SpeechBubble className="max-w-xl mb-10">
          <span className="text-zinc-500 text-sm block mb-1">I build...</span>
          <span className="text-2xl">{typed}</span>
          <span className="text-pink-500 animate-pulse text-2xl">▌</span>
        </SpeechBubble>

        <div className="flex flex-wrap gap-4 mt-4">
          <a href="#projects" className="btn-press bg-pink-500 text-black font-black uppercase px-8 py-3 border-4 border-black shadow-lg"
            style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)", boxShadow: "5px 5px 0 #000" }}>
            Read the Manga →
          </a>
          <a href="#contact" className="btn-press bg-white text-black font-black uppercase px-8 py-3 border-4 border-pink-500"
            style={{ clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)", boxShadow: "5px 5px 0 #ec4899" }}>
            Contact
          </a>
        </div>

        {/* character art placeholder */}
        <div className="absolute bottom-0 right-0 hidden lg:flex items-end">
          <div className="w-64 h-80 border-4 border-dashed border-pink-500 rounded-t-full flex items-center justify-center text-center p-6 text-pink-500 font-bold" style={halftonePink}>
            YOUR ANIME
            <br />
            AVATAR HERE
            <br />
            (swap with art)
          </div>
        </div>
      </header>

      {/* 6. marquee ticker */}
      <Ticker />

      {/* ABOUT — manga panel */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle en="About" jp="自己紹介" />
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal className="md:col-span-2">
            <div className="card-pop bg-white text-black border-4 border-black p-8 relative h-full" style={{ transform: "rotate(-1deg)" }}>
              <div className="absolute -top-5 -left-3 bg-black text-white font-black px-4 py-1 uppercase text-sm">Panel 01</div>
              <p className="text-lg font-semibold leading-relaxed">{DATA.about}</p>
              <div className="absolute bottom-2 right-4 text-pink-500 font-black text-3xl select-none">ドキドキ</div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div className="card-pop border-4 border-black bg-pink-500 text-black p-8 flex flex-col justify-center gap-3 font-black h-full" style={{ transform: "rotate(1deg)", ...halftone }}>
              <div className="text-4xl">2+</div>
              <div className="uppercase text-sm">Years in AI</div>
              <div className="text-4xl">10+</div>
              <div className="uppercase text-sm">Projects Shipped</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle en="Skills" jp="スキル" />
        <div className="grid sm:grid-cols-3 gap-6">
          {DATA.skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 120}>
              <div className="card-pop bg-zinc-900 border-4 border-white p-6 relative hover:border-pink-500 transition-colors h-full"
                style={{ transform: `rotate(${i % 2 === 0 ? -0.7 : 0.7}deg)` }}>
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-black uppercase text-xl text-pink-500">{s.group}</h3>
                  <span className="text-zinc-500 font-bold text-sm">{s.jp}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span key={it} className="bg-white text-black font-bold text-sm px-3 py-1 border-2 border-black"
                      style={{ clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)" }}>
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS — manga episode panels */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle en="Projects" jp="作品集" />
        <div className="grid md:grid-cols-2 gap-8">
          {DATA.projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 130}>
              <a href={p.link}
                className="card-pop group relative bg-white text-black border-4 border-black p-6 block shadow-xl h-full"
                style={{ transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)` }}>
                <div className="sfx-badge absolute -top-4 -right-3 bg-pink-500 text-black font-black px-3 py-1 border-2 border-black text-2xl rotate-6 select-none">
                  {p.sfx}
                </div>
                <div className="text-xs font-black text-zinc-400 uppercase mb-1">
                  {p.jp} — Episode {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 group-hover:text-pink-500 transition-colors">{p.title}</h3>
                <p className="font-semibold text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="bg-black text-white text-xs font-bold px-2 py-1 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 font-black text-pink-500 uppercase text-sm">To be continued... →</div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle en="Experience" jp="経歴" />
        <div className="relative pl-8 border-l-4 border-pink-500 flex flex-col gap-10">
          {DATA.experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 130}>
              <div className="relative">
                <div className="absolute -left-11 top-1 w-5 h-5 bg-pink-500 border-4 border-black rotate-45" />
                <div className="card-pop bg-zinc-900 border-4 border-white p-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-black uppercase text-xl">
                      {e.role} <span className="text-pink-500">@ {e.company}</span>
                    </h3>
                    <span className="bg-white text-black font-bold text-xs px-2 py-1">{e.period}</span>
                  </div>
                  <p className="text-zinc-300 font-semibold text-sm">{e.desc}</p>
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* CONTACT */}
      <section id="contact" className="max-w-6xl mx-auto px-6 py-20">
        <SectionTitle en="Contact" jp="連絡先" />
        <Reveal>
          <div className="bg-pink-500 border-4 border-black p-10 text-black relative" style={halftone}>
            <div className="absolute -top-6 right-8 bg-black text-pink-500 font-black px-4 py-2 text-2xl rotate-3 select-none">ゴゴゴゴ</div>
            <h3 className="text-3xl sm:text-4xl font-black uppercase mb-3">Let's build the next arc together!</h3>
            <p className="font-bold mb-8">Open to AI engineering roles, collabs, and interesting problems.</p>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${DATA.email} `} className="btn-press bg-black text-white font-black uppercase px-6 py-3 border-4 border-black" style={{ boxShadow: "4px 4px 0 #fff" }}>
                ✉ Email
              </a>
              <a href={DATA.github} className="btn-press bg-black text-white font-black uppercase px-6 py-3 border-4 border-black" style={{ boxShadow: "4px 4px 0 #fff" }}>
                GitHub
              </a>
              <a href={DATA.linkedin} className="btn-press bg-black text-white font-black uppercase px-6 py-3 border-4 border-black" style={{ boxShadow: "4px 4px 0 #fff" }}>
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      {/* 6. marquee ticker (bottom) */}
      <Ticker />

      <footer className="border-t-4 border-pink-500 py-8 text-center font-bold text-zinc-500 text-sm">
        © 2026 {DATA.name} — {DATA.nameJp} • Drawn with code, not ink • つづく
      </footer>
    </div>
  );
}