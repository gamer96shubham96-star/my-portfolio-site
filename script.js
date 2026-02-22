<think>
The user wants me to create a complete script.js file for their Rachna Hub website. They want it to be working, good, wonderful, and professional. This should include:

1. Custom cursor functionality
2. GSAP animations for text reveals, scroll triggers
3. Product filtering
4. Payment modal simulation
5. Download functionality
6. Smooth scrolling
7. Number counter animations
8. Interactive hover effects

Let me create a comprehensive script.js that covers all these features with professional-grade code.

</think># Complete Professional script.js for Rachna Hub

```javascript
/* ============================================
   RACHNA HUB - PROFESSIONAL JAVASCRIPT
   God-Level Animations & Functionality
   ============================================ */

// Wait for DOM to be fully loaded
document.addEventListener('DOMContentLoaded', () => {
    
    // Initialize all modules
    initCustomCursor();
    initTextAnimations();
    initScrollAnimations();
    initProductCards();
    initProductFilters();
    initPaymentModal();
    initCounterAnimation();
    initSmoothScroll();
    initParallaxEffects();
    
});

/* ============================================
   1. CUSTOM CURSOR SYSTEM
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
        // Direct cursor follow
        cursorX += (mouseX - cursorX) * 0.2;
        cursorY += (mouseY - cursorY) * 0.2;
        
        // Delayed follower
        followerX += (mouseX - followerX) * 0.1;
        followerY += (mouseY - followerY) * 0.1;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    // Hover effects on interactive elements
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .filter-btn');
    
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
   2. TEXT ANIMATIONS WITH GSAP
   ============================================ */
function initTextAnimations() {
    // Check if GSAP is available
    if (typeof gsap === 'undefined') {
        console.warn('GSAP not loaded');
        return;
    }
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate hero words
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
    const mainBtn = document.querySelector('.btn-main');
    const secondaryBtn = document.querySelector('.btn-secondary');
    
    if (mainBtn) {
        gsap.to(mainBtn, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 1
        });
    }
    
    if (secondaryBtn) {
        gsap.to(secondaryBtn, {
            opacity: 1,
            y: 0,
            duration: 0.8,
            ease: 'power3.out',
            delay: 1.1
        });
    }
    
    // Animate stats
    gsap.to('.hero-stats', {
        opacity: 1,
        duration: 1,
        delay: 1.5
    });
    
    // Animate scroll indicator
    gsap.to('.scroll-indicator', {
        opacity: 1,
        duration: 1,
        delay: 2
    });
}

/* ============================================
   3. SCROLL ANIMATIONS
   ============================================ */
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    // Animate section headers
    gsap.utils.toArray('.section-header').forEach(header => {
        gsap.fromTo(header, 
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 1,
                scrollTrigger: {
                    trigger: header,
                    start: 'top 80%',
                    end: 'bottom 20%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate filter buttons
    gsap.from('.filter-btn', {
        opacity: 0,
        y: 20,
        stagger: 0.1,
        duration: 0.6,
        scrollTrigger: {
            trigger: '.products-filter',
            start: 'top 85%'
        }
    });
    
    // Animate product cards on scroll
    gsap.utils.toArray('.product-card').forEach((card, index) => {
        gsap.fromTo(card,
            { 
                opacity: 0, 
                y: 50,
                rotationX: 10
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
}

/* ============================================
   4. PRODUCT CARD INTERACTIONS
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
            
            const rotateX = ((y - centerY) / centerY) * -5;
            const rotateY = ((x - centerX) / centerX) * 5;
            
            gsap.to(card, {
                rotationX: rotateX,
                rotationY: rotateY,
                duration: 0.5,
                ease: 'power2.out',
                transformPerspective: 1000
            });
            
            // Move glow effect
            const glow = card.querySelector('.card-glow');
            if (glow) {
                gsap.to(glow, {
                    opacity: 0.15,
                    x: x - rect.width / 2,
                    y: y - rect.height / 2,
                    duration: 0.3
                });
            }
        });
        
        // Reset on mouseleave
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                rotationX: 0,
                rotationY: 0,
                duration: 0.5,
                ease: 'power2.out'
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
                scale: 0.98,
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
   5. PRODUCT FILTERING
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
                    gsap.to(card, {
                        opacity: 1,
                        scale: 1,
                        y: 0,
                        duration: 0.5,
                        delay: index * 0.05,
                        ease: 'power3.out',
                        onComplete: () => {
                            card.style.display = 'block';
                        }
                    });
                } else {
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        y: 20,
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
   6. PAYMENT MODAL SYSTEM
   ============================================ */
function initPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const closeBtn = document.querySelector('.close-modal');
    const buyBtns = document.querySelectorAll('.buy-btn');
    
    if (!modal) return;
    
    // Open modal on buy button click
    buyBtns.forEach(btn => {
        btn.addEventListener('click', () => {
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
    const downloadLink = document.getElementById('download-link');
    
    // Reset modal state
    modalTitle.textContent = `Checkout: ${productName}`;
    paymentSimulation.style.display = 'flex';
    successContent.classList.remove('visible');
    spinner.style.display = 'block';
    paymentStatus.textContent = 'Initializing payment...';
    
    // Show modal with animation
    modal.classList.add('active');
    
    gsap.fromTo('.modal-content',
        { scale: 0.8, opacity: 0, y: 20 },
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
