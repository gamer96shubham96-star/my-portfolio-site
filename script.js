// ========================================
// LOADER
// ========================================
window.addEventListener("load", () => {
  const loader = document.querySelector(".loader");
  if (!loader) return;

  setTimeout(() => {
    loader.classList.add("hidden");
  }, 1500);
});


// ========================================
// SCROLL REVEAL
// ========================================
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".feature-card, .project-card, .hero-content, .hero-visual"
  );

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.2 });

  elements.forEach(el => observer.observe(el));
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