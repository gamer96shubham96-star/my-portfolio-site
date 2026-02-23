/**
 * Rachna Hub - Additional Features
 * Includes: Shopping Cart, Theme Toggle, Discord Integration,
 * Installation Guides, and Reviews System
 */

document.addEventListener('DOMContentLoaded', () => {
    // Initialize all features
    new ShoppingCart();
    new ThemeManager();
    new DiscordIntegration();
    new InstallationGuides();
    new ProductReviews();
});

// ============================================
// SHOPPING CART SYSTEM
// ============================================
class ShoppingCart {
    constructor() {
        this.items = [];
        this.storageKey = 'rachna_hub_cart';
        this.loadFromStorage();
        this.init();
    }

    init() {
        this.updateCartUI();
        this.bindEvents();
    }

    loadFromStorage() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) {
            this.items = JSON.parse(saved);
        }
    }

    saveToStorage() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.items));
    }

    addItem(product) {
        const existingItem = this.items.find(item => item.id === product.id);
        if (existingItem) {
            existingItem.quantity++;
        } else {
            this.items.push({ ...product, quantity: 1 });
        }
        this.saveToStorage();
        this.updateCartUI();
        
        // Show feedback
        this.showAddedFeedback(product.name);
    }

    removeItem(productId) {
        this.items = this.items.filter(item => item.id !== productId);
        this.saveToStorage();
        this.updateCartUI();
    }

    updateQuantity(productId, quantity) {
        const item = this.items.find(item => item.id === productId);
        if (item) {
            item.quantity = Math.max(1, quantity);
            this.saveToStorage();
            this.updateCartUI();
        }
    }

    getTotal() {
        return this.items.reduce((sum, item) => sum + (item.price * item.quantity), 0);
    }

    getItemCount() {
        return this.items.reduce((sum, item) => sum + item.quantity, 0);
    }

    updateCartUI() {
        const cartCount = document.querySelector('.cart-count');
        const cartWrapper = document.querySelector('.cart-wrapper');
        
        if (cartCount) {
            cartCount.textContent = this.getItemCount();
            if (this.getItemCount() > 0) {
                cartCount.classList.add('active');
            } else {
                cartCount.classList.remove('active');
            }
        }

        if (cartWrapper) {
            this.showCartPreview(cartWrapper);
        }
    }

    showCartPreview(element) {
        let preview = document.querySelector('.cart-preview');
        if (!preview) {
            preview = document.createElement('div');
            preview.className = 'cart-preview';
            element.appendChild(preview);
        }

        if (this.items.length === 0) {
            preview.innerHTML = `
                <div class="cart-preview-header">
                    <h4>Your Cart</h4>
                    <button class="close-preview">×</button>
                </div>
                <div class="cart-preview-items">
                    <p style="text-align: center; color: var(--text-muted); padding: 20px 0;">
                        Your cart is empty
                    </p>
                </div>
            `;
        } else {
            preview.innerHTML = `
                <div class="cart-preview-header">
                    <h4>Your Cart (${this.getItemCount()})</h4>
                    <button class="close-preview">×</button>
                </div>
                <div class="cart-preview-items">
                    ${