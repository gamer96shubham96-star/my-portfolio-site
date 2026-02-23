// ============================================
// RACHNA HUB FULL ECOMMERCE SYSTEM
// ============================================

document.addEventListener("DOMContentLoaded", () => {
    RachnaStore.init();
});

const RachnaStore = {

    cart: [],
    selectedProduct: null,
    storageKey: "rachna_cart",

    // ===============================
    // INIT
    // ===============================

    init() {
        this.loadCart();
        this.initBuyButtons();
        this.initCartUI();
        this.initModal();
        this.initFAQ();
        this.updateCartUI();
    },

    // ===============================
    // BUY BUTTONS
    // ===============================

    initBuyButtons() {
        document.querySelectorAll(".buy-btn").forEach(btn => {
            btn.addEventListener("click", (e) => {
                const card = e.target.closest(".product-card");

                const product = {
                    id: card.dataset.id,
                    name: card.dataset.name,
                    price: parseFloat(card.dataset.price),
                    file: card.dataset.file,
                    quantity: 1
                };

                this.addToCart(product);
            });
        });
    },

    // ===============================
    // CART LOGIC
    // ===============================

    addToCart(product) {
        const existing = this.cart.find(item => item.id === product.id);

        if (existing) {
            existing.quantity++;
        } else {
            this.cart.push(product);
        }

        this.saveCart();
        this.updateCartUI();
        this.animateCart();
    },

    removeFromCart(id) {
        this.cart = this.cart.filter(item => item.id !== id);
        this.saveCart();
        this.updateCartUI();
    },

    updateQuantity(id, amount) {
        const item = this.cart.find(item => item.id === id);
        if (!item) return;

        item.quantity += amount;
        if (item.quantity <= 0) {
            this.removeFromCart(id);
        }

        this.saveCart();
        this.updateCartUI();
    },

    getTotal() {
        return this.cart.reduce((sum, item) => sum + item.price * item.quantity, 0).toFixed(2);
    },

    getItemCount() {
        return this.cart.reduce((sum, item) => sum + item.quantity, 0);
    },

    saveCart() {
        localStorage.setItem(this.storageKey, JSON.stringify(this.cart));
    },

    loadCart() {
        const saved = localStorage.getItem(this.storageKey);
        if (saved) this.cart = JSON.parse(saved);
    },

    // ===============================
    // CART UI
    // ===============================

    initCartUI() {
        const cartWrapper = document.querySelector(".cart-wrapper");

        cartWrapper.addEventListener("click", () => {
            this.toggleCartPreview();
        });
    },

    toggleCartPreview() {
        let preview = document.querySelector(".cart-preview");

        if (!preview) {
            preview = document.createElement("div");
            preview.className = "cart-preview";
            document.querySelector(".cart-wrapper").appendChild(preview);
        }

        preview.classList.toggle("active");
        this.renderCart(preview);
    },

    renderCart(preview) {

        if (this.cart.length === 0) {
            preview.innerHTML = `<p style="padding:20px;text-align:center;">Cart is empty</p>`;
            return;
        }

        preview.innerHTML = `
            <div class="cart-items">
                ${this.cart.map(item => `
                    <div class="cart-item">
                        <div>
                            <strong>${item.name}</strong>
                            <p>$${item.price} x ${item.quantity}</p>
                        </div>
                        <div class="cart-controls">
                            <button onclick="RachnaStore.updateQuantity('${item.id}', -1)">-</button>
                            <button onclick="RachnaStore.updateQuantity('${item.id}', 1)">+</button>
                            <button onclick="RachnaStore.removeFromCart('${item.id}')">x</button>
                        </div>
                    </div>
                `).join("")}
            </div>
            <div class="cart-total">
                Total: $${this.getTotal()}
            </div>
            <button class="checkout-btn">Checkout</button>
        `;

        preview.querySelector(".checkout-btn")
            .addEventListener("click", () => this.openCheckout());
    },

    updateCartUI() {
        const count = document.querySelector(".cart-count");
        count.textContent = this.getItemCount();
        count.classList.toggle("active", this.getItemCount() > 0);
    },

    animateCart() {
        gsap.from(".cart-icon", {
            scale: 1.3,
            duration: 0.3,
            yoyo: true,
            repeat: 1
        });
    },

    // ===============================
    // CHECKOUT MODAL
    // ===============================

    initModal() {
        document.querySelector(".close-modal")
            .addEventListener("click", () => this.closeModal());

        window.addEventListener("click", (e) => {
            if (e.target.id === "paymentModal") {
                this.closeModal();
            }
        });
    },

    openCheckout() {
        if (this.cart.length === 0) return;

        const modal = document.getElementById("paymentModal");
        modal.style.display = "flex";

        document.querySelector(".payment-simulation").style.display = "flex";
        document.querySelector(".success-content").style.display = "none";

        setTimeout(() => {
            this.completePayment();
        }, 2000);
    },

    completePayment() {
        document.querySelector(".payment-simulation").style.display = "none";
        document.querySelector(".success-content").style.display = "block";

        const firstItem = this.cart[0];

        const downloadBtn = document.getElementById("download-link");
        downloadBtn.href = "/downloads/" + firstItem.file;
        downloadBtn.setAttribute("download", firstItem.file);

        this.cart = [];
        this.saveCart();
        this.updateCartUI();
    },

    closeModal() {
        document.getElementById("paymentModal").style.display = "none";
    },

    // ===============================
    // FAQ
    // ===============================

    initFAQ() {
        document.querySelectorAll(".faq-item").forEach(item => {
            item.querySelector(".faq-question").addEventListener("click", () => {
                item.classList.toggle("active");
            });
        });
    }

};