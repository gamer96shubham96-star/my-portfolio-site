// ===============================
// GLOBAL VARIABLES
// ===============================

let selectedFile = "";
let selectedProductName = "";

const modal = document.getElementById("payment-modal");
const downloadBtn = document.getElementById("download-link");


// ===============================
// INITIALIZE EVERYTHING
// ===============================

document.addEventListener("DOMContentLoaded", () => {
    initProductButtons();
    initModalControls();
    initSmoothScroll();
    initFAQ();
});


// ===============================
// PRODUCT BUY BUTTONS
// ===============================

function initProductButtons() {
    const buyButtons = document.querySelectorAll(".buy-btn");

    buyButtons.forEach(button => {
        button.addEventListener("click", function () {

            const productCard = this.closest(".product-card");

            selectedFile = productCard.getAttribute("data-file");
            selectedProductName = productCard.getAttribute("data-name");

            openPaymentModal();
        });
    });
}


// ===============================
// MODAL CONTROLS
// ===============================

function initModalControls() {

    const closeBtn = document.querySelector(".close-modal");

    closeBtn.addEventListener("click", closePaymentModal);

    window.addEventListener("click", (e) => {
        if (e.target === modal) {
            closePaymentModal();
        }
    });
}

function openPaymentModal() {
    modal.style.display = "flex";

    document.querySelector(".payment-simulation").style.display = "block";
    document.querySelector(".success-content").style.display = "none";

    simulatePaymentProcess();
}

function closePaymentModal() {
    modal.style.display = "none";
}


// ===============================
// PAYMENT SIMULATION
// ===============================

function simulatePaymentProcess() {

    setTimeout(() => {

        document.querySelector(".payment-simulation").style.display = "none";
        document.querySelector(".success-content").style.display = "block";

        setupDownload(selectedFile, selectedProductName);

    }, 2000);
}


// ===============================
// DOWNLOAD SETUP
// ===============================

function setupDownload(filename, productName) {

    if (!filename) return;

    downloadBtn.href = `/downloads/${filename}`;
    downloadBtn.setAttribute("download", filename);

    downloadBtn.onclick = (e) => {
        e.stopPropagation();
        console.log(productName + " download started!");
    };
}


// ===============================
// SMOOTH SCROLL
// ===============================

function initSmoothScroll() {

    const links = document.querySelectorAll("a[href^='#']");

    links.forEach(link => {
        link.addEventListener("click", function (e) {

            const targetId = this.getAttribute("href");

            if (targetId.length > 1) {
                e.preventDefault();

                const targetElement = document.querySelector(targetId);

                if (targetElement) {
                    targetElement.scrollIntoView({
                        behavior: "smooth"
                    });
                }
            }
        });
    });
}


// ===============================
// FAQ ACCORDION
// ===============================

function initFAQ() {

    const faqItems = document.querySelectorAll(".faq-item");

    faqItems.forEach(item => {
        item.addEventListener("click", () => {
            item.classList.toggle("active");
        });
    });
}