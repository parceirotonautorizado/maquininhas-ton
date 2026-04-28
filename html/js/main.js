// Main JS - Maquineta Stone
(function () {
  'use strict';

  const skip = window.skipInjection || [];

  // ── Schema JSON-LD ──────────────────────────────────────────────
  function injectSchema() {
    const s = pageContent.schema;
    const schema = {
      "@context": "https://schema.org",
      "@type": "LocalBusiness",
      "name": s.name,
      "description": s.description,
      "telephone": s.phone,
      "address": {
        "@type": "PostalAddress",
        "addressLocality": s.address.city,
        "addressRegion": s.address.state,
        "addressCountry": s.address.country
      },
      "geo": { "@type": "GeoCoordinates", "latitude": s.geo.lat, "longitude": s.geo.lng },
      "openingHours": "Mo-Su 07:00-12:00, Mo-Su 14:00-20:00",
      "url": window.location.href
    };
    const el = document.createElement('script');
    el.type = 'application/ld+json';
    el.textContent = JSON.stringify(schema);
    document.head.appendChild(el);
  }

  // ── WhatsApp Float ───────────────────────────────────────────────
  function injectWhatsApp() {
    const btn = document.getElementById('whatsapp-float');
    if (!btn) return;
    const num = pageContent.general.whatsappNumber;
    const msg = encodeURIComponent(pageContent.general.whatsappMessage);
    btn.href = `https://wa.me/${num}?text=${msg}`;
    btn.setAttribute('aria-label', 'Falar no WhatsApp');
    btn.innerHTML = `<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" width="28" height="28"><path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L.057 24l6.305-1.654a11.882 11.882 0 005.683 1.448h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z"/></svg>`;
  }

  // ── Hero ─────────────────────────────────────────────────────────
  function injectHero() {
    if (skip.includes('hero')) return;
    const h = pageContent.hero;
    const subtitle = document.getElementById('hero-subtitle');
    const title = document.getElementById('hero-title');
    const desc = document.getElementById('hero-desc');
    const btns = document.getElementById('hero-buttons');
    if (subtitle) subtitle.textContent = h.subtitle;
    if (title) title.textContent = h.title;
    if (desc) desc.textContent = h.description;
    if (btns && h.buttons) {
      btns.innerHTML = h.buttons.map(b =>
        `<a href="${b.href}" class="btn ${b.class}">${b.text}</a>`
      ).join('');
    }
  }

  // ── About ─────────────────────────────────────────────────────────
  function injectAbout() {
    if (skip.includes('about')) return;
    const a = pageContent.aboutUs;
    const title = document.getElementById('about-title');
    const desc = document.getElementById('about-desc');
    const btn = document.getElementById('about-btn');
    if (title) title.textContent = a.title;
    if (desc) desc.innerHTML = a.description;
    if (btn) { btn.textContent = a.buttonText; btn.href = a.buttonHref; }
  }

  // ── Features ──────────────────────────────────────────────────────
  function injectFeatures() {
    if (skip.includes('features')) return;
    const f = pageContent.features;
    const title = document.getElementById('features-title');
    const list = document.getElementById('features-list');
    if (title) title.textContent = f.title;
    if (list) {
      list.innerHTML = f.items.map(item => `
        <div class="feature-card">
          <div class="feature-icon">${item.icon}</div>
          <h3>${item.title}</h3>
          <p>${item.description}</p>
        </div>
      `).join('');
    }
  }

  // ── Testimonials ──────────────────────────────────────────────────
  function injectTestimonials() {
    const t = pageContent.testimonials;
    const title = document.getElementById('testimonials-title');
    const list = document.getElementById('testimonials-list');
    if (title) title.textContent = t.title;
    if (list) {
      list.innerHTML = t.reviews.map(r => `
        <div class="testimonial-card">
          <div class="stars">★★★★★</div>
          <p>"${r.comment}"</p>
          <div class="reviewer"><strong>${r.name}</strong> · ${r.profession}</div>
        </div>
      `).join('');
    }
  }

  // ── Footer ────────────────────────────────────────────────────────
  function injectFooter() {
    const f = pageContent.footer;
    const phone = document.getElementById('footer-phone');
    const sched = document.getElementById('footer-schedule');
    const copy = document.getElementById('footer-copyright');
    const waLink = document.getElementById('footer-whatsapp');
    if (phone) { phone.textContent = f.phone; phone.href = `tel:+55${f.phone.replace(/\D/g,'')}`; }
    if (sched) sched.innerHTML = f.schedule.map(s => `<li>${s}</li>`).join('');
    if (copy) copy.textContent = f.copyright;
    if (waLink) waLink.href = `https://wa.me/${f.whatsapp}`;
  }

  // ── Page Title ────────────────────────────────────────────────────
  function setTitle() {
    const existing = document.querySelector('title');
    if (existing && existing.dataset.static) return;
    document.title = pageContent.general.pageTitle;
  }

  // ── Mobile Menu ───────────────────────────────────────────────────
  function initMobileMenu() {
    const toggle = document.getElementById('menu-toggle');
    const nav = document.getElementById('main-nav');
    if (!toggle || !nav) return;
    toggle.addEventListener('click', () => {
      nav.classList.toggle('open');
      toggle.classList.toggle('active');
    });
  }

  // ── Smooth Scroll ─────────────────────────────────────────────────
  function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
      a.addEventListener('click', e => {
        const target = document.querySelector(a.getAttribute('href'));
        if (target) { e.preventDefault(); target.scrollIntoView({ behavior: 'smooth' }); }
      });
    });
  }

  // ── Sticky Header ────────────────────────────────────────────────
  function initStickyHeader() {
    const header = document.getElementById('main-header');
    if (!header) return;
    window.addEventListener('scroll', () => {
      header.classList.toggle('scrolled', window.scrollY > 60);
    });
  }

  // ── Scroll Reveal ─────────────────────────────────────────────────
  function initScrollReveal() {
    const els = document.querySelectorAll('.reveal');
    if (!els.length) return;
    const obs = new IntersectionObserver((entries) => {
      entries.forEach(e => { if (e.isIntersecting) { e.target.classList.add('revealed'); obs.unobserve(e.target); } });
    }, { threshold: 0.1 });
    els.forEach(el => obs.observe(el));
  }

  // ── Init ──────────────────────────────────────────────────────────
  document.addEventListener('DOMContentLoaded', () => {
    injectSchema();
    injectWhatsApp();
    injectHero();
    injectAbout();
    injectFeatures();
    injectTestimonials();
    injectFooter();
    setTitle();
    initMobileMenu();
    initSmoothScroll();
    initStickyHeader();
    initScrollReveal();
  });
})();
