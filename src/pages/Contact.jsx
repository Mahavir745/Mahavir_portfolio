/**
 * Contact.jsx — Brand-new HyperVerge-style contact page
 *
 * Layout:
 *  • Full-width centered hero heading
 *  • Two-column: contact cards (left) + glass form (right)
 *
 * CONNECT BACKEND → replace setTimeout in submit handler
 * UPDATE contact info → edit INFO array
 */
import { useState } from "react";
import emailjs from "@emailjs/browser";
import { Send, Lock, ShieldCheck, Github, Linkedin, Mail, MapPin, ArrowRight, Hand } from "lucide-react";

// ── EmailJS credentials ──────────────────────────────────────
// These values come from your .env file in the project root.
// Never paste the real keys here directly — keep them in .env.
// How to get these values → see .env.example in the project root.
const EMAILJS_SERVICE_ID = import.meta.env.VITE_EMAILJS_SERVICE_ID;
const EMAILJS_TEMPLATE_ID = import.meta.env.VITE_EMAILJS_TEMPLATE_ID;
const EMAILJS_PUBLIC_KEY = import.meta.env.VITE_EMAILJS_PUBLIC_KEY;

/* Contact info items  — UPDATE hrefs ──────────────────── */
const INFO = [
  {
    Icon: Mail,
    label: "Email",
    val: "mahavir07v@gmail.com",
    href: "mailto:mahavir07v@gmail.com",
    c: "#a855f7"
  },
  {
    Icon: Linkedin,
    label: "LinkedIn",
    val: "Mahavir Kumar Mahato",
    href: "https://www.linkedin.com/in/mahavir-kumar-mahato-4a6754297/",
    c: "#0A66C2"
  },
  {
    Icon: Github,
    label: "GitHub",
    val: "Mahavir745",
    href: "https://github.com/Mahavir745",
    c: "#6e40c9"
  },
  {
    Icon: MapPin,
    label: "Location",
    val: "India · Open to Remote", href: null, c: "#ec4899"
  },
];

const EMPTY = { name: "", email: "", msg: "" };

/* Reusable field wrapper */
function Field({ label, error, children }) {
  return (
    <div style={{ display: "flex", flexDirection: "column", gap: 6 }}>
      <label style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{label}</label>
      {children}
      {error && <span style={{ fontSize: 11, color: "#f472b6" }}>{error}</span>}
    </div>
  );
}


// greeting message

  const currentHour = new Date().getHours();
  let greeting;

  if (currentHour < 12) {
    greeting = "Good Morning!";
  } else if (currentHour < 17) {
    greeting = "Good Afternoon!";
  } else if (currentHour < 21) {
    greeting = "Good Evening!";
  } else {
    greeting = "Good Night!";
  }

export default function Contact() {
  const [form, setForm] = useState(EMPTY);
  const [errs, setErrs] = useState({});

  // Tracks what the form is currently doing:
  //   "idle"    → waiting for the user to fill in and submit
  //   "sending" → EmailJS request is in progress (shows spinner)
  //   "done"    → email sent successfully (shows green tick)
  //   "error"   → something went wrong (shows error message)
  const [status, setStatus] = useState("idle");

  const onChange = ({ target: { name, value } }) => {
    setForm(p => ({ ...p, [name]: value }));
    if (errs[name]) setErrs(p => ({ ...p, [name]: "" }));
  };

  const validate = () => {
    const e = {};
    if (!form.name.trim()) e.name = "Name is required.";
    if (!form.email.trim()) e.email = "Email is required.";
    else if (!/\S+@\S+\.\S+/.test(form.email)) e.email = "Enter a valid email.";
    if (!form.msg.trim()) e.msg = "Please write a message.";
    return e;
  };

  const submit = async e => {
    e.preventDefault();

    // Step 1 — run validation. If anything fails, show errors and stop.
    const validationErrors = validate();
    if (Object.keys(validationErrors).length) {
      setErrs(validationErrors);
      return;
    }

    // Step 2 — show the spinner while we wait for EmailJS
    setStatus("sending");

    try {
      // Step 3 — send the email via EmailJS.
      //
      // emailjs.send() takes 4 arguments:
      //   1. Service ID  → which email account to send from (e.g. your Gmail)
      //   2. Template ID → the email template you created on emailjs.com
      //   3. Template variables → these map to {{from_name}}, {{from_email}},
      //                           {{message}} in your EmailJS template
      //   4. Public Key  → identifies your EmailJS account (safe to use in browser)
      //
      // The template variables below must match the variable names
      // you set in your EmailJS template exactly.
      await emailjs.send(
        EMAILJS_SERVICE_ID,
        EMAILJS_TEMPLATE_ID,
        {
          from_name: form.name,    // maps to {{from_name}} in your template
          from_email: form.email,   // maps to {{from_email}} in your template
          message: form.msg,     // maps to {{message}} in your template
          reply_to: form.email,   // lets you reply directly to the sender
        },
        EMAILJS_PUBLIC_KEY
      );

      // Step 4 — email sent! Show the green success state and clear the form.
      setStatus("done");
      setForm(EMPTY);

      // Step 5 — after 4 seconds, reset the button back to idle
      //          so the user can send another message if they want.
      setTimeout(() => setStatus("idle"), 4000);

    } catch (error) {
      // Something went wrong — could be network, wrong key, etc.
      // Show the error state so the user knows to try again.
      console.error("EmailJS error:", error);
      setStatus("error");

      // Reset back to idle after 4 seconds so they can try again
      setTimeout(() => setStatus("idle"), 4000);
    }
  };

  const inp = name => ({
    name, value: form[name], onChange,
    style: {
      width: "100%", padding: "12px 16px", borderRadius: 12,
      fontSize: 14, fontFamily: "inherit",
      background: "var(--surface)", color: "var(--ink)", outline: "none",
      border: `1px solid ${errs[name] ? "#f472b6" : "var(--line)"}`,
      transition: "border-color .2s, background .2s",
    },
    onFocus: e => (e.target.style.borderColor = "var(--vio)"),
    onBlur: e => (e.target.style.borderColor = errs[name] ? "#f472b6" : "var(--line)"),
  });

  return (
    <div style={{ paddingTop: 64 }}>
      {/* ── Page hero ────────────────────────────────── */}
      <div style={{ padding: "72px 24px 56px", textAlign: "center" }}>
        <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 10, marginBottom: 16 }}>
          <span style={{ height: 1, width: 24, background: "var(--vio)", opacity: .55 }} />
          <span style={{ fontSize: 11, fontWeight: 700, letterSpacing: "0.16em", textTransform: "uppercase", color: "var(--vio)" }}>Get In Touch</span>
          <span style={{ height: 1, width: 24, background: "var(--vio)", opacity: .55 }} />
        </div>
        <h1 style={{ fontSize: "clamp(34px,6vw,68px)", fontWeight: 800, letterSpacing: "-0.04em", lineHeight: 1.05, marginBottom: 14 }}>
          Let's <span className="gt">Work Together</span>
        </h1>
        <p style={{ fontSize: 15, color: "var(--ink2)", maxWidth: 480, margin: "0 auto", lineHeight: 1.7 }}>
          Have a project in mind, a question, or just want to connect?
          I'd love to hear from you.
        </p>
      </div>

      {/* ── Two-column content ──────────────────────── */}
      <div style={{ maxWidth: 1200, margin: "0 auto", padding: "0 24px 80px" }}>
        <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit,minmax(300px,1fr))", gap: 28, alignItems: "start" }}>

          {/* LEFT — info cards */}
          <div style={{ display: "flex", flexDirection: "column", gap: 18 }}>
            <h2 style={{ fontSize: 22, fontWeight: 800, color: "var(--pnk)", letterSpacing: "-0.02em" }} className="flex items-center gap-1 ">
              {greeting} <Hand />
            </h2>
            <p style={{ fontSize: 14, color: "var(--ink2)", lineHeight: 1.75 }}>
              I'm currently open to new opportunities and collaborations.
              Feel free to reach out through any of the channels below.
            </p>

            {INFO.map(({ Icon, label, val, href, c }) => (
              <div
                key={label}
                style={{ display: "flex", alignItems: "center", gap: 14, padding: "16px 18px", borderRadius: 16, background: "var(--surface)", border: "1px solid var(--line)", backdropFilter: "blur(12px)", transition: "all .2s" }}
                onMouseEnter={e => { e.currentTarget.style.borderColor = `${c}66`; e.currentTarget.style.background = "var(--surfaceH)"; }}
                onMouseLeave={e => { e.currentTarget.style.borderColor = "var(--line)"; e.currentTarget.style.background = "var(--surface)"; }}
              >
                <div style={{ width: 40, height: 40, borderRadius: 10, flexShrink: 0, display: "flex", alignItems: "center", justifyContent: "center", background: `${c}18`, border: `1px solid ${c}30`, color: c }}>
                  <Icon size={18} />
                </div>
                <div>
                  <p style={{ fontSize: 10, fontWeight: 700, textTransform: "uppercase", letterSpacing: "0.12em", color: "var(--ink3)", marginBottom: 3 }}>{label}</p>
                  {href
                    ? <a href={href} target="_blank" rel="noopener noreferrer" style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)", textDecoration: "none", transition: "color .15s" }}
                      onMouseEnter={e => (e.currentTarget.style.color = c)}
                      onMouseLeave={e => (e.currentTarget.style.color = "var(--ink)")}>{val}</a>
                    : <p style={{ fontSize: 13, fontWeight: 600, color: "var(--ink)" }}>{val}</p>
                  }
                </div>
              </div>
            ))}

            {/* Quick hire CTA */}
            <a
              href="https://www.linkedin.com/in/mahavir-kumar-mahato-4a6754297/"
              target="_blank" rel="noopener noreferrer"
              style={{ display: "flex", alignItems: "center", justifyContent: "space-between", padding: "18px 20px", borderRadius: 16, background: "linear-gradient(135deg,rgba(124,58,237,0.12),rgba(59,130,246,0.08))", border: "1px solid rgba(168,85,247,0.22)", textDecoration: "none", transition: "all .2s" }}
              onMouseEnter={e => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.5)")}
              onMouseLeave={e => (e.currentTarget.style.borderColor = "rgba(168,85,247,0.22)")}
            >
              <div>
                <p style={{ fontSize: 13, fontWeight: 700, color: "var(--ink)" }}>View LinkedIn Profile</p>
                <p style={{ fontSize: 11, color: "var(--ink2)", marginTop: 2 }}>Open to full-time &amp; freelance work</p>
              </div>
              <ArrowRight size={18} style={{ color: "var(--vio)", flexShrink: 0 }} />
            </a>
          </div>

          {/* RIGHT — form card */}
          <div style={{ borderRadius: 20, overflow: "hidden", background: "var(--surface)", border: "1px solid var(--line)", backdropFilter: "blur(18px)" }}>

            {/* Form header */}
            <div style={{ padding: "18px 24px", textAlign: "center", fontWeight: 700, fontSize: 14, letterSpacing: "0.04em", color: "#fff", background: "linear-gradient(135deg,var(--pur),var(--ind))" }}>
              Send a Message
            </div>

            <form onSubmit={submit} style={{ padding: "28px 24px", display: "flex", flexDirection: "column", gap: 20 }}>
              <Field label="Name:" error={errs.name}>
                <input {...inp("name")} type="text" placeholder="enter your name" />
              </Field>

              <Field label="Email:" error={errs.email}>
                <input {...inp("email")} type="email" placeholder="eg: example@gmail.com" />
              </Field>

              <Field label="Message:" error={errs.msg}>
                <textarea
                  {...inp("msg")}
                  rows={5}
                  placeholder="Tell me about your project or just say hi :)"
                  style={{ ...inp("msg").style, resize: "none" }}
                  onFocus={inp("msg").onFocus}
                  onBlur={inp("msg").onBlur}
                />
              </Field>

              {/* Submit block */}
              <div style={{ borderRadius: 12, overflow: "hidden", border: "1px solid rgba(168,85,247,.2)" }}>
                <button
                  type="submit"
                  disabled={status !== "idle"}
                  style={{
                    width: "100%", display: "flex", alignItems: "center", justifyContent: "center", gap: 8,
                    padding: "14px", fontSize: 14, fontWeight: 700, color: "#fff", border: "none", fontFamily: "inherit",
                    cursor: status === "idle" ? "pointer" : "not-allowed",
                    opacity: status === "sending" ? .75 : 1,
                    background: status === "done"
                      ? "linear-gradient(135deg,#059669,#047857)"   // green on success
                      : status === "error"
                        ? "linear-gradient(135deg,#dc2626,#b91c1c)"   // red on error
                        : "linear-gradient(135deg,var(--pur),var(--ind))",
                    transition: "background .3s",
                  }}
                >
                  {/* Spinner — shown while sending */}
                  {status === "sending" && (
                    <svg className="animate-spin" width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <circle cx="7" cy="7" r="5" stroke="rgba(255,255,255,.3)" strokeWidth="2" />
                      <path d="M7 2A5 5 0 0112 7" stroke="white" strokeWidth="2" strokeLinecap="round" />
                    </svg>
                  )}
                  {/* Green tick — shown on success */}
                  {status === "done" && (
                    <svg width="14" height="14" viewBox="0 0 14 14" fill="none">
                      <path d="M2 7L5.5 10.5L12 4" stroke="white" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" />
                    </svg>
                  )}
                  {/* Send icon — shown when idle */}
                  {status === "idle" && <Send size={14} />}

                  {/* Button label changes based on current status */}
                  {status === "sending" ? "Sending…"
                    : status === "done" ? "Message Sent!"
                      : status === "error" ? "Failed — Try Again"
                        : "Send Message"}
                </button>

                {/* "End-to-end encrypted" strip below button */}
                <div style={{ display: "flex", alignItems: "center", justifyContent: "center", gap: 6, padding: "9px", fontSize: 11, background: "rgba(0,0,0,.18)", color: "var(--ink3)" }}>
                  <Lock size={9} /> End-to-end encrypted
                </div>
              </div>

              {/* Error message — only visible when status is "error" */}
              {status === "error" && (
                <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "12px 16px", borderRadius: 12, background: "rgba(239,68,68,0.08)", border: "1px solid rgba(239,68,68,0.25)", fontSize: 12, lineHeight: 1.65 }}>
                  <ShieldCheck size={14} style={{ flexShrink: 0, marginTop: 1, color: "#ef4444" }} />
                  <div style={{ color: "var(--ink2)" }}>
                    <span style={{ fontWeight: 700, color: "#ef4444" }}>Could not send message. </span>
                    Please check your internet connection and try again.
                    If the problem persists, email me directly at{" "}
                    <a href="mailto:mahavir07v@gmail.com" style={{ color: "var(--vio)", fontWeight: 600 }}>
                      mahavir07v@gmail.com
                    </a>
                  </div>
                </div>
              )}

              {/* Privacy note */}
              <div style={{ display: "flex", alignItems: "flex-start", gap: 10, padding: "14px 16px", borderRadius: 12, background: "var(--bg)", border: "1px solid var(--line)", fontSize: 12, lineHeight: 1.65 }}>
                <ShieldCheck size={14} style={{ flexShrink: 0, marginTop: 1, color: "var(--vio)" }} />
                <div style={{ color: "var(--ink2)" }}>
                  <span style={{ fontWeight: 700, color: "#f472b6" }}>Note: </span>
                  All information is private and kept confidential.{" "}
                  <a href="https://www.linkedin.com/in/mahavir-kumar-mahato-4a6754297/" target="_blank" rel="noopener noreferrer"
                    style={{ fontWeight: 600, color: "var(--vio)", transition: "color .15s" }}
                    onMouseEnter={e => (e.currentTarget.style.color = "var(--blu)")}
                    onMouseLeave={e => (e.currentTarget.style.color = "var(--vio)")}>
                    Managed by Mahavir745.
                  </a>
                </div>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
}