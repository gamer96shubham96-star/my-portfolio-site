// Category Filter
function filterProjects(category) {
  const cards = document.querySelectorAll('.project-card');

  cards.forEach(card => {
    if (category === 'all') {
      card.style.display = 'block';
    } else {
      card.style.display =
        card.classList.contains(category) ? 'block' : 'none';
    }
  });
}

// Modal
function openModal(title) {
  document.getElementById("modalTitle").innerText = title;
  document.getElementById("projectModal").style.display = "flex";
}

function closeModal() {
  document.getElementById("projectModal").style.display = "none";
}

// Download Counter
function increaseDownload(id) {
  let count = localStorage.getItem(id) || 0;
  count++;
  localStorage.setItem(id, count);
  document.getElementById(id + "-count").innerText = count;
}

// Load counts on page load
window.onload = function () {
  ['eco', 'bot'].forEach(id => {
    document.getElementById(id + "-count").innerText =
      localStorage.getItem(id) || 0;
  });
};

// Reveal Animation
window.addEventListener('scroll', function () {
  document.querySelectorAll('.reveal').forEach(el => {
    const position = el.getBoundingClientRect().top;
    const windowHeight = window.innerHeight;
    if (position < windowHeight - 50) {
      el.classList.add('active');
    }
  });
});

// Dark/Light Toggle
function toggleTheme() {
  document.body.classList.toggle("light-mode");
}