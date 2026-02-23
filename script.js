// ============================================
// RACHNA HUB CLEAN WORKING SCRIPT
// ============================================

document.addEventListener("DOMContentLoaded", function () {

    initBuyButtons();
    initModalSystem();
    initSmoothScroll();
    initFAQ();
    initContactForm();

});


// ============================================
// BUY BUTTON SYSTEM
// ============================================

let selectedFile = "";
let selectedProductName = "";

function initBuyButtons() {

    const buyButtons = document.querySelectorAll(".buy-btn");

    buyButtons.forEach(button => {

        button.addEventListener("click", function () {

            const card = this.closest(".product-card");

            selectedFile = card.dataset.file;
            selectedProductName = card.dataset.name;

            openPaymentModal();

        });

    });
}


// ============================================
// MODAL SYSTEM
// ============================================

function initModalSystem() {

    const modal = document.getElementById("paymentModal");
    const closeBtn = document.querySelector(".close-modal");

    if (!modal) return;

    // Close button
    closeBtn.addEventListener("click", closePaymentModal);

    // Click outside to close
    window.addEventListener("click", function (e) {
        if (e.target === modal) {
            closePaymentModal();
        }
    });

    // ESC key close
    document.addEventListener("keydown", function (e) {
        if (e.key === "Escape") {
            closePaymentModal();
        }
    });

}

function openPaymentModal() {

    const modal = document.getElementById("paymentModal");
    const simulation = document.querySelector(".payment-simulation");
    const success = document.querySelector(".success-content");

    modal.style.display = "flex";

    simulation.style.display = "flex";
    success.style.display = "none";

    simulatePayment();

}

function closePaymentModal() {

    const modal = document.getElementById("paymentModal");
    modal.style.display = "none";

}


// ============================================
// PAYMENT SIMULATION
// ============================================

function simulatePayment() {

    const simulation = document.querySelector(".payment-simulation");
    const success = document.querySelector(".success-content");

    setTimeout(function () {

        simulation.style.display = "none";
        success.style.display = "block";

        setupDownload(selectedFile, selectedProductName);

    }, 2000);

}


// ============================================
// DOWNLOAD SYSTEM
// ============================================

function setupDownload(filename, productName) {

    const downloadBtn = document.getElementById("download-link");

    if (!filename) return;

    downloadBtn.href = "/downloads/" + filename;
    downloadBtn.setAttribute("download", filename);

    downloadBtn.onclick = function () {
        console.log(productName + " download started");
    };

}


// ============================================
// SMOOTH SCROLL (GSAP)
// ============================================

function initSmoothScroll() {

    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {

        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId.length > 1) {

                e.preventDefault();

                const target = document.querySelector(targetId);

                if (target) {
                    gsap.to(window, {
                        duration: 1,
                        scrollTo: target,
                        ease: "power3.inOut"
                    });
                }
            }

        });

    });

}


// ============================================
// FAQ ACCORDION
// ============================================

function initFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {

        const question = item.querySelector(".faq-question");
        const answer = item.querySelector(".faq-answer");
        const icon = item.querySelector(".faq-icon");

        question.addEventListener("click", function () {

            const isOpen = item.classList.contains("active");

            document.querySelectorAll(".faq-item").forEach(i => {
                i.classList.remove("active");
                i.querySelector(".faq-answer").style.maxHeight = null;
                i.querySelector(".faq-icon").textContent = "+";
            });

            if (!isOpen) {
                item.classList.add("active");
                answer.style.maxHeight = answer.scrollHeight + "px";
                icon.textContent = "−";
            }

        });

    });

}


// ============================================
// CONTACT FORM
// ============================================

function initContactForm() {

    const form = document.getElementById("contactForm");

    if (!form) return;

    form.addEventListener("submit", function (e) {
        e.preventDefault();
        alert("Message sent successfully!");
        form.reset();
    });

}