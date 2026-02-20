// Modal
function openModal(title) {
  const modalTitle = document.getElementById("modalTitle");
  const modal = document.getElementById("projectModal");

  if (modalTitle && modal) {
    modalTitle.innerText = title;
    modal.style.display = "flex";
  }
}

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

// Load counts safely
window.onload = function () {
  ['eco', 'bot'].forEach(id => {
    const element = document.getElementById(id + "-count");
    if (element) {
      element.innerText = localStorage.getItem(id) || 0;
    }
  });
};

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