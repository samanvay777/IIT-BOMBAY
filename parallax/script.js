(() => {
  const layers = [...document.querySelectorAll(".layer")];
  const depth = document.querySelector(".depth-meter strong");
  const cursor = document.querySelector(".cursor");
  const ring = document.querySelector(".cursor-ring");
  let targetX = innerWidth / 2, targetY = innerHeight / 2, ringX = targetX, ringY = targetY;

  window.addEventListener("pointermove", e => {
    targetX = e.clientX; targetY = e.clientY;
  });

  function cursorLoop(){
    if(cursor && ring){
      cursor.style.left = targetX + "px"; cursor.style.top = targetY + "px";
      ringX += (targetX-ringX)*.15; ringY += (targetY-ringY)*.15;
      ring.style.left = ringX + "px"; ring.style.top = ringY + "px";
    }
    requestAnimationFrame(cursorLoop);
  }
  cursorLoop();

  document.querySelectorAll("a").forEach(a => {
    a.addEventListener("mouseenter",()=>document.body.classList.add("hovering"));
    a.addEventListener("mouseleave",()=>document.body.classList.remove("hovering"));
  });

  if (window.gsap && window.ScrollTrigger && !matchMedia("(prefers-reduced-motion: reduce)").matches) {
    gsap.registerPlugin(ScrollTrigger);

    // Every scene has its own depth field. Faster layers travel farther.
    layers.forEach(layer => {
      const speed = parseFloat(layer.dataset.speed || ".4");
      const scene = layer.closest(".scene");
      if (!scene) return;
      gsap.to(layer, {
        y: () => -(ScrollTrigger.maxScroll(window) * 0.02 + scene.offsetHeight * speed * .42),
        ease: "none",
        scrollTrigger: {
          trigger: scene,
          start: "top bottom",
          end: "bottom top",
          scrub: true
        }
      });
    });

    gsap.to(".hero h1", {
      letterSpacing: "-.03em",
      scale: .88,
      opacity: .25,
      ease: "none",
      scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}
    });

    gsap.to(".hero-shape", {
      rotation: 110,
      scale: 1.22,
      ease:"none",
      scrollTrigger:{trigger:".hero",start:"top top",end:"bottom top",scrub:true}
    });

    gsap.to(".intro-word", {
      xPercent: 22,
      ease:"none",
      scrollTrigger:{trigger:".intro",start:"top bottom",end:"bottom top",scrub:true}
    });

    gsap.to(".door-front", {
      scale: 1.45,
      opacity: .25,
      rotation: 4,
      ease:"none",
      scrollTrigger:{trigger:".tunnel",start:"top bottom",end:"bottom top",scrub:true}
    });

    gsap.to(".tilt-card", {
      rotation: -10,
      y: -90,
      ease:"none",
      scrollTrigger:{trigger:".split",start:"top bottom",end:"bottom top",scrub:true}
    });

    gsap.to(".marquee-track", {
      xPercent:-35,
      ease:"none",
      scrollTrigger:{trigger:".marquee-section",start:"top bottom",end:"bottom top",scrub:true}
    });

    gsap.to(".lab-stack", {
      rotation: 345,
      scale: 1.12,
      ease:"none",
      scrollTrigger:{trigger:".depth-lab",start:"top bottom",end:"bottom top",scrub:true}
    });

    gsap.to(".end-orb", {
      scale: 1.5,
      rotation: 180,
      ease:"none",
      scrollTrigger:{trigger:".end",start:"top bottom",end:"bottom top",scrub:true}
    });

    ScrollTrigger.create({
      trigger: document.body,
      start:"top top",
      end:"bottom bottom",
      onUpdate:self=>{
        if(depth) depth.textContent = String(Math.min(99,Math.round(self.progress*99))).padStart(2,"0");
      }
    });

    document.querySelectorAll(".eyebrow,.intro-copy h2,.tunnel-title h2,.split-left h2,.marquee-center h2,.lab-copy h2,.end-copy h2").forEach(el=>{
      gsap.from(el,{
        y:70,opacity:0,duration:1,ease:"power3.out",
        scrollTrigger:{trigger:el,start:"top 88%",once:true}
      });
    });
  }

  // Small, tactile mouse parallax for the hero.
  const hero = document.querySelector(".hero");
  if(hero && !matchMedia("(prefers-reduced-motion: reduce)").matches){
    hero.addEventListener("pointermove", e=>{
      const x=(e.clientX/innerWidth-.5)*2;
      const y=(e.clientY/innerHeight-.5)*2;
      document.querySelector(".hero-shape").style.marginLeft = `${x*14}px`;
      document.querySelector(".rings").style.marginTop = `${y*8}px`;
    });
    hero.addEventListener("pointerleave",()=>{
      document.querySelector(".hero-shape").style.marginLeft="";
      document.querySelector(".rings").style.marginTop="";
    });
  }
})();