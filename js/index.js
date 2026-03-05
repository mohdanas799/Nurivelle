document.addEventListener("DOMContentLoaded", () => {
  // 1. Elements Initialization
  const header = document.getElementById("main-header");
  const menuBtn = document.getElementById("menu-btn");
  const megaMenu = document.getElementById("mega-menu");
  const body = document.body;

  const handleVideoToggle = (videoId, btnId) => {
    const video = document.getElementById(videoId);
    const btn = document.getElementById(btnId);

    // Yahan apne icons ke URL daalein
    const playIcon =
      "https://cdn.prod.website-files.com/6946266171296e600d9c960c/695bad1458151d0a8de6af31_Icon.png";
    // Pause icon ke liye placeholder URL (Aap apna asset link yahan daal sakte hain)
    const pauseIcon =
      "https://cdn.prod.website-files.com/6946266171296e600d9c960c/695baa884dae6aea68223987_Play%20state%20Icon.png";

    if (video && btn) {
      const iconImg = btn.querySelector("img");

      // Agar video autoplay ho raha hai, to pause icon dikhao
      if (!video.paused) {
        iconImg.src = pauseIcon;
      }

      btn.addEventListener("click", () => {
        if (video.paused) {
          video.play();
          iconImg.src = pauseIcon; // Icon badal kar Pause kar do
          btn.classList.add("playing");
        } else {
          video.pause();
          iconImg.src = playIcon; // Icon badal kar Play kar do
          btn.classList.remove("playing");
        }
      });
    }
  };

  // Initialize all video buttons
  handleVideoToggle("myVideo", "videoBtn");
  handleVideoToggle("mainVideo", "galleryVideoBtn");
  handleVideoToggle("bgVideo", "bgVideoBtn");

  // 2. Navbar Scroll Animation (Pill Effect)
  window.addEventListener("scroll", () => {
    if (header) {
      if (window.scrollY > 50) {
        header.classList.add("header-pill");
      } else {
        header.classList.remove("header-pill");
      }
    }
  });

  // 3. Mega Menu Toggle
  if (menuBtn && megaMenu) {
    menuBtn.addEventListener("click", () => {
      const isActive = megaMenu.classList.toggle("active");
      menuBtn.classList.toggle("active-burger");
      body.style.overflow = isActive ? "hidden" : "auto";
    });
  }

  // 4. Reveal Animation
  const revealObserver = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("active");
        }
      });
    },
    { threshold: 0.1 },
  );

  document
    .querySelectorAll(".reveal")
    .forEach((el) => revealObserver.observe(el));

  // 5. Counter Animation
  const counterObserver = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const counter = entry.target;
          const target = +counter.getAttribute("data-target");
          const speed = 200;
          const updateCount = () => {
            const count = +counter.innerText;
            const inc = target / speed;
            if (count < target) {
              counter.innerText = Math.ceil(count + inc);
              setTimeout(updateCount, 20);
            } else {
              counter.innerText = target;
            }
          };
          updateCount();
          obs.unobserve(counter);
        }
      });
    },
    { threshold: 0.8 },
  );

  document
    .querySelectorAll(".counter")
    .forEach((c) => counterObserver.observe(c));

  // 6. Swiper Initializations
  if (typeof Swiper !== "undefined") {
    new Swiper(".mySwiper", {
      loop: true,
      autoplay: { delay: 3000 },
      speed: 1000,
      effect: "fade",
    });

    new Swiper(".mySwiper1", {
      slidesPerView: "auto",
      centeredSlides: true,
      spaceBetween: 20,
      grabCursor: true,
    });
  }
});

// 7. GSAP Animations (Pinned Sections)
document.addEventListener("DOMContentLoaded", () => {
  if (typeof gsap !== "undefined") {
    gsap.registerPlugin(ScrollTrigger);
    let mm = gsap.matchMedia();

    // --- SECTION 1: WHY CHOOSE US ANIMATIONS ---

    // Desktop Spread Effect
    mm.add("(min-width: 1024px)", () => {
      const cards = gsap.utils.toArray(".card-item");
      if (cards.length) {
        gsap
          .timeline({
            scrollTrigger: {
              trigger: ".trigger-area",
              start: "top top",
              end: "+=300%",
              scrub: 1,
              pin: ".sticky-box",
              pinSpacing: true,
            },
          })
          .to(cards[0], { xPercent: -150, rotation: -12, opacity: 1 }, 0)
          .to(cards[1], { xPercent: -50, rotation: -4, opacity: 1 }, 0)
          .to(cards[2], { xPercent: 50, rotation: 4, opacity: 1 }, 0)
          .to(cards[3], { xPercent: 150, rotation: 12, opacity: 1 }, 0);
      }
    });

    // Mobile Stacking Effect
    mm.add("(max-width: 1023px)", () => {
      const stackCards = gsap.utils.toArray(".card-stack-item");
      stackCards.forEach((card, index) => {
        gsap.set(card, { zIndex: index });
        if (index !== 0) {
          gsap.set(card, { yPercent: 120, rotate: index % 2 === 0 ? 5 : -5 });
        }
      });

      const tl = gsap.timeline({
        scrollTrigger: {
          trigger: ".trigger-area",
          start: "top top",
          end: "+=180%",
          scrub: 0.5,
          pin: ".sticky-box",
          pinSpacing: true,
          anticipatePin: 1,
        },
      });

      stackCards.forEach((card, index) => {
        if (index > 0) {
          tl.to(
            card,
            { yPercent: 0, rotate: 0, duration: 1, ease: "none" },
            "+=0.4",
          );
        }
      });
    });

    // --- SECTION 2: EXPERIENCE SECTION ANIMATION ---
    // Ye hamesha chalega (Desktop + Mobile dono par)
    const expSection = document.querySelector("#experience-section");
    if (expSection) {
      gsap
        .timeline({
          scrollTrigger: {
            trigger: "#experience-section",
            start: "top 80%",
            toggleActions: "play none none reverse",
          },
        })
        .to("#experience-section", { y: 0, opacity: 1, duration: 1 })
        .to(
          ".experience-card",
          {
            y: 0,
            opacity: 1,
            stagger: 0.15,
            duration: 0.8,
            ease: "back.out(1.7)",
          },
          "-=0.5",
        );
    }
  }
});

// FONT STYLE ..............

tailwind.config = {
  theme: {
    extend: {
      fontFamily: {
        comic: ['"Comic Neue"', "cursive"],
        boldo: ["Boldonse"],
      },
    },
  },
};


document.addEventListener("DOMContentLoaded", () => {
  const header = document.getElementById("main-header");
  const logo = document.getElementById("header-logo");
  const cta = document.getElementById("header-cta");
  const menuBtn = document.getElementById("menu-btn");
  const megaMenu = document.getElementById("mega-menu");
  const body = document.body;

  const bar1 = document.getElementById("bar1");
  const bar2 = document.getElementById("bar2");
  const bar3 = document.getElementById("bar3");

  let isMenuOpen = false;

  const toggleMenu = () => {
    isMenuOpen = !isMenuOpen;

    if (isMenuOpen) {
      // 1. Show Mega Menu
      megaMenu.classList.remove(
        "translate-x-full",
        "opacity-0",
        "pointer-events-none",
      );
      megaMenu.classList.add(
        "translate-x-0",
        "opacity-100",
        "pointer-events-auto",
      );

      // 2. Animate Hamburger to 'X'
      bar1.style.transform = "rotate(45deg) translate(5px, 5px)";
      bar2.style.opacity = "0";
      bar3.style.transform = "rotate(-45deg) translate(5px, -5px)";

      // 3. COMPLETE HIDE for Header Background & Logo
      logo.style.opacity = "0";
      logo.style.visibility = "hidden"; // Completely hidden from interaction
      if (cta) {
        cta.style.opacity = "0";
        cta.style.visibility = "hidden";
      }

      header.classList.remove("nav-glass");
      header.classList.add("no-border"); // Removes glass border
      header.style.backgroundColor = "transparent";
      header.style.boxShadow = "none";
      header.style.backdropFilter = "none";

      body.style.overflow = "hidden";
    } else {
      // 1. Hide Mega Menu
      megaMenu.classList.add(
        "translate-x-full",
        "opacity-0",
        "pointer-events-none",
      );
      megaMenu.classList.remove(
        "translate-x-0",
        "opacity-100",
        "pointer-events-auto",
      );

      // 2. Animate 'X' back to Hamburger
      bar1.style.transform = "none";
      bar2.style.opacity = "1";
      bar3.style.transform = "none";

      // 3. RESTORE Header Style
      logo.style.opacity = "1";
      logo.style.visibility = "visible";
      if (cta) {
        cta.style.opacity = "1";
        cta.style.visibility = "visible";
      }

      header.classList.add("nav-glass");
      header.classList.remove("no-border");
      header.style.backgroundColor = "";
      header.style.boxShadow = "";
      header.style.backdropFilter = "";

      body.style.overflow = "";
    }
  };

  menuBtn.addEventListener("click", toggleMenu);

  // Close menu when clicking links
  const navLinks = megaMenu.querySelectorAll("a");
  navLinks.forEach((link) => {
    link.addEventListener("click", () => {
      if (isMenuOpen) toggleMenu();
    });
  });
});

// JS to detect when card reaches its sticky position
const updateCards = () => {
    const wrappers = document.querySelectorAll('.card-wrapper');
    
    wrappers.forEach((wrapper) => {
        const rect = wrapper.getBoundingClientRect();
        const offset = parseInt(wrapper.getAttribute('data-offset'));

        // Agar card apne top position par pahunch gaya hai
        if (rect.top <= offset + 5) { 
            wrapper.classList.add('is-stuck');
        } else {
            wrapper.classList.remove('is-stuck');
        }
    });
};

window.addEventListener('scroll', updateCards);
// Initial run for page load
updateCards();


// 3 Seconds (3000ms) ke baad popup dikhane ke liye
    window.addEventListener('load', function() {
        setTimeout(function() {
            const popup = document.getElementById('popup-overlay');
            popup.classList.remove('hidden');
            popup.classList.add('flex');
        }, 3000); // 3 seconds delay
    });

    // Close button function
    function closePopup() {
        const popup = document.getElementById('popup-overlay');
        popup.style.display = 'none';
    }