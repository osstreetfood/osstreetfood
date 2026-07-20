/* ============================================================
   O's Streetfood – app
   Startsida med restaurangval, hash-routing (#utby/#landala/
   #tacos) och en datadriven restaurangvy. Root-URL utan hash
   visar alltid startsidan; direktlänkar med hash hoppar över den.
   ============================================================ */
(function () {
  "use strict";

  const landingEl = document.getElementById("landing");
  const appEl = document.getElementById("app");
  const metaDescEl = document.querySelector('meta[name="description"]');
  const DEFAULT_TITLE = document.title;
  const DEFAULT_DESC = metaDescEl ? metaDescEl.content : "";

  /* Per-vy titel + beskrivning för sökmotorer och webbläsarflikar */
  function setSeo(title, description) {
    document.title = title;
    if (metaDescEl && description) metaDescEl.content = description;
  }
  let slideshowTimer = null;
  let revealObserver = null;

  /* ---------- helpers ---------- */

  const esc = (s) =>
    String(s).replace(/[&<>"']/g, (c) =>
      ({ "&": "&amp;", "<": "&lt;", ">": "&gt;", '"': "&quot;", "'": "&#39;" }[c])
    );

  /* Bevarar versalt/gement i varumärkena "O's" och "TacO's" även
     där CSS annars gör text-transform: uppercase. "TacO's" plockas
     ut först via platshållare eftersom det innehåller "O's". */
  function brand(s) {
    return esc(s)
      .replace(/TacO&#39;s/g, "\u0001")
      .replace(/O&#39;s/g, '<span class="nocaps">O&#39;s</span>')
      .replace(/\u0001/g, '<span class="nocaps">TacO&#39;s</span>');
  }

  function keyFromHash() {
    const k = location.hash.replace("#", "").toLowerCase();
    return RESTAURANTS[k] ? k : null;
  }

  /* ---------- markup-byggare ---------- */

  function pictureHTML(img, alt, cls, eager) {
    return `
      <img class="${cls}"
        src="assets/img/${img}-800.jpg"
        srcset="assets/img/${img}-800.jpg 800w, assets/img/${img}-1600.jpg 1600w"
        sizes="100vw"
        alt="${esc(alt)}"
        ${eager ? 'fetchpriority="high"' : 'loading="lazy" decoding="async"'}>`;
  }

  function navHTML(r) {
    const switcher = Object.values(RESTAURANTS)
      .map(
        (o) => `<button class="switch-btn${o.key === r.key ? " is-active" : ""}"
          data-switch="${o.key}" aria-pressed="${o.key === r.key}">${brand(o.shortName)}</button>`
      )
      .join("");
    return `
      <header class="topnav">
        <a class="nav-brand" href="#${r.key}" data-scrolltop>
          <img src="${r.logo.src}" alt="${esc(r.logo.alt)}" class="nav-logo${r.theme === "tacos" ? " nav-logo--round" : ""}">
          <span class="nav-name">${brand(r.navLabel)}</span>
        </a>
        <nav class="switcher" aria-label="Byt restaurang">${switcher}</nav>
      </header>`;
  }

  function heroHTML(r) {
    const [row1, row2] = r.hero.title;
    const cta = r.hero.cta;
    const ctaAttrs = cta.external
      ? `href="${cta.href}" target="_blank" rel="noopener"`
      : `href="${cta.href}" data-scroll-menu`;
    return `
      <section class="hero">
        ${pictureHTML(r.hero.img, r.hero.alt, "hero-img", true)}
        <div class="hero-veil"></div>
        <div class="hero-content">
          <p class="hero-kicker">${brand(r.heroKicker)}</p>
          <h1 class="hero-title"><span>${brand(row1)}</span> <span class="accent">${brand(row2)}</span></h1>
          <div class="hero-ctas">
            <a class="btn btn-primary hero-cta" ${ctaAttrs}>${esc(cta.label)}</a>
            ${r.hero.cta2 ? `<a class="btn btn-outline btn-onphoto" href="${r.hero.cta2.href}" target="_blank" rel="noopener">${esc(r.hero.cta2.label)}</a>` : ""}
          </div>
        </div>
      </section>`;
  }

  function marqueeHTML(r) {
    const unit = r.marquee
      .map((t) => `<span>${brand(t)}</span><span class="dot" aria-hidden="true">✦</span>`)
      .join("");
    /* Varje grupp upprepar orden så den garanterat är bredare än
       skärmen; två identiska grupper + translateX(-50%) = sömlös loop. */
    const group = `<div class="marquee-seq">${unit.repeat(4)}</div>`;
    return `
      <div class="marquee" aria-hidden="true">
        <div class="marquee-track">${group}${group}</div>
      </div>`;
  }

  function lunchHTML(lunch) {
    if (!lunch) return "";
    const extras = (lunch.extras || []).map((e) => `<span>${esc(e)}</span>`).join("");
    return `
      <div class="lunch-banner reveal">
        <div class="lunch-main">
          <span class="lunch-title">${brand(lunch.title)}</span>
          ${lunch.sub ? `<span class="lunch-sub">${esc(lunch.sub)}</span>` : ""}
        </div>
        ${lunch.detail ? `<p class="lunch-detail">${brand(lunch.detail)}</p>` : ""}
        ${extras ? `<p class="lunch-extras">${extras}</p>` : ""}
      </div>`;
  }

  function itemHTML(item) {
    return `
      <div class="menu-item">
        <div class="item-row">
          <h4 class="item-name">${brand(item.name)}${
            item.meta ? `<span class="item-meta">${esc(item.meta)}</span>` : ""
          }</h4>
          <span class="leader" aria-hidden="true"></span>
          ${item.price ? `<span class="price">${esc(item.price)}</span>` : ""}
        </div>
        ${item.desc ? `<p class="item-desc">${esc(item.desc)}</p>` : ""}
        ${item.note ? `<p class="item-note">${esc(item.note)}</p>` : ""}
      </div>`;
  }

  function sectionHTML(section) {
    const notes = (section.notes || [])
      .map(
        (n) => `<p class="section-note${n.em ? " section-note--em" : ""}">${esc(n.text)}${
          n.veggie ? ' <img src="assets/veggie.webp" alt="Vegetariskt" class="veggie-icon" width="24" height="24">' : ""
        }</p>`
      )
      .join("");
    return `
      <section class="menu-section reveal${section.compact ? " menu-section--compact" : ""}" id="section-${section.id}">
        <div class="section-head">
          <h3 class="section-title"><span>${brand(section.title)}</span>${
            section.tag ? `<em class="section-tag">${esc(section.tag)}</em>` : ""
          }</h3>
        </div>
        ${section.intro ? `<p class="section-intro">${esc(section.intro)}</p>` : ""}
        <div class="menu-items${section.compact ? " menu-items--grid" : ""}">
          ${section.items.map(itemHTML).join("")}
        </div>
        ${notes}
      </section>`;
  }

  function menuHTML(r) {
    return `
      <section class="menu" id="menu-anchor">
        <div class="menu-head reveal">
          <h2 class="h2">Menyn</h2>
          <span class="chip">${brand(r.name)}</span>
        </div>
        ${lunchHTML(r.lunch)}
        ${r.menu.map(sectionHTML).join("")}
        ${r.allergyNote ? `<p class="allergy-note reveal">Vid allergi – fråga gärna personalen.</p>` : ""}
      </section>`;
  }

  function orderHTML(r) {
    if (!r.order) return "";
    const btns = r.order
      .map(
        (o) => `<a class="btn ${o.primary ? "btn-primary" : "btn-outline"} btn-big"
          href="${o.href}" target="_blank" rel="noopener">${esc(o.label)}</a>`
      )
      .join("");
    return `
      <section class="order reveal" id="order-anchor">
        <h2 class="h2">Beställ</h2>
        <div class="order-btns">${btns}</div>
      </section>`;
  }

  function findHTML(r) {
    return `
      <section class="find reveal">
        <h2 class="h2">Hitta hit</h2>
        <p class="find-hours">${esc(OPENING_NOTE)}</p>
        <a class="btn btn-outline btn-big" href="${r.maps}" target="_blank" rel="noopener">Öppna i Google Maps</a>
      </section>`;
  }

  const SLIDES = [
    ["slide-burgers-flatlay", "Utbud av burgare uppifrån"],
    ["slide-smoke", "Rykande smashburgare"],
    ["slide-friesbox", "Friesbox med friterad kyckling"],
    ["slide-plate", "Burgare med pommes på tallrik"],
    ["slide-nachos", "Nacho plate serveras vid bordet"],
    ["slide-mac-bowl", "Krämig fries-bowl med feta"],
    ["slide-kitchen", "Burgare byggs i köket"],
    ["slide-guests", "Gäster i restaurangen"]
  ];

  function slideshowHTML() {
    const imgs = SLIDES.map(
      ([img, alt], i) => `
        <div class="slide${i === 0 ? " is-active" : ""}">
          ${pictureHTML(img, alt, "slide-img", false)}
        </div>`
    ).join("");
    const dots = SLIDES.map(
      (_, i) => `<button class="slide-dot${i === 0 ? " is-active" : ""}" data-slide="${i}" aria-label="Bild ${i + 1}"></button>`
    ).join("");
    return `
      <section class="gallery reveal">
        <h2 class="h2">Följ smaken</h2>
        <div class="slideshow" data-slideshow>
          ${imgs}
          <button class="slide-edge slide-edge--prev" data-dir="-1" aria-label="Föregående bild"></button>
          <button class="slide-edge slide-edge--next" data-dir="1" aria-label="Nästa bild"></button>
          <div class="slide-dots">${dots}</div>
        </div>
        <a class="btn btn-outline btn-big" href="${LINKS.instagram}" target="_blank" rel="noopener">@os_streetfood på Instagram</a>
      </section>`;
  }

  function footerHTML(r) {
    return `
      <footer class="footer">
        <img src="${r.logo.src}" alt="${esc(r.logo.alt)}" class="footer-logo${r.theme === "tacos" ? " footer-logo--round" : ""}">
        <p class="footer-name">${brand(r.footerName || r.name)} · Göteborg</p>
        <nav class="footer-links">
          <a href="${LINKS.instagram}" target="_blank" rel="noopener">Instagram</a>
          <a href="${r.maps}" target="_blank" rel="noopener">Hitta hit</a>
          <button class="footer-switch" data-show-landing>Byt restaurang</button>
        </nav>
        <p class="footer-fine">© ${new Date().getFullYear()} O's Streetfood. Great vibes only.</p>
      </footer>`;
  }

  /* ---------- rendering & interaktion ---------- */

  function render(key) {
    const r = RESTAURANTS[key];
    document.body.dataset.theme = r.theme;
    setSeo(r.seo ? r.seo.title : `${r.name} – O's Streetfood`, r.seo && r.seo.description);

    appEl.innerHTML =
      navHTML(r) +
      heroHTML(r) +
      marqueeHTML(r) +
      `<main>` +
      menuHTML(r) +
      orderHTML(r) +
      findHTML(r) +
      slideshowHTML() +
      `</main>` +
      footerHTML(r);

    landingEl.hidden = true;
    appEl.hidden = false;
    appEl.classList.remove("view-enter");
    void appEl.offsetWidth; /* starta om animationen */
    appEl.classList.add("view-enter");

    const jumpTop = () => {
      document.documentElement.style.scrollBehavior = "auto";
      window.scrollTo(0, 0);
      document.documentElement.style.scrollBehavior = "";
    };
    jumpTop();
    requestAnimationFrame(jumpTop);

    bindView();
    initReveal();
    initSlideshow();
    initMarquee();
  }

  /* Samma pixelhastighet på alla vyer: animationstiden räknas ut
     från textbredden i stället för att vara fast. */
  const MARQUEE_SPEED = 45; /* px per sekund */
  function initMarquee() {
    const track = appEl.querySelector(".marquee-track");
    const seq = appEl.querySelector(".marquee-seq");
    if (!track || !seq) return;
    const apply = () => {
      const w = seq.getBoundingClientRect().width;
      if (w > 0) track.style.animationDuration = (w / MARQUEE_SPEED).toFixed(2) + "s";
    };
    requestAnimationFrame(apply);
    if (document.fonts && document.fonts.ready) document.fonts.ready.then(apply);
  }

  function switchTo(key) {
    if (location.hash !== "#" + key) {
      location.hash = key; /* hashchange-lyssnaren ritar om vyn */
    } else {
      render(key);
    }
  }

  function showLanding() {
    stopSlideshow();
    appEl.hidden = true;
    landingEl.hidden = false;
    document.body.dataset.theme = "os";
    setSeo(DEFAULT_TITLE, DEFAULT_DESC);
    if (location.hash) history.replaceState(null, "", location.pathname + location.search);
    window.scrollTo(0, 0);
  }

  function bindView() {
    appEl.querySelectorAll("[data-switch]").forEach((btn) => {
      btn.addEventListener("click", () => switchTo(btn.dataset.switch));
    });
    appEl.querySelectorAll("[data-show-landing]").forEach((btn) => {
      btn.addEventListener("click", showLanding);
    });
    appEl.querySelectorAll("[data-scroll-menu]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        const menu = document.getElementById("menu-anchor");
        if (menu) menu.scrollIntoView({ behavior: "smooth", block: "start" });
      });
    });
    appEl.querySelectorAll("[data-scrolltop]").forEach((a) => {
      a.addEventListener("click", (e) => {
        e.preventDefault();
        window.scrollTo({ top: 0, behavior: "smooth" });
      });
    });
  }

  function initReveal() {
    if (revealObserver) revealObserver.disconnect();
    const els = appEl.querySelectorAll(".reveal");
    if (!("IntersectionObserver" in window)) {
      els.forEach((el) => el.classList.add("is-visible"));
      return;
    }
    revealObserver = new IntersectionObserver(
      (entries) => {
        entries.forEach((en) => {
          if (en.isIntersecting) {
            en.target.classList.add("is-visible");
            revealObserver.unobserve(en.target);
          }
        });
      },
      { rootMargin: "0px 0px -8% 0px", threshold: 0.05 }
    );
    els.forEach((el) => revealObserver.observe(el));
  }

  function stopSlideshow() {
    if (slideshowTimer) { clearInterval(slideshowTimer); slideshowTimer = null; }
  }

  function initSlideshow() {
    stopSlideshow();
    const root = appEl.querySelector("[data-slideshow]");
    if (!root) return;
    const slides = root.querySelectorAll(".slide");
    const dots = root.querySelectorAll(".slide-dot");
    let idx = 0;

    const prefersReduced = window.matchMedia("(prefers-reduced-motion: reduce)").matches;

    function show(n) {
      slides[idx].classList.remove("is-active");
      dots[idx].classList.remove("is-active");
      idx = (n + slides.length) % slides.length;
      slides[idx].classList.add("is-active");
      dots[idx].classList.add("is-active");
    }
    function start() {
      stopSlideshow();
      if (!prefersReduced) slideshowTimer = setInterval(() => show(idx + 1), 5000);
    }
    /* Manuell interaktion byter bild och nollställer 5-sekunderstimern. */
    function manual(n) { show(n); start(); }

    dots.forEach((d) =>
      d.addEventListener("click", () => manual(Number(d.dataset.slide)))
    );
    root.querySelectorAll(".slide-edge").forEach((edge) =>
      edge.addEventListener("click", () => manual(idx + Number(edge.dataset.dir)))
    );

    root.addEventListener("pointerenter", stopSlideshow);
    root.addEventListener("pointerleave", start);
    start();
  }

  /* ---------- start ---------- */

  landingEl.querySelectorAll("[data-choice]").forEach((btn) => {
    btn.addEventListener("click", () => switchTo(btn.dataset.choice));
  });

  window.addEventListener("hashchange", () => {
    const k = keyFromHash();
    if (k) render(k);
    else showLanding();
  });

  /* Root utan hash visar alltid startsidan; endast direktlänkar
     med giltig hash hoppar direkt till en restaurang. */
  const initial = keyFromHash();
  if (initial) render(initial);
  else landingEl.hidden = false;
})();
