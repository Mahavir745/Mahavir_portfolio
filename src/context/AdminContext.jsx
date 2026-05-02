/**
 * ============================================================
 * AdminContext.jsx — Admin Authentication State
 * ============================================================
 *
 * Provides a simple password-based admin mode to the whole app.
 * When admin is logged in, extra controls appear on project cards.
 *
 * ── How it works ────────────────────────────────────────────
 *   1. User clicks "Admin Login" (hidden link in the nav)
 *   2. A password prompt appears
 *   3. Correct password → isAdmin = true, stored in sessionStorage
 *      (sessionStorage clears when the browser tab closes)
 *   4. Admin sees: Featured toggle, Edit, Delete, Add Project buttons
 *
 * ── Change your password ────────────────────────────────────
 *   Edit ADMIN_PASSWORD below.
 *   ⚠️  This is frontend-only — visible in source code.
 *       For real security, use Phase 2 (JWT + backend).
 *
 * Usage anywhere:
 *   const { isAdmin, login, logout } = useAdmin();
 * ────────────────────────────────────────────────────────────
 */

import { createContext, useContext, useState } from "react";

// ── Change this to your preferred password ──────────────────
const ADMIN_PASSWORD = "mahavir@745";

const AdminContext = createContext(null);

export function AdminProvider({ children }) {
  // Check if already logged in from a previous action in this session
  const [isAdmin, setIsAdmin] = useState(
    () => sessionStorage.getItem("mkm_admin") === "true"
  );

  /**
   * Attempt login with the given password.
   * Returns true if correct, false if wrong.
   */
  function login(password) {
    if (password === ADMIN_PASSWORD) {
      setIsAdmin(true);
      sessionStorage.setItem("mkm_admin", "true");
      return true;
    }
    return false;
  }

  /**
   * Log out of admin mode.
   * Clears sessionStorage and hides all admin controls.
   */
  function logout() {
    setIsAdmin(false);
    sessionStorage.removeItem("mkm_admin");
  }

  return (
    <AdminContext.Provider value={{ isAdmin, login, logout }}>
      {children}
    </AdminContext.Provider>
  );
}

// Convenience hook
export function useAdmin() {
  const ctx = useContext(AdminContext);
  if (!ctx) throw new Error("useAdmin must be inside AdminProvider");
  return ctx;
}
