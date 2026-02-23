/**
 * ============================================
 * RACHNA HUB - PREMIUM MINECRAFT ASSETS STORE
 * Complete JavaScript File
 * Features: Shopping Cart, Theme Toggle, Discord Integration,
 * Installation Guides, Reviews System, and More
 * ============================================
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all systems
    RachnaStore.init();
    ThemeManager.init();
    DiscordIntegration.init();
    InstallationGuides.init();
    ReviewsSystem.init();
    GSAPAnimations.init();
});

// ============================================
// RACHNA STORE - MAIN ECOMMERCE SYSTEM
// ============================================

const RachnaStore = {
    cart: [],
    storageKey: 'rachna_hub_cart',

    init() {
        this.loadCart();
        this.initBuyButtons();
        this.initCartUI();
        this.initModal();
        this.initFAQ();
        this.initContactForm();
        this.initProductFilters();
        this.updateCartUI();
    },

    loadCart() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.cart = JSON.parse(saved);
        }
    },

    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    },

    addToCart(product) {
        const existing = this.cart.find(item => item.id === product.id);
        
        if (existing) {
            existing.quantity++;
        } else {
            this.cart.push({ ...product, quantity: 1 });
        }
        
        this.saveCart();
        this.updateCartUI();
        this.showAddedFeedback(product.name);
    },

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartUI();
    },

    updateQuantity(id, change) {
        const item = this.cart.find(item => item.id === id);
        if (!item) return;

        item.quantity += change;
        if (item.quantity <= 0) {
            this.removeFromCart(id);
        } else {
            this.saveCart();
            this.updateCartUI();
        }
    },

    clearCart() {
        this.cart = [];
        this.saveCart();
        this.updateCartUI();
    },

    getTotal() {
        return this.cart.reduce((sum, item) => sum + (item.price * item.quantity), 0).toFixed(2);
    },

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    initBuyButtons() {
        document.querySelectorAll('.add-cart-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.product-card');
                const product = {
                    id: card.dataset.id,
                    name: card.dataset.name,
                    price: parseFloat(card.dataset.price),
                    file: card.dataset.file,
                    icon: card.querySelector('.product-icon').textContent
                };
                this.addToCart(product);
            });
        });

        document.querySelectorAll('.buy-now-btn').forEach(btn => {
            btn.addEventListener('click', (e) => {
                e.stopPropagation();
                const card = e.target.closest('.product-card');
                const product = {
                    id: card.dataset.id,
                    name: card.dataset.name,
                    price: parseFloat(card.dataset.price),
                    file: card.dataset.file
                };
                
                this.cart = [product];
                this.saveCart();
                this.updateCartUI();
                this.openCheckout();
            });
        });
    },

    initCartUI() {
        const cartWrapper = document.querySelector('.cart-wrapper');
        
        if (cartWrapper) {
            cartWrapper.addEventListener('click', () => {
                this.toggleCartPanel();
            });
        }

        const closeCartBtn = document.querySelector('.close-cart');
        if (closeCartBtn) {
            closeCartBtn.addEventListener('click', () => {
                this.closeCartPanel();
            });
        }

        const cartOverlay = document.getElementById('cartOverlay');
        if (cartOverlay) {
            cartOverlay.addEventListener('click', () => {
                this.closeCartPanel();
            });
        }

        const checkoutBtn = document.querySelector('.checkout-btn-main');
        if (checkoutBtn) {
            checkoutBtn.addEventListener('click', () => {
                if (this.cart.length > 0) {
                    this.openCheckout();
                }
            });
        }
    },

    toggleCartPanel() {
        const panel = document.getElementById('cartPanel');
        const overlay = document.getElementById('cartOverlay');
        
        if (panel && overlay) {
            panel.classList.toggle('active');
            overlay.classList.toggle('active');
            this.renderCartItems();
        }
    },

    closeCartPanel() {
        const panel = document.getElementById('cartPanel');
        const overlay = document.getElementById('cartOverlay');
        
        if (panel && overlay) {
            panel.classList.remove('active');
            overlay.classList.remove('active');
        }
    },

    renderCartItems() {
        const container = document.getElementById('cartItems');
        const totalEl = document.getElementById('cartTotal');
        
        if (!container) return;

        if (this.cart.length === 0) {
            container.innerHTML = `
                <div class="empty-cart">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5" width="48" height="48">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"></path>
                        <line x1="3" y1="6" x2="21" y2="6"></line>
                        <path d="M16 10a4 4 0 0 1-8 0"></path>
                    </svg>
                    <p>Your cart is empty</p>
                </div>
            `;
        } else {
            container.innerHTML = this.cart.map(item => `
                <div class="cart-item">
                    <div class="cart-item-icon">${item.icon || '📦'}</div>
                    <div class="cart-item-details">
                        <h4>${item.name}</h4>
                        <p>$${item.price.toFixed(2)} × ${item.quantity}</p>
                    </div>
                    <div class="cart-item-controls">
                        <button onclick="RachnaStore.updateQuantity('${item.id}', -1)">-</button>
                        <span>${item.quantity}</span>
                        <button onclick="RachnaStore.updateQuantity('${item.id}', 1)">+</button>
                        <button class="remove-btn" onclick="RachnaStore.removeFromCart('${item.id}')">×</button>
                    </div>
                </div>
            `).join('');
        }

        if (totalEl) {
            totalEl.textContent = this.getTotal();
        }
    },

    updateCartUI() {
        const count = document.querySelector('.cart-count');
        if (count) {
            count.textContent = this.getItemCount();
            count.classList.toggle('active', this.getItemCount() > 0);
        }
    },

    showAddedFeedback(productName) {
        const existingToast = document.querySelector('.toast-notification');
        if (existingToast) existingToast.remove();

        const toast = document.createElement('div');
        toast.className = 'toast-notification';
        toast.innerHTML = `
            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <polyline points="20 6 9 17 4 12"></polyline>
            </svg>
            <span>${productName} added to cart!</span>
        `;
        
        document.body.appendChild(toast);
        
        gsap.fromTo(toast, 
            { y: 50, opacity: 0 },
            { y: 0, opacity: 1, duration: 0.3 }
        );

        setTimeout(() => {
            gsap.to(toast, {
                y: 50,
                opacity: 0,
                duration: 0.3,
                onComplete: () => toast.remove()
            });
        }, 2000);

        const cartIcon = document.querySelector('.cart-icon');
        if (cartIcon) {
            gsap.fromTo(cartIcon, 
                { scale: 1.2 },
                { scale: 1, duration: 0.3, yoyo: true, repeat: 1 }
            );
        }
    },

    initModal() {
        const closeBtn = document.querySelector('.close-modal');
        const modal = document.getElementById('paymentModal');

        if (closeBtn) {
            closeBtn.addEventListener('click', () => this.closeModal());
        }

        if (modal) {
            modal.addEventListener('click', (e) => {
                if (e.target === modal) {
                    this.closeModal();
                }
            });
        }

        const downloadLink = document.getElementById('download-link');
        if (downloadLink) {
            downloadLink.addEventListener('click', (e) => {
                e.preventDefault();
                const href = downloadLink.getAttribute('href');
                const download = downloadLink.getAttribute('download');
                
                if (href && download) {
                    const link = document.createElement('a');
                    link.href = href;
                    link.download = download;
                    link.style.display = 'none';
                    document.body.appendChild(link);
                    link.click();
                    document.body.removeChild(link);
                }
            });
        }
    },

    openCheckout() {
        const modal = document.getElementById('paymentModal');
        const paymentSim = document.querySelector('.payment-simulation');
        const successContent = document.querySelector('.success-content');
        const modalTitle = document.getElementById('modal-title');
        const modalProductName = document.querySelector('.modal-header p');

        if (!modal) return;

        if (paymentSim) paymentSim.style.display = 'flex';
        if (successContent) successContent.style.display = 'none';

        if (this.cart.length === 1) {
            if (modalTitle) modalTitle.textContent = `Checkout: ${this.cart[0].name}`;
            if (modalProductName) modalProductName.textContent = `Price: $${this.cart[0].price.toFixed(2)}`;
        } else {
            if (modalTitle) modalTitle.textContent = `Checkout (${this.cart.length} items)`;
            if (modalProductName) modalProductName.textContent = `Total: $${this.getTotal()}`;
        }

        modal.classList.add('active');
        this.simulatePayment();
    },

    simulatePayment() {
        const paymentStatus = document.getElementById('payment-status');
        const steps = [
            { text: 'Connecting to payment gateway...', delay: 800 },
            { text: 'Processing payment...', delay: 2000 },
            { text: 'Verifying transaction...', delay: 3500 },
            { text: 'Preparing download...', delay: 4500 }
        ];

        steps.forEach(step => {
            setTimeout(() => {
                if (paymentStatus) paymentStatus.textContent = step.text;
            }, step.delay);
        });

        setTimeout(() => {
            this.completePayment();
        }, 5500);
    },

    completePayment() {
        const paymentSim = document.querySelector('.payment-simulation');
        const successContent = document.querySelector('.success-content');
        const downloadLink = document.getElementById('download-link');

        if (paymentSim) paymentSim.style.display = 'none';
        if (successContent) successContent.style.display = 'block';

        if (downloadLink && this.cart.length > 0) {
            const firstItem = this.cart[0];
            downloadLink.href = `downloads/${firstItem.file}`;
            downloadLink.setAttribute('download', firstItem.file);
        }

        this.clearCart();
    },

    closeModal() {
        const modal = document.getElementById('paymentModal');
        if (modal) {
            modal.classList.remove('active');
        }
    },

    initFAQ() {
        document.querySelectorAll('.faq-item').forEach(item => {
            const question = item.querySelector('.faq-question');
            const answer = item.querySelector('.faq-answer');
            
            if (question && answer) {
                question.addEventListener('click', () => {
                    const isOpen = item.classList.contains('active');
                    
                    document.querySelectorAll('.faq-item').forEach(other => {
                        other.classList.remove('active');
                        const otherAnswer = other.querySelector('.faq-answer');
                        if (otherAnswer) {
                            otherAnswer.style.maxHeight = '0';
                        }
                    });

                    if (!isOpen) {
                        item.classList.add('active');
                        answer.style.maxHeight = answer.scrollHeight + 'px';
                    }
                });
            }
        });
    },

    initProductFilters() {
        const filterBtns = document.querySelectorAll('.filter-btn');
        const productCards = document.querySelectorAll('.product-card');

        filterBtns.forEach(btn => {
            btn.addEventListener('click', () => {
                filterBtns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const filterValue = btn.getAttribute('data-filter');

                productCards.forEach(card => {
                    const category = card.getAttribute('data-category');
                    
                    if (filterValue === 'all' || filterValue === category) {
                        gsap.to(card, {
                            display: 'block',
                            opacity: 1,
                            scale: 1,
                            duration: 0.4,
                            delay: 0.1
                        });
                    } else {
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
    },

    initContactForm() {
        const form = document.getElementById('contactForm');
        if (!form) return;

        form.addEventListener('submit', (e) => {
            e.preventDefault();
            const btn = form.querySelector('.submit-btn');
            const originalText = btn.innerHTML;

            btn.innerHTML = '<span>Sending...</span>';
            
            setTimeout(() => {
                btn.innerHTML = '<span>Message Sent!</span>';
                btn.style.backgroundColor = '#4ade80';
                form.reset();
                
                setTimeout(() => {
                    btn.innerHTML = originalText;
                    btn.style.backgroundColor = '';
                }, 3000);
            }, 1500);
        });
    }
};

// ============================================
// THEME MANAGER - Dark/Light Mode Toggle
// ============================================

const ThemeManager = {
    storageKey: 'rachna_hub_theme',
    currentTheme: 'dark',

    init() {
        this.loadTheme();
        this.addToggleButton();
    },

    loadTheme() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.currentTheme = saved;
        }
        this.applyTheme();
    },

    applyTheme() {
        document.documentElement.setAttribute('data-theme', this.currentTheme);
        localStorage.setItem(this.storageKey, this.currentTheme);
        this.updateButtonIcon();
    },

    toggleTheme() {
        this.currentTheme = this.currentTheme === 'dark' ? 'light' : 'dark';
        this.applyTheme();
    },

    updateButtonIcon() {
        const toggleBtn = document.querySelector('.theme-toggle');
        if (!toggleBtn) return;

        const sunIcon = toggleBtn.querySelector('.sun-icon');
        const moonIcon = toggleBtn.querySelector('.moon-icon');

        if (this.currentTheme === 'dark') {
            if (sunIcon) sunIcon.style.display = 'none';
            if (moonIcon) moonIcon.style.display = 'block';
        } else {
            if (sunIcon) sunIcon.style.display = 'block';
            if (moonIcon) moonIcon.style.display = 'none';
        }
    },

    addToggleButton() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;

        if (document.querySelector('.theme-toggle')) return;

        const toggleBtn = document.createElement('button');
        toggleBtn.className = 'theme-toggle';
        toggleBtn.innerHTML = `
            <svg class="sun-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <circle cx="12" cy="12" r="5"></circle>
                <line x1="12" y1="1" x2="12" y2="3"></line>
                <line x1="12" y1="21" x2="12" y2="23"></line>
                <line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line>
                <line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line>
                <line x1="1" y1="12" x2="3" y2="12"></line>
                <line x1="21" y1="12" x2="23" y2="12"></line>
                <line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line>
                <line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line>
            </svg>
            <svg class="moon-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" width="20" height="20">
                <path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path>
            </svg>
        `;
        
        toggleBtn.addEventListener('click', () => this.toggleTheme());
        navActions.insertBefore(toggleBtn, navActions.firstChild);
    }
};

// ============================================
// DISCORD INTEGRATION
// ============================================

const DiscordIntegration = {

    serverId: "https://discord.gg/8Hj8p8cvBz",

    init() {
        this.addDiscordNavButton();
    },

    addDiscordNavButton() {
        const navActions = document.querySelector('.nav-actions');
        if (!navActions) return;

        const discordBtn = document.createElement('a');
        discordBtn.href = `https://discord.gg/${this.serverId}`;
        discordBtn.target = '_blank';
        discordBtn.className = 'discord-nav-btn';
        discordBtn.textContent = "Discord";

        navActions.appendChild(discordBtn);
    }

};

// ============================================
// INSTALLATION GUIDES
// ============================================

const InstallationGuides = {
    guides: {
        datapack: {
            title: 'How to Install Datapacks',
            steps: [
                { icon: '📁', title: 'Download the File', description: 'Download the datapack .zip file from your purchase confirmation or account dashboard.' },
                { icon: '📂', title: 'Locate Your World Folder', description: 'Navigate to your Minecraft world folder. In singleplayer: %appdata%\\.minecraft\\saves\\. For servers: your server folder.' },
                { icon: '📋', title: 'Open Datapacks Folder', description: 'Inside your world folder, find and open the "datapacks" folder. Create it if it doesn\'t exist.' },
                { icon: '📦', title: 'Extract the Datapack', description: 'Extract the downloaded .zip file directly into the datapacks folder. Do not create an extra subfolder.' },
                { icon: '🎮', title: 'Enable in World', description: 'When loading your world, the game will ask if you want to keep the new datapacks. Click "Yes" or "Apply Changes".' }
            ]
        },
        plugin: {
            title: 'How to Install Plugins',
            steps: [
                { icon: '📁', title: 'Download the Plugin', description: 'Download the plugin .jar file from your purchase confirmation.' },
                { icon: '📂', title: 'Locate Plugins Folder', description: 'Navigate to your server folder and find the "plugins" directory.' },
                { icon: '📦', title: 'Upload the Plugin', description: 'Copy the .jar file into the plugins folder.' },
                { icon: '🔄', title: 'Restart Your Server', description: 'Restart or reload your server to load the new plugin.' },
                { icon: '⚙️', title: 'Configure (Optional)', description: 'Check the generated config files in plugins/[plugin-name] to customize settings.' }
            ]
        },
        bot: {
            title: 'How to Setup Discord Bot',
            steps: [
                { icon: '💻', title: 'Install Node.js', description: 'Make sure you have Node.js installed on your computer (version 16.6 or higher).' },
                { icon: '📁', title: 'Create Project Folder', description: 'Create a new folder for your bot and extract the source code files.' },
                { icon: '📦', title: 'Install Dependencies', description: 'Open terminal/command prompt in the folder and run: npm install' },
                { icon: '🔑', title: 'Configure Token', description: 'Open config.json and add your Discord bot token from the Discord Developer Portal.' },
                { icon: '🚀', title: 'Run the Bot', description: 'Run "node index.js" to start your bot. It should appear online in your Discord server.' }
            ]
        },
        resource: {
            title: 'How to Install Resource Packs',
            steps: [
                { icon: '📁', title: 'Download the Pack', description: 'Download the resource pack .zip file.' },
                { icon: '📂', title: 'Locate Resource Packs', description: 'Go to %appdata%\\.minecraft\\resourcepacks on Windows.' },
                { icon: '📦', title: 'Extract the Pack', description: 'Extract the .zip file into the resourcepacks folder.' },
                { icon: '🎮', title: 'Activate in Game', description: 'In Minecraft, go to Settings > Resource Packs and select the pack from the list.' }
            ]
        }
    },

    init() {
        this.addGuideButtons();
    },

    addGuideButtons() {
        const faqContainer = document.querySelector('.faq-container');
        if (!faqContainer) return;

        if (document.querySelector('.guides-section')) return;

        const guidesHTML = `
            <div class="guides-section" style="margin-top: 40px;">
                <div class="section-header">
                    <h2 class="section-title">
                        <span class="title-word">Installation</span>
                        <span class="title-word outline">Guides</span>
                    </h2>
                    <p class="section-description">Step-by-step installation instructions for all product types.</p>
                </div>
                <div class="guide-type-selector">
                    <button class="guide-type-btn active" data-type="datapack">Datapacks</button>
                    <button class="guide-type-btn" data-type="plugin">Plugins</button>
                    <button class="guide-type-btn" data-type="bot">Discord Bots</button>
                    <button class="guide-type-btn" data-type="resource">Resource Packs</button>
                </div>
                <div class="guide-content" id="guideContent"></div>
            </div>
        `;

        faqContainer.insertAdjacentHTML('afterend', guidesHTML);

        // Bind click events
        document.querySelectorAll('.guide-type-btn').forEach(btn => {
            btn.addEventListener('click', () => {
                document.querySelectorAll('.guide-type-btn').forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                this.showGuide(btn.dataset.type);
            });
        });

        // Show default guide
        this.showGuide('datapack');
    },

    showGuide(type) {
        const container = document.getElementById('guideContent');
        const guide = this.guides[type];
        
        if (!container || !guide) return;

        container.innerHTML = `
            <div class="guide-steps">
                ${guide.steps.map((step, index) => `
                    <div class="guide-step">
                        <div class="step-number">${index + 1}</div>
                        <div class="step-content">
                            <div class="step-icon">${step.icon}</div>
                            <h4>${step.title}</h4>
                            <p>${step.description}</p>
                        </div>
                    </div>
                `).join('')}
            </div>
        `;
    }
};

// ============================================
// REVIEWS SYSTEM
// ============================================

const ReviewsSystem = {
    storageKey: 'rachna_hub_reviews',

    init() {
        this.loadReviews();
        this.addReviewButtons();
    },

    loadReviews() {
        this.reviews = JSON.parse(localStorage.getItem(this.storageKey) || '{}');
    },

    saveReviews() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.reviews));
    },

    addReviewButtons() {
        // Add "Write Review" button to each product card
        document.querySelectorAll('.product-card').forEach(card => {
            const existingBtn = card.querySelector('.review-btn');
            if (existingBtn) return;

            const footer = card.querySelector('.card-footer');
            if (!footer) return;

            const reviewBtn = document.createElement('button');
            reviewBtn.className = 'review-btn';
            reviewBtn.innerHTML = '<span>Write Review</span>';
            reviewBtn.dataset.productId = card.dataset.id;
            reviewBtn.dataset.productName = card.dataset.name;
            
            footer.insertAdjacentElement('afterend', reviewBtn);

            reviewBtn.addEventListener('click', (e) => {
                e.stopPropagation();
                this.showReviewModal(card.dataset.id, card.dataset.name);
            });
        });
    },

    showReviewModal(productId, productName) {
        const existingModal = document.getElementById('reviewModal');
        if (existingModal) existingModal.remove();

        const modalHTML = `
            <div class="modal-overlay" id="reviewModal">
                <div class="review-modal-content">
                    <button class="close-review-modal">×</button>
                    <h3>Write a Review</h3>
                    <p class="review-product-name">${productName}</p>
                    <form id="reviewForm">
                        <div class="rating-input">
                            <label>Your Rating:</label>
                            <div class="star-rating" id="starRating">
                                <span class="star-option" data-rating="1">★</span>
                                <span class="star-option" data-rating="2">★</span>
                                <span class="star-option" data-rating="3">★</span>
                                <span class="star-option" data-rating="4">★</span>
                                <span class="star-option" data-rating="5">★</span>
                            </div>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Your Name</label>
                            <input type="text" id="reviewerName" class="form-input" placeholder="Enter your name" required>
                        </div>
                        <div class="form-group">
                            <label class="form-label">Your Review</label>
                            <textarea id="reviewText" class="form-textarea" placeholder="Write your review..." rows="4" required></textarea>
                        </div>
                        <button type="submit" class="submit-review-btn">Submit Review</button>
                    </form>
                </div>
            </div>
        `;

        document.body.insertAdjacentHTML('beforeend', modalHTML);

        const modal = document.getElementById('reviewModal');
        const closeBtn = modal.querySelector('.close-review-modal');
        const starRating = document.getElementById('starRating');
        let selectedRating = 0;

        closeBtn.addEventListener('click', () => modal.remove());
        modal.addEventListener('click', (e) => {
            if (e.target === modal) modal.remove();
        });

        // Star rating interaction
        starRating.querySelectorAll('.star-option').forEach(star => {
            star.addEventListener('mouseenter', () => {
                const rating = parseInt(star.dataset.rating);
                this.highlightStars(starRating, rating);
            });
            
            star.addEventListener('mouseleave', () => {
                this.highlightStars(starRating, selectedRating);
            });
            
            star.addEventListener('click', () => {
                selectedRating = parseInt(star.dataset.rating);
                this.highlightStars(starRating, selectedRating);
            });
        });

// ============================================
// REVIEWS SYSTEM (Continued)
// ============================================

        // Form submission
        document.getElementById('reviewForm').addEventListener('submit', (e) => {
            e.preventDefault();
            
            if (selectedRating === 0) {
                alert('Please select a rating!');
                return;
            }

            const review = {
                name: document.getElementById('reviewerName').value,
                text: document.getElementById('reviewText').value,
                rating: selectedRating,
                date: new Date().toISOString()
            };

            this.addReview(productId, review);
            modal.remove();
            
            alert('Thank you for your review!');
        });
    },

    highlightStars(container, rating) {
        container.querySelectorAll('.star-option').forEach((star, index) => {
            star.classList.toggle('active', index < rating);
        });
    },

    addReview(productId, review) {
        if (!this.reviews[productId]) {
            this.reviews[productId] = [];
        }
        
        this.reviews[productId].push({
            ...review,
            id: Date.now()
        });
        
        this.saveReviews();
    },

    getReviews(productId) {
        return this.reviews[productId] || [];
    },

    getAverageRating(productId) {
        const reviews = this.getReviews(productId);
        if (reviews.length === 0) return 0;
        
        const sum = reviews.reduce((acc, r) => acc + r.rating, 0);
        return (sum / reviews.length).toFixed(1);
    }
};

// ============================================
// GSAP ANIMATIONS
// ============================================

const GSAPAnimations = {
    init() {
        this.initLoader();
        this.initCustomCursor();
        this.initNavigation();
        this.initScrollAnimations();
        this.initStatsCounter();
    },

    initLoader() {
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
    },

    initCustomCursor() {
        const cursor = document.querySelector('.cursor');
        const follower = document.querySelector('.cursor-follower');
        const interactiveElements = document.querySelectorAll('a, button, .buy-btn, .add-cart-btn, .buy-now-btn, .review-btn');

        if (!cursor || !follower) return;

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

        interactiveElements.forEach(el => {
            el.addEventListener('mouseenter', () => {
                gsap.to(follower, { scale: 2, backgroundColor: 'rgba(255,255,255,0.1)' });
                gsap.to(cursor, { scale: 0 });
            });
            el.addEventListener('mouseleave', () => {
                gsap.to(follower, { scale: 1, backgroundColor: 'transparent' });
                gsap.to(cursor, { scale: 1 });
            });
        });
    },

    initNavigation() {
        const menuToggle = document.querySelector('.menu-toggle');
        const navMenu = document.querySelector('.nav-menu');
        const navLinks = document.querySelectorAll('.nav-link');

        if (menuToggle && navMenu) {
            menuToggle.addEventListener('click', () => {
                menuToggle.classList.toggle('active');
                navMenu.classList.toggle('active');
            });
        }

        navLinks.forEach(link => {
            link.addEventListener('click', () => {
                if (menuToggle && navMenu) {
                    menuToggle.classList.remove('active');
                    navMenu.classList.remove('active');
                }
            });
        });
    },

    initScrollAnimations() {
        const animateOnScroll = (selector) => {
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

        animateOnScroll('.feature-card');
        animateOnScroll('.testimonial-card');
        animateOnScroll('.faq-item');
        animateOnScroll('.product-card');
    },

    initStatsCounter() {
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
    }
};

// ============================================
// UTILITY FUNCTIONS
// ============================================

// Smooth scroll helper
function smoothScrollTo(elementId) {
    const element = document.getElementById(elementId);
    if (element) {
        gsap.to(window, {
            scrollTo: element,
            duration: 1,
            ease: 'power3.inOut'
        });
    }
}

// Format currency
function formatCurrency(amount) {
    return '$' + parseFloat(amount).toFixed(2);
}

// Debounce function
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

// Local storage helpers
const Storage = {
    get(key, defaultValue = null) {
        try {
            const item = localStorage.getItem(key);
            return item ? JSON.parse(item) : defaultValue;
        } catch (e) {
            return defaultValue;
        }
    },

    set(key, value) {
        try {
            localStorage.setItem(key, JSON.stringify(value));
            return true;
        } catch (e) {
            return false;
        }
    },

    remove(key) {
        try {
            localStorage.removeItem(key);
            return true;
        } catch (e) {
            return false;
        }
    }
};

// Console info for testing
console.log('=== Rachna Hub Store Loaded ===');
console.log('Features:');
console.log('  ✓ Shopping Cart');
console.log('  ✓ Theme Toggle (Dark/Light)');
console.log('  ✓ Discord Integration');
console.log('  ✓ Installation Guides');
console.log('  ✓ Reviews System');
console.log('  ✓ GSAP Animations');