import { BrowserRouter, Routes, Route } from "react-router-dom";
import { useTheme } from "./context/ThemeContext";
import Navbar from "./components/Navbar";
import Footer from "./components/Footer";
import Home from "./pages/Home";
import Projects from "./pages/Projects";
import Contact from "./pages/Contact";
import Blog from "./pages/Blog";

function MeshBg() {
  const { theme } = useTheme();
  // Using CSS variables from index.css for spatial UI vibrancy
  const orb = (bg, w, h, top, left, right, bottom, delay) => ({
    position: "absolute", borderRadius: "50%",
    width: w, height: h, background: bg,
    top, left, right, bottom,
    opacity: bg.includes("var(--pnk)") || bg.includes("var(--ind)") ? "var(--orb2)" : "var(--orb)",
    filter: "blur(110px)",
    animation: `orb 16s ease-in-out ${delay} infinite`,
    pointerEvents: "none",
  });
  return (
    <div aria-hidden="true" style={{ position: "fixed", inset: 0, zIndex: 0, overflow: "hidden", pointerEvents: "none" }}>
      <div style={orb("radial-gradient(circle,var(--vio),transparent 70%)", "clamp(300px,52vw,700px)", "clamp(300px,52vw,700px)", "-18%", "-10%", "auto", "auto", "0s")} />
      <div style={orb("radial-gradient(circle,var(--blu),transparent 70%)", "clamp(260px,44vw,580px)", "clamp(260px,44vw,580px)", "6%", "auto", "-10%", "auto", "-5s")} />
      <div style={orb("radial-gradient(circle,var(--pnk),transparent 70%)", "clamp(180px,32vw,460px)", "clamp(180px,32vw,460px)", "auto", "28%", "auto", "18%", "-10s")} />
      <div style={orb("radial-gradient(circle,var(--ind),transparent 70%)", "clamp(150px,24vw,340px)", "clamp(150px,24vw,340px)", "auto", "auto", "4%", "-5%", "-3s")} />
    </div>
  );
}

export default function App() {
  return (
    <BrowserRouter>
      <MeshBg />
      <div style={{ position: "relative", zIndex: 1, display: "flex", flexDirection: "column", minHeight: "100vh" }}>
        <Navbar />
        <main style={{ flex: 1 }}>
          <Routes>
            <Route path="/" element={<Home />} />
            <Route path="/project" element={<Projects />} />
            <Route path="/blog" element={<Blog />} />
            <Route path="/contact" element={<Contact />} />
          </Routes>
        </main>
        <Footer />
      </div>
    </BrowserRouter>
  );
}
