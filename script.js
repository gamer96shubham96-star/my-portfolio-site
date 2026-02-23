/**
 * Rachna Hub | Premium Minecraft Assets Store
 * Main JavaScript File with Download Management
 */

document.addEventListener('DOMContentLoaded', () => {
    // Register GSAP Plugins
    gsap.registerPlugin(ScrollTrigger, ScrollToPlugin);

    // --- FILE DOWNLOAD CONFIGURATION ---
    // Map product IDs to actual file paths in your downloads folder
    const fileDownloads = {
        1: 'downloads/eternal-fortune-1.1.zip',
        2: 'downloads/grass-drops-op-items.zip',
        3: 'downloads/discord-bot-code.txt',
        4: 'downloads/stone-drops-op-items.zip',
        5: 'downloads/jumping-gives-op-items.zip',
        6: 'downloads/dirt-drops-op-items.zip'
    };

    // Alternative: Map by filename (useful if you have many products)
    const fileByName = {
        'eternal-fortune-1.1.zip': 'downloads/eternal-fortune-1.1.zip',
        'grass-drops-op-items.zip': 'downloads/grass-drops-op-items.zip',
        'discord-bot-code.txt': 'downloads/discord-bot-code.txt',
        'stone-drops-op-items.zip': 'downloads/stone-drops-op-items.zip',
        'jumping-gives-op-items.zip': 'downloads/jumping-gives-op-items.zip',
        'dirt-drops-op-items.zip': 'downloads/dirt-drops-op-items.zip'
    };

    // Cart Management
    let cart = [];
    let cartCount = 0;

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

    // --- 8. Payment Modal & File Download System ---
    const modal = document.getElementById('paymentModal');
    const closeModal = document.querySelector('.close-modal');
    const buyBtns = document.querySelectorAll('.buy-btn');
    const cartCountEl = document.querySelector('.cart-count');
    const paymentSim = document.querySelector('.payment-simulation');
    const successContent = document.querySelector('.success-content');
    const paymentStatus = document.getElementById('payment-status');
    const downloadLink = document.getElementById('download-link');
    const modalTitle = document.getElementById('modal-title');
    const modalProductName = document.querySelector('.modal-header p');

    // Open Modal with Product Info
    buyBtns.forEach(btn => {
        btn.addEventListener('click', (e) => {
            const card = e.currentTarget.closest('.product-card');
            const productId = card.getAttribute('data-id');
            const name = card.getAttribute('data-name');
            const price = card.getAttribute('data-price');
            const filename = card.getAttribute('data-file');

            // Get the actual file path
            const filePath = fileDownloads[productId] || fileByName[filename] || `downloads/${filename}`;

            // Store product info for download
            modal.setAttribute('data-product-id', productId);
            modal.setAttribute('data-file-path', filePath);
            modal.setAttribute('data-product-name', name);

            // Update modal content
            modalTitle.textContent = `Checkout: ${name}`;
            modalProductName.textContent = `Price: $${price}`;
            downloadLink.setAttribute('download', filename);
            downloadLink.setAttribute('data-file-path', filePath);

            // Show modal
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
        const steps = [
            { text: 'Connecting to payment gateway...', delay: 800 },
            { text: 'Processing payment...', delay: 2000 },
            { text: 'Verifying transaction...', delay: 3500 },
            { text: 'Preparing download...', delay: 4500 }
        ];

        steps.forEach(step => {
            setTimeout(() => {
                paymentStatus.textContent = step.text;
            }, step.delay);
        });

        setTimeout(() => {
            paymentSim.style.display = 'none';
            successContent.style.display = 'block';
            
            // Update Cart
            cartCount++;
            cartCountEl.textContent = cartCount;
            cartCountEl.style.transform = 'scale(1.5)';
            setTimeout(() => cartCountEl.style.transform = 'scale(1)', 200);

            // Add to cart array
            const productName = modal.getAttribute('data-product-name');
            const filePath = modal.getAttribute('data-file-path');
            cart.push({ name: productName, file: filePath });
            
            console.log('Cart updated:', cart);

        }, 5500);
    }

    // --- 9. Download Button Handler ---
    downloadLink.addEventListener('click', (e) => {
        e.preventDefault();
        const filePath = downloadLink.getAttribute('data-file-path');
        const filename = downloadLink.getAttribute('download');

        // Method 1: Direct download (works if files are in accessible folder)
        downloadFile(filePath, filename);
    });

    function downloadFile(filePath, filename) {
        // Create an invisible anchor element
        const link = document.createElement('a');
        link.href = filePath;
        link.download = filename;
        link.style.display = 'none';
        document.body.appendChild(link);
        
        // Trigger download
        link.click();
        
        // Clean up
        document.body.removeChild(link);
        
        console.log(`Downloading: ${filename} from ${filePath}`);
    }

    // --- 10. Contact Form ---
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

    // --- 11. My Downloads Page (Optional) ---
    // If you want to show all purchased files in a modal/page
    const myDownloadsBtn = document.querySelector('.cart-wrapper');
    if (myDownloadsBtn) {
        myDownloadsBtn.addEventListener('click', () => {
            if (cart.length > 0) {
                showMyDownloads();
            } else {
                alert('No purchases yet!');
            }
        });
    }

    function showMyDownloads() {
        let downloadList = '<h3>Your Purchases:</h3><ul>';
        cart.forEach(item => {
            downloadList += `<li><a href="${item.file}" download="${item.file.split('/').pop()}">${item.name}</a></li>`;
        });
        downloadList += '</ul>';
        
        // Create a simple modal for downloads
        const existingModal = document.getElementById('downloadsListModal');
        if (existingModal) existingModal.remove();

        const modalDiv = document.createElement('div');
        modalDiv.id = 'downloadsListModal';
        modalDiv.className = 'modal-overlay';
        modalDiv.innerHTML = `
            <div class="modal-content" style="max-width: 400px;">
                <button class="close-modal" onclick="this.parentElement.parentElement.remove()">×</button>
                <div class="modal-header">
                    <h3>My Downloads</h3>
                </div>
                <div style="padding: 20px;">
                    ${downloadList}
                </div>
            </div>
        `;
        document.body.appendChild(modalDiv);
    }

    // --- 12. Utility: Check if file exists ---
    async function checkFileExists(url) {
        try {
            const response = await fetch(url, { method: 'HEAD' });
            return response.ok;
        } catch (error) {
            return false;
        }
    }

    // --- 13. Console Info for Testing ---
    console.log('=== Rachna Hub Store Loaded ===');
    console.log('Available files for download:');
    Object.entries(fileDownloads).forEach(([id, path]) => {
        console.log(`  ID ${id}: ${path}`);
    });
    console.log('Cart:', cart);
});