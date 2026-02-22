// ============================================
// RACHNA HUB - PROFESSIONAL JAVASCRIPT
// God-Level Animations & Functionality
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    initLoadingScreen();
    initCustomCursor();
    initScrollAnimations();
    initProductCards();
    initProductFilters();
    initPaymentModal();
    initCounterAnimation();
    initSmoothScroll();
    initParallaxEffects();
    initNavbarScroll();
    initHoverEffects();
    initFAQ();
    initContactForm();
    initTextAnimations();
});

// ============================================
// 1. LOADING SCREEN
// ============================================
function initLoadingScreen() {
    const loader = document.querySelector('.loader');
    if (!loader) return;
    
    setTimeout(() => {
        loader.classList.add('hidden');
        setTimeout(() => {
            initHeroAnimations();
        }, 500);
    }, 2500);
}

// ============================================
// 2. HERO ANIMATIONS
// ============================================
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

// ============================================
// 3. CUSTOM CURSOR SYSTEM
// ============================================
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
    
    document.addEventListener('mousemove', (e) => {
        mouseX = e.clientX;
        mouseY = e.clientY;
    });
    
    function animateCursor() {
        cursorX += (mouseX - cursorX) * 0.15;
        cursorY += (mouseY - cursorY) * 0.15;
        followerX += (mouseX - followerX) * 0.08;
        followerY += (mouseY - followerY) * 0.08;
        
        cursor.style.left = cursorX + 'px';
        cursor.style.top = cursorY + 'px';
        cursorFollower.style.left = followerX + 'px';
        cursorFollower.style.top = followerY + 'px';
        
        requestAnimationFrame(animateCursor);
    }
    
    animateCursor();
    
    const interactiveElements = document.querySelectorAll('a, button, .product-card, .filter-btn, .feature-card, .faq-question');
    
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
    
    document.addEventListener('mouseleave', () => {
        cursor.style.opacity = '0';
        cursorFollower.style.opacity = '0';
    });
    
    document.addEventListener('mouseenter', () => {
        cursor.style.opacity = '1';
        cursorFollower.style.opacity = '1';
    });
}

// ============================================
// 4. SCROLL ANIMATIONS WITH GSAP
// ============================================
function initScrollAnimations() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
    gsap.registerPlugin(ScrollTrigger);
    
    // Animate all sections on scroll
    const sections = document.querySelectorAll('section');
    
    sections.forEach(section => {
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
    
    // Animate product cards on scroll
    const productCards = document.querySelectorAll('.product-card');
    productCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 60, rotationX: 15 },
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
    
    // Animate testimonial cards
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    testimonialCards.forEach((card, index) => {
        gsap.fromTo(card,
            { opacity: 0, y: 50 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: card,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate FAQ items
    const faqItems = document.querySelectorAll('.faq-item');
    faqItems.forEach((item, index) => {
        gsap.fromTo(item,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.5,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: item,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}

// ============================================
// 5. PRODUCT CARD INTERACTIONS
// ============================================
function initProductCards() {
    const cards = document.querySelectorAll('.product-card');
    
    cards.forEach(card => {
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

// ============================================
// 6. PRODUCT FILTERING
// ============================================
function initProductFilters() {
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');
    
    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');
            
            const filter = btn.dataset.filter;
            
            productCards.forEach((card, index) => {
                const category = card.dataset.category;
                const shouldShow = filter === 'all' || category === filter;
                
                if (shouldShow) {
                    card.style.display = 'block';
                    card.style.opacity = '0';
                    card.style.transform = 'translateY(30px) scale(0.95)';
                    
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

// ============================================
// 7. PAYMENT MODAL SYSTEM
// ============================================
function initPaymentModal() {
    const modal = document.getElementById('paymentModal');
    const closeBtn = document.querySelector('.close-modal');
    const buyBtns = document.querySelectorAll('.buy-btn');
    
    if (!modal) return;
    
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
    
    if (closeBtn) {
        closeBtn.addEventListener('click', closePaymentModal);
    }
    
    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            closePaymentModal();
        }
    });
    
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
    
    modalTitle.textContent = `Checkout: ${productName}`;
    paymentSimulation.style.display = 'flex';
    successContent.classList.remove('visible');
    spinner.style.display = 'block';
    paymentStatus.textContent = 'Initializing payment...';
    
    modal.classList.add('active');
    
    gsap.fromTo('.modal-content',
        { scale: 0.8, opacity: 0, y: 30 },
        { scale: 1, opacity: 1, y: 0, duration: 0.4, ease: 'back.out(1.7)' }
    );
    
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
            
            spinnerEl.style.display = 'none';
            simulationEl.style.display = 'none';
            successEl.classList.add('visible');
            
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
            
            setupDownload(productFile, productName);
            updateCartCount();
        }
    }, 800);
}

function setupDownload(filename, productName) {
    const downloadBtn = document.getElementById('download-link');

    if (downloadBtn) {
        downloadBtn.href = `/downloads/${filename}`;
        downloadBtn.setAttribute('download', filename);

        downloadBtn.onclick = () => {
            showNotification(`${productName} download started!`);
        };
    }
}


function updateCartCount() {
    const cartCount = document.querySelector('.cart-count');
    if (cartCount) {
        const currentCount = parseInt(cartCount.textContent) || 0;
        cartCount.textContent = currentCount + 1;
        cartCount.classList.add('active');
        
        gsap.fromTo(cartCount,
            { scale: 1.5 },
            { scale: 1, duration: 0.3, ease: 'bounce.out' }
        );
    }
}

function showNotification(message) {
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
    
    setTimeout(() => {
        notification.style.animation = 'slideOut 0.3s ease forwards';
        setTimeout(() => {
            notification.remove();
        }, 300);
    }, 3000);
}

// ============================================
// 8. COUNTER ANIMATION
// ============================================
function initCounterAnimation() {
    const counters = document.querySelectorAll('.stat-number');
    
    counters.forEach(counter => {
        const target = parseInt(counter.dataset.count) || 0;
        
        ScrollTrigger.create({
            trigger: counter,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                gsap.to(counter, {
                    innerText: target,
                    duration: 2,
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

// ============================================
// 9. SMOOTH SCROLL
// ============================================
function initSmoothScroll() {
    const links = document.querySelectorAll('a[href^="#"]');
    
    links.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const target = document.querySelector(link.getAttribute('href'));
            
            if (target) {
                gsap.to(window, {
                    duration: 1,
                    scrollTo: {
                        y: target.offsetTop - 80
                    },
                    ease: 'power3.inOut'
                });
            }
        });
    });
}

// ============================================
// 10. PARALLAX EFFECTS
// ============================================
function initParallaxEffects() {
    if (typeof gsap === 'undefined' || typeof ScrollTrigger === 'undefined') return;
    
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

// ============================================
// 11. NAVBAR SCROLL EFFECT
// ============================================
function initNavbarScroll() {
    const navbar = document.querySelector('.navbar');
    
    if (!navbar) return;
    
    window.addEventListener('scroll', () => {
        if (window.scrollY > 50) {
            navbar.classList.add('scrolled');
        } else {
            navbar.classList.remove('scrolled');
        }
    });
}

// ============================================
// 12. HOVER EFFECTS
// ============================================
function initHoverEffects() {
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
    
    // Testimonial card hover
    const testimonialCards = document.querySelectorAll('.testimonial-card');
    
    testimonialCards.forEach(card => {
        card.addEventListener('mouseenter', () => {
            gsap.to(card, {
                y: -5,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
        
        card.addEventListener('mouseleave', () => {
            gsap.to(card, {
                y: 0,
                duration: 0.3,
                ease: 'power2.out'
            });
        });
    });
}

// ============================================
// 13. FAQ ACCORDION
// ============================================
function initFAQ() {
    const faqItems = document.querySelectorAll('.faq-item');
    
    faqItems.forEach(item => {
        const question = item.querySelector('.faq-question');
        const answer = item.querySelector('.faq-answer');
        const icon = item.querySelector('.faq-icon');
        
        if (!question || !answer) return;
        
        question.addEventListener('click', () => {
            const isActive = item.classList.contains('active');
            
            // Close all other items
            faqItems.forEach(otherItem => {
                if (otherItem !== item) {
                    otherItem.classList.remove('active');
                    const otherAnswer = otherItem.querySelector('.faq-answer');
                    if (otherAnswer) {
                        otherAnswer.style.maxHeight = '0';
                    }
                }
            });
            
            // Toggle current item
            item.classList.toggle('active');
            
            if (!isActive) {
                answer.style.maxHeight = answer.scrollHeight + 'px';
                if (icon) icon.textContent = '×';
            } else {
                answer.style.maxHeight = '0';
                if (icon) icon.textContent = '+';
            }
        });
    });
}

// ============================================
// 14. CONTACT FORM
// ============================================
function initContactForm() {
    const form = document.getElementById('contactForm');
    
    if (!form) return;
    
    form.addEventListener('submit', (e) => {
        e.preventDefault();
        
        const btn = form.querySelector('.submit-btn');
        const originalText = btn.innerHTML;
        
        btn.innerHTML = '<span>Sending...</span>';
        btn.style.pointerEvents = 'none';
        
        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span>';
            btn.style.background = 'linear-gradient(135deg, #00ff88, #00cc6a)';
            
            showNotification('Message sent successfully!');
            
            form.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.background = '';
                btn.style.pointerEvents = 'auto';
            }, 2000);
        }, 1500);
    });
}

// ============================================
// 15. TEXT ANIMATIONS
// ============================================
function initTextAnimations() {
    // Animate section labels
    const labels = document.querySelectorAll('.section-label');
    
    labels.forEach(label => {
        gsap.fromTo(label,
            { opacity: 0, x: -30 },
            {
                opacity: 1,
                x: 0,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: label,
                    start: 'top 85%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
    
    // Animate section titles
    const titles = document.querySelectorAll('.section-title');
    
    titles.forEach(title => {
        gsap.fromTo(title,
            { opacity: 0, y: 30 },
            {
                opacity: 1,
                y: 0,
                duration: 0.8,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: title,
                    start: 'top 80%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });

// Smooth scroll for nav links
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: "power3.inOut"
            });
        }
    });
});


// Get Started button scroll
const getStartedBtn = document.querySelector('.nav-cta');

if (getStartedBtn) {
    getStartedBtn.addEventListener('click', () => {
        const products = document.querySelector('#products');

        gsap.to(window, {
            duration: 1,
            scrollTo: {
                y: products,
                offsetY: 80
            },
            ease: "power3.inOut"
        });
    });
}


// Hero CTA buttons
document.querySelectorAll('.btn-main, .btn-secondary').forEach(btn => {
    btn.addEventListener('click', function (e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));

        if (target) {
            gsap.to(window, {
                duration: 1,
                scrollTo: {
                    y: target,
                    offsetY: 80
                },
                ease: "power3.inOut"
            });
        }
    });
});


// Product filtering
const filterButtons = document.querySelectorAll('.filter-btn');
const productCards = document.querySelectorAll('.product-card');

filterButtons.forEach(button => {
    button.addEventListener('click', () => {

        filterButtons.forEach(btn => btn.classList.remove('active'));
        button.classList.add('active');

        const filter = button.getAttribute('data-filter');

        productCards.forEach(card => {
            const category = card.getAttribute('data-category');

            if (filter === "all" || category === filter) {
                card.style.display = "block";
            } else {
                card.style.display = "none";
            }
        });
    });
});


// Purchase button logic
const buyButtons = document.querySelectorAll('.buy-btn');
const modal = document.getElementById('paymentModal');
const closeModal = document.querySelector('.close-modal');

buyButtons.forEach(button => {
    button.addEventListener('click', function () {

        const productCard = this.closest('.product-card');
        const productName = productCard.getAttribute('data-name');
        const productFile = productCard.getAttribute('data-file');

        modal.style.display = "flex";

        simulatePayment(productName, productFile);
    });
});

// Close modal
if (closeModal) {
    closeModal.addEventListener('click', () => {
        modal.style.display = "none";
    });
}

function simulatePayment(productName, productFile) {

    const status = document.getElementById("payment-status");
    const spinner = document.querySelector(".payment-simulation");
    const successContent = document.querySelector(".success-content");

    spinner.style.display = "block";
    successContent.style.display = "none";

    status.textContent = "Processing payment...";

    setTimeout(() => {
        spinner.style.display = "none";
        successContent.style.display = "block";

        setupDownload(productFile, productName);

    }, 2000);
}


// FAQ accordion
document.querySelectorAll('.faq-question').forEach(btn => {
    btn.addEventListener('click', function () {

        const item = this.parentElement;
        const answer = item.querySelector('.faq-answer');
        const icon = this.querySelector('.faq-icon');

        const isOpen = item.classList.contains('active');

        document.querySelectorAll('.faq-item').forEach(i => {
            i.classList.remove('active');
            i.querySelector('.faq-answer').style.maxHeight = null;
            i.querySelector('.faq-icon').textContent = "+";
        });

        if (!isOpen) {
            item.classList.add('active');
            answer.style.maxHeight = answer.scrollHeight + "px";
            icon.textContent = "−";
        }
    });
});


// Contact form submit
const contactForm = document.getElementById("contactForm");

if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
        e.preventDefault();

        alert("Message sent successfully!");
        contactForm.reset();
    });
}

const cart = document.querySelector('.cart-wrapper');

if (cart) {
    cart.addEventListener('click', () => {
        alert("Cart feature coming soon!");
    });
}
    
    // Animate section descriptions
    const descriptions = document.querySelectorAll('.section-description');
    
    descriptions.forEach(desc => {
        gsap.fromTo(desc,
            { opacity: 0, y: 20 },
            {
                opacity: 1,
                y: 0,
                duration: 0.6,
                ease: 'power3.out',
                scrollTrigger: {
                    trigger: desc,
                    start: 'top 75%',
                    toggleActions: 'play none none reverse'
                }
            }
        );
    });
}