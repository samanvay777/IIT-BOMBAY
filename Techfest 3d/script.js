(() => {
  "use strict";

  const $ = (s, root = document) => root.querySelector(s);
  const $$ = (s, root = document) => [...root.querySelectorAll(s)];

  document.body.classList.add("loading");

  const loader = $("#loader");
  const loaderBar = $(".loader-line i");

  if (window.gsap) {
    gsap.to(loaderBar, { width: "100%", duration: 1.2, ease: "power2.inOut" });
    gsap.to(loader, {
      opacity: 0,
      duration: 0.7,
      delay: 1.35,
      onComplete: () => {
        loader.remove();
        document.body.classList.remove("loading");
        startHeroIntro();
      }
    });
  } else {
    loader.remove();
    document.body.classList.remove("loading");
  }

  function startHeroIntro() {
    if (!window.gsap) return;
    gsap.from(".hero-copy > *", {
      y: 45,
      opacity: 0,
      duration: 1,
      stagger: 0.12,
      ease: "power3.out"
    });
  }

  // Three.js particle field. No external 3D assets required.
  function createParticleWorld(canvasId, density = 8500, redRatio = 0.05) {
    const canvas = document.getElementById(canvasId);
    if (!canvas || !window.THREE) return null;

    const scene = new THREE.Scene();
    const camera = new THREE.PerspectiveCamera(55, 1, 0.1, 100);
    camera.position.z = 8;

    const renderer = new THREE.WebGLRenderer({ canvas, antialias: true, alpha: true });
    renderer.setPixelRatio(Math.min(window.devicePixelRatio, 1.8));

    const group = new THREE.Group();
    scene.add(group);

    const positions = new Float32Array(density * 3);
    const sizes = new Float32Array(density);
    const colors = new Float32Array(density * 3);

    for (let i = 0; i < density; i++) {
      const r = 2.5 + Math.pow(Math.random(), 0.55) * 12;
      const theta = Math.random() * Math.PI * 2;
      const phi = Math.acos((Math.random() * 2) - 1);
      positions[i * 3] = Math.sin(phi) * Math.cos(theta) * r;
      positions[i * 3 + 1] = Math.sin(phi) * Math.sin(theta) * r * 0.62;
      positions[i * 3 + 2] = Math.cos(phi) * r;

      const red = Math.random() < redRatio;
      colors[i * 3] = red ? 1 : 0.55 + Math.random() * 0.35;
      colors[i * 3 + 1] = red ? 0.04 : 0.55 + Math.random() * 0.35;
      colors[i * 3 + 2] = red ? 0.05 : 0.55 + Math.random() * 0.35;
      sizes[i] = red ? 0.055 : 0.025 + Math.random() * 0.035;
    }

    const geometry = new THREE.BufferGeometry();
    geometry.setAttribute("position", new THREE.BufferAttribute(positions, 3));
    geometry.setAttribute("color", new THREE.BufferAttribute(colors, 3));
    geometry.setAttribute("size", new THREE.BufferAttribute(sizes, 1));

    const material = new THREE.ShaderMaterial({
      transparent: true,
      depthWrite: false,
      vertexColors: true,
      blending: THREE.AdditiveBlending,
      vertexShader: `
        attribute float size;
        varying vec3 vColor;
        void main(){
          vColor = color;
          vec4 mvPosition = modelViewMatrix * vec4(position, 1.0);
          gl_PointSize = size * (280.0 / -mvPosition.z);
          gl_Position = projectionMatrix * mvPosition;
        }
      `,
      fragmentShader: `
        varying vec3 vColor;
        void main(){
          float d = distance(gl_PointCoord, vec2(.5));
          float a = smoothstep(.5, .05, d);
          gl_FragColor = vec4(vColor, a);
        }
      `
    });

    const points = new THREE.Points(geometry, material);
    group.add(points);

    const resize = () => {
      const w = canvas.clientWidth || window.innerWidth;
      const h = canvas.clientHeight || window.innerHeight;
      renderer.setSize(w, h, false);
      camera.aspect = w / h;
      camera.updateProjectionMatrix();
    };
    resize();
    window.addEventListener("resize", resize);

    let mx = 0, my = 0;
    window.addEventListener("pointermove", e => {
      mx = (e.clientX / window.innerWidth - 0.5) * 2;
      my = (e.clientY / window.innerHeight - 0.5) * 2;
    });

    const clock = new THREE.Clock();
    const animate = () => {
      const t = clock.getElapsedTime();
      points.rotation.y = t * 0.018 + mx * 0.06;
      points.rotation.x = Math.sin(t * 0.12) * 0.035 + my * 0.025;
      group.position.x += ((mx * 0.28) - group.position.x) * 0.02;
      group.position.y += ((-my * 0.18) - group.position.y) * 0.02;
      renderer.render(scene, camera);
      requestAnimationFrame(animate);
    };
    animate();

    return { scene, camera, renderer, points };
  }

  const world = createParticleWorld("space", 10500, 0.055);
  const finalWorld = createParticleWorld("final-space", 6500, 0.07);

  // GSAP scroll choreography.
  if (window.gsap && window.ScrollTrigger) {
    gsap.registerPlugin(ScrollTrigger);

    gsap.to(".hero-copy", {
      yPercent: -24,
      opacity: 0.2,
      ease: "none",
      scrollTrigger: { trigger: ".hero", start: "top top", end: "bottom top", scrub: true }
    });

    gsap.to(".hero-counter strong", {
      textContent: 2,
      snap: { textContent: 1 },
      ease: "none",
      scrollTrigger: { trigger: ".portal", start: "top 80%", end: "bottom 20%", scrub: true }
    });

    gsap.to(".portal-core", {
      rotate: 360,
      scale: 1.18,
      ease: "none",
      scrollTrigger: { trigger: ".portal", start: "top bottom", end: "bottom top", scrub: true }
    });

    $$(".event-card").forEach((card, i) => {
      gsap.from(card, {
        y: 80,
        opacity: 0,
        duration: 1,
        delay: i * 0.04,
        scrollTrigger: { trigger: card, start: "top 88%", once: true }
      });
    });

    $$(".experience-track article").forEach((article, i) => {
      gsap.from(article.querySelector("h3"), {
        x: i % 2 ? 100 : -100,
        opacity: 0,
        scrollTrigger: { trigger: article, start: "top 80%", end: "top 35%", scrub: true }
      });
    });

    gsap.to(".countdown-bg", {
      yPercent: -18,
      rotation: 8,
      ease: "none",
      scrollTrigger: { trigger: ".countdown", start: "top bottom", end: "bottom top", scrub: true }
    });

    $$(".timeline-item").forEach(item => {
      gsap.from(item, {
        x: 80,
        opacity: 0,
        scrollTrigger: { trigger: item, start: "top 88%", once: true }
      });
    });
  }

  // Fallback reveal observer.
  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("visible");
        revealObserver.unobserve(entry.target);
      }
    });
  }, { threshold: 0.12 });

  $$(".reveal").forEach(el => revealObserver.observe(el));

  // Interactive card tilt.
  $$(".event-card").forEach(card => {
    card.addEventListener("pointermove", e => {
      if (window.innerWidth < 700) return;
      const r = card.getBoundingClientRect();
      const x = (e.clientX - r.left) / r.width - 0.5;
      const y = (e.clientY - r.top) / r.height - 0.5;
      card.style.transform = `perspective(1000px) rotateX(${-y * 4}deg) rotateY(${x * 5}deg)`;
    });
    card.addEventListener("pointerleave", () => {
      card.style.transform = "";
    });
  });

  // Magnetic buttons.
  $$(".magnetic").forEach(button => {
    button.addEventListener("pointermove", e => {
      const r = button.getBoundingClientRect();
      const x = e.clientX - (r.left + r.width / 2);
      const y = e.clientY - (r.top + r.height / 2);
      button.style.transform = `translate(${x * 0.14}px, ${y * 0.14}px)`;
    });
    button.addEventListener("pointerleave", () => button.style.transform = "");
  });

  // Cursor.
  const cursor = $(".cursor");
  const ring = $(".cursor-ring");
  if (cursor && ring) {
    let cx = innerWidth / 2, cy = innerHeight / 2, rx = cx, ry = cy;
    window.addEventListener("pointermove", e => { cx = e.clientX; cy = e.clientY; });
    const cursorLoop = () => {
      rx += (cx - rx) * 0.18;
      ry += (cy - ry) * 0.18;
      cursor.style.left = cx + "px";
      cursor.style.top = cy + "px";
      ring.style.left = rx + "px";
      ring.style.top = ry + "px";
      requestAnimationFrame(cursorLoop);
    };
    cursorLoop();
    $$("a,button,.event-card,.portal-core").forEach(el => {
      el.addEventListener("mouseenter", () => document.body.classList.add("cursor-hover"));
      el.addEventListener("mouseleave", () => document.body.classList.remove("cursor-hover"));
    });
  }

  // Stats count-up.
  const counters = $$("[data-count]");
  const countObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el = entry.target;
      const target = Number(el.dataset.count);
      const duration = 1400;
      const start = performance.now();
      const tick = now => {
        const progress = Math.min((now - start) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        const value = Math.floor(target * eased);
        el.textContent = value >= 1000 ? value.toLocaleString("en-IN") : value;
        if (progress < 1) requestAnimationFrame(tick);
      };
      requestAnimationFrame(tick);
      countObserver.unobserve(el);
    });
  }, { threshold: 0.5 });
  counters.forEach(el => countObserver.observe(el));

  // Countdown. Update this target when Techfest publishes the official 2026 festival dates.
  const targetDate = new Date("2026-12-22T00:00:00+05:30").getTime();
  const updateCountdown = () => {
    const diff = Math.max(0, targetDate - Date.now());
    const d = Math.floor(diff / 86400000);
    const h = Math.floor(diff / 3600000) % 24;
    const m = Math.floor(diff / 60000) % 60;
    const s = Math.floor(diff / 1000) % 60;
    $("#days").textContent = String(d).padStart(2, "0");
    $("#hours").textContent = String(h).padStart(2, "0");
    $("#minutes").textContent = String(m).padStart(2, "0");
    $("#seconds").textContent = String(s).padStart(2, "0");
  };
  updateCountdown();
  setInterval(updateCountdown, 1000);

  // Mobile menu.
  const menu = $(".menu");
  menu?.addEventListener("click", () => {
    document.body.classList.toggle("menu-open");
  });
  $$(".nav nav a").forEach(a => a.addEventListener("click", () => document.body.classList.remove("menu-open")));
})();
