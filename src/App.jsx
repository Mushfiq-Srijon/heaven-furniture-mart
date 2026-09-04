import { useState, useEffect, useRef, useCallback } from "react";
import logo from "./assets/logo.png";
import { FaFacebookF, FaInstagram, FaYoutube, FaWhatsapp } from "react-icons/fa";
import founderImg from "./assets/collections/founder.webp";
import showroomImg from "./assets/collections/showroom.webp";
import living1 from "./assets/collections/living-1.webp";
import living2 from "./assets/collections/living-2.webp";
import living3 from "./assets/collections/living-3.webp";

import bedroom1 from "./assets/collections/bedroom-1.webp";
import bedroom2 from "./assets/collections/bedroom-2.webp";
import bedroom3 from "./assets/collections/bedroom-3.webp";

import dining1 from "./assets/collections/dining-1.webp";
import dining2 from "./assets/collections/dining-2.webp";

import office1 from "./assets/collections/office-1.webp";
import office2 from "./assets/collections/office-2.webp";

/* ── Splash Screen ────────────────────────────────────────── */
function SplashScreen({ phase, onLanded }) {
  const splashLogoRef = useRef(null);
  const [flyStyle, setFlyStyle] = useState(null);
  const hasFlown = useRef(false);
  const hasSettled = useRef(false);

  // Start the flight the moment we enter "flying"
  useEffect(() => {
    if (phase !== "flying" || hasFlown.current) return;
    hasFlown.current = true;

    const splashEl = splashLogoRef.current;
    const navEl = document.querySelector(".nav-logo-img");
    if (!splashEl || !navEl) return;

    const from = splashEl.getBoundingClientRect();
    const to = navEl.getBoundingClientRect();

    setFlyStyle({
      position: "fixed",
      top: from.top,
      left: from.left,
      width: from.width,
      height: from.height,
      zIndex: 1000,
      opacity: 1,
      objectFit: "contain",
      pointerEvents: "none",
      transition: "none",
    });

    requestAnimationFrame(() => {
      requestAnimationFrame(() => {
        setFlyStyle((prev) => ({
          ...prev,
          top: to.top,
          left: to.left,
          width: to.width,
          height: to.height,
          transition: [
            "top 0.75s cubic-bezier(0.22,1,0.36,1)",
            "left 0.75s cubic-bezier(0.22,1,0.36,1)",
            "width 0.75s cubic-bezier(0.22,1,0.36,1)",
            "height 0.75s cubic-bezier(0.22,1,0.36,1)",
          ].join(", "),
        }));
      });
    });
  }, [phase]);



  const handleCloneTransitionEnd = (e) => {
    if (phase === "flying" && e.propertyName === "top") onLanded();
  };

  const showOriginal = phase === "enter" || phase === "hold";

  return (
    <>
      {flyStyle && phase === "flying" && (
        <img src={logo} alt="" style={flyStyle} onTransitionEnd={handleCloneTransitionEnd} />
      )}

      <div className={`splash splash--${phase}`}>
        <div className="splash-inner">
          <img
            ref={splashLogoRef}
            src={logo}
            alt="Heaven Furniture Mart"
            className={`splash-logo${!showOriginal ? " splash-logo--hidden" : ""}`}
          />
          <span className={`splash-tagline${!showOriginal ? " splash-tagline--hide" : ""}`}>
            Designed · Crafted · Customized
          </span>
        </div>
      </div>
    </>
  );
}
/* ── useScrollReveal ────────────────────────────────────────── */
function useScrollReveal() {
  useEffect(() => {
    const els = document.querySelectorAll(".reveal, .reveal-left, .reveal-right");
    const io = new IntersectionObserver(
      (entries) =>
        entries.forEach((e) => {
          if (e.isIntersecting) {
            e.target.classList.add("visible");
          } else {
            e.target.classList.remove("visible");
          }
        }),
      { threshold: 0.12 }
    );
    els.forEach((el) => io.observe(el));
    return () => io.disconnect();
  }, []);
}

/* ── Nav ────────────────────────────────────────────────────── */
function Nav({ logoVisible, chromeVisible }) {
  const [scrolled, setScrolled] = useState(false);
  const [open, setOpen] = useState(false);
  const [activeId, setActiveId] = useState("");

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 60);
    window.addEventListener("scroll", onScroll);
    return () => window.removeEventListener("scroll", onScroll);
  }, []);

  useEffect(() => {
    const sectionIds = [
      "about",
      "why",
      "collections",
      "bespoke",
      "milestones",
      "contact",
    ];

    const observers = [];

    // Observe all navigation sections
    sectionIds.forEach((id) => {
      const el = document.getElementById(id);

      if (!el) return;

      const io = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId(id);
          }
        },
        {
          rootMargin: "-20% 0px -70% 0px",
          threshold: 0,
        }
      );

      io.observe(el);
      observers.push(io);
    });

    // Observe the hero separately
    const hero = document.getElementById("hero");

    if (hero) {
      const heroObserver = new IntersectionObserver(
        ([entry]) => {
          if (entry.isIntersecting) {
            setActiveId("");
          }
        },
        {
          threshold: 0.1,
        }
      );

      heroObserver.observe(hero);
      observers.push(heroObserver);
    }

    return () => observers.forEach((io) => io.disconnect());
  }, []);

  const links = ["About", "Why Us", "Collections", "Bespoke", "Our Journey", "Contact"];
  const ids = ["about", "why", "collections", "bespoke", "milestones", "contact"];

  return (
    <>
      <nav className={`nav${scrolled ? " scrolled" : ""}`}>
        <a href="#hero" className="nav-logo">
          <img
            src={logo}
            alt="Heaven Furniture Mart"
            className="nav-logo-img"
            style={{ opacity: logoVisible ? 1 : 0, transition: "none" }}
          />
        </a>

        <div className={`nav-links${chromeVisible ? " nav-links--visible" : ""}`}>
          {links.map((l, i) => (
            <a key={l} href={`#${ids[i]}`} className={activeId === ids[i] ? "nav-link-active" : ""}>
              {l}
            </a>
          ))}

          <a href="https://wa.me/8801960481983?text=Hi%2C%20I%27d%20like%20to%20request%20a%20design%20consultation."
            className="nav-cta"
            target="_blank"
            rel="noreferrer"
          >
            Get a Quote
          </a>
        </div>

        <div
          className={`nav-hamburger${chromeVisible ? " nav-hamburger--visible" : ""}`}
          onClick={() => setOpen((p) => !p)}
        >
          <span /><span /><span />
        </div>
      </nav>

      <div className={`mobile-menu${open ? " open" : ""}`} onClick={() => setOpen(false)}>
        {links.map((l, i) => (
          <a key={l} href={`#${ids[i]}`} className={activeId === ids[i] ? "nav-link-active" : ""}>
            {l}
          </a>
        ))}
        <a href="https://wa.me/8801960481983" className="btn-gold" target="_blank" rel="noreferrer">
          Get a Quote
        </a>
      </div>
    </>
  );
}
/* ── Hero ───────────────────────────────────────────────────── */
function Hero({ shimmerReady }) {
  return (
    <section id="hero" className={`hero${shimmerReady ? " hero--shimmer" : ""}`}>
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
          <a href="#collections" className="btn-outline">Explore Our Work</a>
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
  { num: "I", title: "Free Design Consultation", text: "Tell us your vision. Our team will guide you through materials, dimensions, and finishes — at no cost." },
  { num: "II", title: "Premium Materials", text: "Only quality wood and upholstery make it into our workshop. Crafted by skilled in-house artisans." },
  { num: "III", title: "Built to Your Space", text: "Every piece is made to your exact measurements and style — not a single item is mass-produced." },
  { num: "IV", title: "Large Showroom", text: "Visit our showroom on Agrabad Access Road, Chattogram to see and feel the quality in person." },
  { num: "V", title: "Delivery & Installation", text: "We handle everything — delivery to your door and full installation by our own crew." },
  { num: "VI", title: "Easy Payment Options", text: "Flexible payment plans so your dream home doesn't have to wait." },
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
              <span className="why-numeral serif">{item.num}</span>
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
    images: [living1, living2, living3],
    reverse: false,
  },
  {
    tag: "Bedroom",
    title: "Beds & Bedroom Furniture",
    desc: "Handcrafted beds, wardrobes, dressing tables, and bedside pieces built to make your private space feel like a retreat.",
    images: [bedroom1, bedroom2, bedroom3],
    reverse: true,
  },
  {
    tag: "Dining",
    title: "Dining Tables & Sets",
    desc: "From intimate four-seaters to grand family tables — every dining set is built to bring people together in style.",
    images: [dining1, dining2],
    reverse: false,
  },
  {
    tag: "Office & Study",
    title: "Workspaces That Work",
    desc: "Executive desks, bookshelves, and custom workstations — furniture that respects how seriously you take your work.",
    images: [office1, office2],
    reverse: true,
  },
];

function CollectionCarousel({ images }) {
  const [current, setCurrent] = useState(0);
  const [dragging, setDragging] = useState(false);
  const startX = useRef(0);
  const timerRef = useRef(null);

  const next = useCallback(() => {
    setCurrent((p) => (p + 1) % images.length);
  }, [images.length]);

  const prev = () => {
    setCurrent((p) => (p - 1 + images.length) % images.length);
  };

  const resetTimer = useCallback(() => {
    clearInterval(timerRef.current);
    timerRef.current = setInterval(next, 3500);
  }, [next]);

  useEffect(() => {
    resetTimer();
    return () => clearInterval(timerRef.current);
  }, [resetTimer]);

  // Touch
  const onTouchStart = (e) => {
    startX.current = e.touches[0].clientX;
    setDragging(true);
  };
  const onTouchEnd = (e) => {
    if (!dragging) return;
    const diff = startX.current - e.changedTouches[0].clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
      resetTimer();
    }
    setDragging(false);
  };

  // Mouse drag
  const onMouseDown = (e) => {
    startX.current = e.clientX;
    setDragging(true);
  };
  const onMouseUp = (e) => {
    if (!dragging) return;
    const diff = startX.current - e.clientX;
    if (Math.abs(diff) > 40) {
      diff > 0 ? next() : prev();
      resetTimer();
    }
    setDragging(false);
  };

  return (
    <div
      className="carousel"
      onTouchStart={onTouchStart}
      onTouchEnd={onTouchEnd}
      onMouseDown={onMouseDown}
      onMouseUp={onMouseUp}
    >
      <div className="carousel-track" style={{ transform: `translateX(-${current * 100}%)` }}>
        {images.map((src, i) => (
          <img key={i} src={src} alt="" className="carousel-slide" draggable={false} />
        ))}
      </div>
      {images.length > 1 && (
        <>
          <button className="carousel-btn carousel-btn--prev" onClick={() => { prev(); resetTimer(); }} aria-label="Previous">‹</button>
          <button className="carousel-btn carousel-btn--next" onClick={() => { next(); resetTimer(); }} aria-label="Next">›</button>
          <div className="carousel-dots">
            {images.map((_, i) => (
              <button
                key={i}
                className={`carousel-dot${i === current ? " active" : ""}`}
                onClick={() => { setCurrent(i); resetTimer(); }}
                aria-label={`Go to slide ${i + 1}`}
              />
            ))}
          </div>
        </>
      )}
    </div>
  );
}

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
            <CollectionCarousel images={c.images} />
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
    <section id="milestones" className="section milestones">
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
              A Word From the Founder
            </p>
            <p className="proof-quote">
              "At Heaven Furniture Mart, we believe furniture is more than just function; it is a reflection of lifestyle, taste, and comfort. Every piece we create is designed to bring lasting elegance into the homes of our clients."
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
          <div className="proof-founder reveal-right">
            <div className="founder-img-wrap">
              <img
                src={founderImg}
                alt="Abul Kalam Bhuiyan — Managing Director, Heaven Furniture Mart"
                className="founder-img"
              />
              <div className="founder-caption">
                <p className="founder-name serif">Abul Kalam Bhuiyan</p>
                <p className="founder-title">Managing Director</p>
              </div>
            </div>
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
        <p className="section-body" style={{ marginBottom: "2.5rem", color: "black", fontWeight: 400 }}>
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

/* ── Showroom Map ─────────────────────────────────────────────────── */
function ShowroomMap() {
  return (
    <section id="showroom-map" className="section showroom-map">
      <div className="container">
        <div className="showroom-inner">
          <div className="showroom-info reveal-left">
            <p className="section-eyebrow">Find Us</p>
            <span className="gold-rule-left" />
            <h2 className="showroom-headline serif">
              Visit Our<br />Showroom
            </h2>
            <p className="showroom-desc">
              Come see the craftsmanship in person. Walk through our full showroom — no appointment needed. Our team is always on hand to help you find exactly what your space deserves.
            </p>
            <div className="showroom-details">
              <div className="showroom-detail-row">
                <span className="showroom-detail-label">Address</span>
                <span className="showroom-detail-value">Agrabad Access Road, Chattogram, Bangladesh</span>
              </div>
              <div className="showroom-detail-row">
                <span className="showroom-detail-label">Phone</span>
                <a href="tel:+8801960481983" className="showroom-detail-value showroom-link">+880 1960-481983</a>
              </div>
              <div className="showroom-detail-row">
                <span className="showroom-detail-label">Email</span>
                <a href="mailto:heavenfurnituremart@gmail.com" className="showroom-detail-value showroom-link">heavenfurnituremart@gmail.com</a>
              </div>
            </div>

            <a href="https://wa.me/8801960481983?text=Hi%2C%20I%27d%20like%20to%20visit%20the%20showroom."
              className="btn-gold"
              target="_blank"
              rel="noreferrer"
              style={{ marginTop: "2rem", display: "inline-flex" }}
            >
              Plan My Visit
            </a>
          </div>
          <div className="showroom-map-wrap reveal-right">
            <img
              src={showroomImg}
              alt="Heaven Furniture Mart showroom interior"
              className="showroom-photo"
            />
            <iframe
              src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3690.63800047075!2d91.7905206793457!3d22.329526399999995!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x30acd999401bf62b%3A0xcd9639571c8d5c27!2sHeaven%20Furniture%20Mart!5e0!3m2!1sen!2sbd!4v1788029592032!5m2!1sen!2sbd"
              title="Heaven Furniture Mart Showroom Location"
              allowFullScreen=""
              loading="lazy"
              referrerPolicy="no-referrer-when-downgrade"
            />
          </div>
        </div>
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
            <img src={logo} alt="Heaven Furniture Mart" className="footer-logo-img" />
            {/* <p className="footer-logo-sub">Designed · Crafted · Customized</p> */}
            <br></br>
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

/* ── Floating whatsapp ─────────────────────────────────────────────────── */
function FloatingWhatsApp() {
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const fn = () => setVisible(window.scrollY > 300);
    window.addEventListener("scroll", fn);
    return () => window.removeEventListener("scroll", fn);
  }, []);

  return (

    <a href="https://wa.me/8801960481983?text=Hi%2C%20I%27d%20like%20to%20know%20more%20about%20Heaven%20Furniture%20Mart."
      className={`floating-wa${visible ? " floating-wa--visible" : ""}`}
      target="_blank"
      rel="noreferrer"
      aria-label="Chat on WhatsApp"
    >
      <FaWhatsapp />
    </a>
  );
}

function useSplashSequence() {
  const [phase, setPhase] = useState("enter"); // enter -> hold -> flying -> settled -> done
  const landedRef = useRef(false);

  useEffect(() => {
    const timers = [
      setTimeout(() => setPhase("hold"), 900),
      setTimeout(() => setPhase("flying"), 2000),
    ];
    return () => timers.forEach(clearTimeout);
  }, []);

  // Called by SplashScreen the instant the flying logo's CSS transition
  // actually finishes — no hardcoded duration to keep in sync.
  const handleLanded = useCallback(() => {
    if (landedRef.current) return;
    landedRef.current = true;
    setPhase("settled");
    setTimeout(() => setPhase("done"), 700); // chrome fade (0.6s) + a short pause
  }, []);

  return { phase, handleLanded };
}

/* ── App ─────────────────────────────────────────────────── */
export default function App() {
  const { phase, handleLanded } = useSplashSequence();
  useScrollReveal();

  const contentVisible = phase === "flying" || phase === "settled" || phase === "done";
  const logoSettled = phase === "settled" || phase === "done";
  const chromeVisible = phase === "settled" || phase === "done";
  const shimmerReady = phase === "done";

  return (
    <>
      {phase !== "done" && <SplashScreen phase={phase} onLanded={handleLanded} />}
      <div className={`site-wrapper${contentVisible ? " site-wrapper--visible" : ""}`}>
        <Nav logoVisible={logoSettled} chromeVisible={chromeVisible} />
        <Hero shimmerReady={shimmerReady} />
        <BrandIntro />
        <WhyChoose />
        <Collections />
        <Bespoke />
        <Milestones />
        <Proof />
        <CTABanner />
        <ShowroomMap />
        <Footer />
        <FloatingWhatsApp />
      </div>
    </>
  );
}