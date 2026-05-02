/**
 * ============================================================
 * Blog.jsx  —  Blog Page
 * ============================================================
 *
 * PHASE 1 (now)
 *   Manual blog posts written via the Admin panel.
 *   Stored in localStorage via BlogStore.js.
 *
 * PHASE 3 (LinkedIn API — future)
 *   When LinkedIn API is ready, add ONE fetch() call here.
 *   LinkedIn posts will appear alongside manual ones.
 *   Hint left in the code below — search for "PHASE 3".
 *
 * FEATURES
 *   • HyperVerge-style dark card grid
 *   • Click any card → full post slides open (accordion)
 *   • Tag filter tabs — auto-generated from post data
 *   • Scroll-reveal animation — cards fade in as you scroll
 *   • Admin: Add / Edit / Delete posts via slide-in panel
 *
 * ── Update default posts ────────────────────────────────────
 *   Edit DEFAULT_BLOGS in  src/utils/BlogStore.js
 * ────────────────────────────────────────────────────────────
 */

import { useState, useEffect, useRef } from "react";
import {
  Plus, Pencil, Trash2,
  X, Save, ShieldCheck,
  Tag, Calendar, ChevronDown,
  Linkedin, FileText,
} from "lucide-react";

import { useAdmin }from "../context/AdminContext";
import { loadBlogs, addBlog, editBlog, deleteBlog } from "../utils/BlogStore";


/* =============================================================
   SCROLL-REVEAL HOOK
   Returns true once the element has entered the viewport.
   Used to stagger card fade-in animations.
============================================================= */
function useScrollReveal(delay = 0) {
  const ref              = useRef(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;
    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setVisible(true);
          observer.disconnect(); // only animate in once
        }
      },
      { threshold: 0.1 }
    );
    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return { ref, visible, delay };
}


/* =============================================================
   FORMAT DATE
   Turns "2025-11-15" → "Nov 15, 2025"
============================================================= */
function formatDate(dateStr) {
  if (!dateStr) return "";
  const d = new Date(dateStr + "T00:00:00");
  return d.toLocaleDateString("en-US", { month: "short", day: "numeric", year: "numeric" });
}


/* =============================================================
   ANIMATED CONTENT ACCORDION
   Smooth max-height transition — same approach as Experience cards.
============================================================= */
function AnimatedContent({ isOpen, text }) {
  const innerRef          = useRef(null);
  const [height, setHeight] = useState(0);

  useEffect(() => {
    if (innerRef.current) setHeight(innerRef.current.scrollHeight);
  }, [text]);

  return (
    <div style={{
      overflow: "hidden",
      maxHeight: isOpen ? height + 24 : 0,
      opacity:   isOpen ? 1 : 0,
      transition: "max-height 0.4s cubic-bezier(0.4,0,0.2,1), opacity 0.28s ease",
    }}>
      <div
        ref={innerRef}
        style={{ paddingTop: 14, borderTop: "1px solid var(--line)" }}
      >
        {/* Render line-breaks in the content */}
        {text.split("\n").map((line, i) => (
          <p key={i} style={{ fontSize: 13, color: "var(--ink2)", lineHeight: 1.8, margin: "0 0 8px" }}>
            {line}
          </p>
        ))}
      </div>
    </div>
  );
}


/* =============================================================
   BLOG CARD
   Compact card. Click "Read more" → full content slides open.
   LinkedIn-sourced posts show a LinkedIn badge.
============================================================= */
function BlogCard({ post, index, expandedId, onExpand, onEdit, onDelete }) {
  const { isAdmin }              = useAdmin();
  const { ref, visible, delay }  = useScrollReveal(index * 0.08);
  const isExpanded               = expandedId === post.id;
  const isLinkedIn               = post.source === "linkedin";

  // Gradient accent colour per post (cycles through brand palette)
  const ACCENTS = ["var(--vio)", "var(--blu)", "var(--pnk)", "var(--ind)"];
  const accent  = ACCENTS[index % ACCENTS.length];

  return (
    <div
      ref={ref}
      style={{
        borderRadius: 18, overflow: "hidden",
        background: "var(--surface)", border: "1px solid var(--line)",
        backdropFilter: "blur(14px)",
        display: "flex", flexDirection: "column",
        // Scroll-reveal stagger
        opacity:    visible ? 1 : 0,
        transform:  visible ? "translateY(0)" : "translateY(24px)",
        transition: `opacity 0.5s ease ${index * 0.08}s, transform 0.5s ease ${index * 0.08}s, border-color .22s, box-shadow .22s`,
      }}
      onMouseEnter={e => { e.currentTarget.style.borderColor = `${accent}`; e.currentTarget.style.boxShadow = "0 16px 48px rgba(0,0,0,0.22)"; }}
      onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.boxShadow = "none"; }}
    >
      {/* Coloured accent top bar */}
      <div style={{ height: 3, background: `linear-gradient(90deg, ${accent}, ${accent}44, transparent)` }} />

      <div style={{ padding: "18px 20px", display: "flex", flexDirection: "column", gap: 12, flex: 1 }}>

        {/* Source badge + date row */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 8 }}>
          {/* Source badge */}
          <span style={{
            display: "flex", alignItems: "center", gap: 5,
            fontSize: 10, fontWeight: 600, padding: "3px 10px", borderRadius: 100,
            background: isLinkedIn ? "rgba(10,102,194,0.12)" : "rgba(168,85,247,0.10)",
            border: isLinkedIn ? "1px solid rgba(10,102,194,0.3)" : "1px solid rgba(168,85,247,0.22)",
            color: isLinkedIn ? "#0a66c2" : "var(--vio)",
            textTransform: "uppercase", letterSpacing: "0.07em",
          }}>
            {isLinkedIn ? <Linkedin size={10} /> : <FileText size={10} />}
            {isLinkedIn ? "LinkedIn" : "Blog"}
          </span>

          {/* Date */}
          <span style={{ display: "flex", alignItems: "center", gap: 5, fontSize: 11, color: "var(--ink3)" }}>
            <Calendar size={11} style={{ color: "var(--ink3)" }} />
            {formatDate(post.date)}
          </span>
        </div>

        {/* Title */}
        <h3 style={{ fontSize: 15, fontWeight: 700, color: "var(--ink)", lineHeight: 1.35, letterSpacing: "-0.01em" }}>
          {post.title}
        </h3>

        {/* Excerpt */}
        <p style={{ fontSize: 12, color: "var(--ink2)", lineHeight: 1.7, flex: 1 }}>
          {post.excerpt}
        </p>

        {/* Tags */}
        {post.tags?.length > 0 && (
          <div style={{ display: "flex", flexWrap: "wrap", gap: 5 }}>
            {post.tags.map(t => (
              <span
                key={t}
                style={{ display: "flex", alignItems: "center", gap: 3, fontSize: 9, padding: "2px 8px", borderRadius: 100, background: "rgba(168,85,247,0.08)", border: "1px solid rgba(168,85,247,0.18)", color: "var(--vio)", fontWeight: 600, textTransform: "uppercase", letterSpacing: "0.05em" }}
              >
                <Tag size={7} /> {t}
              </span>
            ))}
          </div>
        )}

        {/* Animated full content */}
        <AnimatedContent isOpen={isExpanded} text={post.content} />

        {/* Bottom row: Read more + admin controls */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", marginTop: 4 }}>
          {/* Read more / collapse toggle */}
          <button
            onClick={() => onExpand(isExpanded ? null : post.id)}
            style={{ display: "flex", alignItems: "center", gap: 5, background: "none", border: "none", cursor: "pointer", fontSize: 12, fontWeight: 600, color: accent, padding: 0, fontFamily: "inherit", transition: "opacity .15s" }}
            onMouseEnter={e => (e.currentTarget.style.opacity = "0.7")}
            onMouseLeave={e => (e.currentTarget.style.opacity = "1")}
          >
            <ChevronDown
              size={14}
              style={{ transition: "transform .3s cubic-bezier(0.4,0,0.2,1)", transform: isExpanded ? "rotate(180deg)" : "rotate(0)" }}
            />
            {isExpanded ? "Collapse" : "Read more"}
          </button>

          {/* Admin controls */}
          {isAdmin && (
            <div style={{ display: "flex", gap: 6 }}>
              <BlogIconBtn icon={<Pencil size={12} />} title="Edit post"   onClick={() => onEdit(post)} />
              <BlogIconBtn icon={<Trash2  size={12} />} title="Delete post" danger
                onClick={() => { if (window.confirm(`Delete "${post.title}"?`)) onDelete(post.id); }}
              />
            </div>
          )}
        </div>
      </div>
    </div>
  );
}


/* =============================================================
   BLOG ICON BUTTON  (small square — edit / delete)
============================================================= */
function BlogIconBtn({ icon, title, onClick, danger = false }) {
  return (
    <button
      onClick={onClick} title={title} aria-label={title}
      style={{ display: "flex", alignItems: "center", justifyContent: "center", width: 30, height: 30, borderRadius: 8, background: "var(--surface)", border: "1px solid var(--line)", color: "var(--ink3)", cursor: "pointer", transition: "all .18s" }}
      onMouseEnter={e => {
        e.currentTarget.style.background  = danger ? "rgba(239,68,68,0.10)" : "rgba(168,85,247,0.10)";
        e.currentTarget.style.borderColor = danger ? "rgba(239,68,68,0.35)" : "var(--lineH)";
        e.currentTarget.style.color       = danger ? "#ef4444" : "var(--vio)";
      }}
      onMouseLeave={e => { e.currentTarget.style.background = "var(--surface)"; e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ink3)"; }}
    >
      {icon}
    </button>
  );
}


/* =============================================================
   BLOG FORM PANEL  (slide-in — add or edit a post)
============================================================= */
function BlogFormPanel({ isOpen, onClose, onSave, initialData }) {
  const isEditing = Boolean(initialData);

  // Shared input style
  const inp = { width: "100%", padding: "10px 14px", borderRadius: 10, fontSize: 14, fontFamily: "inherit", background: "var(--surface)", color: "var(--ink)", border: "1px solid var(--line)", outline: "none", transition: "border-color .2s" };
  const focus = e => (e.target.style.borderColor = "var(--vio)");
  const blur  = e => (e.target.style.borderColor = "var(--line)");

  function emptyForm() {
    return { title: "", excerpt: "", content: "", tags: "", date: new Date().toISOString().slice(0, 10) };
  }

  const [form, setForm] = useState(
    initialData ? { ...initialData, tags: (initialData.tags || []).join(", ") } : emptyForm()
  );

  // Re-sync when panel opens with different data
  useEffect(() => {
    if (isOpen) {
      setForm(initialData ? { ...initialData, tags: (initialData.tags || []).join(", ") } : emptyForm());
    }
  }, [isOpen, initialData]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!form.title.trim()) return;
    onSave({ ...form, tags: form.tags.split(",").map(t => t.trim()).filter(Boolean) });
    onClose();
  }

  // Field label wrapper
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

      <div style={{ position: "fixed", top: 0, right: 0, bottom: 0, zIndex: 201, width: "min(520px,100vw)", background: "var(--bg2)", borderLeft: "1px solid var(--line)", transform: isOpen ? "translateX(0)" : "translateX(100%)", transition: "transform .35s cubic-bezier(0.4,0,0.2,1)", overflowY: "auto", display: "flex", flexDirection: "column" }}>

        {/* Header */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "20px 24px", borderBottom: "1px solid var(--line)", position: "sticky", top: 0, background: "var(--bg2)", zIndex: 1 }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <ShieldCheck size={18} style={{ color: "var(--vio)" }} />
            <span style={{ fontSize: 16, fontWeight: 700, color: "var(--ink)" }}>
              {isEditing ? "Edit Post" : "Write New Post"}
            </span>
          </div>
          <button onClick={onClose} style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: 6, cursor: "pointer", color: "var(--ink2)", display: "flex" }}>
            <X size={18} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: 24, display: "flex", flexDirection: "column", gap: 20, flex: 1 }}>

          <Field label="Title *">
            <input required type="text" placeholder="What did you learn or build?" value={form.title} onChange={e => setForm(p => ({ ...p, title: e.target.value }))} style={inp} onFocus={focus} onBlur={blur} />
          </Field>

          <Field label="Short excerpt (shown on card)">
            <textarea rows={2} placeholder="A one or two sentence summary..." value={form.excerpt} onChange={e => setForm(p => ({ ...p, excerpt: e.target.value }))} style={{ ...inp, resize: "vertical" }} onFocus={focus} onBlur={blur} />
          </Field>

          <Field label="Full content (shown when expanded)">
            <textarea rows={6} placeholder="Write your full post here. Use new lines for paragraphs." value={form.content} onChange={e => setForm(p => ({ ...p, content: e.target.value }))} style={{ ...inp, resize: "vertical" }} onFocus={focus} onBlur={blur} />
          </Field>

          <Field label="Tags (comma separated)">
            <input type="text" placeholder="React, Career, Learning" value={form.tags} onChange={e => setForm(p => ({ ...p, tags: e.target.value }))} style={inp} onFocus={focus} onBlur={blur} />
          </Field>

          <Field label="Date">
            <input type="date" value={form.date} onChange={e => setForm(p => ({ ...p, date: e.target.value }))} style={inp} onFocus={focus} onBlur={blur} />
          </Field>

          {/* PHASE 3 hint — LinkedIn auto-import will go here */}
          <div style={{ padding: "10px 14px", borderRadius: 10, background: "rgba(168,85,247,0.06)", border: "1px solid rgba(168,85,247,0.16)", fontSize: 11, color: "var(--vio)" }}>
            Phase 3: LinkedIn posts will be auto-imported here once the API is set up.
            Manual posts are always kept alongside them.
          </div>

          <button
            type="submit"
            style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 8, padding: 12, borderRadius: 10, marginTop: "auto", fontSize: 14, fontWeight: 700, color: "#fff", border: "none", background: "linear-gradient(135deg,var(--pur),var(--ind))", boxShadow: "var(--glow)", cursor: "pointer", fontFamily: "inherit", transition: "box-shadow .2s" }}
            onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glowH)")}
            onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--glow)")}
          >
            <Save size={16} />
            {isEditing ? "Save Changes" : "Publish Post"}
          </button>
        </form>
      </div>
    </>
  );
}


/* =============================================================
   BLOG PAGE  —  main export
============================================================= */
export default function Blog() {
  const { isAdmin } = useAdmin();

  // All blog posts (from localStorage)
  const [posts,          setPosts]         = useState(() => loadBlogs());
  // Which tag filter is active
  const [activeTag,      setActiveTag]     = useState("All");
  // Which post is expanded (only one at a time)
  const [expandedId,     setExpandedId]    = useState(null);
  // Add/Edit panel state
  const [panelOpen,      setPanelOpen]     = useState(false);
  const [editingPost,    setEditingPost]   = useState(null); // null = adding new

  // Auto-generate tag tabs from post data (unique tags)
  const allTags = ["All", ...new Set(posts.flatMap(p => p.tags || []))];

  // Apply active tag filter
  const filteredPosts = activeTag === "All"
    ? posts
    : posts.filter(p => (p.tags || []).includes(activeTag));

  // ── Handlers ─────────────────────────────────────────────

  function handleSave(formData) {
    let updated;
    if (editingPost) {
      updated = editBlog(editingPost.id, formData);
    } else {
      updated = addBlog(formData);
    }
    setPosts(updated);
  }

  function handleDelete(id) {
    const updated = deleteBlog(id);
    setPosts(updated);
    if (editingPost?.id === id) setPanelOpen(false);
  }

  // ── Render ───────────────────────────────────────────────

  return (
    <div style={{ paddingTop: 64 }}>

      {/* Page header */}
      <div style={{ padding: "72px 24px 48px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ height: 1, width: 24, background: "var(--vio)", opacity: 0.55, display: "block" }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--vio)" }}>Writing</span>
          <span style={{ height: 1, width: 24, background: "var(--vio)", opacity: 0.55, display: "block" }} />
        </div>

        <h1 style={{ fontSize: "clamp(34px,6vw,68px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 12 }}>
          Thoughts &amp; <span className="gt">Blogs</span>
        </h1>

        <p style={{ fontSize: 15, color: "var(--ink2)", maxWidth: 520, margin: "0 auto", lineHeight: 1.7 }}>
          Writing about things I build, learn, and discover as a software engineer.
          {/* PHASE 3: LinkedIn posts will automatically appear here too. */}
        </p>
      </div>

      {/* Content area */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>

        {/* Top bar: tag filters + admin "Write Post" button */}
        <div style={{ display: "flex", alignItems: "center", justifyContent: "space-between", flexWrap: "wrap", gap: 12, marginBottom: 32 }}>

          {/* Tag filter tabs */}
          <div style={{ display: "flex", flexWrap: "wrap", gap: 8 }}>
            {allTags.map(tag => {
              const isActive = tag === activeTag;
              return (
                <button
                  key={tag}
                  onClick={() => { setActiveTag(tag); setExpandedId(null); }}
                  style={{
                    padding: "8px 18px", borderRadius: 10, fontSize: 12, fontWeight: 600,
                    cursor: "pointer", fontFamily: "inherit", transition: "all .18s",
                    background: isActive ? "linear-gradient(135deg,var(--pur),var(--ind))" : "var(--surface)",
                    border:     isActive ? "1px solid transparent" : "1px solid var(--line)",
                    color:      isActive ? "#fff" : "var(--ink2)",
                    boxShadow:  isActive ? "var(--glow)" : "none",
                  }}
                  onMouseEnter={e => { if (!isActive) { e.currentTarget.style.borderColor = "var(--lineH)"; e.currentTarget.style.color = "var(--ink)"; } }}
                  onMouseLeave={e => { if (!isActive) { e.currentTarget.style.borderColor = "var(--line)";  e.currentTarget.style.color = "var(--ink2)"; } }}
                >
                  {tag}
                </button>
              );
            })}
          </div>

          {/* Admin: Write Post button */}
          {isAdmin && (
            <button
              onClick={() => { setEditingPost(null); setPanelOpen(true); }}
              style={{ display: "flex", alignItems: "center", gap: 8, padding: "9px 20px", borderRadius: 10, fontSize: 13, fontWeight: 700, cursor: "pointer", fontFamily: "inherit", color: "#fff", border: "none", background: "linear-gradient(135deg,var(--pur),var(--ind))", boxShadow: "var(--glow)", transition: "box-shadow .18s" }}
              onMouseEnter={e => (e.currentTarget.style.boxShadow = "var(--glowH)")}
              onMouseLeave={e => (e.currentTarget.style.boxShadow = "var(--glow)")}
            >
              <Plus size={16} /> Write Post
            </button>
          )}
        </div>

        {/* Admin hint banner */}
        {isAdmin && (
          <div style={{ display: "flex", alignItems: "center", gap: 10, marginBottom: 24, padding: "10px 16px", borderRadius: 10, background: "rgba(34,197,94,0.08)", border: "1px solid rgba(34,197,94,0.25)" }}>
            <ShieldCheck size={15} style={{ color: "#16a34a", flexShrink: 0 }} />
            <span style={{ fontSize: 12, color: "#16a34a", fontWeight: 500 }}>
              Admin mode — click "Write Post" to add a new blog. Use ✏️ to edit, 🗑️ to delete.
            </span>
          </div>
        )}

        {/* Blog cards grid */}
        {filteredPosts.length === 0 ? (
          <div style={{ textAlign: "center", padding: "80px 0", color: "var(--ink3)" }}>
            <FileText size={40} style={{ margin: "0 auto 14px", display: "block", opacity: 0.3 }} />
            <p style={{ fontSize: 14 }}>No posts found.</p>
            {isAdmin && (
              <p style={{ fontSize: 12, marginTop: 8 }}>Click "Write Post" above to add your first blog.</p>
            )}
          </div>
        ) : (
          <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fill,minmax(300px,1fr))", gap: 16 }}>
            {filteredPosts.map((post, i) => (
              <BlogCard
                key={post.id}
                post={post}
                index={i}
                expandedId={expandedId}
                onExpand={setExpandedId}
                onEdit={p => { setEditingPost(p); setPanelOpen(true); }}
                onDelete={handleDelete}
              />
            ))}
          </div>
        )}

        {/* Post count */}
        {filteredPosts.length > 0 && (
          <p style={{ textAlign: "center", fontSize: 12, color: "var(--ink3)", marginTop: 32 }}>
            {filteredPosts.length} {filteredPosts.length === 1 ? "post" : "posts"}
            {activeTag !== "All" ? ` tagged "${activeTag}"` : " total"}
          </p>
        )}
      </div>

      {/* Add / Edit slide-in panel */}
      <BlogFormPanel
        isOpen={panelOpen}
        onClose={() => setPanelOpen(false)}
        onSave={handleSave}
        initialData={editingPost}
      />
    </div>
  );
}
