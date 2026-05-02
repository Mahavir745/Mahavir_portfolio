import { Github, Linkedin, Instagram, Mail } from "lucide-react";

/* UPDATE hrefs with your real profiles */
const S = [
  { h:"https://github.com/Mahavir745",                                     I:Github,    l:"GitHub"    },
  { h:"https://www.linkedin.com/in/mahavir-kumar-mahato-4a6754297/",       I:Linkedin,  l:"LinkedIn"  },
  { h:"mailto:mahavir07v@gmail.com",                                I:Mail,      l:"Email"     },
];

export default function Footer() {
  return (
    <footer style={{ position:"relative", zIndex:1, borderTop:"1px solid var(--line)" }}>
      <div style={{ position:"absolute", top:0, left:0, right:0, height:1, background:"linear-gradient(90deg,transparent,rgba(168,85,247,.45),transparent)" }}/>
      <div style={{ maxWidth:1200, margin:"0 auto", padding:"40px 24px", display:"flex", flexDirection:"column", alignItems:"center", gap:18 }}>
        <div style={{ display:"flex", gap:14 }}>
          {S.map(({ h, I, l }) => (
            <a
              key={l} href={h} target="_blank" rel="noopener noreferrer" aria-label={l}
              style={{ padding:"10px", borderRadius:12, background:"var(--surface)", border:"1px solid var(--line)", color:"var(--ink2)", display:"flex", transition:"all .2s" }}
              onMouseEnter={e => { e.currentTarget.style.color="var(--vio)"; e.currentTarget.style.borderColor="var(--lineH)"; e.currentTarget.style.transform="translateY(-2px)"; }}
              onMouseLeave={e => { e.currentTarget.style.color="var(--ink2)"; e.currentTarget.style.borderColor="var(--line)"; e.currentTarget.style.transform="translateY(0)"; }}
            ><I size={18}/></a>
          ))}
        </div>
        <p style={{ fontSize:12, color:"var(--ink3)", textAlign:"center" }}>
          Discover more of my work and connect with me on my social profiles.
        </p>
        <p style={{ fontSize:11, color:"var(--ink3)" }}>
          © {new Date().getFullYear()} Mahavir Kumar Mahato · Built with React &amp; Tailwind CSS
        </p>
      </div>
    </footer>
  );
}
