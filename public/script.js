// ========================================
// WAIT FOR PAGE LOAD (LOADER FIX)
// ========================================
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");

  setTimeout(() => {
    loader.classList.add("hidden");

    setTimeout(() => {
      loader.style.display = "none";
    }, 600);

  }, 1800);
});


// ========================================
// THEME TOGGLE
// ========================================
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  localStorage.setItem(
    "theme",
    document.body.classList.contains("light-mode") ? "light" : "dark"
  );
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }
});


// ========================================
// NAVBAR SCROLL EFFECT
// ========================================
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".navbar");
  if (!navbar) return;

  navbar.classList.toggle("scrolled", window.scrollY > 50);
});


// ========================================
// SCROLL PROGRESS BAR
// ========================================
window.addEventListener("scroll", () => {
  const scrollBar = document.querySelector(".scroll-progress");
  if (!scrollBar) return;

  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  scrollBar.style.width = (scrollTop / height) * 100 + "%";
});

const reveals = document.querySelectorAll(".reveal");

window.addEventListener("scroll", () => {
  reveals.forEach(reveal => {
    const windowHeight = window.innerHeight;
    const elementTop = reveal.getBoundingClientRect().top;

    if (elementTop < windowHeight - 100) {
      reveal.classList.add("active");
    }
  });
});

// ========================================
// COUNTER ANIMATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver((entries) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = parseFloat(counter.dataset.target);
      let count = 0;
      const increment = target / 100;

      const update = () => {
        count += increment;

        if (count < target) {
          counter.innerText =
            target % 1 !== 0 ? count.toFixed(1) : Math.floor(count);
          requestAnimationFrame(update);
        } else {
          counter.innerText = target;
        }
      };

      update();
      observer.unobserve(counter);
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => observer.observe(counter));
});


// ========================================
// SCROLL REVEAL ANIMATION
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".feature-card, .project-card, .hero-content, .hero-visual"
  );

const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.style.transitionDelay = entry.target.dataset.delay || "0ms";
      entry.target.classList.add("show");
    }
  });
}, { threshold: 0.2 });

document.querySelectorAll(".reveal").forEach(el => observer.observe(el));

// ========================================
// PROJECT MODAL
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.querySelector(".close");

  if (!modal || !closeBtn) return;

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      modal.style.display = "flex";

      modal.querySelector("#modalTitle").innerText =
        card.querySelector("h3").innerText;

      modal.querySelector("#modalDesc").innerText =
        card.querySelector("p").innerText;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.style.display = "none";
    }
  });
});


// ========================================
// MOBILE MENU
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const toggle = document.querySelector(".mobile-toggle");
  const mobileMenu = document.querySelector(".mobile-menu");

  if (!toggle || !mobileMenu) return;

  toggle.addEventListener("click", () => {
    toggle.classList.toggle("active");
    mobileMenu.classList.toggle("active");
  });
});


// ========================================
// CUSTOM CURSOR
// ========================================
document.addEventListener("mousemove", (e) => {
  const dot = document.querySelector(".cursor-dot");
  const outline = document.querySelector(".cursor-outline");

  if (!dot || !outline) return;

  dot.style.left = e.clientX + "px";
  dot.style.top = e.clientY + "px";

  outline.style.left = e.clientX + "px";
  outline.style.top = e.clientY + "px";
});