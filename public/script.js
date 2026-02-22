// =============================
// THEME TOGGLE
// =============================
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

// =============================
// NAVBAR SCROLL EFFECT
// =============================
window.addEventListener("scroll", () => {
  document
    .querySelector(".navbar")
    ?.classList.toggle("scrolled", window.scrollY > 50);
});

// =============================
// SCROLL PROGRESS BAR
// =============================
window.addEventListener("scroll", () => {
  const scrollBar = document.querySelector(".scroll-progress");
  if (!scrollBar) return;

  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  scrollBar.style.width = (scrollTop / height) * 100 + "%";
});

// =============================
// ANIMATED COUNTERS
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;

      const counter = entry.target;
      const target = parseFloat(counter.dataset.target);
      let count = 0;
      const increment = target / 120;

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

// =============================
// SCROLL REVEAL ANIMATION
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const elements = document.querySelectorAll(
    ".feature-card, .project-card, .hero-content, .hero-visual"
  );

  const observer = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      }
    });
  }, { threshold: 0.15 });

  elements.forEach(el => observer.observe(el));
});

// =============================
// PROJECT MODAL
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const modal = document.getElementById("projectModal");
  const closeBtn = document.querySelector(".close");

  document.querySelectorAll(".project-card").forEach(card => {
    card.addEventListener("click", () => {
      modal.style.display = "flex";
      document.getElementById("modalTitle").innerText =
        card.querySelector("h3").innerText;
      document.getElementById("modalDesc").innerText =
        card.querySelector("p").innerText;
    });
  });

  closeBtn.addEventListener("click", () => {
    modal.style.display = "none";
  });

  window.addEventListener("click", e => {
    if (e.target === modal) modal.style.display = "none";
  });
});

// =============================
// 3D CARD HOVER EFFECT
// =============================
document.querySelectorAll(".project-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 12;
    const rotateY = ((x / rect.width) - 0.5) * -12;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.03)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

// =============================
// BUTTON FLOAT EFFECT
// =============================
document.querySelectorAll(".buy-btn, .explore-btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.15}px, ${y * 0.15}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});