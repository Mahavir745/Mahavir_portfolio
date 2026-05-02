/**
 * ============================================================
 * BlogStore.js — Blog Data Layer (localStorage)
 * ============================================================
 *
 * Handles all blog post data: reading, writing, adding,
 * editing, and deleting posts.
 *
 * ── Phase 2 LinkedIn RSS upgrade ───────────────────────────
 * When you're ready to auto-import LinkedIn posts:
 *   1. Sign up at taplio.com (free) — connect LinkedIn
 *   2. Get your RSS URL
 *   3. In Blog.jsx, add one fetch() to rss2json.com/api
 *   The manual posts from this store + LinkedIn posts
 *   will render together on the same page.
 * ────────────────────────────────────────────────────────────
 *
 * Storage key: "mkm_blogs" in localStorage
 */

const STORAGE_KEY = "mkm_blogs";

// ── Default blog posts shown before admin adds any ──────────
// UPDATE: edit text / ADD: push a new object / REMOVE: delete object
const DEFAULT_BLOGS = [
  {
    id: 1,
    title: "Why I Chose React for My Portfolio",
    excerpt:
      "React's component model makes it easy to build reusable UI pieces. Here's why I picked it and what I learned along the way.",
    content:
      "React's component model makes it easy to build reusable UI pieces. Here's why I picked it and what I learned along the way. Starting with Create React App and now Vite, the ecosystem has improved dramatically. The virtual DOM, hooks, and ecosystem made React the obvious choice for a modern portfolio.",
    tags: ["React", "Frontend", "Career"],
    date: "2025-11-15",
    source: "manual",   // "manual" | "linkedin"
    linkedinUrl: null,
  },
  {
    id: 2,
    title: "What I Learned as a Software Engineer Intern at EdZola",
    excerpt:
      "6 months of real-world engineering — from Zoho Creator to React frontends. The key lessons that changed how I write code.",
    content:
      "6 months of real-world engineering at EdZola Technologies taught me more than any tutorial. Working on live NGO client projects with real deadlines changed how I approach code quality, communication, and problem-solving.",
    tags: ["Career", "EdZola", "Internship"],
    date: "2025-10-20",
    source: "manual",
    linkedinUrl: null,
  },
];

/** Load all blog posts from localStorage */
export function loadBlogs() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (stored) return JSON.parse(stored);
  } catch {
    // corrupted — start fresh
  }
  return DEFAULT_BLOGS;
}

function saveBlogs(blogs) {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(blogs));
}

/** Add a new blog post. Returns updated array. */
export function addBlog(data) {
  const blogs = loadBlogs();
  const post = {
    ...data,
    id: Date.now(),
    source: "manual",
    linkedinUrl: null,
    date: data.date || new Date().toISOString().slice(0, 10),
  };
  const updated = [post, ...blogs]; // newest first
  saveBlogs(updated);
  return updated;
}

/** Edit an existing post. Returns updated array. */
export function editBlog(id, fields) {
  const blogs = loadBlogs();
  const updated = blogs.map(b => b.id === id ? { ...b, ...fields } : b);
  saveBlogs(updated);
  return updated;
}

/** Delete a post. Returns updated array. */
export function deleteBlog(id) {
  const blogs = loadBlogs();
  const updated = blogs.filter(b => b.id !== id);
  saveBlogs(updated);
  return updated;
}
