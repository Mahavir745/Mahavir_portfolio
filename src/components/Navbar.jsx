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
import adminLogo from "../../public/mahavir.jpg";

const LINKS = [
  { to:"/",        label:"Home",    end:true  },
  { to:"/project", label:"Project", end:false },
  { to:"/blog",    label:"Blog",    end:false },
  { to:"/contact", label:"Contact", end:false },
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
          <stop stopColor="#a855f7"/><stop offset="1" stopColor="#3b82f6"/>
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
        position:"relative", width:W, height:H, flexShrink:0,
        borderRadius:H, cursor:"pointer",
        background:"var(--surface)", border:"1px solid var(--line)",
        transition:"background .3s",
      }}
    >
      <span style={{
        position:"absolute", top:(H-K)/2, left:off,
        width:K, height:K, borderRadius:"50%",
        background:"linear-gradient(135deg,var(--vio),var(--blu))",
        display:"flex", alignItems:"center", justifyContent:"center",
        transition:"left .3s cubic-bezier(.34,1.56,.64,1)",
      }}>
        {dark
          ? <Moon  size={size==="lg"?12:9}  color="#fff" />
          : <Sun   size={size==="lg"?12:9}  color="#fff" />}
      </span>
    </button>
  );
}

/**
 * AdminNavButton
 * Shows a subtle shield icon in the nav.
 * - When logged OUT: clicking prompts for password
 * - When logged IN:  shows green "Admin" badge + logout button
 */
function AdminNavButton() {
  const { isAdmin, login, logout } = useAdmin();

  function handleLogin() {
    const password = window.prompt("Enter admin password:");
    if (password === null) return; // user cancelled
    const success = login(password);
    if (!success) alert("Incorrect password. Try again.");
  }

  if (isAdmin) {
    return (
      <div style={{ display:"flex", alignItems:"center", gap:6 }}>
        {/* Green "Admin" badge */}
        <span style={{
          display:"flex", alignItems:"center", gap:5,
          fontSize:11, fontWeight:600, padding:"4px 10px", borderRadius:100,
          background:"rgba(34,197,94,0.15)", border:"1px solid rgba(34,197,94,0.35)",
          color:"#16a34a",
        }}>
          <ShieldCheck size={12} />
          Admin
        </span>
        {/* Logout button */}
        <button
          onClick={logout}
          aria-label="Logout from admin"
          title="Logout"
          style={{
            display:"flex", alignItems:"center", gap:5,
            background:"none", border:"1px solid var(--line)",
            borderRadius:8, padding:"5px 10px", cursor:"pointer",
            fontSize:12, fontWeight:500, color:"var(--ink2)",
            transition:"all .18s",
          }}
          onMouseEnter={e => { e.currentTarget.style.color="var(--ink)"; e.currentTarget.style.borderColor="var(--lineH)"; }}
          onMouseLeave={e => { e.currentTarget.style.color="var(--ink2)"; e.currentTarget.style.borderColor="var(--line)"; }}
        >
          <LogOut size={13} /> Logout
        </button>
      </div>
    );
  }

  return (
    <button
      onClick={handleLogin}
      aria-label="Admin login"
      title="Admin login"
      style={{
        display:"flex", alignItems:"center", gap:5,
        background:"none", border:"1px solid transparent",
        borderRadius:8, padding:"5px 8px", cursor:"pointer",
        fontSize:12, color:"var(--ink3)",
        transition:"all .18s",
      }}
      onMouseEnter={e => { e.currentTarget.style.color="var(--ink2)"; e.currentTarget.style.borderColor="var(--line)"; }}
      onMouseLeave={e => { e.currentTarget.style.color="var(--ink3)"; e.currentTarget.style.borderColor="transparent"; }}
    >
      <ShieldCheck size={14} />
    </button>
  );
}

export default function Navbar() {
  const navigate = useNavigate();
  const [scrolled, setScrolled] = useState(false);
  const [open,     setOpen]     = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 20);
    window.addEventListener("scroll", fn, { passive:true });
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
    padding:"8px 18px", borderRadius:8,
    fontSize:14, fontWeight:500,
    textDecoration:"none", transition:"all .18s",
    background: isActive ? "rgba(124,58,237,0.15)" : "transparent",
    border: isActive ? "1px solid rgba(168,85,247,0.42)" : "1px solid transparent",
    color: isActive ? "var(--ink)" : "var(--ink2)",
    whiteSpace:"nowrap",
  });

  return (
    <>
      {/* ══ MAIN NAV ═════════════════════════════════════ */}
      <header style={{
        position:"fixed", top:0, left:0, right:0, zIndex:100,
        height:64,
        background:"var(--nav-bg)",
        backdropFilter:"blur(24px)",
        WebkitBackdropFilter:"blur(24px)",
        borderBottom:"1px solid var(--line)",
        boxShadow: scrolled ? "0 4px 40px rgba(0,0,0,0.2)" : "none",
        transition:"box-shadow .3s",
      }}>
        <div style={{
          maxWidth:1200, margin:"0 auto",
          padding:"0 24px", height:"100%",
          display:"flex", alignItems:"center", justifyContent:"space-between",
          gap:16,
        }}>
          {/* Logo */}
          <NavLink to="/" style={{ display:"flex", alignItems:"center", gap:10, textDecoration:"none", flexShrink:0 }}>
            {/* <Logo /> */}
              <img src={adminLogo} alt="Logo" style={{ width:28, height:28, borderRadius:"50%" }} />
            <div style={{ display:"flex", flexDirection:"column", lineHeight:1.2 }}>
              <span style={{
                fontSize:15, fontWeight:800, letterSpacing:"-0.02em",
                background:"linear-gradient(135deg,var(--ink) 40%,var(--vio))",
                WebkitBackgroundClip:"text", WebkitTextFillColor:"transparent",
              }}>Mahavir Kumar Mahato</span>
              <span className="hidden sm:block font-extrabold" style={{ fontSize:8, letterSpacing:"0.18em", textTransform:"uppercase", color:"var(--ink3)" }}>
                Software Developer
              </span>
            </div>
          </NavLink>

          {/* Desktop center links */}
          <nav className="hidden md:flex" style={{ alignItems:"center", gap:4 }}>
            {LINKS.map(({ to, label, end }) => (
              <NavLink key={to} to={to} end={end} style={dl}
                onMouseEnter={e => { if (!e.currentTarget.style.background.includes("rgba(124")) e.currentTarget.style.color="var(--ink)"; }}
                onMouseLeave={e => { if (!e.currentTarget.style.background.includes("rgba(124")) e.currentTarget.style.color="var(--ink2)"; }}
              >{label}</NavLink>
            ))}
          </nav>

          {/* Desktop right */}
          <div className="hidden md:flex" style={{ alignItems:"center", gap:12, flexShrink:0 }}>
            <ThemePill />

            {/* Admin login / logout — subtle, only visible on hover */}
            <AdminNavButton />

            <button
              onClick={() => navigate("/contact")}
              style={{
                display:"flex", alignItems:"center", gap:8,
                padding:"10px 22px", borderRadius:10,
                fontSize:14, fontWeight:700, color:"#fff", border:"none",
                background:"linear-gradient(135deg,var(--pur),var(--ind))",
                boxShadow:"var(--glow)",
                transition:"box-shadow .2s, transform .15s",
              }}
              onMouseEnter={e => { e.currentTarget.style.boxShadow="var(--glowH)"; e.currentTarget.style.transform="translateY(-1px)"; }}
              onMouseLeave={e => { e.currentTarget.style.boxShadow="var(--glow)";  e.currentTarget.style.transform="translateY(0)"; }}
            >
              Hire Me
              <svg width="13" height="13" viewBox="0 0 13 13" fill="none">
                <path d="M2 6.5H11M7.5 3L11 6.5L7.5 10" stroke="white" strokeWidth="1.6" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </button>
          </div>

          {/* Mobile right */}
          <div className="flex md:hidden" style={{ alignItems:"center", gap:10 }}>
            <ThemePill />
            <button
              onClick={() => setOpen(v => !v)}
              aria-label="Menu"
              style={{ background:"var(--surface)", border:"1px solid var(--line)", borderRadius:8, padding:"6px 8px", color:"var(--ink)", display:"flex" }}
            >
              {open ? <X size={20}/> : <Menu size={20}/>}
            </button>
          </div>
        </div>
      </header>

      {/* ══ MOBILE DRAWER ══════════════════════════════ */}
      <div
        className="md:hidden"
        style={{
          position:"fixed", inset:0, zIndex:99,
          background:"var(--bg)",
          display:"flex", flexDirection:"column", alignItems:"center", justifyContent:"center", gap:32,
          transform: open ? "translateX(0)" : "translateX(100%)",
          transition:"transform .32s cubic-bezier(.76,0,.24,1)",
        }}
      >
        <button
          onClick={() => setOpen(false)}
          aria-label="Close"
          style={{ position:"absolute", top:18, right:18, background:"var(--surface)", border:"1px solid var(--line)", borderRadius:8, padding:"6px 8px", color:"var(--ink)", display:"flex" }}
        >
          <X size={20}/>
        </button>

        {LINKS.map(({ to, label, end }) => (
          <NavLink
            key={to} to={to} end={end}
            onClick={() => setOpen(false)}
            style={({ isActive }) => ({
              fontSize:26, fontWeight:800, textDecoration:"none",
              color: isActive ? "var(--vio)" : "var(--ink2)",
              transition:"color .18s",
            })}
          >{label}</NavLink>
        ))}

        <button
          onClick={() => { setOpen(false); navigate("/contact"); }}
          style={{
            display:"flex", alignItems:"center", gap:8,
            padding:"12px 32px", borderRadius:12,
            fontSize:16, fontWeight:700, color:"#fff", border:"none",
            background:"linear-gradient(135deg,var(--pur),var(--ind))",
            marginTop:8,
          }}
        >
          Hire Me →
        </button>

        <div style={{ display:"flex", flexDirection:"column", alignItems:"center", gap:10, marginTop:8 }}>
          <span style={{ fontSize:10, letterSpacing:"0.16em", textTransform:"uppercase", color:"var(--ink3)" }}>Theme</span>
          <ThemePill size="lg" />
        </div>
      </div>
    </>
  );
}
