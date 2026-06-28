/**
 * Navbar.jsx
 * Fixed top nav — HyperVerge style.
 *   Left   → logo mark + name
 *   Center → nav links
 *   Right  → theme toggle + "Hire Me" button
 * Mobile   → hamburger full-screen drawer
 */
import { useState, useEffect } from "react";
import { NavLink, useNavigate } from "react-router-dom";
import { Sun, Moon, Menu, X, ShieldCheck, LogOut } from "lucide-react";
import { useTheme } from "../context/ThemeContext";
import { useAdmin } from "../context/AdminContext";
import adminlogo from "../../public/mahavir.jpg";

const LINKS = [
  { to: "/", label: "Home", end: true },
  { to: "/project", label: "Project", end: false },
  { to: "/blog", label: "Blog", end: false },
  { to: "/contact", label: "Contact", end: false },
];

/* ── Logo SVG ─────────────────────────────────────────── */
function Logo() {
  return (
    <svg width="28" height="28" viewBox="0 0 28 28" fill="none">
      <path d="M14 2L26 9.5V18.5L14 26L2 18.5V9.5L14 2Z"
        stroke="url(#nl)" strokeWidth="1.5" fill="rgba(124,58,237,0.15)" />
      <path d="M14 2L20 9.5H8L14 2Z" fill="url(#nl)" opacity="0.8" />
      <defs>
        <linearGradient id="nl" x1="2" y1="2" x2="26" y2="26" gradientUnits="userSpaceOnUse">
          <stop stopColor="#a855f7" /><stop offset="1" stopColor="#3b82f6" />
        </linearGradient>
      </defs>
    </svg>
  );
}

/* ── Theme pill ───────────────────────────────────────── */
function ThemePill({ size = "sm" }) {
  const { theme, toggle } = useTheme();
  const dark = theme === "dark";
  const W = size === "lg" ? 56 : 44;
  const H = size === "lg" ? 30 : 24;
  const K = size === "lg" ? 22 : 16;
  const off = dark ? 4 : W - K - 4;
  return (
    <button
      onClick={toggle}
      aria-label="Toggle theme"
      style={{
        position: "relative", width: W, height: H, flexShrink: 0,
        borderRadius: H, cursor: "pointer",
        background: "var(--surface)", border: "1px solid var(--line)",
        transition: "background .3s",
      }}
    >
      <span style={{
        position: "absolute", top: (H - K) / 2, left: off,
        width: K, height: K, borderRadius: "50%",
        background: "linear-gradient(135deg,var(--vio),var(--blu))",
        display: "flex", alignItems: "center", justifyContent: "center",
        transition: "left .3s cubic-bezier(.34,1.56,.64,1)",
      }}>
        {dark
          ? <Moon size={size === "lg" ? 12 : 9} color="#fff" />
          : <Sun size={size === "lg" ? 12 : 9} color="#fff" />}
      </span>
    </button>
  );
}

/**
 * AdminLoginModal
 * Custom popup that replaces window.prompt and window.alert.
 * Shows a password input with show/hide toggle, error message,
 * and smooth fade-in animation.
 *
 * Props:
 *   isOpen   boolean   — controls visibility
 *   onClose  function  — called when user cancels or clicks backdrop
 *   onSubmit function  — called with the typed password
 *   hasError boolean   — true = show "wrong password" message
 */
function AdminLoginModal({ isOpen, onClose, onSubmit, hasError }) {
  const [password, setPassword] = useState("");
  const [showPass, setShowPass] = useState(false);

  // Clear the input every time the modal opens fresh
  useEffect(() => {
    if (isOpen) {
      setPassword("");
      setShowPass(false);
    }
  }, [isOpen]);

  function handleSubmit(e) {
    e.preventDefault();
    if (!password.trim()) return;
    onSubmit(password);
  }

  // Close on Escape key
  useEffect(() => {
    function handleKey(e) {
      if (e.key === "Escape") onClose();
    }
    if (isOpen) window.addEventListener("keydown", handleKey);
    return () => window.removeEventListener("keydown", handleKey);
  }, [isOpen, onClose]);

  if (!isOpen) return null;

  return (
    // Dark backdrop — click outside to close
    <div
      onClick={onClose}
      style={{
        position: "fixed",
        inset: 0,
        zIndex: 500,
        background: "rgba(0, 0, 0, 0.55)",
        backdropFilter: "blur(6px)",
        // display:    "",
        // alignItems: "center",
        // justifyContent: "center",
        // padding:    "10%",
        width: "100%",
        height: "100vh",
        animation: "fadeInBackdrop 0.2s ease",
      }}
    >
      {/* Modal card — stop click from reaching backdrop */}
      <div
        onClick={e => e.stopPropagation()}
        style={{
          width: "100%",
          margin: "0 auto",
          maxWidth: 380,
          background: "var(--bg2)",
          border: "1px solid var(--line)",
          borderRadius: 20,
          overflow: "hidden",
          boxShadow: "0 24px 64px rgba(0,0,0,0.45)",
          animation: "slideUpModal 0.25s cubic-bezier(0.34,1.56,0.64,1)",
        }}
      >
        {/* Modal header */}
        <div style={{
          display: "flex",
          alignItems: "center",
          justifyContent: "space-between",
          padding: "20px 24px",
          borderBottom: "1px solid var(--line)",
          background: "linear-gradient(135deg, rgba(124,58,237,0.12), rgba(99,102,241,0.08))",
        }}>
          <div style={{ display: "flex", alignItems: "center", gap: 10 }}>
            <div style={{
              width: 36, height: 36, borderRadius: 10,
              background: "rgba(124,58,237,0.15)",
              border: "1px solid rgba(168,85,247,0.35)",
              display: "flex", alignItems: "center", justifyContent: "center",
            }}>
              <ShieldCheck size={18} style={{ color: "var(--vio)" }} />
            </div>
            <div>
              <p style={{ fontSize: 14, fontWeight: 700, color: "var(--ink)", margin: 0 }}>
                Admin Login
              </p>
              <p style={{ fontSize: 11, color: "var(--ink2)", margin: 0, marginTop: 1 }}>
                Enter your password to continue
              </p>
            </div>
          </div>

          {/* Close button */}
          <button
            onClick={onClose}
            aria-label="Close"
            style={{
              display: "flex", background: "var(--surface)",
              border: "1px solid var(--line)", borderRadius: 8,
              padding: 6, cursor: "pointer", color: "var(--ink2)",
              transition: "all .18s",
            }}
            onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--lineH)"; }}
            onMouseLeave={e => { e.currentTarget.style.color = "var(--ink2)"; e.currentTarget.style.borderColor = "var(--line)"; }}
          >
            <X size={16} />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} style={{ padding: "24px" }}>

          {/* Password input row */}
          <div style={{ marginBottom: 16 }}>
            <label style={{
              display: "block", fontSize: 11, fontWeight: 600,
              textTransform: "uppercase", letterSpacing: "0.08em",
              color: "var(--ink2)", marginBottom: 8,
            }}>
              Password
            </label>

            {/* Input + show/hide button wrapper */}
            <div style={{ position: "relative" }}>
              <input
                autoFocus
                type={showPass ? "text" : "password"}
                placeholder="Enter admin password"
                value={password}
                onChange={e => setPassword(e.target.value)}
                style={{
                  width: "100%",
                  padding: "11px 44px 11px 14px",
                  borderRadius: 10,
                  fontSize: 14,
                  fontFamily: "inherit",
                  background: "var(--surface)",
                  color: "var(--ink)",
                  outline: "none",
                  boxSizing: "border-box",
                  border: hasError
                    ? "1px solid rgba(239,68,68,0.6)"
                    : "1px solid var(--line)",
                  transition: "border-color .2s",
                }}
                onFocus={e => { if (!hasError) e.target.style.borderColor = "var(--vio)"; }}
                onBlur={e => { if (!hasError) e.target.style.borderColor = "var(--line)"; }}
              />

              {/* Show / hide password toggle */}
              <button
                type="button"
                onClick={() => setShowPass(v => !v)}
                style={{
                  position: "absolute",
                  right: 10,
                  top: "50%",
                  transform: "translateY(-50%)",
                  background: "none",
                  border: "none",
                  cursor: "pointer",
                  color: "var(--ink3)",
                  display: "flex",
                  padding: 4,
                  transition: "color .15s",
                }}
                onMouseEnter={e => (e.currentTarget.style.color = "var(--ink2)")}
                onMouseLeave={e => (e.currentTarget.style.color = "var(--ink3)")}
                aria-label={showPass ? "Hide password" : "Show password"}
              >
                {/* Eye open / eye closed — drawn with SVG to avoid extra imports */}
                {showPass ? (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3" />
                    <path d="M3 3l10 10" stroke="currentColor" strokeWidth="1.3" strokeLinecap="round" />
                  </svg>
                ) : (
                  <svg width="16" height="16" viewBox="0 0 16 16" fill="none">
                    <path d="M2 8s2.5-4 6-4 6 4 6 4-2.5 4-6 4-6-4-6-4z" stroke="currentColor" strokeWidth="1.3" />
                    <circle cx="8" cy="8" r="1.8" stroke="currentColor" strokeWidth="1.3" />
                  </svg>
                )}
              </button>
            </div>

            {/* Wrong password error message */}
            {hasError && (
              <p style={{
                margin: "7px 0 0",
                fontSize: 11,
                color: "#ef4444",
                display: "flex",
                alignItems: "center",
                gap: 5,
                animation: "shakeError 0.35s ease",
              }}>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="none">
                  <circle cx="6" cy="6" r="5" stroke="#ef4444" strokeWidth="1.2" />
                  <path d="M6 4v3M6 8.5v.2" stroke="#ef4444" strokeWidth="1.2" strokeLinecap="round" />
                </svg>
                Incorrect password. Please try again.
              </p>
            )}
          </div>

          {/* Action buttons */}
          <div style={{ display: "flex", gap: 10 }}>
            {/* Cancel */}
            <button
              type="button"
              onClick={onClose}
              style={{
                flex: 1,
                padding: "10px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 600,
                cursor: "pointer",
                fontFamily: "inherit",
                background: "var(--surface)",
                border: "1px solid var(--line)",
                color: "var(--ink2)",
                transition: "all .18s",
              }}
              onMouseEnter={e => { e.currentTarget.style.borderColor = "var(--lineH)"; e.currentTarget.style.color = "var(--ink)"; }}
              onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.color = "var(--ink2)"; }}
            >
              Cancel
            </button>

            {/* Login */}
            <button
              type="submit"
              style={{
                flex: 2,
                padding: "10px",
                borderRadius: 10,
                fontSize: 13,
                fontWeight: 700,
                cursor: "pointer",
                fontFamily: "inherit",
                color: "#fff",
                border: "none",
                background: "linear-gradient(135deg, var(--pur), var(--ind))",
                boxShadow: "var(--glow)",
                transition: "box-shadow .2s, transform .15s",
                display: "flex",
                alignItems: "center",
                justifyContent: "center",
                gap: 7,
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--glowH)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--glow)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              <ShieldCheck size={14} /> Login
            </button>
          </div>
        </form>
      </div>

      {/* Keyframes injected once */}
      <style>{`
        @keyframes fadeInBackdrop {
          from { opacity: 0; }
          to   { opacity: 1; }
        }
        @keyframes slideUpModal {
          from { opacity: 0; transform: translateY(20px) scale(0.97); }
          to   { opacity: 1; transform: translateY(0)    scale(1);    }
        }
        @keyframes shakeError {
          0%,100% { transform: translateX(0);   }
          25%     { transform: translateX(-5px); }
          75%     { transform: translateX(5px);  }
        }
      `}</style>
    </div>
  );
}


/**
 * AdminNavButton
 * Shield icon in the navbar.
 * - Logged OUT → clicking opens the custom AdminLoginModal
 * - Logged IN  → shows green "Admin" badge + Logout button
 */
function AdminNavButton() {
  const { isAdmin, login, logout } = useAdmin();

  // Controls whether the login modal is visible
  const [isModalOpen, setIsModalOpen] = useState(false);

  // Controls whether to show the wrong password error inside the modal
  const [hasLoginError, setHasLoginError] = useState(false);

  function handleOpenModal() {
    setHasLoginError(false); // clear any previous error
    setIsModalOpen(true);
  }

  function handleCloseModal() {
    setIsModalOpen(false);
    setHasLoginError(false);
  }

  function handlePasswordSubmit(typedPassword) {
    const success = login(typedPassword);
    if (success) {
      // Correct password — close the modal
      setIsModalOpen(false);
      setHasLoginError(false);
    } else {
      // Wrong password — show error inside the modal (don't close it)
      setHasLoginError(true);
    }
  }

  // ── Logged in state ──────────────────────────────────────
  if (isAdmin) {
    return (
      <div style={{ display: "flex", alignItems: "center", gap: 6 }}>
        {/* Green "Admin" badge */}
        <span style={{
          display: "flex", alignItems: "center", gap: 5,
          fontSize: 11, fontWeight: 600, padding: "4px 10px", borderRadius: 100,
          background: "rgba(34,197,94,0.15)", border: "1px solid rgba(34,197,94,0.35)",
          color: "#16a34a",
        }}>
          <ShieldCheck size={12} /> Admin
        </span>

        {/* Logout button */}
        <button
          onClick={logout}
          aria-label="Logout from admin"
          title="Logout"
          style={{
            display: "flex", alignItems: "center", gap: 5,
            background: "none", border: "1px solid var(--line)",
            borderRadius: 8, padding: "5px 10px", cursor: "pointer",
            fontSize: 12, fontWeight: 500, color: "var(--ink2)",
            transition: "all .18s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color = "var(--ink)"; e.currentTarget.style.borderColor = "var(--lineH)"; }}
          onMouseLeave={e => { e.currentTarget.style.color = "var(--ink2)"; e.currentTarget.style.borderColor = "var(--line)"; }}
        >
          <LogOut size={13} /> Logout
        </button>
      </div>
    );
  }

  // ── Logged out state ─────────────────────────────────────
  return (
    <>
      {/* Subtle shield icon button */}
      <button
        onClick={handleOpenModal}
        aria-label="Admin login"
        title="Admin login"
        style={{
          display: "flex", alignItems: "center", gap: 5,
          background: "none", border: "1px solid transparent",
          borderRadius: 8, padding: "5px 8px", cursor: "pointer",
          fontSize: 12, color: "var(--ink3)",
          transition: "all .18s",
        }}
        onMouseEnter={e => { e.currentTarget.style.color = "var(--ink2)"; e.currentTarget.style.borderColor = "var(--line)"; }}
        onMouseLeave={e => { e.currentTarget.style.color = "var(--ink3)"; e.currentTarget.style.borderColor = "transparent"; }}
      >
        <ShieldCheck size={14} />
      </button>

      {/* Custom login modal */}
      <AdminLoginModal
        isOpen={isModalOpen}
        onClose={handleCloseModal}
        onSubmit={handlePasswordSubmit}
        hasError={hasLoginError}
      />
    </>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive: true });
    return () => window.removeEventListener("scroll", fn);
  }, []);
  useEffect(() => {
    const fn = () => { if (window.innerWidth >= 768) setOpen(false); };
    window.addEventListener("resize", fn);
    return () => window.removeEventListener("resize", fn);
  }, []);
  useEffect(() => {
    document.body.style.overflow = open ? "hidden" : "";
    return () => { document.body.style.overflow = ""; };
  }, [open]);

  /* desktop link style */
  const dl = ({ isActive }) => ({
    padding: "8px 18px", borderRadius: 8,
    fontSize: 14, fontWeight: 500,
    textDecoration: "none", transition: "all .18s",
    background: isActive ? "rgba(124,58,237,0.15)" : "transparent",
    border: isActive ? "1px solid rgba(168,85,247,0.42)" : "1px solid transparent",
    color: isActive ? "var(--ink)" : "var(--ink2)",
    whiteSpace: "nowrap",
  });

  return (
    <>
      {/* ══ MAIN NAV ═════════════════════════════════════ */}
      <header style={{
        position: "fixed", top: scrolled ? 16 : 24, left: "50%", transform: "translateX(-50%)", zIndex: 100,
        height: 64, width: "calc(100% - 48px)", maxWidth: 1100,
        borderRadius: 32,
        background: "var(--nav-bg)",
        border: "1px solid var(--line)",
        boxShadow: scrolled ? "0 12px 48px rgba(0,0,0,0.3)" : "0 8px 32px rgba(0,0,0,0.15)",
        transition: "all .4s cubic-bezier(0.34, 1.56, 0.64, 1)",
      }}>
        <div style={{
          maxWidth: 1200, margin: "0 auto",
          padding: "0 24px", height: "100%",
          display: "flex", alignItems: "center", justifyContent: "space-between",
          gap: 16,
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ display: "flex", alignItems: "center", gap: 10, textDecoration: "none", flexShrink: 0 }}>
            {/* <Logo /> */}
            <img src={adminlogo} alt="Logo" style={{ width: 28, height: 28, borderRadius: "50%" }} />
            <div style={{ display: "flex", flexDirection: "column", lineHeight: 1.2 }}>
              <span style={{
                fontSize: 15, fontWeight: 800, letterSpacing: "-0.02em",
                background: "linear-gradient(135deg,var(--ink) 40%,var(--vio))",
                WebkitBackgroundClip: "text", WebkitTextFillColor: "transparent",
              }}>Mahavir Kumar Mahato</span>
              <span className="hidden sm:block font-extrabold" style={{ fontSize: 8, letterSpacing: "0.18em", textTransform: "uppercase", color: "var(--ink3)" }}>
                Software Developer
              </span>
            </div>
          </NavLink>

          {/* Desktop center links */}
          <nav className="hidden md:flex" style={{ alignItems: "center", gap: 4 }}>
            {LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} style={dl}
                onMouseEnter={e => { if (!e.currentTarget.style.background.includes("rgba(124")) e.currentTarget.style.color = "var(--ink)"; }}
                onMouseLeave={e => { if (!e.currentTarget.style.background.includes("rgba(124")) e.currentTarget.style.color = "var(--ink2)"; }}
              >{label}</NavLink>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex" style={{ alignItems: "center", gap: 12, flexShrink: 0 }}>
            <ThemePill />

            {/* Admin login / logout — subtle, only visible on hover */}
            <AdminNavButton />

            <button
              onClick={() => navigate("/contact")}
              style={{
                display: "flex", alignItems: "center", gap: 8,
                padding: "10px 22px", borderRadius: 10,
                fontSize: 14, fontWeight: 700, color: "#fff", border: "none",
                background: "linear-gradient(135deg,var(--pur),var(--ind))",
                boxShadow: "var(--glow)",
                transition: "box-shadow .2s, transform .15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow = "var(--glowH)"; e.currentTarget.style.transform = "translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow = "var(--glow)"; e.currentTarget.style.transform = "translateY(0)"; }}
            >
              Hire Me
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5H11M7.5 3L11 6.5L7.5 10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round" />
              </svg>
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden" style={{ alignItems: "center", gap: 10 }}>
            <ThemePill />
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Menu"
              style={{ background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "6px 8px", color: "var(--ink)", display: "flex" }}
            >
              {open ? <X size={20} /> : <Menu size={20} />}
            </button>
          </div>
        </div>
      </header>

      {/* ══ MOBILE DRAWER ══════════════════════════════ */}
      <div
        className="md:hidden"
        style={{
          position: "fixed", inset: 0, zIndex: 101,
          background: "var(--bg)",
          display: "flex", flexDirection: "column", alignItems: "center", justifyContent: "center", gap: 32,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition: "transform .32s cubic-bezier(.76,0,.24,1)",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{ position: "absolute", top: 24, right: 24, background: "var(--surface)", border: "1px solid var(--line)", borderRadius: 8, padding: "6px 8px", color: "var(--ink)", display: "flex" }}
        >
          <X size={20} />
        </button>

        {LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to} to={to} end={end}
            onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              fontSize: 26, fontWeight: 800, textDecoration: "none",
              color: isActive ? "var(--vio)" : "var(--ink2)",
              transition: "color .18s",
            })}
          >{label}</NavLink>
        ))}

        <button
          onClick={() => { setOpen(false); navigate("/contact"); }}
          style={{
            display: "flex", alignItems: "center", gap: 8,
            padding: "12px 32px", borderRadius: 12,
            fontSize: 16, fontWeight: 700, color: "#fff", border: "none",
            background: "linear-gradient(135deg,var(--pur),var(--blu))",
            marginTop: 8,
          }}
        >
          Hire Me →
        </button>

        <div style={{ display: "flex", flexDirection: "column", alignItems: "center", gap: 10, marginTop: 8 }}>
          <span style={{ fontSize: 10, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--ink3)" }}>Theme</span>
          <ThemePill size="lg" />
        </div>
      </div>
    </>
  );
}