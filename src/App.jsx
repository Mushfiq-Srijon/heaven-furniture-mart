import { useState, useEffect } from "react";
import logo from "./assets/logo.jpg";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";

/* ── useScrollReveal ────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) => entries.forEach((e) => { if (e.isIntersecting) e.target.classList.add("visible"); }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Nav ────────────────────────────────────────────────────── */
function Nav() {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);

  useEffect(() => {
    const fn = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  const links = ["Collections", "Bespoke", "Why Us", "Contact"];
  const ids = ["collections", "bespoke", "why", "contact"];

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">
          <img src={logo} alt="Heaven Furniture Mart" className="nav-logo-img" />
          <span>Designed · Crafted · Customized</span>
        </a>
        <div className="nav-links">
          {links.map((l, i) => (
            <a key={l} href={`#${ids[i]}`}>{l}</a>
          ))}

          <a href="https://wa.me/8801960481983?text=Hi%2C%20I%27d%20like%20to%20request%20a%20design%20consultation."
            className="nav-cta"
            target="_blank"
            rel="noreferrer"
          >
            Get a Quote
          </a>
        </div>
        <div className="nav-hamburger" onClick={() => setOpen(prev => !prev)}>
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        {links.map((l, i) => (
          <a key={l} href={`#${ids[i]}`}>{l}</a>
        ))}

        <a href="https://wa.me/8801960481983"
          className="btn-gold"
          target="_blank"
          rel="noreferrer"
        >
          Get a Quote
        </a>
      </div>
    </>
  );
}

/* ── Hero ───────────────────────────────────────────────────── */
function Hero() {
  return (
    <section id="hero" className="hero">
      <div className="hero-bg" />
      <div className="hero-overlay" />
      <div className="hero-content">
        <p className="hero-eyebrow">Chattogram's Bespoke Furniture Studio</p>
        <h1 className="hero-headline serif">
          Furniture,<br /><em>Crafted Around You</em>
        </h1>
        <p className="hero-sub">
          Every piece we make is designed for your space, your taste, and your life — not pulled off a shelf.
        </p>
        <div className="hero-actions">

          <a href="https://wa.me/8801960481983?text=Hi%2C%20I%27d%20like%20to%20request%20a%20free%20design%20consultation."
            className="btn-gold"
            target="_blank"
            rel="noreferrer"
          >
            Contact Us
          </a>
          <a href="#collections" className="btn-outline">View Collections</a>
        </div>
      </div>
      <div className="hero-scroll">
        <div className="scroll-line" />
        <span>Scroll</span>
      </div>
    </section>
  );
}

/* ── Brand Intro ────────────────────────────────────────────── */
function BrandIntro() {
  return (
    <section id="about" className="section brand-intro">
      <div className="container-sm">
        <div className="reveal">
          <p className="section-eyebrow">Who We Are</p>
          <span className="gold-rule" />
          <h2 className="section-headline serif">
            One of Chattogram's Leading<br />Bespoke Furniture Brands
          </h2>
          <p className="section-body">
            Heaven Furniture Mart designs and crafts custom furniture — sofas, beds, dining sets, office pieces, and everything in between — built entirely around what you actually want. We're not a warehouse. We're a studio. Founded in 2020 and headquartered in Agrabad, Chattogram, we've grown into a brand trusted by hundreds of homeowners who believe their space deserves better than mass-produced.
          </p>
        </div>
        <blockquote className="pull-quote reveal">
          "Furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients."
          — Abul Kalam Bhuiyan, Managing Director
        </blockquote>
      </div>
    </section>
  );
}

/* ── Why Choose ─────────────────────────────────────────────── */
const WHY_ITEMS = [
  { title: "Free Design Consultation", text: "Tell us your vision. Our team will guide you through materials, dimensions, and finishes — at no cost." },
  { title: "Premium Materials", text: "Only quality wood and upholstery make it into our workshop. Crafted by skilled in-house artisans." },
  { title: "Built to Your Space", text: "Every piece is made to your exact measurements and style — not a single item is mass-produced." },
  { title: "Large Showroom", text: "Visit our showroom on Agrabad Access Road, Chattogram to see and feel the quality in person." },
  { title: "Delivery & Installation", text: "We handle everything — delivery to your door and full installation by our own crew." },
  { title: "Easy Payment Options", text: "Flexible payment plans so your dream home doesn't have to wait." },
];

function WhyChoose() {
  return (
    <section id="why" className="section why">
      <div className="container">
        <div className="reveal" style={{ textAlign: "center" }}>
          <p className="section-eyebrow">Why Heaven</p>
          <span className="gold-rule" />
          <h2 className="section-headline serif">Built Different, by Design</h2>
        </div>
        <div className="why-grid">
          {WHY_ITEMS.map((item, i) => (
            <div
              key={i}
              className="why-card reveal"
              style={{ transitionDelay: `${i * 0.08}s` }}
            >
              <span className="why-rule" />
              <h3 className="why-title serif">{item.title}</h3>
              <p className="why-text">{item.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Collections ────────────────────────────────────────────── */
const COLLECTIONS = [
  {
    tag: "Living Room",
    title: "Sofas & Living Pieces",
    desc: "Statement sofas, coffee tables, TV units, and consoles — designed to anchor your living space with warmth and intention.",
    img: "https://images.unsplash.com/photo-1555041469-a586c61ea9bc?w=900&q=80",
    reverse: false,
  },
  {
    tag: "Bedroom",
    title: "Beds & Bedroom Furniture",
    desc: "Handcrafted beds, wardrobes, dressing tables, and bedside pieces built to make your private space feel like a retreat.",
    img: "https://images.unsplash.com/photo-1505693416388-ac5ce068fe85?w=900&q=80",
    reverse: true,
  },
  {
    tag: "Dining",
    title: "Dining Tables & Sets",
    desc: "From intimate four-seaters to grand family tables — every dining set is built to bring people together in style.",
    img: "https://images.unsplash.com/photo-1617806118233-18e1de247200?w=900&q=80",
    reverse: false,
  },
  {
    tag: "Office & Study",
    title: "Workspaces That Work",
    desc: "Executive desks, bookshelves, and custom workstations — furniture that respects how seriously you take your work.",
    img: "https://images.unsplash.com/photo-1593642632559-0c6d3fc62b89?w=900&q=80",
    reverse: true,
  },
];

function Collections() {
  return (
    <section id="collections" className="section collections">
      <div className="container">
        <div className="reveal" style={{ textAlign: "center", marginBottom: "3.5rem" }}>
          <p className="section-eyebrow">Our Collections</p>
          <span className="gold-rule" />
          <h2 className="section-headline serif">Every Room, Reimagined</h2>
        </div>
      </div>
      {COLLECTIONS.map((c, i) => (
        <div key={i} className={`coll-item${c.reverse ? " reverse" : ""}`}>
          <div className={`coll-img ${c.reverse ? "reveal-right" : "reveal-left"}`}>
            <img src={c.img} alt={c.title} loading="lazy" />
          </div>
          <div className={`coll-body ${c.reverse ? "reveal-left" : "reveal-right"}`}>
            <p className="coll-tag">{c.tag}</p>
            <h3 className="coll-title serif">{c.title}</h3>
            <p className="coll-desc">{c.desc}</p>

            <a href="https://wa.me/8801960481983?text=Hi%2C%20I%27m%20interested%20in%20your%20furniture%20collections."
              className="btn-text"
              target="_blank"
              rel="noreferrer"
            >
              Request a Quote →
            </a>
          </div>
        </div>
      ))}
    </section>
  );
}

/* ── Bespoke ────────────────────────────────────────────────── */
function Bespoke() {
  return (
    <section id="bespoke" className="section bespoke">
      <div className="bespoke-bg" />
      <div className="container">
        <div className="bespoke-inner">
          <div className="reveal-left">
            <p className="bespoke-label">Our Signature Service</p>
            <span className="gold-rule-left" />
            <h2 className="bespoke-headline serif">
              Fully <em>Bespoke</em>,<br />Built Around You
            </h2>
            <p className="bespoke-body">
              Can't find what you're looking for? That's the point. Our bespoke service means you bring the idea — a rough sketch, a Pinterest photo, a dimension — and our craftsmen build it from scratch. Your space. Your size. Your materials. Your finish.
            </p>

            <a href="https://wa.me/8801960481983?text=Hi%2C%20I%27d%20like%20to%20discuss%20a%20custom%20furniture%20piece."
              className="btn-gold"
              target="_blank"
              rel="noreferrer"
            >
              Start Your Custom Order
            </a>
          </div>
          <div className="bespoke-steps reveal-right">
            {[
              { n: "01", t: "Share Your Vision", d: "Tell us what you need — space dimensions, style references, or just a rough idea. We'll take it from there." },
              { n: "02", t: "Free Consultation", d: "Our design team meets with you to finalize materials, finish, and form. Zero commitment required." },
              { n: "03", t: "Expert Craftsmanship", d: "Our in-house artisans build your piece with precision and care — using only premium wood and materials." },
              { n: "04", t: "Delivered & Installed", d: "We deliver to your door and install everything ourselves. You just enjoy the result." },
            ].map((s) => (
              <div key={s.n} className="bespoke-step">
                <span className="step-num serif">{s.n}</span>
                <div className="step-content">
                  <h4 className="serif">{s.t}</h4>
                  <p>{s.d}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── Milestones ─────────────────────────────────────────────── */
const MILESTONES = [
  { year: "2020", text: "Founded by Abul Kalam Bhuiyan" },
  { year: "2021", text: "Opened Agrabad Showroom, Chattogram" },
  { year: "2024–25", text: "Exhibited at the International Furniture Fair" },
  { year: "2025", text: "Joined the Chamber of Commerce" },
  { year: "2026", text: "Received nationwide BFIOA recognition" },
];

function Milestones() {
  return (
    <section className="section milestones">
      <div className="container">
        <div className="reveal" style={{ textAlign: "center" }}>
          <p className="section-eyebrow">Our Journey</p>
          <span className="gold-rule" />
          <h2 className="section-headline serif">Six Years of Crafting Excellence</h2>
        </div>
        <div className="timeline">
          {MILESTONES.map((m, i) => (
            <div
              key={i}
              className="milestone reveal"
              style={{ transitionDelay: `${i * 0.1}s` }}
            >
              <div className="milestone-dot" />
              <p className="milestone-year serif">{m.year}</p>
              <p className="milestone-text">{m.text}</p>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
}

/* ── Social Proof ───────────────────────────────────────────── */
function Proof() {
  return (
    <section className="section proof">
      <div className="container">
        <div className="proof-grid">
          <div className="reveal-left">
            <p className="section-eyebrow" style={{ color: "#B8965A", marginBottom: "1.5rem" }}>
              Trusted by Hundreds
            </p>
            <p className="proof-quote">
              "At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort."
            </p>
            <p className="proof-attr">— Abul Kalam Bhuiyan, Managing Director</p>
            <div className="proof-stat">
              <div>
                <p className="stat-num serif">500+</p>
                <p className="stat-label">Happy Homeowners</p>
              </div>
              <div>
                <p className="stat-num serif">6+</p>
                <p className="stat-label">Years of Craftsmanship</p>
              </div>
              <div>
                <p className="stat-num serif">100%</p>
                <p className="stat-label">Bespoke Made</p>
              </div>
            </div>
          </div>
          <div className="proof-img reveal-right">
            <img
              src="https://images.unsplash.com/photo-1631679706909-1844bbd07221?w=800&q=80"
              alt="Heaven Furniture Mart Showroom"
              loading="lazy"
            />
          </div>
        </div>
      </div>
    </section>
  );
}

/* ── CTA Banner ─────────────────────────────────────────────── */
function CTABanner() {
  return (
    <section id="contact" className="cta-banner">
      <div className="container-sm reveal">
        <p className="section-eyebrow" style={{ color: "#1C2226" }}>Ready to Begin?</p>
        <h2 className="section-headline serif">Let's Build Something Beautiful</h2>
        <p className="section-body" style={{ marginBottom: "2.5rem" }}>
          Your free design consultation is one message away. Tell us your space — we'll handle the rest.
        </p>

        <a href="https://wa.me/8801960481983?text=Hi%2C%20I%27d%20like%20to%20book%20a%20free%20design%20consultation%20with%20Heaven%20Furniture%20Mart."
          className="btn-dark"
          target="_blank"
          rel="noreferrer"
        >
          WhatsApp for a Free Consultation
        </a>
        <p className="cta-subtext"><strong>Or call us: +880 1960-481983 · Agrabad Access Road, Chattogram</strong></p>
      </div>
    </section>
  );
}

/* ── Footer ─────────────────────────────────────────────────── */
function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">
          <div>
            <p className="footer-logo serif">Heaven Furniture Mart</p>
            <p className="footer-logo-sub">Designed · Crafted · Customized</p>
            <p className="footer-desc">
              Chattogram's bespoke furniture studio — crafting custom living, bedroom, dining, and office furniture since 2020.
            </p>
          </div>
          <div>
            <p className="footer-heading">Collections</p>
            <ul className="footer-list">
              {["Living Room", "Bedroom", "Dining", "Office & Study", "Bespoke Custom"].map((c) => (
                <li key={c}><a href="#collections">{c}</a></li>
              ))}
            </ul>
          </div>
          <div>
            <p className="footer-heading">Contact</p>
            <ul className="footer-list">
              <li>Agrabad Access Road, Chattogram, Bangladesh</li>
              <li><a href="tel:+8801960481983">+880 1960-481983</a></li>
              <li><a href="mailto:heavenfurnituremart@gmail.com">heavenfurnituremart@gmail.com</a></li>
            </ul>
          </div>
        </div>
        <div className="footer-bottom">
          <p className="footer-copy">© 2026 Heaven Furniture Mart. All rights reserved.</p>
          <div className="social-row">
            <a href="https://facebook.com/HeavenFurnitureMart" className="social-link" target="_blank" rel="noreferrer" aria-label="Facebook">
              <FaFacebookF />
            </a>
            <a href="https://instagram.com/heaven_furniture_ltd" className="social-link" target="_blank" rel="noreferrer" aria-label="Instagram">
              <FaInstagram />
            </a>
            <a href="https://youtube.com/@HeavenFurnitureMart" className="social-link" target="_blank" rel="noreferrer" aria-label="YouTube">
              <FaYoutube />
            </a>
            <a href="https://wa.me/8801960481983" className="social-link" target="_blank" rel="noreferrer" aria-label="WhatsApp">
              <FaWhatsapp />
            </a>
          </div>
        </div>
      </div>
    </footer>
  );
}

/* ── App ────────────────────────────────────────────────────── */
export default function App() {
  useScrollReveal();
  return (
    <>
      <Nav />
      <Hero />
      <BrandIntro />
      <WhyChoose />
      <Collections />
      <Bespoke />
      <Milestones />
      <Proof />
      <CTABanner />
      <Footer />
    </>
  );
}