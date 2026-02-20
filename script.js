// Modal
function openModal(title) {
  const modalTitle = document.getElementById("modalTitle");
  const modal = document.getElementById("projectModal");

  if (modalTitle && modal) {
    modalTitle.innerText = title;
    modal.style.display = "flex";
  }
}

function toggleTheme() {
  document.body.classList.toggle("light-mode");

  if (document.body.classList.contains("light-mode")) {
    localStorage.setItem("theme", "light");
  } else {
    localStorage.setItem("theme", "dark");
  }
}

window.onload = () => {
  const savedTheme = localStorage.getItem("theme");
  if (savedTheme === "light") {
    document.body.classList.add("light-mode");
  }
};

function closeModal() {
  const modal = document.getElementById("projectModal");
  if (modal) {
    modal.style.display = "none";
  }
}

// Download Counter
function increaseDownload(id) {
  let count = localStorage.getItem(id) || 0;
  count++;
  localStorage.setItem(id, count);

  const element = document.getElementById(id + "-count");
  if (element) {
    element.innerText = count;
  }
}

const testimonials = document.querySelectorAll(".testimonial");
let index = 0;

setInterval(() => {
  testimonials[index].classList.remove("active");
  index = (index + 1) % testimonials.length;
  testimonials[index].classList.add("active");
}, 4000);

// Load counts safely
window.onload = function () {
  ['eco', 'bot'].forEach(id => {
    const element = document.getElementById(id + "-count");
    if (element) {
      element.innerText = localStorage.getItem(id) || 0;
    }
  });
};

function openDatapack() {
  document.getElementById("datapackModal").classList.add("active");
}

function closeDatapack() {
  document.getElementById("datapackModal").classList.remove("active");
}

const counters = document.querySelectorAll(".counter");

const observer = new IntersectionObserver(entries => {
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
      observer.unobserve(counter);
    }
  });
}, { threshold: 0.6 });

counters.forEach(counter => observer.observe(counter));

// Modern Scroll Animation
const observer = new IntersectionObserver(entries => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add("show");
    } else {
      entry.target.classList.remove("show");
    }
  });
}, {
  threshold: 0.15
});

window.addEventListener("scroll", () => {
  const scrollTop = document.documentElement.scrollTop;
  const height =
    document.documentElement.scrollHeight -
    document.documentElement.clientHeight;

  const scrolled = (scrollTop / height) * 100;
  document.querySelector(".scroll-progress").style.width = scrolled + "%";
});

const animatedElements = document.querySelectorAll(".animate");

animatedElements.forEach(el => {
  observer.observe(el);

  // If already visible on load
  if (el.getBoundingClientRect().top < window.innerHeight) {
    el.classList.add("show");
  }
});

document.querySelectorAll(".animate").forEach(el => {
  if (el.getBoundingClientRect().top < window.innerHeight) {
    el.classList.add("show");
  }
});

// Dark Mode
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}