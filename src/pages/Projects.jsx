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

import { useAdmin } from "../context/AdminContext";
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
  JS: { Icon: Braces, color: "#ca8a04", bg: "rgba(202,138,4,0.10)" },
  React: { Icon: Atom, color: "#06b6d4", bg: "rgba(6,182,212,0.10)" },
  Py: { Icon: Terminal, color: "#3776AB", bg: "rgba(55,118,171,0.10)" },
  Node: { Icon: Server, color: "#22c55e", bg: "rgba(34,197,94,0.10)" },
  FS: { Icon: Layers, color: "#a855f7", bg: "rgba(168,85,247,0.10)" },
};
const FALLBACK_TECH = { Icon: Braces, color: "#888", bg: "rgba(128,128,128,0.08)" };

function getTechConfig(techValue) {
  return TECH_CONFIG[techValue] || FALLBACK_TECH;
}

const TECH_OPTIONS = [
  { label: "JavaScript", value: "JS", color: "#F7DF1E" },
  { label: "React", value: "React", color: "#61DAFB" },
  { label: "Python", value: "Py", color: "#3776AB" },
  { label: "Node.js", value: "Node", color: "#339933" },
  { label: "Full Stack", value: "FS", color: "#a855f7" },
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
  const innerRef = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (innerRef.current) setHeight(innerRef.current.scrollHeight);
  }, [text]);

  return (
    <div style={{
      overflow: "hidden",
      maxHeight: isOpen ? height + 20 : 0,
      opacity: isOpen ? 1 : 0,
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


function ProjectListCard({ project, onSetFeatured, onEdit, onDelete }) {
  const { isAdmin } = useAdmin();
  const { color, bg } = getTechConfig(project.tech);

  return (
    <div className="project-list-card" style={{
      borderRadius: 24,
      background: "var(--surface)",
      border: "1px solid var(--line)",
      overflow: "hidden",
      display: "flex", 
      transition: "transform 0.4s cubic-bezier(0.16, 1, 0.3, 1), box-shadow 0.4s ease, border-color 0.4s ease",
      position: "relative",
      minHeight: 240,
    }}
      onMouseEnter={e => {
        e.currentTarget.style.transform = "translateY(-4px)";
        e.currentTarget.style.boxShadow = "0 24px 48px -12px rgba(0,0,0,0.1)";
        e.currentTarget.style.borderColor = `${color}50`;
      }}
      onMouseLeave={e => {
        e.currentTarget.style.transform = "translateY(0)";
        e.currentTarget.style.boxShadow = "none";
        e.currentTarget.style.borderColor = "var(--line)";
      }}
    >
      <div className="project-list-img" style={{
        background: project.thumbnail ? `url(${project.thumbnail}) center/cover` : bg,
        position: "relative",
        display: "flex", alignItems: "center", justifyContent: "center",
        flexShrink: 0
      }}>
        {!project.thumbnail && <TechIconBadge techValue={project.tech} size={88} />}
        
        {project.featured && (
          <div style={{
            position: "absolute", top: 16, left: 16,
            background: "var(--surface)", color: "var(--vio)",
            padding: "6px 14px", borderRadius: 100,
            fontSize: 11, fontWeight: 700, border: "1px solid var(--line)",
            display: "flex", alignItems: "center", gap: 6,
            boxShadow: "0 4px 12px rgba(0,0,0,0.05)",
            zIndex: 2
          }}>
            <Star size={12} style={{ fill: "var(--vio)" }} /> Featured
          </div>
        )}
      </div>

      <div style={{ padding: 32, display: "flex", flexDirection: "column", flex: 1, gap: 16 }}>
        <div>
          <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginBottom: 12 }}>
             <h3 style={{ fontSize: 24, fontWeight: 800, color: "var(--ink)", margin: 0, letterSpacing: "-0.02em" }}>{project.name}</h3>
             <span style={{ fontSize: 13, fontWeight: 600, color: "var(--ink2)", background: "var(--bg)", padding: "4px 12px", borderRadius: 100, border: "1px solid var(--line)" }}>{project.year}</span>
          </div>
          <p style={{ fontSize: 15, color: "var(--ink2)", lineHeight: 1.7, margin: 0 }}>{project.description}</p>
        </div>

        <div style={{ display: "flex", flexWrap: "wrap", gap: 8, marginTop: "auto" }}>
          {project.tags.map(tag => (
             <span key={tag} style={{ fontSize: 12, fontWeight: 600, color: "var(--ink2)", background: "var(--bg)", padding: "6px 12px", borderRadius: 8, border: "1px solid var(--line)" }}>
               {tag}
             </span>
          ))}
        </div>

        <div style={{ display: "flex", gap: 12, alignItems: "center", marginTop: 8 }}>
           <a href={project.liveUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "#fff", background: "linear-gradient(135deg, var(--pur), var(--blu))", boxShadow: "var(--glow)", padding: "12px 24px", borderRadius: 12, textDecoration: "none", transition: "box-shadow 0.2s, transform 0.2s" }} onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--glowH)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--glow)"; e.currentTarget.style.transform = "translateY(0)"; }}>
             <ExternalLink size={16} /> Live Demo
           </a>
           <a href={project.codeUrl} target="_blank" rel="noopener noreferrer" style={{ display: "flex", alignItems: "center", gap: 8, fontSize: 14, fontWeight: 700, color: "var(--ink)", background: "var(--bg)", border: "1px solid var(--line)", padding: "12px 24px", borderRadius: 12, textDecoration: "none", transition: "background 0.2s, transform 0.2s" }} onMouseEnter={e => { e.currentTarget.style.background = "var(--surfaceH)"; e.currentTarget.style.transform = "translateY(-2px)"; }} onMouseLeave={e => { e.currentTarget.style.background = "var(--bg)"; e.currentTarget.style.transform = "translateY(0)"; }}>
             <Code2 size={16} /> Source Code
           </a>

           <div style={{ flex: 1 }} />
           
           {!project.featured && (
              <button onClick={() => onSetFeatured(project.id, true)} style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 10, color: "var(--ink3)", cursor: "pointer", display: "flex", padding: 10 }} title="Set Featured">
                 <Star size={18} />
              </button>
           )}
           {project.featured && (
              <button onClick={() => onSetFeatured(project.id, false)} style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 10, color: "var(--vio)", cursor: "pointer", display: "flex", padding: 10 }} title="Remove Featured">
                 <StarOff size={18} />
              </button>
           )}

           {isAdmin && (
             <>
               <button onClick={() => onEdit(project)} style={{ background: "var(--bg)", border: "1px solid var(--line)", borderRadius: 10, color: "var(--ink2)", cursor: "pointer", display: "flex", padding: 10 }}><Pencil size={18} /></button>
               <button onClick={() => { if (window.confirm(`Delete "${project.name}"?`)) onDelete(project.id); }} style={{ background: "rgba(239,68,68,0.1)", border: "1px solid rgba(239,68,68,0.3)", borderRadius: 10, color: "#ef4444", cursor: "pointer", display: "flex", padding: 10 }}><Trash2 size={18} /></button>
             </>
           )}
        </div>
      </div>
    </div>
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
  const blur = e => (e.target.style.borderColor = "var(--line)");

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
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 12, borderRadius: 10, marginTop: "auto", fontSize: 14, fontWeight: 700, color: "#fff", border: "none", background: "linear-gradient(135deg,var(--pur),var(--blu))", boxShadow: "var(--glow)", cursor: "pointer", fontFamily: "inherit", transition: "box-shadow .2s" }}
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


function ProjectList({ projects, onSetFeatured, onEdit, onDelete }) {
  if (projects.length === 0) {
    return (
      <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ink3)" }}>
        <p style={{ fontSize: 15 }}>No projects found for this filter.</p>
      </div>
    );
  }

  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 32 }}>
      {projects.map(p => (
        <ProjectListCard
          key={p.id} project={p}
          onSetFeatured={onSetFeatured} onEdit={onEdit} onDelete={onDelete}
        />
      ))}
    </div>
  );
}


/* =============================================================
   PROJECTS PAGE
============================================================= */
export default function Projects() {
  const { isAdmin } = useAdmin();

  const [projects, setProjects] = useState(() => loadProjects());
  const [activeFilter, setActiveFilter] = useState("All");
  const [panelOpen, setPanelOpen] = useState(false);
  const [editingProject, setEditingProject] = useState(null);

  // Pagination State
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 4;

  useEffect(() => {
    setCurrentPage(1); // Reset to page 1 when filter changes
  }, [activeFilter]);

  const filterTabs = ["All", ...new Set(projects.map(p => p.tech))];

  const baseList = activeFilter === "All" ? [...projects] : projects.filter(p => p.tech === activeFilter);
  const filteredProjects = baseList.sort((a, b) => (a.featured === b.featured) ? 0 : (a.featured ? -1 : 1));

  // Pagination Logic
  const totalPages = Math.ceil(filteredProjects.length / itemsPerPage);
  const startIndex = (currentPage - 1) * itemsPerPage;
  const currentProjects = filteredProjects.slice(startIndex, startIndex + itemsPerPage);

  function handleSetFeatured(id, shouldFeature) {
    const updated = projects.map(p => ({
      ...p,
      featured: shouldFeature ? p.id === id : (p.id === id ? false : p.featured),
    }));
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
      <style>{`
        .project-list-card {
          flex-direction: row;
        }
        .project-list-img {
          width: 320px;
          border-right: 1px solid var(--line);
          border-bottom: none;
        }
        @media (max-width: 768px) {
          .project-list-card {
            flex-direction: column !important;
          }
          .project-list-img {
            width: 100% !important;
            height: 220px !important;
            border-right: none !important;
            border-bottom: 1px solid var(--line) !important;
          }
        }
      `}</style>

      <div style={{ padding: "80px 24px 56px", textAlign: "center" }}>
        <h1 style={{ fontSize: "clamp(40px,7vw,72px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 20, color: "var(--ink)" }}>
          My <span style={{ color: "var(--vio)" }}>Projects</span>
        </h1>
        <p style={{ fontSize: 18, color: "var(--ink2)", maxWidth: 640, margin: "0 auto", lineHeight: 1.6 }}>
          A showcase of technical skills in React and JavaScript —
          dynamic, interactive web applications built to solve real problems.
        </p>
      </div>

      <div style={{ maxWidth: 1000, margin: "0 auto", padding: "0 24px 100px" }}>

        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 16, marginBottom: 40 }}>
          <div style={{ display: "flex", flexWrap: "wrap", gap: 10 }}>
            {filterTabs.map(tab => {
              const isActive = tab === activeFilter;
              return (
                <button
                  key={tab}
                  onClick={() => setActiveFilter(tab)}
                  style={{
                    padding: "10px 24px", borderRadius: 100, fontSize: 15, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit", transition: "all .2s",
                    background: isActive ? "var(--ink)" : "var(--surface)",
                    border: "1px solid var(--line)",
                    color: isActive ? "var(--bg)" : "var(--ink2)",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "var(--lineH)"; e.currentTarget.style.color = "var(--ink)"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ink2)"; } }}
                >
                  {tab}
                </button>
              );
            })}
          </div>

          {isAdmin && (
            <button
              onClick={() => { setEditingProject(null); setPanelOpen(true); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "10px 24px", borderRadius: 100, fontSize: 14, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#fff", border: "none", background: "linear-gradient(135deg,var(--pur),var(--blu))", boxShadow: "var(--glow)", transition: "box-shadow .2s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glowH)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--glow)")}
            >
              <Plus size={18} /> Add Project
            </button>
          )}
        </div>

        <ProjectList
          projects={currentProjects}
          onSetFeatured={handleSetFeatured}
          onEdit={p => { setEditingProject(p); setPanelOpen(true); }}
          onDelete={handleDelete}
        />

        {totalPages > 1 && (
          <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 24, marginTop: 56 }}>
            <button 
              disabled={currentPage === 1}
              onClick={() => setCurrentPage(p => p - 1)}
              style={{ padding: "12px 28px", borderRadius: 100, border: "1px solid var(--line)", background: "var(--surface)", color: currentPage === 1 ? "var(--ink3)" : "var(--ink)", cursor: currentPage === 1 ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 15, transition: "all 0.2s", opacity: currentPage === 1 ? 0.5 : 1 }}
              onMouseEnter={e => { if(currentPage !== 1) e.currentTarget.style.background = "var(--surfaceH)" }}
              onMouseLeave={e => { if(currentPage !== 1) e.currentTarget.style.background = "var(--surface)" }}
            >
              Previous
            </button>
            
            <span style={{ fontSize: 15, fontWeight: 700, color: "var(--ink2)" }}>
              Page {currentPage} of {totalPages}
            </span>

            <button 
              disabled={currentPage === totalPages}
              onClick={() => setCurrentPage(p => p + 1)}
              style={{ padding: "12px 28px", borderRadius: 100, border: "1px solid var(--line)", background: "var(--surface)", color: currentPage === totalPages ? "var(--ink3)" : "var(--ink)", cursor: currentPage === totalPages ? "not-allowed" : "pointer", fontWeight: 700, fontSize: 15, transition: "all 0.2s", opacity: currentPage === totalPages ? 0.5 : 1 }}
              onMouseEnter={e => { if(currentPage !== totalPages) e.currentTarget.style.background = "var(--surfaceH)" }}
              onMouseLeave={e => { if(currentPage !== totalPages) e.currentTarget.style.background = "var(--surface)" }}
            >
              Next
            </button>
          </div>
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