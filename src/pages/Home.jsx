/**
 * ============================================================
 * Home.jsx — Portfolio Home Page
 * ============================================================
 *
 * Page Sections (in order):
 *   1. HeroSection       — Full-screen landing with heading & CTAs
 *   2. StatsSection      — 4 key metrics row
 *   3. ExperienceSection — Animated work timeline
 *   4. ProjectsSection   — Category preview cards
 *   5. SkillsSection     — Tech stack with progress bars
 *
 * ── How to update content ───────────────────────────────────
 *   Stats      → edit  STATS_DATA       array  (line ~55)
 *   Experience → edit  EXPERIENCE_DATA  array  (line ~75)
 *   Projects   → edit  PROJECT_CATS     array  (line ~125)
 *   Skills     → edit  SKILLS_DATA      array  (line ~135)
 * ────────────────────────────────────────────────────────────
 */

import { useState, useRef, useEffect } from "react";
import { useNavigate } from "react-router-dom";

// ── Lucide icons (no more inline SVGs) ───────────────────────
import {
  Download,
  ArrowRight,
  ExternalLink,
  ChevronDown,
  ChevronUp,
  MapPin,
  Calendar,
  LayoutGrid,    // Stats: Projects
  MessageSquare, // Stats: Responses
  Code2,         // Stats: CodeChef
  Briefcase,     // Stats: Years
  Layers,        // Projects: JS
  Atom,          // Projects: React
} from "lucide-react";

import {loadProjects} from "../utils/ProjectStore"


/* =============================================================
   SECTION DATA — edit these to update page content
============================================================= */

/** Key metrics shown below the hero */
const STATS_DATA = [
  { value: "30+",  label: "Projects",     Icon: LayoutGrid    },
  { value: "100+", label: "Responses",    Icon: MessageSquare },
  { value: "100+", label: "CodeChef Q's", Icon: Code2         },
  { value: "1.5+", label: "Years Exp.",   Icon: Briefcase     },
];

/**
 * Work experience timeline entries.
 *
 * Fields:
 *   role      — Job title
 *   company   — Company name
 *   type      — "Full-time" | "Internship"
 *   period    — Date range, e.g. "Nov 2025 — Present"
 *   duration  — e.g. "7 mos"
 *   location  — City / work mode
 *   desc      — Short description (1–2 sentences)
 *   current   — true = shows a pulsing "Current" badge
 *   color     — Accent colour for this entry
 *   initials  — 2-letter company badge
 */
const EXPERIENCE_DATA = [
  {
    role:     "Software Developer",
    company:  "Zolabs",
    type:     "Full-time",
    period:   "Feb 2026 — Present",
    duration: "4 mos",
    location: "Coimbatore, Tamil Nadu · On-site",
    desc:     "Contributing to product development and engineering initiatives, building scalable web solutions and collaborating with cross-functional teams.",
    current:  true,
    color:    "#ec4899",
    initials: "ZL",
  },
  {
    role:     "Software Engineer",
    company:  "EdZola Technologies",
    type:     "Full-time",
    period:   "Nov 2025 — Present",
    duration: "7 mos",
    location: "Coimbatore, Tamil Nadu · Hybrid",
    desc:     "Building full-stack web apps for non-profit organisations using React, Node.js and Zoho Creator — enabling digital transformation for 50+ NGO clients across India.",
    current:  true,
    color:    "#a855f7",
    initials: "EZ",
  },
  {
    role:     "Software Engineer Intern",
    company:  "EdZola Technologies",
    type:     "Internship",
    period:   "May 2025 — Oct 2025",
    duration: "6 mos",
    location: "Coimbatore, Tamil Nadu · Hybrid",
    desc:     "Worked on Zoho Creator app development, React frontends and process automation for NGO clients. Shipped multiple production features across the full delivery lifecycle.",
    current:  false,
    color:    "#6366f1",
    initials: "EZ",
  },
  {
    role:     "Software Developer",
    company:  "HyperVerge Academy",
    type:     "Internship",
    period:   "Jul 2024 — May 2025",
    duration: "11 mos",
    location: "Bengaluru, Karnataka · Remote",
    desc:     "Developed web projects during the HyperVerge Academy program, focusing on React, JavaScript, and full-stack application development.",
    current:  false,
    color:    "#3b82f6",
    initials: "HV",
  },
];

/** Project category cards on the home page */

/* =============================================================
   PROJECTS count 
============================================================= */

const allProjects = loadProjects(); 
const jsCount = allProjects.filter(p => p.tech === "JS").length;
const reactCount = allProjects.filter(p => p.tech === "React").length;

const PROJECT_CATS = [
  { label: "JS Projects",    count: jsCount, color: "#F7DF1E", Icon: Layers },
  { label: "React Projects", count: reactCount, color: "#61DAFB", Icon: Atom   },
];


/**
 * Tech skills with proficiency levels.
 *   n = name  |  p = percent (0–100)  |  c = brand colour
 */
const SKILLS_DATA = [
  { n: "HTML5 & CSS",        p: 92, c: "#E44D26" },
  { n: "JavaScript",   p: 85, c: "#F7DF1E" },
  { n: "React",        p: 82, c: "#61DAFB" },
  { n: "Tailwind CSS", p: 86, c: "#06B6D4" },
  { n: "Python",       p: 72, c: "#3776AB" },
  { n: "Node.js",      p: 68, c: "#339933" },
  { n: "Git",          p: 80, c: "#F05032" },
];

// Skills visible before "More" button
const SKILLS_VISIBLE = 6;


/* =============================================================
   SHARED COMPONENTS
   Small reusable pieces used across multiple sections
============================================================= */

/** Max-width wrapper with consistent horizontal padding */
function Container({ children, style }) {
  return (
    <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px", ...style }}>
      {children}
    </div>
  );
}

/** Section label  —— EYEBROW TEXT —— */
function Eyebrow({ text }) {
  const line = { height: 1, width: 24, background: "var(--vio)", opacity: 0.55, display: "block" };
  return (
    <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
      <span style={line} />
      <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--vio)" }}>
        {text}
      </span>
      <span style={line} />
    </div>
  );
}

/** Thin gradient line that visually separates sections */
function Divider() {
  return (
    <Container>
      <div style={{ height: 1, background: "linear-gradient(90deg, transparent, var(--line), transparent)" }} />
    </Container>
  );
}

/** Purple gradient button (primary CTA) */
function PrimaryButton({ children, onClick }) {
  return (
    <button
      onClick={onClick}
      style={{
        display: "inline-flex", alignItems: "center", gap: 10,
        padding: "14px 30px", borderRadius: 12,
        fontSize: 15, fontWeight: 700, color: "#fff", border: "none",
        background: "linear-gradient(135deg, var(--pur), var(--ind))",
        boxShadow: "var(--glow)",
        transition: "box-shadow .2s, transform .15s",
        whiteSpace: "nowrap", cursor: "pointer",
      }}
      onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--glowH)"; e.currentTarget.style.transform = "translateY(-2px)"; }}
      onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--glow)";  e.currentTarget.style.transform = "translateY(0)"; }}
    >
      {children}
    </button>
  );
}

/**
 * Ghost (outline) button.
 * Pass href + download to render as a file download link.
 */
function GhostButton({ children, href, onClick, style ,target}) {
  const baseStyle = {
    display: "inline-flex", alignItems: "center", gap: 10,
    padding: "13px 26px", borderRadius: 12,
    fontSize: 15, fontWeight: 500,
    border: "1px solid var(--line)",
    background: "var(--surface)", color: "var(--ink)",
    backdropFilter: "blur(8px)", cursor: "pointer",
    transition: "border-color .2s, transform .15s",
    whiteSpace: "nowrap",
    ...style,
  };
  const onEnter = e => { e.currentTarget.style.borderColor = "var(--lineH)"; e.currentTarget.style.transform = "translateY(-2px)"; };
  const onLeave = e => { e.currentTarget.style.borderColor = "var(--line)";  e.currentTarget.style.transform = "translateY(0)"; };

  if (href) {
    return <a href={href} target={target}download style={baseStyle} onMouseEnter={onEnter} onMouseLeave={onLeave}>{children}</a>;
  }
  return (
    <button style={baseStyle} onClick={onClick} onMouseEnter={onEnter} onMouseLeave={onLeave}>
      {children}
    </button>
  );
}


/* =============================================================
   SECTION 1 — HERO
============================================================= */
function HeroSection() {
  const navigate = useNavigate();

  return (
    <section style={{
      minHeight: "100vh",
      display: "flex", flexDirection: "column",
      alignItems: "center", justifyContent: "center",
      textAlign: "center",
      padding: "80px 24px 60px",
    }}>

      {/* Available badge */}
      <div className="a-up" style={{ animationDelay: "0s" }}>
        <div style={{
          display: "inline-flex", alignItems: "center", gap: 8,
          padding: "6px 18px", borderRadius: 100,
          fontSize: 11, fontWeight: 700, letterSpacing: "0.14em", textTransform: "uppercase",
          background: "rgba(124,58,237,0.12)", border: "1px solid rgba(168,85,247,0.32)",
          color: "var(--vio)", marginBottom: 32,
        }}>
          <span className="a-dot" style={{ width: 6, height: 6, borderRadius: "50%", background: "var(--vio)", boxShadow: "0 0 6px var(--vio)", display: "inline-block" }} />
          Open to Opportunities
        </div>
      </div>

      {/* Main heading */}
      <h1
        className="a-up"
        style={{ animationDelay: ".08s", fontSize: "clamp(44px, 8.5vw, 104px)", fontWeight: 800, lineHeight: 1.0, letterSpacing: "-0.04em", maxWidth: 1000, marginBottom: 24 }}
      >
        <span style={{ color: "var(--ink)" }}>I build products</span>
        <br />
        <span style={{ color: "var(--ink)" }}>people </span>
        <span className="gt">love to use</span>
      </h1>

      {/* Subtitle */}
      <p
        className="a-up"
        style={{ animationDelay: ".16s", fontSize: "clamp(15px, 1.8vw, 18px)", lineHeight: 1.7, color: "var(--ink2)", maxWidth: 520, marginBottom: 40 }}
      >
        Full-stack developer crafting high-performance web experiences with{" "}
        <strong style={{ color: "var(--ink)" }}>React</strong>,{" "}
        <strong style={{ color: "var(--ink)" }}>Node.js</strong> &amp;{" "}
        <strong style={{ color: "var(--ink)" }}>modern tooling</strong>.
        Based in India, working globally.
      </p>

      {/* CTA buttons */}
      <div className="a-up" style={{ animationDelay: ".23s", display: "flex", flexWrap: "wrap", gap: 14, justifyContent: "center", marginBottom: 36 }}>
        <PrimaryButton onClick={() => navigate("/project")}>
          View My Work <ArrowRight size={16} />
        </PrimaryButton>
        {/* Drop Mahavir_CV.pdf into /public/ to enable this download */}
        <GhostButton href="https://rxresu.me/mahavir777kumar/mahavir-kumar-mahato" target="_blank">
          <Download size={16} /> Download CV
        </GhostButton>
      </div>

      {/* Tech stack pills */}
      <div className="a-up" style={{ animationDelay: ".30s", display: "flex", flexWrap: "wrap", gap: 8, justifyContent: "center", marginBottom: 48 }}>
        {["React", "Tailwind CSS", "Node.js", "Python", "MongoDB"].map(tech => (
          <span
            key={tech}
            style={{ padding: "5px 14px", borderRadius: 100, fontSize: 12, fontWeight: 500, background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink2)" }}
          >
            {tech}
          </span>
        ))}
      </div>

      {/* Scroll hint */}
      <div className="a-up" style={{ animationDelay: ".37s", display: "flex", flexDirection: "column", alignItems: "center", gap: 6 }}>
        <span style={{ fontSize: 9, letterSpacing: "0.2em", textTransform: "uppercase", color: "var(--ink3)" }}>Scroll</span>
        <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
          <path d="M3 6L8 11L13 6" stroke="var(--ink3)" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" />
        </svg>
      </div>
    </section>
  );
}


/* =============================================================
   SECTION 2 — STATS
============================================================= */
function StatsSection() {
  return (
    <section style={{ padding: "80px 0" }}>
      <Container>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow text="About" />
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em" }}>
            Stages that <span className="gt">defined my journey</span>
          </h2>
        </div>

        {/* Grid — border trick: 1px gap filled with --line colour */}
        <div style={{
          display: "grid",
          gridTemplateColumns: "repeat(auto-fit, minmax(160px, 1fr))",
          border: "1px solid var(--line)", borderRadius: 20,
          overflow: "hidden", gap: 1, background: "var(--line)",
        }}>
          {STATS_DATA.map(({ value, label, Icon }) => (
            <div
              key={label}
              style={{ background: "var(--bg)", padding: "36px 20px", display: "flex", flexDirection: "column", alignItems: "center", gap: 12, textAlign: "center", transition: "background .2s" }}
              onMouseEnter={e => (e.currentTarget.style.background = "var(--surface)")}
              onMouseLeave={e => (e.currentTarget.style.background = "var(--bg)")}
            >
              <Icon size={24} style={{ color: "var(--vio)" }} />

              {/* Gradient number */}
              <div style={{ fontSize: "clamp(28px, 4vw, 40px)", fontWeight: 800, letterSpacing: "-0.03em", background: "linear-gradient(135deg, var(--vio), var(--blu))", WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent" }}>
                {value}
              </div>

              <div style={{ fontSize: 11, fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink2)" }}>
                {label}
              </div>
            </div>
          ))}
        </div>

      </Container>
    </section>
  );
}


/* =============================================================
   SECTION 3 — EXPERIENCE
============================================================= */

/**
 * AnimatedDesc
 * Slides open/closed smoothly by animating max-height.
 * Measures the real content height via a ref so it never clips.
 */
function AnimatedDesc({ isOpen, text }) {
  const innerRef     = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (innerRef.current) setHeight(innerRef.current.scrollHeight);
  }, [text]);

  return (
    <div style={{
      overflow: "hidden",
      maxHeight: isOpen ? height + 32 : 0, // +32 accounts for top padding
      opacity:   isOpen ? 1 : 0,
      transition: "max-height 0.38s cubic-bezier(0.4, 0, 0.2, 1), opacity 0.28s ease",
    }}>
      <div ref={innerRef} style={{ marginTop: 16, paddingTop: 16, borderTop: "1px solid var(--line)" }}>
        <p style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.85 }}>{text}</p>
      </div>
    </div>
  );
}

/**
 * ExperienceCard
 * Interactive timeline card with:
 *  • Scroll-reveal — fades in as you scroll (staggered by index)
 *  • Hover lift — card moves up + glows with the entry's colour
 *  • Accent bar — sweeps from left to right on hover
 *  • Badge tilt — company initials badge rotates slightly
 *  • Ripple — click creates a ripple wave from the cursor
 *  • Smooth expand — description slides down with CSS animation
 */
function ExperienceCard({ exp, index, expandedIndex, onToggle }) {
  const cardRef              = useRef(null);
  const [visible,  setVisible]  = useState(false);
  const [hovered,  setHovered]  = useState(false);
  const isOpen = expandedIndex === index;

  // ── Scroll-triggered reveal ──────────────────────────────
  useEffect(() => {
    const el = cardRef.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => { if (entry.isIntersecting) { setVisible(true); observer.disconnect(); } },
      { threshold: 0.12 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  // ── Click ripple effect ──────────────────────────────────
  const spawnRipple = (e) => {
    const card = cardRef.current;
    if (!card) return;
    const { top, left, width, height } = card.getBoundingClientRect();
    const size   = Math.max(width, height) * 2;
    const ripple = document.createElement("span");
    ripple.style.cssText = `
      position:absolute; border-radius:50%; pointer-events:none;
      width:${size}px; height:${size}px;
      top:${e.clientY - top   - size / 2}px;
      left:${e.clientX - left - size / 2}px;
      background:${exp.color}18;
      transform:scale(0);
      animation:ripple .55s ease-out forwards;
    `;
    card.appendChild(ripple);
    setTimeout(() => ripple.remove(), 600);
  };

  return (
    <div
      style={{
        position: "relative",
        paddingLeft: 56,
        paddingBottom: index < EXPERIENCE_DATA.length - 1 ? 28 : 0,
        // Each card fades in 120ms after the previous one
        opacity:   visible ? 1 : 0,
        transform: visible ? "translateY(0)" : "translateY(28px)",
        transition: `opacity 0.5s ease ${index * 0.12}s, transform 0.5s ease ${index * 0.12}s`,
      }}
    >

      {/* Timeline dot — scales + glows on card hover */}
      <div style={{
        position: "absolute", left: 10, top: 22,
        width: 20, height: 20, borderRadius: "50%",
        background: `${exp.color}22`, border: `2px solid ${exp.color}`,
        display: "flex", alignItems: "center", justifyContent: "center",
        zIndex: 1,
        transition: "transform .22s, box-shadow .22s",
        transform:  hovered ? "scale(1.25)" : "scale(1)",
        boxShadow:  hovered ? `0 0 12px ${exp.color}88` : "none",
      }}>
        {/* Inner dot — pulses continuously for current roles */}
        <div style={{
          width: 7, height: 7, borderRadius: "50%", background: exp.color,
          animation: exp.current ? "pulse 2s infinite" : "none",
        }} />
      </div>

      {/* Card */}
      <div
        ref={cardRef}
        onClick={spawnRipple}
        style={{
          borderRadius: 18, overflow: "hidden", position: "relative",
          background:    hovered ? "var(--surfaceH)" : "var(--surface)",
          border:        `1px solid ${hovered ? exp.color + "66" : "var(--line)"}`,
          backdropFilter: "blur(14px)",
          transition: "background .22s, border-color .22s, transform .22s, box-shadow .22s",
          transform:  hovered ? "translateY(-4px) translateX(3px)" : "translateY(0)",
          boxShadow:  hovered ? `0 16px 48px rgba(0,0,0,0.28), 0 0 0 1px ${exp.color}22` : "none",
          cursor: "default",
        }}
        onMouseEnter={() => setHovered(true)}
        onMouseLeave={() => setHovered(false)}
      >

        {/* Top accent bar — sweeps from 35% → 100% width on hover */}
        <div style={{
          height: 3,
          background: `linear-gradient(90deg, ${exp.color}, ${exp.color}44, transparent)`,
          transform:       `scaleX(${hovered ? 1 : 0.35})`,
          transformOrigin: "left",
          transition:      "transform .35s ease",
        }} />

        <div style={{ padding: "20px 22px" }}>
          <div style={{ display: "flex", alignItems: "flex-start", gap: 14 }}>

            {/* Company initials badge — tilts on hover */}
            <div style={{
              width: 44, height: 44, borderRadius: 12, flexShrink: 0,
              display: "flex", alignItems: "center", justifyContent: "center",
              fontSize: 12, fontWeight: 900, letterSpacing: "0.05em",
              background: `${exp.color}18`, border: `1px solid ${exp.color}40`, color: exp.color,
              transition: "transform .22s, box-shadow .22s",
              transform:  hovered ? "rotate(-4deg) scale(1.08)" : "rotate(0) scale(1)",
              boxShadow:  hovered ? `0 4px 14px ${exp.color}44` : "none",
            }}>
              {exp.initials}
            </div>

            {/* Role, badges, company, meta */}
            <div style={{ flex: 1, minWidth: 0 }}>

              {/* Role + status badges */}
              <div style={{ display: "flex", alignItems: "center", flexWrap: "wrap", gap: 8, marginBottom: 5 }}>
                <h3 style={{ fontSize: 16, fontWeight: 800, color: "var(--ink)", letterSpacing: "-0.01em" }}>
                  {exp.role}
                </h3>

                {/* Pulsing "Current" badge */}
                {exp.current && (
                  <span style={{
                    fontSize: 10, fontWeight: 700, padding: "2px 10px", borderRadius: 100,
                    background: "rgba(124,58,237,.15)", border: "1px solid rgba(168,85,247,.38)",
                    color: "var(--vio)", letterSpacing: "0.08em", textTransform: "uppercase",
                    display: "flex", alignItems: "center", gap: 5,
                  }}>
                    <span className="a-dot" style={{ width: 5, height: 5, borderRadius: "50%", background: "var(--vio)", boxShadow: "0 0 5px var(--vio)", display: "inline-block" }} />
                    Current
                  </span>
                )}

                {/* Employment type */}
                <span style={{
                  fontSize: 10, fontWeight: 600, padding: "2px 9px", borderRadius: 100,
                  background: `${exp.color}14`, border: `1px solid ${exp.color}30`,
                  color: exp.color, textTransform: "uppercase", letterSpacing: "0.06em",
                }}>
                  {exp.type}
                </span>
              </div>

              <p style={{ fontSize: 14, fontWeight: 700, color: exp.color, marginBottom: 10 }}>
                {exp.company}
              </p>

              {/* Period + location */}
              <div style={{ display: "flex", flexWrap: "wrap", gap: 16 }}>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--ink2)" }}>
                  <Calendar size={12} style={{ color: "var(--ink3)" }} />
                  {exp.period} · {exp.duration}
                </span>
                <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 12, color: "var(--ink2)" }}>
                  <MapPin size={12} style={{ color: "var(--ink3)" }} />
                  {exp.location}
                </span>
              </div>
            </div>

            {/* Expand / collapse button */}
            <button
              onClick={e => { e.stopPropagation(); onToggle(index); }}
              aria-label={isOpen ? "Collapse details" : "Expand details"}
              style={{
                background:   isOpen ? `${exp.color}18` : "none",
                border:       isOpen ? `1px solid ${exp.color}35` : "1px solid transparent",
                borderRadius: 8, cursor: "pointer", padding: "5px 7px",
                color:        isOpen ? exp.color : "var(--vio)",
                flexShrink: 0, marginTop: 2, transition: "all .22s",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = `${exp.color}22`; e.currentTarget.style.borderColor = `${exp.color}55`; e.currentTarget.style.color = exp.color; }}
              onMouseLeave={e => { e.currentTarget.style.background = isOpen ? `${exp.color}18` : "none"; e.currentTarget.style.borderColor = isOpen ? `${exp.color}35` : "transparent"; e.currentTarget.style.color = isOpen ? exp.color : "var(--vio)"; }}
            >
              {/* Single icon that rotates — no icon swap needed */}
              <ChevronDown size={18} style={{ transition: "transform .32s cubic-bezier(0.4, 0, 0.2, 1)", transform: isOpen ? "rotate(180deg)" : "rotate(0deg)", display: "block" }} />
            </button>
          </div>

          {/* Smooth animated description */}
          <AnimatedDesc isOpen={isOpen} text={exp.desc} />
        </div>
      </div>
    </div>
  );
}

function ExperienceSection() {
  const [expandedIndex, setExpandedIndex] = useState(null);
  const toggle = (i) => setExpandedIndex(prev => prev === i ? null : i);

  return (
    <section style={{ padding: "80px 0" }}>
      <Container>

        <div style={{ textAlign: "center", marginBottom: 56 }}>
          <Eyebrow text="Career" />
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Work <span className="gt">Experience</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink2)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Building impactful tech solutions across startups and social-impact organisations.
          </p>
        </div>

        <div style={{ position: "relative", maxWidth: 780, margin: "0 auto" }}>
          {/* Vertical connector line */}
          <div style={{
            position: "absolute", left: 19, top: 20, bottom: 20, width: 2,
            background: "linear-gradient(to bottom, var(--vio), var(--blu), rgba(59,130,246,0))",
            opacity: 0.22, borderRadius: 2,
          }} />

          <div style={{ display: "flex", flexDirection: "column" }}>
            {EXPERIENCE_DATA.map((exp, i) => (
              <ExperienceCard
                key={i}
                exp={exp}
                index={i}
                expandedIndex={expandedIndex}
                onToggle={toggle}
              />
            ))}
          </div>
        </div>

      </Container>

      {/* Ripple keyframe — injected once for all cards in this section */}
      <style>{`@keyframes ripple { to { transform: scale(1); opacity: 0; } }`}</style>
    </section>
  );
}


/* =============================================================
   SECTION 4 — PROJECTS PREVIEW
============================================================= */
function ProjectsSection() {
  const navigate = useNavigate();

  return (
    <section style={{ padding: "80px 0" }}>
      <Container>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow text="Portfolio" />
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 14 }}>
            My <span className="gt">Projects</span>
          </h2>
          <p style={{ fontSize: 15, color: "var(--ink2)", maxWidth: 500, margin: "0 auto", lineHeight: 1.7 }}>
            Passionate about transforming innovative ideas into successful, impactful solutions.
          </p>
        </div>

        {/* Category cards */}
        <div style={{ display: "flex", flexWrap: "wrap", gap: 20, justifyContent: "center", marginBottom: 40 }}>
          {PROJECT_CATS.map(({ label, count, color, Icon }) => (
            <button
              key={label}
              onClick={() => navigate("/project")}
              style={{
                display: "flex", flexDirection: "column", alignItems: "center", gap: 14,
                padding: "28px 24px", width: 180, borderRadius: 20,
                background: "var(--surface)", border: "1px solid var(--line)",
                backdropFilter: "blur(12px)", transition: "all .22s",
                cursor: "pointer", fontFamily: "inherit",
              }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--surfaceH)"; e.currentTarget.style.borderColor = `${color}88`; e.currentTarget.style.transform = "translateY(-6px)"; e.currentTarget.style.boxShadow = "0 20px 48px rgba(0,0,0,.22)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
            >
              {/* Icon in a coloured circle */}
              <div style={{
                width: 52, height: 52, borderRadius: "50%",
                background: `${color}18`, border: `2px solid ${color}44`,
                display: "flex", alignItems: "center", justifyContent: "center",
              }}>
                <Icon size={24} style={{ color }} />
              </div>

              <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", textAlign: "center" }}>{label}</span>

              <span style={{ fontSize: 11, padding: "3px 12px", borderRadius: 100, background: "rgba(168,85,247,.1)", border: "1px solid rgba(168,85,247,.22)", color: "var(--vio)", fontWeight: 600 }}>
                {count} projects
              </span>
            </button>
          ))}
        </div>

        <div style={{ display: "flex", justifyContent: "center" }}>
          <PrimaryButton onClick={() => navigate("/project")}>
            View All Projects <ArrowRight size={15} />
          </PrimaryButton>
        </div>

      </Container>
    </section>
  );
}


/* =============================================================
   SECTION 5 — SKILLS
============================================================= */
function SkillsSection() {
  const [showAll, setShowAll] = useState(false);
  const visibleSkills = showAll ? SKILLS_DATA : SKILLS_DATA.slice(0, SKILLS_VISIBLE);

  return (
    <section style={{ padding: "80px 0" }}>
      <Container>

        <div style={{ textAlign: "center", marginBottom: 48 }}>
          <Eyebrow text="Proficiencies" />
          <h2 style={{ fontSize: "clamp(26px, 4vw, 42px)", fontWeight: 800, letterSpacing: "-0.03em", marginBottom: 12 }}>
            Tech <span className="gt">Stack</span>
          </h2>
          <p style={{ fontSize: 14, color: "var(--ink2)", maxWidth: 520, margin: "0 auto", fontStyle: "italic" }}>
            "Proficient in React, Tailwind CSS, Python, and MongoDB for building dynamic, scalable web applications."
          </p>
        </div>

        {/* Skills grid */}
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(280px, 1fr))", gap: 16 }}>
          {visibleSkills.map(({ n, p, c }) => (
            <div
              key={n}
              style={{ padding: "20px 22px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line)", backdropFilter: "blur(12px)", transition: "all .22s" }}
              onMouseEnter={e => { e.currentTarget.style.background = "var(--surfaceH)"; e.currentTarget.style.borderColor = `${c}55`; e.currentTarget.style.transform = "translateY(-3px)"; }}
              onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              {/* Name row */}
              <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
                <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
                  {/* Brand colour dot */}
                  <span style={{ width: 10, height: 10, borderRadius: "50%", background: c, boxShadow: `0 0 8px ${c}80`, flexShrink: 0, display: "inline-block" }} />
                  <span style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)" }}>{n}</span>
                </div>
                <span style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)" }}>{p}%</span>
              </div>

              {/* Animated progress bar */}
              <div style={{ height: 6, borderRadius: 6, background: "rgba(255,255,255,.08)", overflow: "hidden" }}>
                <div
                  className="a-bar"
                  style={{ height: "100%", width: `${p}%`, borderRadius: 6, background: `linear-gradient(90deg, ${c}, var(--vio))` }}
                />
              </div>

              {/* Docs link */}
              <a
                href="#"
                style={{ display: "inline-flex", alignItems: "center", gap: 4, fontSize: 11, fontWeight: 600, color: "var(--vio)", marginTop: 10, transition: "color .15s" }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--blu)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--vio)")}
              >
                More Details <ExternalLink size={10} />
              </a>
            </div>
          ))}
        </div>

        {/* Show more / less */}
        {SKILLS_DATA.length > SKILLS_VISIBLE && (
          <div style={{ display: "flex", justifyContent: "center", marginTop: 28 }}>
            <GhostButton onClick={() => setShowAll(v => !v)} style={{ fontSize: 13, padding: "10px 22px" }}>
              {showAll
                ? <><ChevronUp   size={14} /> Show Less</>
                : <><ChevronDown size={14} /> More</>
              }
            </GhostButton>
          </div>
        )}

      </Container>
    </section>
  );
}


/* =============================================================
   PAGE EXPORT
   ── Remove a section: delete its JSX line + the <Divider /> above
   ── Reorder sections: move the JSX blocks
============================================================= */
export default function Home() {
  return (
    <>
      <HeroSection />
      <Divider />
      <StatsSection />
      <Divider />
      <ExperienceSection />
      <Divider />
      <ProjectsSection />
      <Divider />
      <SkillsSection />
    </>
  );
}
