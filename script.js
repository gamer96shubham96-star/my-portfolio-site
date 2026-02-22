/* ============================================
   RACHNA HUB - PROFESSIONAL JAVASCRIPT
   God-Level Animations & Functionality
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize all modules
    initCustomCursor();
    initLoadingScreen();
    initTextAnimations();
    initScrollAnimations();
    initProductCards();
    initProductFilters();
    initPaymentModal();
    initCounterAnimation();
    initSmoothScroll();
    initParallaxEffects();
    initNavbarScroll();
    initHoverEffects();
    
});

/* ============================================
   1. LOADING SCREEN
   ============================================ */
function initLoadingScreen() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    // Hide loader after animations complete
    setTimeout(() => {
        loader.classList.add('hidden');
        
        // Trigger hero animations after loader
        setTimeout(() => {
            initHeroAnimations();
        }, 500);
    }, 2500);
}

/* ============================================
   2. HERO ANIMATIONS
   ============================================ */
function initHeroAnimations() {
    if (typeof gsap === 'undefined') return;
    
    // Animate hero badge
    gsap.to('.hero-badge', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out'
    });
    
    // Animate title words with stagger
    const words = document.querySelectorAll('.word');
    words.forEach((word, index) => {
        gsap.to(word, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: index * 0.1
        });
    });
    
    // Animate description lines
    const descLines = document.querySelectorAll('.desc-line');
    descLines.forEach((line, index) => {
        gsap.to(line, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 0.8 + (index * 0.1)
        });
    });
    
    // Animate buttons
    gsap.to('.btn-main', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1
    });
    
    gsap.to('.btn-secondary', {
        opacity: 1,
        y: 0,
        duration: 0.8,
        ease: 'power3.out',
        delay: 1.1
    });
    
    // Animate stats
    gsap.to('.hero-stats', {
        opacity: 1,
        duration: 0.8,
        delay: 1.3
    });
    
    // Animate scroll indicator
    gsap.to('.scroll-indicator', {
        opacity: 1,
        duration: 0.8,
        delay: 1.8
    });
}

/* ============================================
   3. CUSTOM CURSOR SYSTEM
   ============================================ */
function initCustomCursor() {
    const cursor = document.querySelector('.cursor');
    const cursorFollower = document.querySelector('.cursor-follower');
    
    if (!cursor || !cursorFollower) return;
    
    let mouseX = 0;
    let mouseY = 0;
    let cursorX = 0;
    let cursorY = 0;
    let followerX = 0;
    let followerY = 0;
    
    // Track mouse position
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    // Smooth cursor animation
    function animateCursor() {
        // Direct cursor follow with slight delay
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        
        // Delayed follower for trail effect
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .filter-btn, .feature-card');
    
    interactiveElements.forEach(el => {
        el.addEventListener('mouseenter', () => {
            cursor.classList.add('hover');
            cursorFollower.classList.add('hover');
        });
        
        el.addEventListener('mouseleave', () => {
            cursor.classList.remove('hover');
            cursorFollower.classList.remove('hover');
        });
    });
    
    // Hide cursor when leaving window
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

/* ============================================
   4. SCROLL ANIMATIONS WITH GSAP
   ============================================ */
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate all sections on scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
        // Animate section header
        const header = section.querySelector('.section-header');
        if (header) {
            gsap.fromTo(header,
                { opacity: 0, y: 50 },
                {
                    opacity: 1,
                    y: 0,
                    duration: 1,
                    ease: 'power3.out',
                    scrollTrigger: {
                        trigger: section,
                        start: 'top 75%',
                        end: 'bottom 25%',
                        toggleActions: 'play none none reverse'
                    }
                }
            );
        }
    });
    
    // Animate feature cards
    const featureCards = document.querySelectorAll('.feature-card');
    featureCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50, rotationX: 10 },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    end: 'bottom 15%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate filter buttons
    const filterBtns = document.querySelectorAll('.filter-btn');
    filterBtns.forEach((btn, index) => {
        gsap.fromTo(btn,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: '.products-filter',
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 60,
                rotationX: 15
            },
            {
                opacity: 1,
                y: 0,
                rotationX: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 90%',
                    end: 'bottom 10%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate stats numbers
    const statNumbers = document.querySelectorAll('.stat-number');
    statNumbers.forEach(stat => {
        const target = parseInt(stat.dataset.count) || 0;
        
        gsap.fromTo(stat,
            { innerText: 0 },
            {
                innerText: target,
                duration: 2,
                ease: 'power2.out',
                snap: { innerText: 1 },
                scrollTrigger: {
                    trigger: stat,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Parallax effect for gradient orbs
    gsap.to('.gradient-orb', {
        yPercent: 50,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

/* ============================================
   5. PRODUCT CARD INTERACTIONS
   ============================================ */
function initProductCards() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
        // 3D tilt effect on mousemove
        card.addEventListener('mousemove', (e) => {
            const rect = card.getBoundingClientRect();
            const x = e.clientX - rect.left;
            const y = e.clientY - rect.top;
            
            const centerX = rect.width / 2;
            const centerY = rect.height / 2;
            
            const rotateX = ((y - centerY) / centerY) * -8;
            const rotateY = ((x - centerX) / centerX) * 8;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.3,
                ease: 'power2.out',
                transformPerspective: 1000,
                boxShadow: '0 25px 50px rgba(0, 255, 136, 0.15)'
            });
            
            // Move glow effect
            const glow = card.querySelector('.card-glow');
            if (glow) {
                gsap.to(glow, {
                    opacity: 0.2,
                    x: x - rect.width / 2,
                    y: y - rect.height / 2,
                    duration: 0.2
                });
            }
        });
        
        // Reset on mouseleave
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out',
                boxShadow: 'none'
            });
            
            const glow = card.querySelector('.card-glow');
            if (glow) {
                gsap.to(glow, {
                    opacity: 0,
                    duration: 0.3
                });
            }
        });
        
        // Scale effect on click
        card.addEventListener('mousedown', () => {
            gsap.to(card, {
                scale: 0.97,
                duration: 0.1
            });
        });
        
        card.addEventListener('mouseup', () => {
            gsap.to(card, {
                scale: 1,
                duration: 0.2
            });
        });
    });
}

/* ============================================
   6. PRODUCT FILTERING
   ============================================ */
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update active button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            // Animate cards
            productCards.forEach((card, index) => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    // Reset card state
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) scale(0.95)';
                    
                    // Animate in
                    gsap.to(card, {
                        opacity: 1,
                        y: 0,
                        scale: 1,
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: 'power3.out',
                        onComplete: () => {
                            card.style.transform = '';
                        }
                    });
                } else {
                    // Animate out
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.9,
                        y: -20,
                        duration: 0.3,
                        ease: 'power3.in',
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });
}

/* ============================================
   7. PAYMENT MODAL SYSTEM
   ============================================ */
function initPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const closeBtn = document.querySelector('.close-modal');
    const buyBtns = document.querySelectorAll('.buy-btn');
    
    if (!modal) return;
    
    // Open modal on buy button click
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            e.preventDefault();
            
            const card = btn.closest('.product-card');
            const productName = card.dataset.name;
            const productPrice = card.dataset.price;
            const productFile = card.dataset.file;
            
            openPaymentModal(productName, productPrice, productFile);
        });
    });
    
    // Close modal
    if (closeBtn) {
        closeBtn.addEventListener('click', closePaymentModal);
    }
    
    // Close on backdrop click
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePaymentModal();
        }
    });
    
    // Close on escape key
    document.addEventListener('keydown', (e) => {
        if (e.key === 'Escape' && modal.classList.contains('active')) {
            closePaymentModal();
        }
    });
}

function openPaymentModal(productName, productPrice, productFile) {
    const modal = document.getElementById('paymentModal');
    const modalTitle = document.getElementById('modal-title');
    const paymentSimulation = document.querySelector('.payment-simulation');
    const successContent = document.querySelector('.success-content');
    const spinner = document.querySelector('.spinner');
    const paymentStatus = document.getElementById('payment-status');
    
    // Reset modal state
    modalTitle.textContent = `Checkout: ${productName}`;
    paymentSimulation.style.display = 'flex';
    successContent.classList.remove('visible');
    spinner.style.display = 'block';
    paymentStatus.textContent = 'Initializing payment...';
    
    // Show modal with animation
    modal.classList.add('active');
    
    gsap.fromTo('.modal-content',
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );
    
    // Simulate payment process
    simulatePaymentProcess(paymentStatus, spinner, paymentSimulation, successContent, productName, productFile);
}

function closePaymentModal() {
    const modal = document.getElementById('paymentModal');
    
    gsap.to('.modal-content', {
        scale: 0.8,
        opacity: 0,
        duration: 0.3,
        ease: 'power3.in',
        onComplete: () => {
            modal.classList.remove('active');
        }
    });
}

function simulatePaymentProcess(statusEl, spinnerEl, simulationEl, successEl, productName, productFile) {
    const steps = [
        { text: 'Connecting to payment gateway...', delay: 800 },
        { text: 'Verifying transaction...', delay: 1600 },
        { text: 'Processing payment...', delay: 2400 },
        { text: 'Preparing your download...', delay: 3200 }
    ];
    
    let currentStep = 0;
    
    const interval = setInterval(() => {
        if (currentStep < steps.length) {
            statusEl.textContent = steps[currentStep].text;
            currentStep++;
        } else {
            clearInterval(interval);
            
            // Payment successful
            spinnerEl.style.display = 'none';
            simulationEl.style.display = 'none';
            successEl.classList.add('visible');
            
            // Animate success elements
            gsap.fromTo('.check-icon',
                { scale: 0, rotation: -180 },
                { scale: 1, rotation: 0, duration: 0.6, ease: 'elastic.out(1, 0.5)' }
            );
            
            gsap.fromTo('.success-content h3',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.3 }
            );
            
            gsap.fromTo('.success-content p',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.4 }
            );
            
            gsap.fromTo('.btn-download',
                { y: 20, opacity: 0 },
                { y: 0, opacity: 1, duration: 0.5, delay: 0.5 }
            );
            
            // Setup download
            setupDownload(productFile, productName);
            
            // Update cart count
            updateCartCount();
        }
    }, 800);
}

function setupDownload(filename, productName) {
    const downloadBtn = document.getElementById('download-link');
    
    if (downloadBtn) {
        downloadBtn.onclick = (e) => {
            e.preventDefault();
            downloadFile(filename, productName);
        };
    }
}

function downloadFile(filename, productName) {
    // Create a demo file content
    const content = `RACHNA HUB - PRODUCT FILE
=======================
Product: ${productName}
File: ${filename}
Date: ${new Date().toLocaleDateString()}

Thank you for purchasing from Rachna Hub!
This is a demo file for testing purposes.

For real products, this would contain your actual
Minecraft datapack, plugin, or bot source code.

Visit https://rachnahub.com for more products!
`;
    
    // Create blob and download
    const blob = new Blob([content], { type: 'text/plain' });
    const url = window.URL.createObjectURL(blob);
    const a = document.createElement('a');
    
    a.href = url;
    a.download = filename;
    document.body.appendChild(a);
    a.click();
    document.body.removeChild(a);
    window.URL.revokeObjectURL(url);
    
    // Show success message
    showNotification('Download started! Check your downloads folder.');
}

function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
        cartCount.classList.add('active');
        
        // Bump animation
        gsap.fromTo(cartCount,
            { scale: 1.5 },
            { scale: 1, duration: 0.3, ease: 'bounce.out' }
        );
    }
}

function showNotification(message) {
    // Create notification element
    const notification = document.createElement('div');
    notification.style.cssText = `
        position: fixed;
        bottom: 30px;
        right: 30px;
        background: linear-gradient(135deg, #00ff88, #00cc6a);
        color: #0a0a0b;
        padding: 16px 24px;
        border-radius: 12px;
        font-weight: 600;
        z-index: 10001;
        box-shadow: 0 10px 30px rgba(0, 255, 136, 0.3);
        animation: slideIn 0.3s ease;
    `;
    notification.textContent = message;
    
    // Add animation keyframes
    const style = document.createElement('style');
    style.textContent = `
        @keyframes slideIn {
            from { transform: translateX(100px); opacity: 0; }
            to { transform: translateX(0); opacity: 1; }
        }
        @keyframes slideOut {
            from { transform: translateX(0); opacity: 1; }
            to { transform: translateX(100px); opacity: 0; }
        }
    `;
    document.head.appendChild(style);
    
    document.body.appendChild(notification);
    
    // Remove after 3 seconds
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

/* ============================================
   8. COUNTER ANIMATION
   ============================================ */
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count) || 0;
        const duration = 2;
        const start = 0;
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    innerText: target,
                    duration: duration,
                    ease: 'power2.out',
                    snap: { innerText: 1 },
                    onUpdate: function() {
                        counter.innerText = Math.round(this.targets()[0].innerText);
                    }
                });
            }
        });
    });
}

/* ============================================
   9. SMOOTH SCROLL
   ============================================ */
function initScrollAnimations() {
    if (typeof gsap === 'undefined') return;

    gsap.registerPlugin(ScrollTrigger);

    // Section fade-in
    gsap.utils.toArray('section').forEach(section => {
        gsap.from(section, {
            opacity: 0,
            y: 80,
            duration: 1,
            ease: "power3.out",
            scrollTrigger: {
                trigger: section,
                start: "top 85%",
                toggleActions: "play reverse play reverse"
            }
        });
    });

    // Product cards stagger animation
    gsap.from(".product-card", {
        opacity: 0,
        y: 60,
        duration: 0.8,
        stagger: 0.15,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".products-grid",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        }
    });

    // Feature cards stagger
    gsap.from(".feature-card", {
        opacity: 0,
        y: 50,
        duration: 0.8,
        stagger: 0.1,
        ease: "power3.out",
        scrollTrigger: {
            trigger: ".features-grid",
            start: "top 80%",
            toggleActions: "play reverse play reverse"
        }
    });
}


function initHeroAnimations() {
    gsap.timeline()
        .from(".hero-badge", { opacity: 0, y: 30, duration: 0.6 })
        .from(".hero-title .word", {
            opacity: 0,
            y: 50,
            stagger: 0.1,
            duration: 0.8,
            ease: "power3.out"
        }, "-=0.3")
        .from(".hero-description", { opacity: 0, y: 30, duration: 0.6 }, "-=0.5")
        .from(".hero-cta-group", { opacity: 0, y: 30, duration: 0.6 }, "-=0.4")
        .from(".hero-stats", { opacity: 0, duration: 0.6 }, "-=0.4");
}
/* ============================================
   10. PARALLAX EFFECTS
   ============================================ */
function initParallaxEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    // Parallax for gradient orbs
    gsap.utils.toArray('.gradient-orb').forEach((orb, index) => {
        gsap.to(orb, {
            yPercent: 30,
            ease: 'none',
            scrollTrigger: {
                trigger: '.hero-section',
                start: 'top bottom',
                end: 'bottom top',
                scrub: true
            }
        });
    });
    
    // Parallax for grid overlay
    gsap.to('.grid-overlay', {
        yPercent: 20,
        ease: 'none',
        scrollTrigger: {
            trigger: '.hero-section',
            start: 'top bottom',
            end: 'bottom top',
            scrub: true
        }
    });
}

/* ============================================
   11. NAVBAR SCROLL EFFECT
   ============================================ */
function initNavbarScroll() {
    const navbar = document.querySelector(".navbar");

    window.addEventListener("scroll", () => {
        if (window.scrollY > 50) {
            navbar.classList.add("scrolled");
        } else {
            navbar.classList.remove("scrolled");
        }
    });
}

/* ============================================
   12. HOVER EFFECTS
   ============================================ */
function initProductCards() {
    const cards = document.querySelectorAll(".product-card");

    cards.forEach(card => {
        card.addEventListener("mouseenter", () => {
            gsap.to(card, {
                y: -10,
                scale: 1.02,
                boxShadow: "0 20px 60px rgba(0,0,0,0.3)",
                duration: 0.3
            });
        });

        card.addEventListener("mouseleave", () => {
            gsap.to(card, {
                y: 0,
                scale: 1,
                boxShadow: "none",
                duration: 0.3
            });
        });
    });
}
    
    // Filter button hover effects
    const filterBtns = document.querySelectorAll('.filter-btn');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('mouseenter', () => {
            gsap.to(btn, {
                scale: 1.05,
                y: -2,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
        
        btn.addEventListener('mouseleave', () => {
            gsap.to(btn, {
                scale: 1,
                y: 0,
                duration: 0.2,
                ease: 'power2.out'
            });
        });
    });
    
    // Feature card hover effects
    const featureCards = document.querySelectorAll('.feature-card');
    
    featureCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -10,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                gsap.to(icon, {
                    scale: 1.1,
                    rotation: 5,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
            
            const icon = card.querySelector('.feature-icon');
            if (icon) {
                gsap.to(icon, {
                    scale: 1,
                    rotation: 0,
                    duration: 0.3,
                    ease: 'power2.out'
                });
            }
        });
    });
}

/* ============================================
   13. UTILITY FUNCTIONS
   ============================================ */

// Debounce function for performance
function debounce(func, wait) {
    let timeout;
    return function executedFunction(...args) {
        const later = () => {
            clearTimeout(timeout);
            func(...args);
        };
        clearTimeout(timeout);
        timeout = setTimeout(later, wait);
    };
}

// Throttle function for scroll events
function throttle(func, limit) {
    let inThrottle;
    return function(...args) {
        if (!inThrottle) {
            func.apply(this, args);
            inThrottle = true;
            setTimeout(() => inThrottle = false, limit);
        }
    };
}

// Random number generator
function random(min, max) {
    return Math.random() * (max - min) + min;
}

// Clamp number between min and max
function clamp(num, min, max) {
    return Math.min(Math.max(num, min), max);
}