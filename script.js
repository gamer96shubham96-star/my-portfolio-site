/**
 * ═══════════════════════════════════════════════
 * RACHNA HUB — MAIN SCRIPT v3.0
 * Full ecommerce, animations, UI systems
 * ═══════════════════════════════════════════════
 */

'use strict';

/* ─────────────────────────────────────────────
   UTILITIES
───────────────────────────────────────────── */
const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];

function debounce(fn, ms = 100) {
    let t;
    return (...args) => { clearTimeout(t); t = setTimeout(() => fn(...args), ms); };
}

/* ─────────────────────────────────────────────
   LOADER
───────────────────────────────────────────── */
const Loader = {
    el:    $('#loader'),
    bar:   $('#loaderBar'),
    sub:   $('#loaderSub'),

    msgs: [
        'Initializing store...',
        'Loading assets...',
        'Polishing pixels...',
        'Almost there...',
        'Ready!'
    ],

    init() {
        let progress = 0;
        let msgIdx   = 0;

        const tick = setInterval(() => {
            progress += Math.random() * 18 + 8;
            if (progress > 100) progress = 100;

            this.bar.style.width = progress + '%';

            const step = Math.floor((progress / 100) * (this.msgs.length - 1));
            if (step !== msgIdx) {
                msgIdx = step;
                this.sub.textContent = this.msgs[msgIdx];
            }

            if (progress >= 100) {
                clearInterval(tick);
                this.sub.textContent = 'Ready!';
                setTimeout(() => this.hide(), 400);
            }
        }, 120);
    },

    hide() {
        this.el.classList.add('hidden');
        document.body.style.overflow = '';
        // Trigger hero entrance after loader
        Animations.onLoaderDone();
    }
};

/* ─────────────────────────────────────────────
   CURSOR
───────────────────────────────────────────── */
const Cursor = {
    cursor: $('#cursor'),
    trail:  $('#cursorTrail'),
    mx: 0, my: 0,
    tx: 0, ty: 0,
    raf: null,

    init() {
        if (window.matchMedia('(max-width: 768px)').matches) return;

        document.addEventListener('mousemove', e => {
            this.mx = e.clientX;
            this.my = e.clientY;
        });

        this.animate();
    },

    animate() {
        this.cursor.style.transform = `translate(${this.mx}px, ${this.my}px) translate(-50%,-50%)`;

        this.tx += (this.mx - this.tx) * 0.15;
        this.ty += (this.my - this.ty) * 0.15;
        this.trail.style.transform = `translate(${this.tx}px, ${this.ty}px) translate(-50%,-50%)`;

        requestAnimationFrame(() => this.animate());
    }
};

/* ─────────────────────────────────────────────
   THEME MANAGER
───────────────────────────────────────────── */
const Theme = {
    key: 'rachna_theme',

    init() {
        const saved = localStorage.getItem(this.key) || 'dark';
        this.apply(saved);

        $('#themeBtn').addEventListener('click', () => {
            const cur = document.documentElement.dataset.theme || 'dark';
            this.apply(cur === 'dark' ? 'light' : 'dark');
        });
    },

    apply(theme) {
        document.documentElement.dataset.theme = theme;
        localStorage.setItem(this.key, theme);
    }
};

/* ─────────────────────────────────────────────
   NAVBAR
───────────────────────────────────────────── */
const Nav = {
    navbar: $('#navbar'),
    burger: $('#burger'),
    links:  $('#navLinks'),

    init() {
        // Burger toggle
        this.burger.addEventListener('click', () => {
            this.burger.classList.toggle('open');
            this.links.classList.toggle('open');
        });

        // Close on link click
        $$('.nav-link', this.links).forEach(a => {
            a.addEventListener('click', () => {
                this.burger.classList.remove('open');
                this.links.classList.remove('open');
            });
        });

        // Active link on scroll
        const sections = $$('section[id]');
        const update = debounce(() => {
            const mid = window.scrollY + window.innerHeight * 0.4;
            sections.forEach(sec => {
                const top = sec.offsetTop;
                const bot = top + sec.offsetHeight;
                const link = $(`.nav-link[href="#${sec.id}"]`);
                if (link) link.classList.toggle('active', mid >= top && mid < bot);
            });

            // Scroll shadow
            this.navbar.style.boxShadow = window.scrollY > 10
                ? '0 2px 32px rgba(0,0,0,0.3)'
                : '';
        }, 60);

        window.addEventListener('scroll', update, { passive: true });
        update();
    }
};

/* ─────────────────────────────────────────────
   SCROLL REVEAL
───────────────────────────────────────────── */
const Reveal = {
    init() {
        const obs = new IntersectionObserver((entries) => {
            entries.forEach(el => {
                if (el.isIntersecting) {
                    const delay = el.target.dataset.delay || 0;
                    setTimeout(() => el.target.classList.add('visible'), +delay);
                    obs.unobserve(el.target);
                }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });

        $$('.reveal').forEach(el => obs.observe(el));
    }
};

/* ─────────────────────────────────────────────
   STATS COUNTER
───────────────────────────────────────────── */
const Counter = {
    init() {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el  = e.target;
                const end = +el.dataset.count;
                let cur   = 0;
                const step = end / 60;
                const timer = setInterval(() => {
                    cur += step;
                    if (cur >= end) { cur = end; clearInterval(timer); }
                    el.textContent = Math.ceil(cur);
                }, 20);
                obs.unobserve(el);
            });
        }, { threshold: 0.6 });

        $$('.stat-val').forEach(el => obs.observe(el));
    }
};

/* ─────────────────────────────────────────────
   FAQ
───────────────────────────────────────────── */
const FAQ = {
    init() {
        $$('.faq-item').forEach(item => {
            const btn = $('.faq-q', item);
            const ans = $('.faq-a', item);

            btn.addEventListener('click', () => {
                const isOpen = item.classList.contains('open');

                // Close all
                $$('.faq-item').forEach(i => {
                    i.classList.remove('open');
                    $('.faq-a', i).style.maxHeight = '0';
                });

                if (!isOpen) {
                    item.classList.add('open');
                    ans.style.maxHeight = ans.scrollHeight + 'px';
                }
            });
        });
    }
};

/* ─────────────────────────────────────────────
   PRODUCT FILTER
───────────────────────────────────────────── */
const Filter = {
    init() {
        const btns  = $$('.filter-btn');
        const cards = $$('.prod-card');

        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');

                const f = btn.dataset.filter;

                cards.forEach(card => {
                    const show = f === 'all' || card.dataset.category === f;
                    card.style.transition = 'opacity .3s, transform .3s';
                    if (show) {
                        card.style.display = '';
                        requestAnimationFrame(() => {
                            card.style.opacity = '1';
                            card.style.transform = '';
                        });
                    } else {
                        card.style.opacity = '0';
                        card.style.transform = 'scale(0.9)';
                        setTimeout(() => { card.style.display = 'none'; }, 300);
                    }
                });
            });
        });
    }
};

/* ─────────────────────────────────────────────
   TOAST
───────────────────────────────────────────── */
const Toast = {
    el:  $('#toast'),
    msg: $('#toastMsg'),
    timer: null,

    show(text) {
        this.msg.textContent = text;
        this.el.classList.add('show');
        clearTimeout(this.timer);
        this.timer = setTimeout(() => this.el.classList.remove('show'), 2400);
    }
};

/* ─────────────────────────────────────────────
   CART
───────────────────────────────────────────── */
const Cart = {
    key:    'rachna_v3_cart',
    items:  [],
    panel:  $('#cartPanel'),
    mask:   $('#cartMask'),
    badge:  $('#cartBadge'),
    list:   $('#cpItems'),
    total:  $('#cpTotal'),

    init() {
        this.load();
        this.render();
        this.updateBadge();

        // Open / close
        $('#cartBtn').addEventListener('click',  () => this.open());
        $('#cartClose').addEventListener('click', () => this.close());
        this.mask.addEventListener('click',       () => this.close());

        // Checkout
        $('#checkoutBtn').addEventListener('click', () => {
            if (this.items.length === 0) {
                Toast.show('Your cart is empty!');
                return;
            }
            this.close();
            Modal.open(this.items[0]);
        });

        // Add to cart buttons
        document.addEventListener('click', e => {
            const addBtn = e.target.closest('.add-cart-btn');
            const buyBtn = e.target.closest('.buy-now-btn');

            if (addBtn) {
                const card = addBtn.closest('.prod-card');
                this.add(this.cardData(card));
                return;
            }

            if (buyBtn) {
                const card = buyBtn.closest('.prod-card');
                const product = this.cardData(card);
                // Instant buy: set cart to just this item and open checkout
                this.items = [{ ...product, qty: 1 }];
                this.save();
                this.updateBadge();
                Modal.open(product);
            }
        });
    },

    cardData(card) {
        return {
            id:    card.dataset.id,
            name:  card.dataset.name,
            price: parseFloat(card.dataset.price),
            file:  card.dataset.file,
            icon:  card.querySelector('.prod-emoji')?.textContent || '📦'
        };
    },

    add(product) {
        const existing = this.items.find(i => i.id === product.id);
        if (existing) {
            existing.qty++;
        } else {
            this.items.push({ ...product, qty: 1 });
        }
        this.save();
        this.render();
        this.updateBadge();
        Toast.show(`${product.name} added to cart!`);

        // Bounce badge
        this.badge.style.transform = 'scale(1.4)';
        setTimeout(() => this.badge.style.transform = '', 250);
    },

    remove(id) {
        this.items = this.items.filter(i => i.id !== id);
        this.save();
        this.render();
        this.updateBadge();
    },

    setQty(id, delta) {
        const item = this.items.find(i => i.id === id);
        if (!item) return;
        item.qty += delta;
        if (item.qty <= 0) return this.remove(id);
        this.save();
        this.render();
        this.updateBadge();
    },

    clear() {
        this.items = [];
        this.save();
        this.render();
        this.updateBadge();
    },

    getTotal() {
        return this.items.reduce((s, i) => s + i.price * i.qty, 0).toFixed(2);
    },

    getCount() {
        return this.items.reduce((s, i) => s + i.qty, 0);
    },

    save()  { localStorage.setItem(this.key, JSON.stringify(this.items)); },
    load()  {
        try { this.items = JSON.parse(localStorage.getItem(this.key)) || []; }
        catch { this.items = []; }
    },

    updateBadge() {
        const c = this.getCount();
        this.badge.textContent = c;
        this.badge.classList.toggle('show', c > 0);
    },

    render() {
        if (this.items.length === 0) {
            this.list.innerHTML = `
                <div class="cp-empty">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5">
                        <path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/>
                        <line x1="3" y1="6" x2="21" y2="6"/>
                        <path d="M16 10a4 4 0 0 1-8 0"/>
                    </svg>
                    <p>Your cart is empty</p>
                </div>`;
        } else {
            this.list.innerHTML = this.items.map(item => `
                <div class="cp-item" data-id="${item.id}">
                    <div class="cp-item-icon">${item.icon}</div>
                    <div class="cp-item-info">
                        <h4>${item.name}</h4>
                        <span>$${(item.price * item.qty).toFixed(2)}</span>
                    </div>
                    <div class="cp-item-ctrl">
                        <button onclick="Cart.setQty('${item.id}',-1)">−</button>
                        <span>${item.qty}</span>
                        <button onclick="Cart.setQty('${item.id}',1)">+</button>
                        <button class="rm" onclick="Cart.remove('${item.id}')">×</button>
                    </div>
                </div>
            `).join('');
        }

        this.total.textContent = this.getTotal();
    },

    open() {
        this.render();
        this.panel.classList.add('open');
        this.mask.classList.add('show');
        document.body.style.overflow = 'hidden';
    },

    close() {
        this.panel.classList.remove('open');
        this.mask.classList.remove('show');
        document.body.style.overflow = '';
    }
};

/* ─────────────────────────────────────────────
   CHECKOUT MODAL
───────────────────────────────────────────── */
const Modal = {
    wrap:       $('#modal'),
    close_btn:  $('#modalClose'),
    stepProc:   $('#stepProcessing'),
    stepSucc:   $('#stepSuccess'),
    titleEl:    $('#modalTitle'),
    statusEl:   $('#modalStatus'),
    dlLink:     $('#downloadLink'),

    msgs: [
        'Connecting to gateway...',
        'Verifying payment...',
        'Confirming transaction...',
        'Preparing your download...',
        'Almost done...'
    ],

    init() {
        this.close_btn.addEventListener('click', () => this.hide());
        this.wrap.addEventListener('click', e => {
            if (e.target === this.wrap) this.hide();
        });
    },

    open(product) {
        // Reset state
        this.stepProc.classList.remove('hidden');
        this.stepSucc.classList.add('hidden');
        this.titleEl.textContent = `Checkout: ${product.name}`;
        this.statusEl.textContent = this.msgs[0];

        this.wrap.classList.add('show');
        document.body.style.overflow = 'hidden';

        this.runProcess(product);
    },

    runProcess(product) {
        let idx = 0;
        const interval = setInterval(() => {
            idx++;
            if (idx < this.msgs.length) {
                this.statusEl.textContent = this.msgs[idx];
            } else {
                clearInterval(interval);
                setTimeout(() => this.showSuccess(product), 400);
            }
        }, 900);
    },

    showSuccess(product) {
        this.stepProc.classList.add('hidden');
        this.stepSucc.classList.remove('hidden');

        // Set download link
        this.dlLink.href       = `downloads/${product.file}`;
        this.dlLink.setAttribute('download', product.file);

        // Handle download click
        this.dlLink.onclick = (e) => {
            e.preventDefault();
            const a = document.createElement('a');
            a.href     = `downloads/${product.file}`;
            a.download = product.file;
            document.body.appendChild(a);
            a.click();
            document.body.removeChild(a);
        };

        Cart.clear();
    },

    hide() {
        this.wrap.classList.remove('show');
        document.body.style.overflow = '';
    }
};

/* ─────────────────────────────────────────────
   CONTACT FORM
───────────────────────────────────────────── */
const ContactForm = {
    init() {
        const form = $('#contactForm');
        if (!form) return;

        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn  = $('#submitBtn', form);
            const orig = btn.innerHTML;

            btn.innerHTML = '<span>Sending...</span>';
            btn.disabled  = true;

            setTimeout(() => {
                btn.innerHTML = `<span>Message Sent!</span>
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" width="18" height="18"><polyline points="20 6 9 17 4 12"/></svg>`;
                btn.style.background = '#22c55e';
                form.reset();

                setTimeout(() => {
                    btn.innerHTML = orig;
                    btn.style.background = '';
                    btn.disabled = false;
                }, 3500);
            }, 1400);
        });
    }
};

/* ─────────────────────────────────────────────
   GSAP ANIMATIONS (if available)
───────────────────────────────────────────── */
const Animations = {
    ready: false,

    init() {
        if (typeof gsap === 'undefined') return;
        this.ready = true;
        gsap.registerPlugin(ScrollTrigger);
        this.setupProductCards();
    },

    onLoaderDone() {
        if (!this.ready) return;
        // Stagger feature cards on first scroll
        gsap.utils.toArray('.feat-card').forEach((card, i) => {
            gsap.from(card, {
                scrollTrigger: { trigger: card, start: 'top 88%', once: true },
                y: 40, opacity: 0, duration: .6, delay: i % 3 * 0.1, ease: 'power3.out'
            });
        });
    },

    setupProductCards() {
        $$('.prod-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const rect = card.getBoundingClientRect();
                const cx   = (e.clientX - rect.left) / rect.width  - 0.5;
                const cy   = (e.clientY - rect.top)  / rect.height - 0.5;

                gsap.to(card, {
                    rotateX: cy * -6,
                    rotateY: cx *  6,
                    transformPerspective: 800,
                    duration: .3,
                    ease: 'power2.out'
                });
            });

            card.addEventListener('mouseleave', () => {
                gsap.to(card, { rotateX: 0, rotateY: 0, duration: .5, ease: 'elastic.out(1,0.5)' });
            });
        });
    }
};

/* ─────────────────────────────────────────────
   SMOOTH SCROLL (for hero CTA + nav links)
───────────────────────────────────────────── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return;
            e.preventDefault();
            const offset = target.getBoundingClientRect().top + window.scrollY - 72;

            if (typeof gsap !== 'undefined' && typeof ScrollToPlugin !== 'undefined') {
                gsap.to(window, { scrollTo: offset, duration: .9, ease: 'power3.inOut' });
            } else {
                window.scrollTo({ top: offset, behavior: 'smooth' });
            }
        });
    });
}

/* ─────────────────────────────────────────────
   BOOT
───────────────────────────────────────────── */
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden'; // prevent scroll during loader

    Loader.init();
    Cursor.init();
    Theme.init();
    Nav.init();
    Reveal.init();
    Counter.init();
    FAQ.init();
    Filter.init();
    Cart.init();
    Modal.init();
    ContactForm.init();
    initSmoothScroll();

    // GSAP runs after DOMContentLoaded but waits for libs via defer
    window.addEventListener('load', () => {
        Animations.init();
    });

    console.log('%c[RACHNA HUB] Store loaded successfully', 'color:#00f5a0;font-weight:bold;font-size:13px');
});