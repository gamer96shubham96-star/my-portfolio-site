/**
 * Rachna Hub | Premium Minecraft Assets Store
 * Main JavaScript File
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- 1. Loader Animation ---
    const loaderTl = gsap.timeline();

    loaderTl
        .to('.loader-progress', {
            width: '100%',
            duration: 1.5,
            ease: 'power2.inOut'
        })
        .to('.loader', {
            y: '-100%',
            duration: 1,
            ease: 'power4.inOut',
            delay: 0.2
        })
        .from('.navbar', {
            y: -100,
            opacity: 0,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.5')
        .from('.hero-content > *', {
            y: 50,
            opacity: 0,
            stagger: 0.1,
            duration: 1,
            ease: 'power3.out'
        }, '-=0.8');

    // --- 2. Custom Cursor ---
    const cursor = document.querySelector('.cursor');
    const follower = document.querySelector('.cursor-follower');
    const links = document.querySelectorAll('a, button, .buy-btn');

    document.addEventListener('mousemove', (e) => {
        gsap.to(cursor, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.1
        });
        gsap.to(follower, {
            x: e.clientX,
            y: e.clientY,
            duration: 0.3
        });
    });

    // Cursor Hover Effect
    links.forEach(link => {
        link.addEventListener('mouseenter', () => {
            gsap.to(follower, { scale: 2, backgroundColor: 'rgba(255,255,255,0.1)' });
            gsap.to(cursor, { scale: 0 });
        });
        link.addEventListener('mouseleave', () => {
            gsap.to(follower, { scale: 1, backgroundColor: 'transparent' });
            gsap.to(cursor, { scale: 1 });
        });
    });

    // --- 3. Navigation & Mobile Menu ---
    const menuToggle = document.querySelector('.menu-toggle');
    const navMenu = document.querySelector('.nav-menu');
    const navLinks = document.querySelectorAll('.nav-link');

    // Mobile Menu Toggle
    menuToggle.addEventListener('click', () => {
        menuToggle.classList.toggle('active');
        navMenu.classList.toggle('active');
    });

    // Close mobile menu on link click
    navLinks.forEach(link => {
        link.addEventListener('click', () => {
            menuToggle.classList.remove('active');
            navMenu.classList.remove('active');
        });
    });

    // Smooth Scroll for Nav Links
    navLinks.forEach(link => {
        link.addEventListener('click', (e) => {
            e.preventDefault();
            const targetId = link.getAttribute('href');
            gsap.to(window, {
                scrollTo: targetId,
                duration: 1,
                ease: 'power3.inOut'
            });
        });
    });

    // --- 4. Stats Counter Animation ---
    const statNumbers = document.querySelectorAll('.stat-number');
    
    statNumbers.forEach(stat => {
        const targetValue = parseInt(stat.getAttribute('data-count'));
        
        ScrollTrigger.create({
            trigger: stat,
            start: 'top 85%',
            once: true,
            onEnter: () => {
                const proxy = { val: 0 };
                gsap.to(proxy, {
                    val: targetValue,
                    duration: 2,
                    ease: 'power2.out',
                    onUpdate: () => {
                        stat.textContent = Math.ceil(proxy.val);
                    }
                });
            }
        });
    });

    // --- 5. Scroll Animations (General) ---
    const animateElements = (selector) => {
        gsap.utils.toArray(selector).forEach(el => {
            gsap.from(el, {
                scrollTrigger: {
                    trigger: el,
                    start: 'top 90%',
                    toggleActions: 'play none none reverse'
                },
                y: 50,
                opacity: 0,
                duration: 0.8,
                ease: 'power3.out'
            });
        });
    };

    animateElements('.feature-card');
    animateElements('.testimonial-card');
    animateElements('.faq-item');

    // --- 6. Product Filtering ---
    const filterBtns = document.querySelectorAll('.filter-btn');
    const productCards = document.querySelectorAll('.product-card');

    filterBtns.forEach(btn => {
        btn.addEventListener('click', () => {
            // Update Active Button
            filterBtns.forEach(b => b.classList.remove('active'));
            btn.classList.add('active');

            const filterValue = btn.getAttribute('data-filter');

            productCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || filterValue === category) {
                    // Show Card
                    gsap.to(card, {
                        display: 'block',
                        opacity: 1,
                        scale: 1,
                        duration: 0.4,
                        delay: 0.1
                    });
                } else {
                    // Hide Card
                    gsap.to(card, {
                        opacity: 0,
                        scale: 0.8,
                        duration: 0.3,
                        onComplete: () => {
                            card.style.display = 'none';
                        }
                    });
                }
            });
        });
    });

    // --- 7. FAQ Accordion ---
    const faqQuestions = document.querySelectorAll('.faq-question');

    faqQuestions.forEach(question => {
        question.addEventListener('click', () => {
            const answer = question.nextElementSibling;
            const isOpen = question.classList.contains('active');

            // Close all others
            document.querySelectorAll('.faq-question').forEach(q => {
                q.classList.remove('active');
                gsap.to(q.nextElementSibling, { maxHeight: 0, duration: 0.4 });
            });

            if (!isOpen) {
                question.classList.add('active');
                gsap.to(answer, { maxHeight: '500px', duration: 0.5 });
            }
        });
    });

    // --- 8. Payment Modal System ---
    const modal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');
    const buyBtns = document.querySelectorAll('.buy-btn');
    const cartCountEl = document.querySelector('.cart-count');
    const paymentSim = document.querySelector('.payment-simulation');
    const successContent = document.querySelector('.success-content');
    const paymentStatus = document.getElementById('payment-status');
    const downloadLink = document.getElementById('download-link');
    const modalTitle = document.getElementById('modal-title');

    let cartCount = 0;

    // Open Modal
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.product-card');
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');
            const file = card.getAttribute('data-file');

            modalTitle.textContent = `Checkout: ${name}`;
            downloadLink.setAttribute('download', file);
            // In a real app, the href would be a secure download URL
            
            modal.classList.add('active');
            resetModal();
            simulatePayment();
        });
    });

    // Close Modal
    closeModal.addEventListener('click', () => {
        modal.classList.remove('active');
    });

    modal.addEventListener('click', (e) => {
        if (e.target === modal) {
            modal.classList.remove('active');
        }
    });

    function resetModal() {
        paymentSim.style.display = 'block';
        successContent.style.display = 'none';
        paymentStatus.textContent = 'Initializing payment...';
    }

    function simulatePayment() {
        setTimeout(() => {
            paymentStatus.textContent = 'Processing Payment...';
        }, 1000);

        setTimeout(() => {
            paymentStatus.textContent = 'Verifying Transaction...';
        }, 2500);

        setTimeout(() => {
            paymentSim.style.display = 'none';
            successContent.style.display = 'block';
            
            // Update Cart
            cartCount++;
            cartCountEl.textContent = cartCount;
            cartCountEl.style.transform = 'scale(1.5)';
            setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);

        }, 4000);
    }

    // --- 9. Contact Form ---
    const contactForm = document.getElementById('contactForm');
    contactForm.addEventListener('submit', (e) => {
        e.preventDefault();
        const btn = contactForm.querySelector('.submit-btn');
        const originalText = btn.innerHTML;

        btn.innerHTML = '<span>Sending...</span>';
        
        setTimeout(() => {
            btn.innerHTML = '<span>Message Sent!</span>';
            btn.style.backgroundColor = '#4ade80'; // Green
            contactForm.reset();
            
            setTimeout(() => {
                btn.innerHTML = originalText;
                btn.style.backgroundColor = '';
            }, 3000);
        }, 1500);
    });
});