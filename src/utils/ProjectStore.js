/**
 * ============================================================
 * ProjectStore.js — Data Layer (localStorage)
 * ============================================================
 *
 * This file handles ALL project data — reading, writing,
 * adding, editing, deleting, and toggling "featured".
 *
 * ── Phase 2 upgrade path ────────────────────────────────────
 * When you're ready to move to a real backend, you only need
 * to change THIS file. Every function here that reads/writes
 * localStorage will be replaced with a fetch() call to your
 * Node.js API. The rest of the app stays exactly the same.
 * ────────────────────────────────────────────────────────────
 *
 * Storage key: "mkm_projects" in localStorage
 */

// ── Storage key (change if you want a different key name) ───
const STORAGE_KEY = "mkm_projects";

// ── Default projects (shown before admin adds anything) ─────
// UPDATE: edit these to match your actual projects.
// ADD:    push a new object with the same shape.
// REMOVE: delete the object from the array.
const DEFAULT_PROJECTS = [
  // {
  //   id: 1,
  //   name: "TimeStamp Convertor",
  //   tech: "JS",
  //   techColor: "#F7DF1E",
  //   tags: ["JavaScript", "Date API", "DOM"],
  //   description: "Real-time tool to convert between human-readable dates and Unix timestamps using vanilla JavaScript.",
  //   liveUrl: "https://mahavir745.github.io/Timestamp_convertor/",
  //   codeUrl: "https://github.com/Mahavir745/Timestamp_convertor",
  //   thumbnail: null,
  //   featured: false,
  //   year: 2024,
  // },
  // {
  //   id: 2,
  //   name: "Weather API App",
  //   tech: "JS",
  //   techColor: "#F7DF1E",
  //   tags: ["JavaScript", "REST API", "Fetch"],
  //   description: "A weather application that fetches live data from external APIs to show temperature and conditions for any city.",
  //   liveUrl: "https://mahavir745.github.io/Weather-API/",
  //   codeUrl: "https://github.com/Mahavir745/Weather-API",
  //   thumbnail: null,
  //   featured: false,
  //   year: 2024,
  // },
  // {
  //   id: 3,
  //   name: "Trivia Game",
  //   tech: "JS",
  //   techColor: "#F7DF1E",
  //   tags: ["JavaScript", "Quiz", "API"],
  //   description: "Interactive quiz game with multiple categories and real-time score tracking using the Open Trivia API.",
  //   liveUrl: "https://mahavir745.github.io/trivia_game/",
  //   codeUrl: "https://github.com/Mahavir745/trivia_game",
  //   thumbnail: null,
  //   featured: false,
  //   year: 2024,
  // },
  // {
  //   id: 4,
  //   name: "TodoList",
  //   tech: "React",
  //   techColor: "#61DAFB",
  //   tags: ["React", "useState", "CRUD"],
  //   description: "Efficient task management app to add and delete daily tasks, focusing on React state management and component structure.",
  //   liveUrl: "https://todolist-phi-snowy.vercel.app/",
  //   codeUrl: "https://github.com/Mahavir745/todolist",
  //   thumbnail: null,
  //   featured: true,
  //   year: 2024,
  // },
  // {
  //   id: 5,
  //   name: "User Profile Auth",
  //   tech: "React",
  //   techColor: "#61DAFB",
  //   tags: ["React", "Auth", "React Router"],
  //   description: "Secure login and signup system with form validation, authentication, and personalized user dashboard routing.",
  //   liveUrl: "https://user-profile-three-sigma.vercel.app/",
  //   codeUrl: "https://github.com/Mahavir745/userProfile",
  //   thumbnail: null,
  //   featured: false,
  //   year: 2024,
  // },
  // {
  //   id: 6,
  //   name: "Post Generator",
  //   tech: "React",
  //   techColor: "#61DAFB",
  //   tags: ["React", "Bootstrap", "API Integration"],
  //   description: "Dynamic post creation tool using React and Bootstrap, featuring API integration to load and display social content.",
  //   liveUrl: "https://post-generator-rho.vercel.app/",
  //   codeUrl: "https://github.com/Mahavir745/post-generator",
  //   thumbnail: null,
  //   featured: false,
  //   year: 2024,
  // },
  // {
  //   id: 7,
  //   name: "Expense Tracker",
  //   tech: "React",
  //   techColor: "#61DAFB",
  //   tags: ["React", "Finance", "Dashboard"],
  //   description: "Personal finance manager with a user-friendly dashboard to track income, expenses, and overall budget management.",
  //   liveUrl: "https://expense-tracker-gray-kappa.vercel.app/",
  //   codeUrl: "https://github.com/Mahavir745/expense_tracker",
  //   thumbnail: null,
  //   featured: true,
  //   year: 2024,
  // },
  // {
  //   id: 8,
  //   name: "Task Management Pro",
  //   tech: "React",
  //   techColor: "#61DAFB",
  //   tags: ["React", "Pagination", "Priority Filter"],
  //   description: "Advanced task manager with priority filtering, progress tracking, and pagination for high-productivity workflows.",
  //   liveUrl: "https://task-manager-swart-six.vercel.app/",
  //   codeUrl: "https://github.com/Mahavir745/task-manager",
  //   thumbnail: null,
  //   featured: false,
  //   year: 2024,
  // },
  // {
  //   id: 9,
  //   name: "Surprise Gift Card",
  //   tech: "React",
  //   techColor: "#61DAFB",
  //   tags: ["React", "Personalization", "UI/UX"],
  //   description: "Fun application to generate personalized digital gift cards instantly for friends and family with custom messages.",
  //   liveUrl: "https://gift-card-flame-seven.vercel.app/",
  //   codeUrl: "https://github.com/Mahavir745/gift-card",
  //   thumbnail: null,
  //   featured: false,
  //   year: 2024,
  // },
  // {
  //   id: 10,
  //   name: "QR Verify",
  //   tech: "React",
  //   techColor: "#61DAFB",
  //   tags: ["React", "QR Code", "Security"],
  //   description: "Upcoming project focused on QR code generation and verification for secure data handling.",
  //   liveUrl: "",
  //   codeUrl: "",
  //   thumbnail: null,
  //   featured: false,
  //   year: 2025,
  // }
];

let currentProjects = [...DEFAULT_PROJECTS];

/**
 * Load all projects from memory.
 */
export function loadProjects() {
  return currentProjects;
}

/**
 * Add a brand-new project.
 * Returns the updated full array.
 */
export function addProject(newProjectData) {
  const project = {
    ...newProjectData,
    id: Date.now(),         // simple unique ID using timestamp
    featured: false,
    year: new Date().getFullYear(),
  };

  currentProjects = [...currentProjects, project];
  return currentProjects;
}

/**
 * Edit an existing project by ID.
 * Returns the updated full array.
 */
export function editProject(id, updatedFields) {
  currentProjects = currentProjects.map(p => p.id === id ? { ...p, ...updatedFields } : p);
  return currentProjects;
}

/**
 * Delete a project by ID.
 * Returns the updated full array.
 */
export function deleteProject(id) {
  currentProjects = currentProjects.filter(p => p.id !== id);
  return currentProjects;
}

/**
 * Toggle the "featured" flag on a project.
 * Returns the updated full array.
 */
export function toggleFeatured(id) {
  currentProjects = currentProjects.map(p =>
    p.id === id ? { ...p, featured: !p.featured } : p
  );
  return currentProjects;
}

/**
 * Reset everything back to the default projects.
 * Useful during development.
 */
export function resetToDefaults() {
  currentProjects = [...DEFAULT_PROJECTS];
  return currentProjects;
}
