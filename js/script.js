/* ============================================================
   MENTA STUDIO — script.js
   0.  Datos editables (servicios + portfolio)
   1.  Utilidades
   2.  Smooth scroll (Lenis) + ScrollTrigger
   3.  Cursor + hover magnético
   4.  Intro
   5.  Header + menú mobile
   6.  Split de texto y reveals
   7.  Hero
   8.  Parallax de fondo (palabras, blobs, mouse)
   9.  Servicios (render + animación)
   10. Paquetes
   11. Portfolio (render + rails + animación)
   12. Galería parallax
   13. Proceso
   14. Modales (video + carrusel)
   15. Formulario + año
============================================================ */

/* ============================================================
   0. DATOS EDITABLES  ← REEMPLAZAR TODO ESTE BLOQUE
============================================================ */

/* --- SERVICIOS ------------------------------------------------
   Editá título y descripción. El ícono usa un id de la librería
   interna de abajo (icons): brand, eye, grid, layers, play,
   circle, camera, target
---------------------------------------------------------------- */
const services = [
  { title:"Branding",                 desc:"Naming, concepto y sistema visual para que tu marca tenga una voz propia.", icon:"brand" },
  { title:"Identidad Visual",         desc:"Logo, paleta, tipografías y manual de uso listo para aplicar.",             icon:"eye" },
  { title:"Contenido para Redes",     desc:"Reels, carruseles e historias con una dirección de arte coherente.",        icon:"grid" },
  { title:"Producción de Contenido",  desc:"Sesiones de foto y video con dirección creativa incluida.",                 icon:"camera" },
  { title:"Estrategia de Contenido",  desc:"Calendario, pilares y mensajes definidos antes de diseñar.",                icon:"target" },
  { title:"Diseño & Desarrollo Web",  desc:"Diseño UX/UI y desarrollo de sitios personalizados, responsive y listos para publicar.", icon:"web" }
];

/* --- REELS ------------------------------------------------------
   Un único array alimenta todo el carrusel. Para agregar un reel,
   copiá un bloque, sumá el .mp4 a videos/ y su portada a images/reels/.

   Los archivos originales que enviaste quedaron así:
     reel-01  ←  campera.mp4
     reel-02  ←  robo.mp4
     reel-03  ←  3 razones.mp4
     reel-04  ←  arrugas en la piel.mp4
     reel-05  ←  2025 video cierre.mp4

   "alt" no se muestra en pantalla: lo usan los lectores de pantalla
   y Google. Conviene describir brevemente el contenido del reel.
------------------------------------------------------------------ */
const reels = [
  { cover: "images/reels/reel-01-cover.jpg", video: "videos/reel-01.mp4", alt: "Reel de campera para moto" },
  { cover: "images/reels/reel-02-cover.jpg", video: "videos/reel-02.mp4", alt: "Reel sobre robos y seguridad" },
  { cover: "images/reels/reel-03-cover.jpg", video: "videos/reel-03.mp4", alt: "Reel con tres razones" },
  { cover: "images/reels/reel-04-cover.jpg", video: "videos/reel-04.mp4", alt: "Reel sobre arrugas en la piel" },
  { cover: "images/reels/reel-05-cover.jpg", video: "videos/reel-05.mp4", alt: "Reel de cierre de año" }
];

/* Íconos (SVG inline, trazo) */
const icons = {
  brand : '<path d="M4 20 12 4l8 16M8 14h8"/>',
  eye   : '<path d="M2 12s3.6-6 10-6 10 6 10 6-3.6 6-10 6-10-6-10-6Z"/><circle cx="12" cy="12" r="3"/>',
  grid  : '<rect x="3" y="3" width="7" height="7" rx="1.5"/><rect x="14" y="3" width="7" height="7" rx="1.5"/><rect x="3" y="14" width="7" height="7" rx="1.5"/><rect x="14" y="14" width="7" height="7" rx="1.5"/>',
  layers: '<path d="M12 3 3 8l9 5 9-5-9-5Z"/><path d="M3 13.5 12 18l9-4.5"/>',
  play  : '<circle cx="12" cy="12" r="9"/><path d="M10 8.5 16 12l-6 3.5v-7Z"/>',
  circle: '<circle cx="12" cy="12" r="9"/><path d="M12 7v5l3 2"/>',
  camera: '<path d="M3 8.5A2.5 2.5 0 0 1 5.5 6h2L9 4h6l1.5 2h2A2.5 2.5 0 0 1 21 8.5v8A2.5 2.5 0 0 1 18.5 19h-13A2.5 2.5 0 0 1 3 16.5v-8Z"/><circle cx="12" cy="12.5" r="3.5"/>',
  target: '<circle cx="12" cy="12" r="9"/><circle cx="12" cy="12" r="5"/><circle cx="12" cy="12" r="1.4"/>',
  web   : '<rect x="3" y="4" width="18" height="13" rx="2"/><path d="M8 21h8M12 17v4M8.5 9.5 6.5 11l2 1.5M15.5 9.5l2 1.5-2 1.5M13.5 8l-3 6"/>'
};


/* ============================================================
   1. UTILIDADES
============================================================ */
const $  = (s, c = document) => c.querySelector(s);
const $$ = (s, c = document) => [...c.querySelectorAll(s)];
const REDUCED = window.matchMedia("(prefers-reduced-motion: reduce)").matches;
const FINE    = window.matchMedia("(pointer: fine)").matches;

gsap.registerPlugin(ScrollTrigger);
gsap.defaults({ ease: "power2.out" });


/* ============================================================
   2. SMOOTH SCROLL (LENIS) + SCROLLTRIGGER
============================================================ */
let lenis = null;

function initSmoothScroll(){
  if (REDUCED || typeof Lenis === "undefined") return;

  lenis = new Lenis({
    duration: 1.15,
    easing: t => Math.min(1, 1.001 - Math.pow(2, -10 * t)),
    smoothWheel: true,
    touchMultiplier: 1.4
  });

  lenis.on("scroll", ScrollTrigger.update);
  gsap.ticker.add(time => lenis.raf(time * 1000));
  gsap.ticker.lagSmoothing(0);
}

/* Anclas internas */
function initAnchors(){
  $$('a[href^="#"]').forEach(a => {
    a.addEventListener("click", e => {
      const id = a.getAttribute("href");
      if (id.length < 2) return;
      const target = document.querySelector(id);
      if (!target) return;
      e.preventDefault();
      closeMenu();
      if (lenis) lenis.scrollTo(target, { offset: -10, duration: 1.4 });
      else target.scrollIntoView({ behavior: REDUCED ? "auto" : "smooth" });
    });
  });
}


/* ============================================================
   3. CURSOR + HOVER MAGNÉTICO
============================================================ */
function initCursor(){
  if (!FINE || REDUCED) return;

  const cursor = $(".cursor");
  const dot    = $(".cursor__dot");
  const ring   = $(".cursor__ring");
  const label  = $(".cursor__label");
  const pos    = { x: innerWidth / 2, y: innerHeight / 2 };
  const ringPos= { ...pos };

  window.addEventListener("mousemove", e => { pos.x = e.clientX; pos.y = e.clientY; });

  gsap.ticker.add(() => {
    ringPos.x += (pos.x - ringPos.x) * 0.16;
    ringPos.y += (pos.y - ringPos.y) * 0.16;
    gsap.set(dot,  { x: pos.x, y: pos.y });
    gsap.set(ring, { x: ringPos.x, y: ringPos.y });
  });

  /* Estados */
  const hoverables = "a, button, .work, .card, .pcard, .tab";
  document.addEventListener("mouseover", e => {
    const t = e.target.closest(hoverables);
    if (!t) return;
    cursor.classList.add("is-active");
    label.textContent = t.dataset.cursor || (t.classList.contains("work") ? "Ver" : "");
  });
  document.addEventListener("mouseout", e => {
    if (!e.target.closest(hoverables)) return;
    cursor.classList.remove("is-active");
  });

  /* Invertir sobre fondos oscuros */
  $$(".cta, .footer, .marquee, .menu, .services, .panel--video").forEach(sec => {
    sec.addEventListener("mouseenter", () => cursor.classList.add("is-inverted"));
    sec.addEventListener("mouseleave", () => cursor.classList.remove("is-inverted"));
  });
}

function initMagnetic(){
  if (!FINE || REDUCED) return;
  $$("[data-magnetic]").forEach(el => {
    const strength = 0.35;
    el.addEventListener("mousemove", e => {
      const r = el.getBoundingClientRect();
      gsap.to(el, {
        x: (e.clientX - (r.left + r.width / 2)) * strength,
        y: (e.clientY - (r.top + r.height / 2)) * strength,
        duration: .6
      });
    });
    el.addEventListener("mouseleave", () => {
      gsap.to(el, { x: 0, y: 0, duration: .8, ease: "elastic.out(1,.4)" });
    });
  });
}


/* ============================================================
   4. INTRO
============================================================ */
function initIntro(onDone){
  const intro = $("#intro");

  if (REDUCED){
    intro.classList.add("is-done");
    document.body.classList.remove("is-locked");
    onDone();
    return;
  }

  document.body.classList.add("is-locked");

  gsap.timeline({
    onComplete(){
      intro.classList.add("is-done");
      document.body.classList.remove("is-locked");
      ScrollTrigger.refresh();
      onDone();
    }
  })
  .to(".intro__word", { y: 0, duration: 1, ease: "power3.out" })
  .to(".intro__sub",  { opacity: 1, duration: .5 }, "-=.5")
  .to(".intro__inner",{ y: -30, opacity: 0, duration: .6, ease: "power2.in" }, "+=.35")
  .to(".intro__panel",{ y: 0, duration: .7, ease: "power3.inOut" }, "-=.5")
  .to(".intro",       { yPercent: -100, duration: .8, ease: "power3.inOut" }, "-=.1");
}


/* ============================================================
   5. HEADER + MENÚ MOBILE
============================================================ */
const menu   = $("#menu");
const burger = $("#burger");

function openMenu(){
  menu.classList.add("is-open");
  menu.setAttribute("aria-hidden", "false");
  burger.classList.add("is-open");
  burger.setAttribute("aria-expanded", "true");
  document.body.classList.add("is-locked");
  if (lenis) lenis.stop();
}
function closeMenu(){
  if (!menu.classList.contains("is-open")) return;
  menu.classList.remove("is-open");
  menu.setAttribute("aria-hidden", "true");
  burger.classList.remove("is-open");
  burger.setAttribute("aria-expanded", "false");
  document.body.classList.remove("is-locked");
  if (lenis) lenis.start();
}

function initHeader(){
  const header = $("#header");

  burger.addEventListener("click", () => {
    menu.classList.contains("is-open") ? closeMenu() : openMenu();
  });

  ScrollTrigger.create({
    start: 80,
    end: "max",
    onUpdate(self){
      // La barra queda siempre fija y visible: solo cambia a modo
      // compacto con fondo esmerilado al pasar los 80px de scroll.
      header.classList.toggle("is-stuck", self.scroll() > 80);
    }
  });
}


/* ============================================================
   6. SPLIT DE TEXTO Y REVEALS GENÉRICOS
============================================================ */
/* Envuelve cada palabra en una máscara para revelados limpios */
function splitWords(el){
  const words = el.textContent.trim().split(/\s+/);
  el.innerHTML = words.map(w =>
    `<span class="mask" style="display:inline-block;overflow:hidden;vertical-align:bottom"><span class="wrd" style="display:inline-block;will-change:transform">${w}</span></span>`
  ).join(" ");
  return $$(".wrd", el);
}

function initReveals(){
  if (REDUCED) return;

  /* Títulos gigantes: palabras que suben desde su máscara */
  $$(".h-giant").forEach(title => {
    const items = $$(".w, em", title);
    gsap.from(items, {
      yPercent: 140,   /* la máscara creció con el padding: más recorrido para que la palabra arranque oculta */
      rotate: 3,
      duration: 1.15,
      ease: "power4.out",
      stagger: 0.08,
      scrollTrigger: { trigger: title, start: "top 85%" }
    });
  });

  /* Bloques de texto y elementos sueltos (los del hero ya se animan en initHero) */
  $$(".reveal-up").filter(el => !el.closest(".hero")).forEach(el => {
    gsap.from(el, {
      y: 34,
      opacity: 0,
      duration: 1,
      clearProps: "transform,opacity",
      scrollTrigger: { trigger: el, start: "top 90%" }
    });
  });

  /* Imagen "sobre nosotros": clip-path reveal + escala */
  const aboutImg = $(".about__media img");
  if (aboutImg){
    gsap.from(aboutImg, {
      clipPath: "inset(100% 0% 0% 0%)",
      scale: 1.18,
      duration: 1.4,
      ease: "power3.out",
      clearProps: "clipPath",
      scrollTrigger: { trigger: ".about__media", start: "top 82%" }
    });
    /* Parallax dentro del marco: se mueve dentro del excedente del 15% */
    gsap.fromTo(aboutImg,
      { yPercent: 5 },
      {
        yPercent: -5,
        ease: "none",
        scrollTrigger: { trigger: ".about__media", start: "top bottom", end: "bottom top", scrub: true }
      }
    );
  }

  /* Números de stats */
  $$(".about__stats strong").forEach(el => {
    gsap.from(el, {
      yPercent: 100, opacity: 0, duration: .9,
      scrollTrigger: { trigger: el, start: "top 92%" }
    });
  });
}


/* ============================================================
   7. HERO
============================================================ */
function initHero(){
  const words = $$(".hero__title .w, .hero__title em");

  if (REDUCED){
    gsap.set([words, ".hero__lead", ".hero__cta", ".eyebrow"], { clearProps: "all" });
    return;
  }

  const tl = gsap.timeline();
  tl.from(".hero .eyebrow", { y: 20, opacity: 0, duration: .8, clearProps: "transform,opacity" })
    .from(words, {
      yPercent: 140, rotate: 4, duration: 1.25, ease: "power4.out", stagger: .07
    }, "-=.5")
    .from(".hero__lead", { y: 30, opacity: 0, duration: .9, clearProps: "transform,opacity" }, "-=.7")
    .from(".hero__cta .btn", { y: 24, opacity: 0, duration: .8, stagger: .09, clearProps: "transform,opacity" }, "-=.65")
    .from(".hero__scroll", { opacity: 0, duration: .6 }, "-=.4")
    .from(".blob, .ring, .squiggle", {
      scale: 0, opacity: 0, duration: 1.2, ease: "back.out(1.4)", stagger: .08
    }, "-=1.2");

  /* Salida del hero al hacer scroll.
     Sin filter:blur() a propósito: el navegador rasteriza la capa filtrada
     y el texto chico (botones y bajada) quedaba borroso incluso al inicio. */
  gsap.to(".hero__inner", {
    yPercent: -12,
    opacity: .3,
    ease: "none",
    scrollTrigger: {
      trigger: ".hero",
      start: "top top",
      end: "bottom top",
      scrub: true,
      invalidateOnRefresh: true
    }
  });
}


/* ============================================================
   8. PARALLAX DE FONDO (palabras, blobs, mouse)
============================================================ */
function initBackgroundMotion(){
  if (REDUCED) return;

  /* Palabras gigantes del hero: deriva horizontal lenta */
  $$(".bgword").forEach(word => {
    const speed = parseFloat(word.dataset.speed) || .1;
    gsap.fromTo(word,
      { xPercent: speed > 0 ? -6 : -22 },
      {
        xPercent: speed > 0 ? -22 : -6,
        ease: "none",
        scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: 1.2 }
      }
    );
    /* Deriva ambiental continua */
    gsap.to(word, { x: speed * 220, duration: 14, ease: "sine.inOut", yoyo: true, repeat: -1 });
  });

  /* Blobs con parallax de scroll */
  $$("[data-float]").forEach(el => {
    const f = parseFloat(el.dataset.float) || 1;
    gsap.to(el, {
      yPercent: f * 28,
      rotate: f * 12,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });
  });

  /* Parallax de mouse */
  if (FINE){
    const floats = $$("[data-float]");
    window.addEventListener("mousemove", e => {
      const cx = (e.clientX / innerWidth  - .5);
      const cy = (e.clientY / innerHeight - .5);
      floats.forEach(el => {
        const f = parseFloat(el.dataset.float) || 1;
        gsap.to(el, { x: cx * 40 * f, y: cy * 30 * f, duration: 1.2, overwrite: "auto" });
      });
    });
  }

  /* Palabra gigante CREAMOS del portfolio: mucho más lenta que el scroll */
  const big = $("[data-bigword]");
  if (big){
    gsap.fromTo(big,
      { xPercent: 4 },
      {
        xPercent: -34,
        ease: "none",
        scrollTrigger: { trigger: ".portfolio", start: "top bottom", end: "bottom top", scrub: 2.2 }
      }
    );
  }
}


/* ============================================================
   9. SERVICIOS
============================================================ */
function renderServices(){
  const grid = $("#services-grid");
  grid.innerHTML = services.map((s, i) => `
    <article class="card">
      <div class="card__top">
        <span class="card__num">${String(i + 1).padStart(2, "0")}</span>
        <svg class="card__icon" viewBox="0 0 24 24" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">${icons[s.icon] || icons.circle}</svg>
      </div>
      <div>
        <h3 class="card__title">${s.title}</h3>
        <p class="card__desc">${s.desc}</p>
      </div>
    </article>
  `).join("");

  if (REDUCED) return;
  gsap.from($$(".card"), {
    y: 60, opacity: 0, duration: 1, stagger: { each: .07, from: "start" },
    scrollTrigger: { trigger: "#services-grid", start: "top 82%" }
  });
}


/* ============================================================
   10. SERVICIOS Y PAQUETES (pestañas)
============================================================ */
function initOffer(){
  const tabs   = $$(".tab");
  const panels = $$(".panel");
  if (!tabs.length) return;

  /* Entrada de las tarjetas de un panel */
  function animatePanel(panel){
    if (REDUCED) return;
    const cards = $$(".pcard, .prodcard, .strategy", panel);
    gsap.from(cards, {
      y: 44, opacity: 0, scale: .97,
      duration: .8, stagger: .07,
      clearProps: "transform,opacity",
      overwrite: true
    });
    gsap.from($$(".panel__head, .panel__note", panel), {
      y: 22, opacity: 0, duration: .7, stagger: .08, clearProps: "transform,opacity"
    });
  }

  function activate(name, animate = true){
    tabs.forEach(t => {
      const on = t.dataset.panel === name;
      t.classList.toggle("is-active", on);
      t.setAttribute("aria-selected", on ? "true" : "false");
      t.tabIndex = on ? 0 : -1;
    });
    panels.forEach(pn => {
      const on = pn.dataset.panel === name;
      pn.classList.toggle("is-active", on);
      pn.hidden = !on;
    });
    const panel = panels.find(pn => pn.dataset.panel === name);
    if (panel && animate) animatePanel(panel);
    /* Cambió el alto de la página: hay que recalcular los ScrollTrigger */
    ScrollTrigger.refresh();
  }

  tabs.forEach(tab => {
    tab.addEventListener("click", () => activate(tab.dataset.panel));
    /* Navegación con flechas entre pestañas */
    tab.addEventListener("keydown", e => {
      const i = tabs.indexOf(tab);
      let next = null;
      if (e.key === "ArrowRight") next = tabs[(i + 1) % tabs.length];
      if (e.key === "ArrowLeft")  next = tabs[(i - 1 + tabs.length) % tabs.length];
      if (!next) return;
      e.preventDefault();
      activate(next.dataset.panel);
      next.focus();
    });
  });

  /* El primer panel se anima al llegar con el scroll, una sola vez */
  const panels_wrap = $(".panels");
  if (panels_wrap && !REDUCED){
    ScrollTrigger.create({
      trigger: panels_wrap,
      start: "top 82%",
      once: true,
      onEnter(){
        const activo = panels.find(pn => pn.classList.contains("is-active"));
        if (activo) animatePanel(activo);
      }
    });
  }
}

/* Los botones de servicio llevan al contacto y dejan anotado qué se eligió.
   Ese dato también se suma al mensaje de WhatsApp cuando el enlace lo permite. */
function initServiceButtons(){
  $$("[data-msg]").forEach(btn => {
    btn.addEventListener("click", () => {
      const pick = $("#cta-pick");
      if (pick){
        pick.textContent = btn.dataset.msg;
        pick.hidden = false;
      }
      const wa = $(".cta__action [data-wa]");
      if (wa) wa.href = waHref(btn.dataset.msg);
    });
  });
}


/* ============================================================
   11. PORTFOLIO — carrusel de reels
============================================================ */
function renderPortfolio(){
  const rail = $("#rail-videos");
  if (!rail) return;

  /* Tarjetas sin texto: solo portada y botón de reproducción */
  rail.innerHTML = reels.map((item, i) => `
    <article class="work" data-index="${i}" tabindex="0" role="button" aria-label="Reproducir ${item.alt || "reel " + (i + 1)}">
      <div class="work__media">
        <img src="${item.cover}" alt="" loading="lazy">
        <span class="work__play" aria-hidden="true">
          <svg viewBox="0 0 24 24" aria-hidden="true"><path d="M9 7.5 17 12l-8 4.5v-9Z" fill="currentColor"/></svg>
        </span>
      </div>
    </article>
  `).join("");

  /* El listener va en el carril, no en cada tarjeta.
     Motivo: mientras se arrastra, el carril captura el puntero, y en ese
     caso el navegador dispara el "click" sobre el elemento que capturó y
     no sobre la tarjeta. Con delegación da igual dónde aterrice el evento:
     buscamos la tarjeta con closest() y siempre la encontramos. */
  const abrir = card => {
    const item = reels[+card.dataset.index];
    if (item) openVideo(item);
  };

  rail.addEventListener("click", e => {
    if (rail.dataset.dragged === "true") return;   // venía de un arrastre real
    const card = e.target.closest(".work");
    if (card && rail.contains(card)) abrir(card);
  });

  rail.addEventListener("keydown", e => {
    if (e.key !== "Enter" && e.key !== " ") return;
    const card = e.target.closest(".work");
    if (!card) return;
    e.preventDefault();
    abrir(card);
  });

  animateRails();
}

function animateRails(){
  if (REDUCED) return;

  $$("[data-rail-track]").forEach(rail => {
    const cards = $$(".work", rail);

    /* Entrada: alternando lados, con escala y rotación.
       clearProps borra los estilos inline al terminar. */
    cards.forEach((card, i) => {
      gsap.from(card, {
        x: i % 2 === 0 ? 120 : -90,
        y: 60,
        scale: .88,
        rotate: i % 2 === 0 ? 4 : -4,
        opacity: 0,
        duration: 1.15,
        delay: (i % 4) * .08,
        clearProps: "transform,opacity,filter",
        scrollTrigger: { trigger: rail, start: "top 88%" }
      });
    });

    /* Movimiento horizontal ligado al scroll. Se cancela apenas el
       usuario toma el control del carrusel. */
    rail._parallax = gsap.fromTo(rail,
      { scrollLeft: 0 },
      {
        scrollLeft: () => Math.min(160, rail.scrollWidth - rail.clientWidth),
        ease: "none",
        scrollTrigger: { trigger: rail, start: "top bottom", end: "bottom top", scrub: 1.5 }
      }
    );
  });
}

/* Drag + flechas de los rails */
function initRails(){
  const releaseParallax = rail => {
    if (rail._parallax){
      rail._parallax.scrollTrigger && rail._parallax.scrollTrigger.kill();
      rail._parallax.kill();
      rail._parallax = null;
    }
  };

  $$("[data-rail-track]").forEach(rail => {
    let apretado = false, arrastrando = false, startX = 0, startScroll = 0, punteroId = null;

    ["pointerdown", "wheel", "touchstart"].forEach(ev =>
      rail.addEventListener(ev, () => releaseParallax(rail), { passive: true })
    );

    /* Al apretar NO se captura el puntero ni se agrega .is-dragging.
       Las dos cosas rompen el click: la captura lo redirige al carril y
       la clase apaga los pointer-events de las tarjetas mientras el botón
       está apretado. El arrastre recién empieza si el mouse se mueve. */
    rail.addEventListener("pointerdown", e => {
      if (e.pointerType === "touch") return;      // en touch el scroll es nativo
      apretado = true; arrastrando = false;
      startX = e.clientX; startScroll = rail.scrollLeft; punteroId = e.pointerId;
    });

    rail.addEventListener("pointermove", e => {
      if (!apretado) return;
      const dx = e.clientX - startX;
      if (!arrastrando && Math.abs(dx) > 5){       // umbral: 5px de movimiento
        arrastrando = true;
        rail.classList.add("is-dragging");
        try { rail.setPointerCapture(punteroId); } catch (_) {}
      }
      if (arrastrando) rail.scrollLeft = startScroll - dx;
    });

    const end = () => {
      if (!apretado) return;
      apretado = false;
      if (arrastrando){
        rail.classList.remove("is-dragging");
        rail.dataset.dragged = "true";            // evita que el soltar abra un reel
        setTimeout(() => { rail.dataset.dragged = "false"; }, 60);
      }
      arrastrando = false;
    };
    rail.addEventListener("pointerup", end);
    rail.addEventListener("pointerleave", end);
    rail.addEventListener("pointercancel", end);
  });

  $$(".rail-nav__btn").forEach(btn => {
    btn.addEventListener("click", () => {
      const rail = $(`#rail-${btn.dataset.rail}`);
      releaseParallax(rail);
      const card = $(".work", rail);
      const step = card ? card.offsetWidth + 24 : 320;
      rail.scrollBy({ left: step * +btn.dataset.dir, behavior: REDUCED ? "auto" : "smooth" });
    });
  });
}


/* ============================================================
   12. GALERÍA PARALLAX
   Escala 0.7 → 1.2, opacidad 0 → 1, movimiento 20% más lento
============================================================ */
function initGalleryParallax(){
  if (REDUCED) return;

  $$("[data-parallax-img]").forEach(fig => {
    const img = $("img", fig);

    gsap.fromTo(img,
      { scale: .7, opacity: 0 },
      {
        scale: 1.2,
        opacity: 1,
        ease: "power2.out",
        scrollTrigger: {
          trigger: fig,
          start: "top bottom",
          end: "+=600",        // ~600px de scroll
          scrub: true
        }
      }
    );

    /* Se mueve un 20% más lento que el scroll */
    gsap.fromTo(img,
      { yPercent: -10 },
      {
        yPercent: 10,
        ease: "none",
        scrollTrigger: { trigger: fig, start: "top bottom", end: "bottom top", scrub: true }
      }
    );

    gsap.from($("figcaption", fig), {
      opacity: 0, y: 20, duration: .8,
      scrollTrigger: { trigger: fig, start: "top 70%" }
    });
  });
}


/* ============================================================
   13. PROCESO
============================================================ */
function initProcess(){
  if (REDUCED) return;

  gsap.from(".steps__line", {
    scaleX: 0, transformOrigin: "left center", duration: 1.4,
    scrollTrigger: { trigger: ".steps", start: "top 78%" }
  });

  $$(".step").forEach((step, i) => {
    gsap.from(step, {
      y: 50, opacity: 0, duration: .9, delay: i * .12,
      scrollTrigger: { trigger: ".steps", start: "top 80%" }
    });
    gsap.from($(".step__num", step), {
      scale: 0, rotate: -90, duration: .8, ease: "back.out(1.7)", delay: i * .12 + .15,
      scrollTrigger: { trigger: ".steps", start: "top 80%" }
    });
  });
}


/* ============================================================
   14. MODAL DE VIDEO
============================================================ */
const modalVideo = $("#modal-video");
const player     = $("#modal-player");

function lockScroll(on){
  document.body.classList.toggle("is-locked", on);
  if (lenis) on ? lenis.stop() : lenis.start();
}

function openVideo(item){
  /* Nunca hay dos videos sonando: solo existe este reproductor y
     siempre se carga de cero. */
  player.setAttribute("poster", item.cover || "");
  player.src = item.video;
  player.currentTime = 0;
  modalVideo.classList.add("is-open");
  modalVideo.setAttribute("aria-hidden", "false");
  lockScroll(true);
  const p = player.play();
  if (p && p.catch) p.catch(() => {});   // si el navegador bloquea el autoplay con sonido

  /* Diagnóstico: si el archivo no aparece, queda dicho en la consola */
  player.onerror = () => {
    console.error(
      `[Menta] No se pudo cargar "${item.video}". Revisá que el archivo exista ` +
      `en esa ruta y que estés abriendo index.html con la carpeta videos/ al lado.`
    );
  };
  $(".modal--video .modal__close").focus();
}

function closeVideo(){
  if (!modalVideo.classList.contains("is-open")) return;
  player.pause();
  player.currentTime = 0;
  modalVideo.classList.remove("is-open");
  modalVideo.setAttribute("aria-hidden", "true");
  lockScroll(false);
  /* Se limpia el src para que no siga descargando ni sonando de fondo */
  setTimeout(() => { player.removeAttribute("src"); player.load(); }, 400);
}

function initModals(){
  /* Cerrar con la X y haciendo clic fuera del video */
  $$("[data-close]").forEach(el => el.addEventListener("click", closeVideo));

  /* Cerrar con Escape */
  document.addEventListener("keydown", e => {
    if (e.key === "Escape"){ closeVideo(); closeMenu(); }
  });
}


/* ============================================================
   15. FORMULARIO + AÑO
============================================================ */
/* --------------------------------------------------------------
   WHATSAPP — acá se edita todo lo del contacto
   --------------------------------------------------------------
   WA_LINK: el enlace corto de tu WhatsApp Business.

   OJO con el mensaje predefinido: los enlaces del tipo
   wa.me/message/CODIGO NO admiten texto en la URL. Ese mensaje se
   configura dentro de WhatsApp Business:
     Herramientas para empresas → Enlace corto → Mensaje predeterminado
   y ahí pegás el texto de WA_TEXT.

   Si preferís que el mensaje viaje en el enlace, cambiá WA_LINK por
   tu número:  const WA_LINK = "https://wa.me/5491122334455";
   El código detecta el formato y agrega el texto automáticamente.
----------------------------------------------------------------- */
const WA_LINK = "https://wa.me/message/P4GQGCQYYE4SF1";

const WA_TEXT = `¡Hola Menta Studio! 👋

Vi su página web y me gustaría recibir información sobre sus servicios.

Quisiera conocer más sobre:

____________________

Muchas gracias.`;

/* Arma el enlace final: si es un enlace por número, le suma el mensaje */
function waHref(extra){
  const porNumero = !WA_LINK.includes("/message/");
  if (!porNumero) return WA_LINK;
  const texto = extra ? `${WA_TEXT}\n\n${extra}` : WA_TEXT;
  return `${WA_LINK}?text=${encodeURIComponent(texto)}`;
}

function initWhatsapp(){
  $$("[data-wa]").forEach(a => { a.href = waHref(); });

  /* Botón flotante: aparece al dejar atrás la primera pantalla */
  const float = $(".wa-float");
  if (!float) return;

  if (REDUCED){
    float.classList.add("is-visible");
    return;
  }
  ScrollTrigger.create({
    start: 500,
    end: "max",
    onUpdate(self){ float.classList.toggle("is-visible", self.scroll() > 500); }
  });
}

function initYear(){
  $("#year").textContent = new Date().getFullYear();
}


/* ============================================================
   ARRANQUE
============================================================ */
function boot(){
  initSmoothScroll();
  initAnchors();
  initHeader();
  initCursor();
  renderServices();
  renderPortfolio();
  initRails();
  initModals();
  initOffer();
  initServiceButtons();
  initWhatsapp();
  initYear();

  initIntro(() => {
    initHero();
    initReveals();
    initBackgroundMotion();
    initGalleryParallax();
    initProcess();
    initMagnetic();
    ScrollTrigger.refresh();
  });

  /* Recalcular posiciones cuando cargan las imágenes */
  window.addEventListener("load", () => ScrollTrigger.refresh());
  let rt;
  window.addEventListener("resize", () => {
    clearTimeout(rt);
    rt = setTimeout(() => ScrollTrigger.refresh(), 250);
  });
}

document.addEventListener("DOMContentLoaded", boot);
