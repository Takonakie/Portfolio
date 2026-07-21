import { useState, useEffect, useRef } from "react";
import type { ReactNode, CSSProperties } from "react";
import { usePortfolioData } from "./hooks/usePortfolioData";

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

interface Star {
  left: string;
  size: number;
  dur: number;
  delay: number;
}

interface AnimePortfolioProps {
  onTriggerLogin?: () => void;
}

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
  background: var(--c-primary, #ec4899); transform: rotate(-6deg); transition: width 0.18s ease-out;
  pointer-events: none;
}
.nav-strike:hover::after { width: 116%; }

/* 5. Glitch flicker on name */
@keyframes glitchFlicker {
  0%, 92%, 100% { transform: none; text-shadow: 6px 6px 0 var(--c-primary, #ec4899), 12px 12px 0 var(--c-border, #000); }
  93% { transform: translate(4px, -2px) skewX(-4deg); text-shadow: -4px 2px 0 var(--c-primary, #ec4899), 12px 12px 0 var(--c-border, #000); }
  95% { transform: translate(-4px, 2px); text-shadow: 4px -3px 0 var(--c-accent2, #22d3ee), 12px 12px 0 var(--c-border, #000); }
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
.star { position: absolute; color: var(--c-primary, #ec4899); animation: starDrift linear infinite; pointer-events: none; user-select: none; }

@media (prefers-reduced-motion: reduce) {
  .wipe-layer, .glitch-name, .marquee-track, .star, .card-pop:hover .sfx-badge { animation: none !important; }
  .reveal { opacity: 1; transform: none; }
}
`;

function useTyping(words: string[]): string {
  const [text, setText] = useState<string>("");
  const [wordIdx, setWordIdx] = useState<number>(0);
  const [deleting, setDeleting] = useState<boolean>(false);

  useEffect(() => {
    if (!words || words.length === 0) return;
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

function Reveal({ children, delay = 0, className = "" }: RevealProps) {
  const ref = useRef<HTMLDivElement | null>(null);
  const [vis, setVis] = useState<boolean>(false);
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
    <div ref={ref} className={`reveal ${vis ? "visible" : ""} ${className}`} style={{ transitionDelay: `${delay}ms` }}>
      {children}
    </div>
  );
}

function Ticker() {
  const { data } = usePortfolioData();
  const items = data.tickerItems || [];
  const row = items.join("    ");
  return (
    <div
      className="overflow-hidden uppercase text-sm py-2 border-y-4 border-black select-none font-black"
      style={{
        backgroundColor: "var(--c-primary, #ec4899)",
        color: "var(--c-primary-text, #000000)",
        borderColor: "var(--c-border, #000000)",
      }}
    >
      <div className="marquee-track">
        <span className="px-4">{row}&nbsp;&nbsp;&nbsp;&nbsp;</span>
        <span className="px-4">{row}&nbsp;&nbsp;&nbsp;&nbsp;</span>
      </div>
    </div>
  );
}

function Stars() {
  const stars: Star[] = [
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
        <span key={i} className="star" style={{ left: s.left, bottom: "-30px", fontSize: s.size, animationDuration: `${s.dur}s`, animationDelay: `${s.delay}s` }}>
          ✦
        </span>
      ))}
    </div>
  );
}

function SpeechBubble({ children, className = "" }: SpeechBubbleProps) {
  return (
    <div
      className={`relative border-4 border-black rounded-3xl px-6 py-4 font-bold shadow-lg ${className}`}
      style={{
        backgroundColor: "var(--c-card-bg, #ffffff)",
        color: "var(--c-card-text, #000000)",
        borderColor: "var(--c-border, #000000)",
      }}
    >
      {children}
      <div
        className="absolute -bottom-4 left-10 w-0 h-0 border-l-8 border-r-8 border-l-transparent border-r-transparent border-t-black"
        style={{ borderTopWidth: "16px", borderTopStyle: "solid", borderTopColor: "var(--c-border, #000000)" }}
      />
      <div
        className="absolute left-10 w-0 h-0 border-l-8 border-r-8 border-l-transparent border-r-transparent"
        style={{ bottom: "-11px", borderTopWidth: "13px", borderTopStyle: "solid", borderTopColor: "var(--c-card-bg, #ffffff)", marginLeft: "0px" }}
      />
    </div>
  );
}

function SectionTitle({ en, jp }: SectionTitleProps) {
  return (
    <Reveal>
      <div className="flex items-end gap-4 mb-10">
        <h2 className="text-4xl sm:text-5xl font-black uppercase tracking-tight" style={{ textShadow: "4px 4px 0 var(--c-primary, #ec4899)", color: "var(--c-text, #ffffff)" }}>
          {en}
        </h2>
        <span className="text-xl font-bold mb-1" style={{ color: "var(--c-primary, #ec4899)" }}>{jp}</span>
        <div className="flex-1 h-1 mb-3" style={{ backgroundColor: "var(--c-text, #ffffff)", clipPath: "polygon(0 0, 100% 0, 98% 100%, 0 100%)" }} />
      </div>
    </Reveal>
  );
}

const halftone: CSSProperties = {
  backgroundImage: "radial-gradient(circle, #1f1f1f 1px, transparent 1px)",
  backgroundSize: "8px 8px",
};
const halftonePink: CSSProperties = {
  backgroundImage: "radial-gradient(circle, rgba(236,72,153,0.35) 1.5px, transparent 1.5px)",
  backgroundSize: "10px 10px",
};

const NAV_SECTIONS: string[] = ["About", "Skills", "Projects", "Experience", "Contact"];

export default function AnimePortfolio({ onTriggerLogin }: AnimePortfolioProps) {
  const { data } = usePortfolioData();
  const typed = useTyping(data.typingWords);
  const [menuOpen, setMenuOpen] = useState<boolean>(false);

  const clickCountRef = useRef(0);
  const clickTimerRef = useRef<ReturnType<typeof setTimeout> | null>(null);

  const handleBadgeClick = () => {
    clickCountRef.current += 1;
    if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
    clickTimerRef.current = setTimeout(() => {
      clickCountRef.current = 0;
    }, 600);

    if (clickCountRef.current >= 3) {
      clickCountRef.current = 0;
      if (clickTimerRef.current) clearTimeout(clickTimerRef.current);
      if (onTriggerLogin) onTriggerLogin();
    }
  };

  const colors = data.theme?.colors || {
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
  };

  return (
    <div
      className="min-h-screen font-sans overflow-x-hidden transition-colors duration-300"
      style={
        {
          fontFamily: "'Segoe UI', system-ui, sans-serif",
          "--c-primary": colors.primary,
          "--c-primary-text": colors.primaryText,
          "--c-bg": colors.background,
          "--c-surface": colors.surface,
          "--c-text": colors.text,
          "--c-text-muted": colors.textMuted,
          "--c-border": colors.border,
          "--c-card-bg": colors.cardBg,
          "--c-card-text": colors.cardText,
          "--c-accent2": colors.accentSecondary,
          backgroundColor: colors.background,
          color: colors.text,
        } as CSSProperties
      }
    >
      <style>{ANIM_CSS}</style>

      {/* 1. slash-in page load */}
      <div className="wipe-layer bg-black" />
      <div className="wipe-layer wipe-pink" style={{ backgroundColor: "var(--c-primary, #ec4899)" }} />

      {/* speed lines background */}
      <div
        className="fixed inset-0 pointer-events-none opacity-10"
        style={{ backgroundImage: "repeating-linear-gradient(115deg, transparent 0px, transparent 40px, #fff 40px, #fff 41px)" }}
      />

      {/* NAV */}
      <nav className="sticky top-0 z-50 border-b-4" style={{ backgroundColor: "var(--c-surface, #18181b)", borderColor: "var(--c-primary, #ec4899)" }}>
        <div className="max-w-6xl mx-auto px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2 select-none cursor-pointer" onClick={handleBadgeClick}>
            <span
              className="font-black px-2 py-1 text-lg transition-transform hover:scale-105"
              style={{
                backgroundColor: "var(--c-primary, #ec4899)",
                color: "var(--c-primary-text, #000000)",
                clipPath: "polygon(0 0, 100% 0, 92% 100%, 0 100%)",
              }}
            >
              {data.profile.name}
            </span>
            <span className="font-bold" style={{ color: "var(--c-primary, #ec4899)" }}>{data.profile.nameJp}</span>
          </div>

          <div className="hidden sm:flex gap-6 font-bold uppercase text-sm">
            {NAV_SECTIONS.map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} className="nav-strike transition-colors" style={{ color: "var(--c-text, #ffffff)" }}>
                {s}
              </a>
            ))}
          </div>
          <button className="sm:hidden font-black text-2xl" style={{ color: "var(--c-primary, #ec4899)" }} onClick={() => setMenuOpen(!menuOpen)}>
            ☰
          </button>
        </div>
        {menuOpen && (
          <div className="sm:hidden flex flex-col gap-3 px-6 pb-4 font-bold uppercase text-sm" style={{ backgroundColor: "var(--c-surface, #18181b)" }}>
            {NAV_SECTIONS.map((s) => (
              <a key={s} href={`#${s.toLowerCase()}`} onClick={() => setMenuOpen(false)}>
                {s}
              </a>
            ))}
          </div>
        )}
      </nav>

      {/* HERO — manga cover page */}
      <header className="relative max-w-6xl mx-auto px-6 pt-16 pb-24">
        <Stars />
        <div className="absolute top-8 right-6 text-8xl sm:text-9xl font-black opacity-20 select-none" style={{ writingMode: "vertical-rl", color: "var(--c-primary, #ec4899)" }}>
          {data.profile.titleJp}
        </div>
        <p className="font-bold tracking-widest mb-2" style={{ color: "var(--c-primary, #ec4899)" }}>第一章 — CHAPTER 01</p>

        <h1 className="glitch-name text-6xl sm:text-8xl font-black uppercase leading-none mb-2">
          {data.profile.name}
        </h1>
        <p className="text-2xl sm:text-3xl font-black uppercase mb-8 tracking-wide" style={{ color: "var(--c-primary, #ec4899)" }}>{data.profile.title}</p>

        <SpeechBubble className="max-w-xl mb-10">
          <span className="text-zinc-500 text-sm block mb-1">I build...</span>
          <span className="text-2xl">{typed}</span>
          <span className="animate-pulse text-2xl" style={{ color: "var(--c-primary, #ec4899)" }}>▌</span>
        </SpeechBubble>

        <div className="flex flex-wrap gap-4 mt-4">
          <a
            href="#projects"
            className="btn-press font-black uppercase px-8 py-3 border-4 shadow-lg"
            style={{
              backgroundColor: "var(--c-primary, #ec4899)",
              color: "var(--c-primary-text, #000000)",
              borderColor: "var(--c-border, #000000)",
              clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)",
              boxShadow: "5px 5px 0 var(--c-border, #000000)",
            }}
          >
            Read the Manga →
          </a>
          <a
            href="#contact"
            className="btn-press font-black uppercase px-8 py-3 border-4"
            style={{
              backgroundColor: "var(--c-card-bg, #ffffff)",
              color: "var(--c-card-text, #000000)",
              borderColor: "var(--c-primary, #ec4899)",
              clipPath: "polygon(4% 0, 100% 0, 96% 100%, 0 100%)",
              boxShadow: "5px 5px 0 var(--c-primary, #ec4899)",
            }}
          >
            Contact
          </a>
        </div>

        {/* Avatar image container */}
        <div className="absolute bottom-0 right-0 hidden lg:flex items-end">
          {data.profile.photoUrl ? (
            <img
              src={data.profile.photoUrl}
              alt="Avatar"
              className="w-64 h-80 object-cover border-4 border-black shadow-2xl rounded-t-3xl"
              style={{ borderColor: "var(--c-primary, #ec4899)" }}
            />
          ) : (
            <div
              className="w-64 h-80 border-4 border-dashed rounded-t-full flex items-center justify-center text-center p-6 font-bold"
              style={{ ...halftonePink, borderColor: "var(--c-primary, #ec4899)", color: "var(--c-primary, #ec4899)" }}
            >
              YOUR ANIME
              <br />
              AVATAR HERE
              <br />
              (swap with art)
            </div>
          )}
        </div>
      </header>

      <Ticker />

      {/* ABOUT */}
      <section id="about" className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle en="About" jp="自己紹介" />
        <div className="grid md:grid-cols-3 gap-6">
          <Reveal className="md:col-span-2">
            <div
              className="card-pop border-4 p-8 relative h-full"
              style={{
                backgroundColor: "var(--c-card-bg, #ffffff)",
                color: "var(--c-card-text, #000000)",
                borderColor: "var(--c-border, #000000)",
                transform: "rotate(-1deg)",
              }}
            >
              <div className="absolute -top-5 -left-3 bg-black text-white font-black px-4 py-1 uppercase text-sm">Panel 01</div>
              <p className="text-lg font-semibold leading-relaxed">{data.profile.about}</p>
              <div className="absolute bottom-2 right-4 font-black text-3xl select-none" style={{ color: "var(--c-primary, #ec4899)" }}>ドキドキ</div>
            </div>
          </Reveal>
          <Reveal delay={120}>
            <div
              className="card-pop border-4 p-8 flex flex-col justify-center gap-3 font-black h-full"
              style={{
                backgroundColor: "var(--c-primary, #ec4899)",
                color: "var(--c-primary-text, #000000)",
                borderColor: "var(--c-border, #000000)",
                transform: "rotate(1deg)",
                ...halftone,
              }}
            >
              <div className="text-4xl">{data.profile.yearsExperience}</div>
              <div className="uppercase text-sm">Years in AI</div>
              <div className="text-4xl">{data.profile.projectsShipped}</div>
              <div className="uppercase text-sm">Projects Shipped</div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* SKILLS */}
      <section id="skills" className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle en="Skills" jp="スキル" />
        <div className="grid sm:grid-cols-3 gap-6">
          {data.skills.map((s, i) => (
            <Reveal key={s.group} delay={i * 120}>
              <div
                className="card-pop border-4 p-6 relative transition-colors h-full"
                style={{
                  backgroundColor: "var(--c-surface, #18181b)",
                  borderColor: "var(--c-text, #ffffff)",
                  transform: `rotate(${i % 2 === 0 ? -0.7 : 0.7}deg)`,
                }}
              >
                <div className="flex items-baseline justify-between mb-4">
                  <h3 className="font-black uppercase text-xl" style={{ color: "var(--c-primary, #ec4899)" }}>{s.group}</h3>
                  <span className="font-bold text-sm" style={{ color: "var(--c-text-muted, #a1a1aa)" }}>{s.jp}</span>
                </div>
                <div className="flex flex-wrap gap-2">
                  {s.items.map((it) => (
                    <span
                      key={it}
                      className="font-bold text-sm px-3 py-1 border-2 border-black"
                      style={{
                        backgroundColor: "var(--c-card-bg, #ffffff)",
                        color: "var(--c-card-text, #000000)",
                        borderColor: "var(--c-border, #000000)",
                        clipPath: "polygon(6% 0, 100% 0, 94% 100%, 0 100%)",
                      }}
                    >
                      {it}
                    </span>
                  ))}
                </div>
              </div>
            </Reveal>
          ))}
        </div>
      </section>

      {/* PROJECTS */}
      <section id="projects" className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle en="Projects" jp="作品集" />
        <div className="grid md:grid-cols-2 gap-8">
          {data.projects.map((p, i) => (
            <Reveal key={p.title} delay={(i % 2) * 130}>
              <a
                href={p.link}
                className="card-pop group relative border-4 p-6 block shadow-xl h-full"
                style={{
                  backgroundColor: "var(--c-card-bg, #ffffff)",
                  color: "var(--c-card-text, #000000)",
                  borderColor: "var(--c-border, #000000)",
                  transform: `rotate(${i % 2 === 0 ? -1 : 1}deg)`,
                }}
              >
                <div
                  className="sfx-badge absolute -top-4 -right-3 font-black px-3 py-1 border-2 border-black text-2xl rotate-6 select-none"
                  style={{
                    backgroundColor: "var(--c-primary, #ec4899)",
                    color: "var(--c-primary-text, #000000)",
                  }}
                >
                  {p.sfx}
                </div>
                <div className="text-xs font-black uppercase mb-1" style={{ color: "var(--c-text-muted, #a1a1aa)" }}>
                  {p.jp} — Episode {String(i + 1).padStart(2, "0")}
                </div>
                <h3 className="text-2xl font-black uppercase mb-3 transition-colors group-hover:opacity-80">{p.title}</h3>
                <p className="font-semibold text-sm leading-relaxed mb-4">{p.desc}</p>
                <div className="flex flex-wrap gap-2">
                  {p.tags.map((t) => (
                    <span key={t} className="bg-black text-white text-xs font-bold px-2 py-1 uppercase">
                      {t}
                    </span>
                  ))}
                </div>
                <div className="mt-4 font-black uppercase text-sm" style={{ color: "var(--c-primary, #ec4899)" }}>
                  To be continued... →
                </div>
              </a>
            </Reveal>
          ))}
        </div>
      </section>

      {/* EXPERIENCE */}
      <section id="experience" className="max-w-6xl mx-auto px-6 py-16">
        <SectionTitle en="Experience" jp="経歴" />
        <div className="relative pl-8 border-l-4 flex flex-col gap-10" style={{ borderColor: "var(--c-primary, #ec4899)" }}>
          {data.experience.map((e, i) => (
            <Reveal key={e.role} delay={i * 130}>
              <div className="relative">
                <div className="absolute -left-11 top-1 w-5 h-5 border-4 border-black rotate-45" style={{ backgroundColor: "var(--c-primary, #ec4899)" }} />
                <div className="card-pop border-4 p-6" style={{ backgroundColor: "var(--c-surface, #18181b)", borderColor: "var(--c-text, #ffffff)" }}>
                  <div className="flex flex-wrap items-baseline justify-between gap-2 mb-2">
                    <h3 className="font-black uppercase text-xl">
                      {e.role} <span style={{ color: "var(--c-primary, #ec4899)" }}>@ {e.company}</span>
                    </h3>
                    <span className="font-bold text-xs px-2 py-1 border border-black" style={{ backgroundColor: "var(--c-card-bg, #ffffff)", color: "var(--c-card-text, #000000)" }}>
                      {e.period}
                    </span>
                  </div>
                  <p className="font-semibold text-sm" style={{ color: "var(--c-text-muted, #a1a1aa)" }}>{e.desc}</p>
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
          <div className="border-4 p-10 relative" style={{ backgroundColor: "var(--c-primary, #ec4899)", color: "var(--c-primary-text, #000000)", borderColor: "var(--c-border, #000000)", ...halftone }}>
            <div className="absolute -top-6 right-8 bg-black text-pink-500 font-black px-4 py-2 text-2xl rotate-3 select-none">ゴゴゴゴ</div>
            <h3 className="text-3xl sm:text-4xl font-black uppercase mb-3">{data.contact.contactHeading}</h3>
            <p className="font-bold mb-8">{data.contact.contactSubtext}</p>
            <div className="flex flex-wrap gap-4">
              <a href={`mailto:${data.contact.email}`} className="btn-press bg-black text-white font-black uppercase px-6 py-3 border-4 border-black" style={{ boxShadow: "4px 4px 0 #fff" }}>
                ✉ Email
              </a>
              <a href={data.contact.github} className="btn-press bg-black text-white font-black uppercase px-6 py-3 border-4 border-black" style={{ boxShadow: "4px 4px 0 #fff" }}>
                GitHub
              </a>
              <a href={data.contact.linkedin} className="btn-press bg-black text-white font-black uppercase px-6 py-3 border-4 border-black" style={{ boxShadow: "4px 4px 0 #fff" }}>
                LinkedIn
              </a>
            </div>
          </div>
        </Reveal>
      </section>

      <Ticker />

      <footer className="border-t-4 py-8 text-center font-bold text-sm" style={{ borderColor: "var(--c-primary, #ec4899)", color: "var(--c-text-muted, #a1a1aa)" }}>
        © 2026 {data.profile.name} — {data.profile.nameJp} • Drawn with code, not ink • つづく
      </footer>
    </div>
  );
}
