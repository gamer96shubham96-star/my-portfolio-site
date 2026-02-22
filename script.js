// script.js

// ==========================================
// 1. CUSTOM CURSOR
// ==========================================
const cursor = document.querySelector('.cursor');
const follower = document.querySelector('.cursor-follower');

let posX = 0, posY = 0;
let mouseX = 0, mouseY = 0;

document.addEventListener('mousemove', (e) => {
    mouseX = e.clientX;
    mouseY = e.clientY;
    
    // Immediate movement for small dot
    cursor.style.left = mouseX + 'px';
    cursor.style.top = mouseY + 'px';
});

// Smooth delay for the follower circle
setInterval(() => {
    posX += (mouseX - posX) / 9;
    posY += (mouseY - posY) / 9;
    
    follower.style.left = posX + 'px';
    follower.style.top = posY + 'px';
}, 15);

// Cursor hover effects
const interactiveElements = document.querySelectorAll('a, button, .product-card');
interactiveElements.forEach(el => {
    el.addEventListener('mouseenter', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1.5)';
        follower.style.background = 'rgba(0, 255, 157, 0.1)';
        cursor.style.transform = 'scale(1.5)';
    });
    
    el.addEventListener('mouseleave', () => {
        follower.style.transform = 'translate(-50%, -50%) scale(1)';
        follower.style.background = 'transparent';
        cursor.style.transform = 'scale(1)';
    });
});

// ==========================================
// 2. GSAP ANIMATIONS (GOD LEVEL)
// ==========================================
document.addEventListener("DOMContentLoaded", () => {
    gsap.registerPlugin(ScrollTrigger);

    // Hero Section Animation
    const tl = gsap.timeline();
    
    tl.to(".hero-title", {
        y: 0,
        opacity: 1,
        duration: 1,
        ease: "power4.out"
    })
    .to(".hero-sub", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "power3.out"
    }, "-=0.5")
    .to(".hero-btns", {
        y: 0,
        opacity: 1,
        duration: 0.8,
        ease: "back.out(1.7)"
    }, "-=0.5");

    // Product Cards Staggered Entrance
    gsap.from(".product-card", {
        scrollTrigger: {
            trigger: "#products",
            start: "top 80%",
            toggleActions: "play none none reverse"
        },
        y: 100,
        opacity: 0,
        duration: 0.8,
        stagger: 0.2,
        ease: "power3.out"
    });

    // Navbar Slide Down
    gsap.from("nav", {
        y: -100,
        opacity: 0,
        duration: 1,
        ease: "power3.out",
        delay: 0.2
    });

    // Product Card Hover 3D Effect
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -10;
            const rotateY = ((x - centerX) / centerX) * 10;

            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.5,
                ease: "power2.out",
                transformPerspective: 1000
            });

            // Move glow effect
            const glow = card.querySelector('.card-glow');
            gsap.to(glow, {
                opacity: 1,
                x: x - rect.width / 2,
                y: y - rect.height / 2,
                duration: 0.3
            });
        });

        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: "power2.out"
            });

            const glow = card.querySelector('.card-glow');
            gsap.to(glow, {
                opacity: 0,
                duration: 0.3
            });
        });
    });
});

// ==========================================
// 3. PAYMENT & DOWNLOAD SYSTEM
// ==========================================
const modal = document.getElementById('paymentModal');
const closeModal = document.querySelector('.close-modal');
const buyButtons = document.querySelectorAll('.buy-btn');
const paymentStatus = document.getElementById('payment-status');
const successContent = document.querySelector('.success-content');
const paymentSimulation = document.querySelector('.payment-simulation');
const downloadLink = document.getElementById('download-link');
const modalTitle = document.getElementById('modal-title');

// Open Modal
buyButtons.forEach(btn => {
    btn.addEventListener('click', function() {
        const card = this.closest('.product-card');
        const productName = card.dataset.name;
        const productPrice = card.dataset.price;
        const productFile = card.dataset.file;

        // Reset Modal State
        modalTitle.textContent = `Checkout: ${productName}`;
        paymentSimulation.style.display = 'block';
        successContent.style.display = 'none';
        document.querySelector('.spinner').style.display = 'block';
        paymentStatus.textContent = "Connecting to Payment Gateway...";
        
        // Show Modal with Animation
        modal.classList.add('active');
        gsap.fromTo('.modal-content', 
            { scale: 0.8, opacity: 0 },
            { scale: 1, opacity: 1, duration: 0.4, ease: "back.out(1.7)" }
        );

        // Simulate Payment Process
        simulatePayment(productFile);
    });
});

// Close Modal
closeModal.addEventListener('click', () => {
    gsap.to('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        onComplete: () => {
            modal.classList.remove('active');
        }
    });
});

// Close on outside click
modal.addEventListener('click', (e) => {
    if (e.target === modal) {
        closeModal.click();
    }
});

// Payment Simulation Logic
function simulatePayment(fileName) {
    const steps = [
        "Verifying Account...",
        "Authorizing Payment...",
        "Encrypting Data...",
        "Finalizing..."
    ];

    let stepIndex = 0;

    const interval = setInterval(() => {
        if (stepIndex < steps.length) {
            paymentStatus.textContent = steps[stepIndex];
            stepIndex++;
        } else {
            clearInterval(interval);
            
            // Payment Complete
            paymentSimulation.style.display = 'none';
            successContent.style.display = 'block';
            
            // Setup Download
            // NOTE: In a real website, this URL comes from your secure server
            // For this demo, we create a dummy file download
            downloadLink.onclick = function() {
                // This creates a real file download on the user's PC
                downloadDummyFile(fileName);
            };
            
            // Animate Success
            gsap.fromTo('.check-icon',
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, ease: "elastic.out(1, 0.5)" }
            );
            
            gsap.fromTo('.btn-download',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.3 }
            );
            
            // Update Cart Count
            updateCart();
        }
    }, 800); // 800ms per step
}

// Function to trigger actual file download
function downloadDummyFile(filename) {
    // Create a text blob to simulate a file
    const content = `Thank you for purchasing ${filename} from Rachna Hub!\n\nThis is a demo file.\nIn the real version, your actual Minecraft datapack/plugin code would be here.`;
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    
    const a = document.createElement('a');
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
}

// Cart Counter
let cartCount = 0;
function updateCart() {
    cartCount++;
    document.getElementById('cart-count').textContent = cartCount;
    
    // Bump animation for cart
    gsap.fromTo('#cart-count',
        { scale: 1.5 },
        { scale: 1, duration: 0.3, ease: "bounce.out" }
    );
}

// ==========================================
// 4. SMOOTH SCROLLING
// ==========================================
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth'
            });
        }
    });
});

// ==========================================
// 5. PARALLAX BACKGROUND EFFECT
// ==========================================
window.addEventListener('scroll', () => {
    const scrolled = window.pageYOffset;
    const heroBg = document.querySelector('.hero-bg');
    
    if (heroBg) {
        heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
    }
});

// ==========================================
// 6. DYNAMIC YEAR IN FOOTER
// ==========================================
document.querySelector('footer p').innerHTML = 
    `&copy; ${new Date().getFullYear()} Rachna Hub. All rights reserved.`;