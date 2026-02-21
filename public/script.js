// =============================
// THEME TOGGLE (SAVED)
// =============================
function toggleTheme() {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

document.addEventListener("DOMContentLoaded", () => {
  if (localStorage.getItem("theme") === "light") {
    document.body.classList.add("light-mode");
  }
});

fetch("projects.json")
  .then(response => response.json())
  .then(data => {
    const container = document.getElementById("project-container");

    data.forEach(project => {
      const card = document.createElement("div");
      card.classList.add("card");

      card.innerHTML = `
        <img src="${project.image}" alt="">
        <h3>${project.title}</h3>
        <p>${project.description}</p>
        <button>Buy ₹${project.price}</button>
      `;

      container.appendChild(card);
    });
  });


// =============================
// MODALS
// =============================
function openDatapack() {
  const modal = document.getElementById("datapackModal");
  if (modal) modal.classList.add("active");
}

function closeDatapack() {
  const modal = document.getElementById("datapackModal");
  if (modal) modal.classList.remove("active");
}


// =============================
// TESTIMONIAL SLIDER
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const testimonials = document.querySelectorAll(".testimonial");

  if (testimonials.length > 0) {
    let index = 0;

    setInterval(() => {
      testimonials[index].classList.remove("active");
      index = (index + 1) % testimonials.length;
      testimonials[index].classList.add("active");
    }, 4000);
  }
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

  const scrolled = (scrollTop / height) * 100;
  scrollBar.style.width = scrolled + "%";
});


// =============================
// ANIMATED COUNTERS
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const counters = document.querySelectorAll(".counter");

  const counterObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        const counter = entry.target;
        const target = parseFloat(counter.getAttribute("data-target"));
        let count = 0;
        const increment = target / 100;

        const updateCounter = () => {
          count += increment;
          if (count < target) {
            counter.innerText = target % 1 !== 0
              ? count.toFixed(1)
              : Math.floor(count);
            requestAnimationFrame(updateCounter);
          } else {
            counter.innerText = target;
          }
        };

        updateCounter();
        counterObserver.unobserve(counter);
      }
    });
  }, { threshold: 0.6 });

  counters.forEach(counter => counterObserver.observe(counter));
});


/* ======================
   PROJECT MODAL
====================== */

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

const glow = document.querySelector(".cursor-glow");

document.addEventListener("mousemove", e => {
  glow.style.left = e.clientX + "px";
  glow.style.top = e.clientY + "px";
});

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    card.style.setProperty("--x", e.clientX - rect.left + "px");
    card.style.setProperty("--y", e.clientY - rect.top + "px");
  });
});

window.addEventListener("scroll", () => {
  const scrolled = window.scrollY;

  document.querySelectorAll(".orb").forEach((orb, i) => {
    orb.style.transform = `translateY(${scrolled * (0.1 + i * 0.05)}px)`;
  });
});

document.querySelectorAll(".product-card").forEach(card => {
  card.addEventListener("mousemove", e => {
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;

    const rotateX = ((y / rect.height) - 0.5) * 15;
    const rotateY = ((x / rect.width) - 0.5) * -15;

    card.style.transform =
      `rotateX(${rotateX}deg) rotateY(${rotateY}deg) scale(1.05)`;
  });

  card.addEventListener("mouseleave", () => {
    card.style.transform = "rotateX(0) rotateY(0) scale(1)";
  });
});

document.querySelectorAll(".btn-primary, .cta-btn, .buy-btn").forEach(btn => {
  btn.addEventListener("mousemove", e => {
    const rect = btn.getBoundingClientRect();
    const x = e.clientX - rect.left - rect.width / 2;
    const y = e.clientY - rect.top - rect.height / 2;

    btn.style.transform = `translate(${x * 0.2}px, ${y * 0.2}px)`;
  });

  btn.addEventListener("mouseleave", () => {
    btn.style.transform = "translate(0,0)";
  });
});

// =============================
// SCROLL REVEAL ANIMATION
// =============================
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(".animate");

  const revealObserver = new IntersectionObserver(entries => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add("show");
      } else {
        entry.target.classList.remove("show");
      }
    });
  }, { threshold: 0.15 });

  animatedElements.forEach(el => revealObserver.observe(el));
});