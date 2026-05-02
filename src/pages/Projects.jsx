/**
 * ============================================================
 * Projects.jsx  —  Bento Grid Projects Page (Mobile Responsive)
 * ============================================================
 */

import { useState, useEffect, useRef } from "react";
import {
  ExternalLink, Code2,
  Star, StarOff,
  Plus, Pencil, Trash2,
  X, Save, ShieldCheck,
  Braces, Atom, Terminal, Server, Layers,
  ChevronDown,
  User,
  Edit,
  Recycle,
} from "lucide-react";

import { useAdmin }   from "../context/AdminContext";
import {
  loadProjects,
  addProject,
  editProject,
  deleteProject,
} from "../utils/ProjectStore";


/* =============================================================
   TECH CONFIG
============================================================= */
const TECH_CONFIG = {
  JS:    { Icon: Braces,   color: "#ca8a04", bg: "rgba(202,138,4,0.10)"   },
  React: { Icon: Atom,     color: "#06b6d4", bg: "rgba(6,182,212,0.10)"   },
  Py:    { Icon: Terminal, color: "#3776AB", bg: "rgba(55,118,171,0.10)"  },
  Node:  { Icon: Server,   color: "#22c55e", bg: "rgba(34,197,94,0.10)"   },
  FS:    { Icon: Layers,   color: "#a855f7", bg: "rgba(168,85,247,0.10)"  },
};
const FALLBACK_TECH = { Icon: Braces, color: "#888", bg: "rgba(128,128,128,0.08)" };

function getTechConfig(techValue) {
  return TECH_CONFIG[techValue] || FALLBACK_TECH;
}

const TECH_OPTIONS = [
  { label: "JavaScript", value: "JS",    color: "#F7DF1E" },
  { label: "React",      value: "React", color: "#61DAFB" },
  { label: "Python",     value: "Py",    color: "#3776AB" },
  { label: "Node.js",    value: "Node",  color: "#339933" },
  { label: "Full Stack", value: "FS",    color: "#a855f7" },
];


function TechIconBadge({ techValue, size = 44 }) {
  const { Icon, color, bg } = getTechConfig(techValue);
  const iconSize = Math.round(size * 0.46);
  return (
    <div style={{
      width: size, height: size, borderRadius: Math.round(size / 3.5),
      display: "flex", alignItems: "center", justifyContent: "center",
      background: bg, border: `1.5px solid ${color}40`, flexShrink: 0,
    }}>
      <Icon size={iconSize} style={{ color }} />
    </div>
  );
}


function AnimatedDesc({ isOpen, text }) {
  const innerRef          = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (innerRef.current) setHeight(innerRef.current.scrollHeight);
  }, [text]);

  return (
    <div style={{
      overflow: "hidden",
      maxHeight: isOpen ? height + 20 : 0,
      opacity:   isOpen ? 1 : 0,
      transition: "max-height 0.36s cubic-bezier(0.4,0,0.2,1), opacity 0.25s ease",
    }}>
      <div ref={innerRef} style={{ paddingTop: 8 }}>
        <p style={{ fontSize: 12, color: "var(--ink2)", lineHeight: 1.7, margin: 0 }}>
          {text}
        </p>
      </div>
    </div>
  );
}


function FeaturedCard({ project, onSetFeatured, onEdit, onDelete }) {
  const { isAdmin }         = useAdmin();
  const { color, bg }       = getTechConfig(project.tech);

  return (
    <div style={{
      borderRadius: 20, overflow: "hidden",
      background: "var(--surface)",
      border: `1.5px solid ${color}50`,
      backdropFilter: "blur(14px)",
      display: "flex", flexDirection: "column",
      height: "100%",
      transition: "box-shadow .25s",
    }}
      onMouseEnter={e => (e.currentTarget.style.boxShadow = `0 20px 60px rgba(0,0,0,0.25), 0 0 0 1px ${color}30`)}
      onMouseLeave={e => (e.currentTarget.style.boxShadow = "none")}
    >
      <div style={{ height: 3, background: `linear-gradient(90deg, ${color}, ${color}55, transparent)` }} />

      <div style={{
        height: 190, background: bg,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 10,
        position: "relative", flexShrink: 0,
      }}>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <TechIconBadge techValue={project.tech} size={60} />
            <span style={{ fontSize: 11, color: "var(--ink3)" }}>Preview coming soon</span>
          </>
        )}

        <div style={{
          position: "absolute", top: 10, left: 10,
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 10, fontWeight: 700, padding: "3px 10px", borderRadius: 100,
          background: "rgba(234,179,8,0.20)", border: "1px solid rgba(234,179,8,0.45)",
          color: "#ca8a04",
        }}>
          <Star size={10} style={{ fill: "#ca8a04" }} /> Featured
        </div>

        <span style={{
          position: "absolute", top: 10, right: 10,
          fontSize: 10, fontWeight: 600, padding: "2px 8px", borderRadius: 100,
          background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.8)",
          backdropFilter: "blur(6px)",
        }}>
          {project.year}
        </span>
      </div>

      <div style={{ padding: "16px 20px", flex: 1, display: "flex", flexDirection: "column", gap: 10 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
          {project.tags.map(tag => (
            <span key={tag} style={{
              fontSize: 9, padding: "2px 9px", borderRadius: 100,
              background: "rgba(168,85,247,0.10)", border: "1px solid rgba(168,85,247,0.22)",
              color: "var(--vio)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.06em",
            }}>
              {tag}
            </span>
          ))}
        </div>

        <h3 style={{ fontSize: 20, fontWeight: 800, color: "var(--ink)", lineHeight: 1.15, letterSpacing: "-0.02em" }}>
          {project.name}
        </h3>

        <p style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.75, flex: 1 }}>
          {project.description}
        </p>
      </div>

      <div style={{ padding: "0 20px 16px", display: "flex", gap: 8 }}>
        <a
          href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "11px", borderRadius: 11, fontSize: 13, fontWeight: 700, color: "#fff", textDecoration: "none", background: "linear-gradient(135deg,var(--pur),var(--ind))", boxShadow: "var(--glow)", transition: "box-shadow .2s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glowH)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--glow)")}
        >
          <ExternalLink size={14} /> Live
        </a>
        <a
          href={project.codeUrl} target="_blank" rel="noopener noreferrer"
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "11px", borderRadius: 11, fontSize: 13, fontWeight: 700, color: "#60a5fa", textDecoration: "none", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.28)", transition: "background .18s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.22)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.12)")}
        >
          <Code2 size={14} /> Code
        </a>

        <IconBtn
          icon={<StarOff size={14} />}
          title="Remove featured"
          onClick={() => onSetFeatured(project.id, false)}
          goldActive
        />

        {isAdmin && (
          <>
            <IconBtn icon={<Pencil size={13} />} title="Edit"   onClick={() => onEdit(project)} />
            <IconBtn icon={<Trash2  size={13} />} title="Delete" danger
              onClick={() => { if (window.confirm(`Delete "${project.name}"?`)) onDelete(project.id); }}
            />
          </>
        )}
      </div>
    </div>
  );
}


function RegularCard({ project, expandedId, onExpand, onSetFeatured, onEdit, onDelete }) {
  const { isAdmin }   = useAdmin();
  const { color, bg } = getTechConfig(project.tech);
  const isExpanded    = expandedId === project.id;

  return (
    <div style={{
      borderRadius: 16, overflow: "hidden",
      background: "var(--surface)", border: "1px solid var(--line)",
      backdropFilter: "blur(14px)",
      display: "flex", flexDirection: "column",
      transition: "border-color .22s, transform .22s, box-shadow .22s",
    }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${color}55`; e.currentTarget.style.transform = "translateY(-4px)"; e.currentTarget.style.boxShadow = "0 14px 40px rgba(0,0,0,0.20)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.transform = "translateY(0)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      <div style={{ height: 2, background: `linear-gradient(90deg,${color},transparent)`, width: "35%", transition: "width .3s" }} />

      <div style={{
        height: 110, background: bg,
        display: "flex", flexDirection: "column",
        alignItems: "center", justifyContent: "center", gap: 6,
        position: "relative", flexShrink: 0,
      }}>
        {project.thumbnail ? (
          <img src={project.thumbnail} alt={project.name} style={{ width: "100%", height: "100%", objectFit: "cover" }} />
        ) : (
          <>
            <TechIconBadge techValue={project.tech} size={38} />
            <span style={{ fontSize: 9, color: "var(--ink3)" }}>Preview coming soon</span>
          </>
        )}
        <span style={{ position: "absolute", top: 6, right: 6, fontSize: 9, fontWeight: 600, padding: "1px 7px", borderRadius: 100, background: "rgba(0,0,0,0.45)", color: "rgba(255,255,255,0.75)" }}>
          {project.year}
        </span>
      </div>

      <div style={{ padding: "12px 14px", display: "flex", flexDirection: "column", gap: 8 }}>
        <div style={{ display: "flex", flexWrap: "wrap", gap: 4 }}>
          {project.tags.slice(0, 3).map(tag => (
            <span key={tag} style={{
              fontSize: 8, padding: "2px 7px", borderRadius: 100,
              background: "rgba(168,85,247,0.10)", border: "1px solid rgba(168,85,247,0.20)",
              color: "var(--vio)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em",
            }}>
              {tag}
            </span>
          ))}
        </div>

        <h3 style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)", lineHeight: 1.3 }}>
          {project.name}
        </h3>

        <button
          onClick={() => onExpand(isExpanded ? null : project.id)}
          style={{ display: "flex", alignItems: "center", gap: 4, background: "none", border: "none", cursor: "pointer", fontSize: 11, fontWeight: 600, color: "var(--vio)", padding: 0, fontFamily: "inherit", width: "fit-content" }}
          onMouseEnter={e => (e.currentTarget.style.color = "var(--blu)")}
          onMouseLeave={e => (e.currentTarget.style.color = "var(--vio)")}
        >
          <ChevronDown size={12} style={{ transition: "transform .28s cubic-bezier(0.4,0,0.2,1)", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }} />
          {isExpanded ? "Hide" : "Details"}
        </button>

        <AnimatedDesc isOpen={isExpanded} text={project.description} />
      </div>

      <div style={{ padding: "0 14px 12px", display: "flex", gap: 5, marginTop: "auto" }}>
        <a
          href={project.liveUrl} target="_blank" rel="noopener noreferrer"
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px", borderRadius: 9, fontSize: 11, fontWeight: 700, color: "#fff", textDecoration: "none", background: "linear-gradient(135deg,var(--pur),var(--ind))", boxShadow: "var(--glow)", transition: "box-shadow .18s" }}
          onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glowH)")}
          onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--glow)")}
        >
          <ExternalLink size={11} /> Live
        </a>
        <a
          href={project.codeUrl} target="_blank" rel="noopener noreferrer"
          style={{ flex: 1, display: "flex", alignItems: "center", justifyContent: "center", gap: 5, padding: "8px", borderRadius: 9, fontSize: 11, fontWeight: 700, color: "#60a5fa", textDecoration: "none", background: "rgba(59,130,246,0.12)", border: "1px solid rgba(59,130,246,0.28)", transition: "background .18s" }}
          onMouseEnter={e => (e.currentTarget.style.background = "rgba(59,130,246,0.22)")}
          onMouseLeave={e => (e.currentTarget.style.background = "rgba(59,130,246,0.12)")}
        >
          <Code2 size={11} /> Code
        </a>

        <IconBtn
          icon={<Star size={13} />}
          title="Set as featured"
          onClick={() => onSetFeatured(project.id, true)}
          size={32}
          goldHover
        />

        {isAdmin && (
          <>
            <IconBtn icon={<Pencil size={12} />} title="Edit"   size={32} onClick={() => onEdit(project)} />
            <IconBtn icon={<Trash2  size={12} />} title="Delete" size={32} danger
              onClick={() => { if (window.confirm(`Delete "${project.name}"?`)) onDelete(project.id); }}
            />
          </>
        )}
      </div>
    </div>
  );
}


function IconBtn({ icon, title, onClick, size = 34, danger = false, goldActive = false, goldHover = false }) {
  const base = {
    display: "flex", alignItems: "center", justifyContent: "center",
    width: size, height: size, borderRadius: 9, flexShrink: 0,
    background: goldActive ? "rgba(234,179,8,0.18)" : "var(--surface)",
    border: goldActive ? "1px solid rgba(234,179,8,0.45)" : "1px solid var(--line)",
    color: goldActive ? "#ca8a04" : "var(--ink3)",
    cursor: "pointer", transition: "all .18s",
  };
  return (
    <button
      style={base} onClick={onClick} title={title} aria-label={title}
      onMouseEnter={e => {
        const s = e.currentTarget.style;
        if (danger)     { s.background = "rgba(239,68,68,0.10)"; s.borderColor = "rgba(239,68,68,0.35)"; s.color = "#ef4444"; }
        else if (goldHover || goldActive) { s.background = "rgba(234,179,8,0.22)"; s.borderColor = "rgba(234,179,8,0.5)"; s.color = "#ca8a04"; }
        else            { s.background = "rgba(168,85,247,0.10)"; s.borderColor = "var(--lineH)"; s.color = "var(--vio)"; }
      }}
      onMouseLeave={e => {
        const s = e.currentTarget.style;
        s.background  = goldActive ? "rgba(234,179,8,0.18)" : "var(--surface)";
        s.borderColor = goldActive ? "rgba(234,179,8,0.45)" : "var(--line)";
        s.color       = goldActive ? "#ca8a04" : "var(--ink3)";
      }}
    >
      {icon}
    </button>
  );
}


function ProjectFormPanel({ isOpen, onClose, onSave, initialData }) {
  const isEditing = Boolean(initialData);

  const [form, setForm] = useState(
    initialData ? { ...initialData, tags: initialData.tags.join(", ") } : emptyForm()
  );

  useEffect(() => {
    if (isOpen) {
      setForm(initialData ? { ...initialData, tags: initialData.tags.join(", ") } : emptyForm());
    }
  }, [isOpen, initialData]);

  function emptyForm() {
    return { name: "", tech: "JS", techColor: "#F7DF1E", tags: "", description: "", liveUrl: "", codeUrl: "", thumbnail: null };
  }

  function handleTechChange(value) {
    const opt = TECH_OPTIONS.find(o => o.value === value);
    setForm(p => ({ ...p, tech: value, techColor: opt?.color || "#888" }));
  }

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.name.trim()) return;
    onSave({ ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) });
    onClose();
  }

  const inp = { width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--line)", outline: "none", transition: "border-color .2s" };
  const focus = e => (e.target.style.borderColor = "var(--vio)");
  const blur  = e => (e.target.style.borderColor = "var(--line)");

  function Field({ label, children }) {
    return (
      <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
        <label style={{ fontSize: 11, fontWeight: 600, color: "var(--ink2)", textTransform: "uppercase", letterSpacing: "0.08em" }}>
          {label}
        </label>
        {children}
      </div>
    );
  }

  return (
    <>
      {isOpen && <div onClick={onClose} style={{ position: "fixed", inset: 0, zIndex: 200, background: "rgba(0,0,0,0.5)", backdropFilter: "blur(4px)" }} />}

      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201, width: "min(480px,100vw)", background: "var(--bg2)", borderLeft: "1px solid var(--line)", transform: isOpen ? "translateX(0)" : "translateX(100%)", transition: "transform .35s cubic-bezier(0.4,0,0.2,1)", overflowY: "auto", display: "flex", flexDirection: "column" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--line)", position: "sticky", top: 0, background: "var(--bg2)", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldCheck size={18} style={{ color: "var(--vio)" }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
              {isEditing ? "Edit Project" : "Add New Project"}
            </span>
          </div>
          <button onClick={onClose} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--ink2)", display: "flex" }}>
            <X size={18} />
          </button>
        </div>

        <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>
          <Field label="Project name *">
            <input required type="text" placeholder="My Awesome Project" value={form.name} onChange={e => setForm(p => ({ ...p, name: e.target.value }))} style={inp} onFocus={focus} onBlur={blur} />
          </Field>
          <Field label="Tech category">
            <select value={form.tech} onChange={e => handleTechChange(e.target.value)} style={{ ...inp, cursor: "pointer" }} onFocus={focus} onBlur={blur}>
              {TECH_OPTIONS.map(o => <option key={o.value} value={o.value}>{o.label}</option>)}
            </select>
          </Field>
          <Field label="Tags (comma separated)">
            <input type="text" placeholder="React, useState, CRUD" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} style={inp} onFocus={focus} onBlur={blur} />
          </Field>
          <Field label="Description">
            <textarea rows={3} placeholder="What does this project do?" value={form.description} onChange={e => setForm(p => ({ ...p, description: e.target.value }))} style={{ ...inp, resize: "vertical" }} onFocus={focus} onBlur={blur} />
          </Field>
          <Field label="Live URL">
            <input type="url" placeholder="https://your-project.vercel.app" value={form.liveUrl} onChange={e => setForm(p => ({ ...p, liveUrl: e.target.value }))} style={inp} onFocus={focus} onBlur={blur} />
          </Field>
          <Field label="GitHub / Code URL">
            <input type="url" placeholder="https://github.com/Mahavir745/..." value={form.codeUrl} onChange={e => setForm(p => ({ ...p, codeUrl: e.target.value }))} style={inp} onFocus={focus} onBlur={blur} />
          </Field>

          <button
            type="submit"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 12, borderRadius: 10, marginTop: "auto", fontSize: 14, fontWeight: 700, color: "#fff", border: "none", background: "linear-gradient(135deg,var(--pur),var(--ind))", boxShadow: "var(--glow)", cursor: "pointer", fontFamily: "inherit", transition: "box-shadow .2s" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glowH)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--glow)")}
          >
            <Save size={16} />
            {isEditing ? "Save Changes" : "Add Project"}
          </button>
        </form>
      </div>
    </>
  );
}


/* =============================================================
   BENTO GRID LAYOUT (Responsive)
============================================================= */
function BentoGrid({ projects, expandedId, onExpand, onSetFeatured, onEdit, onDelete }) {
  // Mobile check logic
  const [isMobile, setIsMobile] = useState(window.innerWidth < 768);

  useEffect(() => {
    const handleResize = () => setIsMobile(window.innerWidth < 768);
    window.addEventListener("resize", handleResize);
    return () => window.removeEventListener("resize", handleResize);
  }, []);

  const featuredProject = projects.find(p => p.featured);
  const otherProjects   = projects.filter(p => p.id !== featuredProject?.id);

  if (projects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ink3)" }}>
        <Star size={40} style={{ margin: "0 auto 14px", display: "block", opacity: 0.3 }} />
        <p style={{ fontSize: 14 }}>No projects found for this filter.</p>
        <p style={{ fontSize: 12, marginTop: 6 }}>Click ⭐ on any project to feature it here.</p>
      </div>
    );
  }

  // Mobile layout styles
  const containerStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "1fr 2fr",
    gap: 16,
    alignItems: "start"
  };

  const gridStyle = {
    display: "grid",
    gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill, minmax(220px, 1fr))",
    gap: 12
  };

  if (!featuredProject) {
    return (
      <div style={{ ...gridStyle, gridTemplateColumns: isMobile ? "1fr" : "repeat(auto-fill,minmax(240px,1fr))" }}>
        {otherProjects.map(p => (
          <RegularCard
            key={p.id} project={p}
            expandedId={expandedId} onExpand={onExpand}
            onSetFeatured={onSetFeatured} onEdit={onEdit} onDelete={onDelete}
          />
        ))}
      </div>
    );
  }

  return (
    <div style={containerStyle}>
      <FeaturedCard
        project={featuredProject}
        onSetFeatured={onSetFeatured}
        onEdit={onEdit}
        onDelete={onDelete}
      />

      <div style={gridStyle}>
        {otherProjects.map(p => (
          <RegularCard
            key={p.id} project={p}
            expandedId={expandedId} onExpand={onExpand}
            onSetFeatured={onSetFeatured} onEdit={onEdit} onDelete={onDelete}
          />
        ))}
      </div>
    </div>
  );
}


/* =============================================================
   PROJECTS PAGE
============================================================= */
export default function Projects() {
  const { isAdmin } = useAdmin();

  const [projects,       setProjects]       = useState(() => loadProjects());
  const [activeFilter,   setActiveFilter]   = useState("All");
  const [expandedId,     setExpandedId]     = useState(null);
  const [panelOpen,      setPanelOpen]      = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  const filterTabs = ["All", ...new Set(projects.map(p => p.tech))];

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(p => p.tech === activeFilter);

  function handleSetFeatured(id, shouldFeature) {
    const updated = projects.map(p => ({
      ...p,
      featured: shouldFeature ? p.id === id : (p.id === id ? false : p.featured),
    }));
    localStorage.setItem("mkm_projects", JSON.stringify(updated));
    setProjects([...updated]);
  }

  function handleSave(formData) {
    let updated;
    if (editingProject) {
      updated = editProject(editingProject.id, formData);
    } else {
      updated = addProject(formData);
    }
    setProjects(updated);
  }

  function handleDelete(id) {
    const updated = deleteProject(id);
    setProjects(updated);
    if (editingProject?.id === id) setPanelOpen(false);
  }

  return (
    <div style={{ paddingTop: 64 }}>

      <div style={{ padding: "72px 24px 48px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ height: 1, width: 24, background: "var(--vio)", opacity: 0.55, display: "block" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--vio)" }}>Portfolio</span>
          <span style={{ height: 1, width: 24, background: "var(--vio)", opacity: 0.55, display: "block" }} />
        </div>
        <h1 style={{ fontSize: "clamp(34px,6vw,68px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 12 }}>
          My <span className="gt">Projects</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--ink2)", maxWidth: 560, margin: "0 auto", lineHeight: 1.7 }}>
          A showcase of technical skills in React and JavaScript —
          dynamic, interactive web applications built to solve real problems.
        </p>
      </div>

      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {filterTabs.map(tab => {
              const isActive = tab === activeFilter;
              return (
                <button
                  key={tab}
                  onClick={() => { setActiveFilter(tab); setExpandedId(null); }}
                  style={{
                    padding: "9px 22px", borderRadius: 10, fontSize: 13, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit", transition: "all .18s",
                    background: isActive ? "linear-gradient(135deg,var(--pur),var(--ind))" : "var(--surface)",
                    border:     isActive ? "1px solid transparent" : "1px solid var(--line)",
                    color:      isActive ? "#fff" : "var(--ink2)",
                    boxShadow:  isActive ? "var(--glow)" : "none",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "var(--lineH)"; e.currentTarget.style.color = "var(--ink)"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "var(--line)";  e.currentTarget.style.color = "var(--ink2)"; } }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {isAdmin && (
            <button
              onClick={() => { setEditingProject(null); setPanelOpen(true); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#fff", border: "none", background: "linear-gradient(135deg,var(--pur),var(--ind))", boxShadow: "var(--glow)", transition: "box-shadow .18s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glowH)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--glow)")}
            >
              <Plus size={16} /> Add Project
            </button>
          )}
        </div>

        {isAdmin && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, padding: "10px 16px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}>
            <ShieldCheck size={25} style={{ color: "#16a34a", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }} className="flex gap-2">
             Admin mode: click ⭐ on any card to feature it. Use <Edit size={18}/> to edit, <Trash2 size={18}/> to delete.
            </span>
          </div>
        )}

        {!isAdmin && (
          <div style={{ display: "flex", alignItems: "center", gap: 8, marginBottom: 24, padding: "9px 14px", borderRadius: 10, background: "rgba(168,85,247,0.07)", border: "1px solid rgba(168,85,247,0.18)" }}>
            <Star size={13} style={{ color: "var(--vio)", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "var(--vio)" }}>
              Click ⭐ on any card to set it as the featured project.
            </span>
          </div>
        )}

        <BentoGrid
          projects={filteredProjects}
          expandedId={expandedId}
          onExpand={setExpandedId}
          onSetFeatured={handleSetFeatured}
          onEdit={p => { setEditingProject(p); setPanelOpen(true); }}
          onDelete={handleDelete}
        />

        {filteredProjects.length > 0 && (
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--ink3)", marginTop: 32 }}>
            Showing {filteredProjects.length} of {projects.length} projects
          </p>
        )}
      </div>

      <ProjectFormPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        onSave={handleSave}
        initialData={editingProject}
      />
    </div>
  );
}