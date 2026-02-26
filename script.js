/**
 * ═══════════════════════════════════════════════
 * RACHNA HUB — MAIN SCRIPT v4.0
 * ✅ Cart fixed — badge = unique items, downloads ALL files
 * ✅ No backend needed — 100% frontend
 * ✅ New: Search, Wishlist, Ticker, Chat Bubble
 * ═══════════════════════════════════════════════
 */

'use strict';

const $ = (sel, ctx = document) => ctx.querySelector(sel);
const $$ = (sel, ctx = document) => [...ctx.querySelectorAll(sel)];
function debounce(fn, ms = 100) { let t; return (...a) => { clearTimeout(t); t = setTimeout(() => fn(...a), ms); }; }

/* ── LOADER ── */
const Loader = {
    el: $('#loader'), bar: $('#loaderBar'), sub: $('#loaderSub'),
    msgs: ['Initializing store...','Loading assets...','Polishing pixels...','Almost there...','Ready!'],
    init() {
        let progress = 0, msgIdx = 0;
        const tick = setInterval(() => {
            progress += Math.random() * 18 + 8;
            if (progress > 100) progress = 100;
            this.bar.style.width = progress + '%';
            const step = Math.floor((progress / 100) * (this.msgs.length - 1));
            if (step !== msgIdx) { msgIdx = step; this.sub.textContent = this.msgs[msgIdx]; }
            if (progress >= 100) { clearInterval(tick); this.sub.textContent = 'Ready!'; setTimeout(() => this.hide(), 400); }
        }, 120);
    },
    hide() { this.el.classList.add('hidden'); document.body.style.overflow = ''; Animations.onLoaderDone(); }
};

/* ── CURSOR ── */
const Cursor = {
    cursor: $('#cursor'), trail: $('#cursorTrail'), mx:0, my:0, tx:0, ty:0,
    init() {
        if (window.matchMedia('(max-width:768px)').matches) return;
        document.addEventListener('mousemove', e => { this.mx = e.clientX; this.my = e.clientY; });
        this.animate();
    },
    animate() {
        this.cursor.style.transform = `translate(${this.mx}px,${this.my}px) translate(-50%,-50%)`;
        this.tx += (this.mx - this.tx) * 0.15; this.ty += (this.my - this.ty) * 0.15;
        this.trail.style.transform = `translate(${this.tx}px,${this.ty}px) translate(-50%,-50%)`;
        requestAnimationFrame(() => this.animate());
    }
};

/* ── THEME ── */
const Theme = {
    key: 'rachna_theme',
    init() {
        this.apply(localStorage.getItem(this.key) || 'dark');
        $('#themeBtn').addEventListener('click', () => this.apply(document.documentElement.dataset.theme === 'dark' ? 'light' : 'dark'));
    },
    apply(t) { document.documentElement.dataset.theme = t; localStorage.setItem(this.key, t); }
};

/* ── NAVBAR ── */
const Nav = {
    init() {
        const burger = $('#burger'), links = $('#navLinks'), navbar = $('#navbar');
        burger.addEventListener('click', () => { burger.classList.toggle('open'); links.classList.toggle('open'); });
        $$('.nav-link', links).forEach(a => a.addEventListener('click', () => { burger.classList.remove('open'); links.classList.remove('open'); }));
        const sections = $$('section[id]');
        const update = debounce(() => {
            const mid = window.scrollY + window.innerHeight * 0.4;
            sections.forEach(sec => {
                const link = $(`.nav-link[href="#${sec.id}"]`);
                if (link) link.classList.toggle('active', mid >= sec.offsetTop && mid < sec.offsetTop + sec.offsetHeight);
            });
            navbar.style.boxShadow = window.scrollY > 10 ? '0 2px 32px rgba(0,0,0,0.3)' : '';
        }, 60);
        window.addEventListener('scroll', update, { passive: true });
        update();
    }
};

/* ── SCROLL REVEAL ── */
const Reveal = {
    init() {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(el => {
                if (el.isIntersecting) { setTimeout(() => el.target.classList.add('visible'), +(el.target.dataset.delay||0)); obs.unobserve(el.target); }
            });
        }, { threshold: 0.12, rootMargin: '0px 0px -40px 0px' });
        $$('.reveal').forEach(el => obs.observe(el));
    }
};

/* ── STATS COUNTER ── */
const Counter = {
    init() {
        const obs = new IntersectionObserver(entries => {
            entries.forEach(e => {
                if (!e.isIntersecting) return;
                const el = e.target, end = +el.dataset.count; let cur = 0;
                const t = setInterval(() => { cur += end/60; if (cur >= end) { cur = end; clearInterval(t); } el.textContent = Math.ceil(cur); }, 20);
                obs.unobserve(el);
            });
        }, { threshold: 0.6 });
        $$('.stat-val').forEach(el => obs.observe(el));
    }
};

/* ── FAQ ── */
const FAQ = {
    init() {
        $$('.faq-item').forEach(item => {
            $('.faq-q', item).addEventListener('click', () => {
                const isOpen = item.classList.contains('open');
                $$('.faq-item').forEach(i => { i.classList.remove('open'); $('.faq-a', i).style.maxHeight = '0'; });
                if (!isOpen) { item.classList.add('open'); $('.faq-a', item).style.maxHeight = $('.faq-a', item).scrollHeight + 'px'; }
            });
        });
    }
};

/* ── PRODUCT FILTER ── */
const Filter = {
    init() {
        const btns = $$('.filter-btn'), cards = $$('.prod-card');
        btns.forEach(btn => {
            btn.addEventListener('click', () => {
                btns.forEach(b => b.classList.remove('active'));
                btn.classList.add('active');
                const f = btn.dataset.filter;
                cards.forEach(card => {
                    const show = f === 'all' || card.dataset.category === f;
                    card.style.transition = 'opacity .3s, transform .3s';
                    if (show) { card.style.display=''; requestAnimationFrame(() => { card.style.opacity='1'; card.style.transform=''; }); }
                    else { card.style.opacity='0'; card.style.transform='scale(0.9)'; setTimeout(() => { card.style.display='none'; }, 300); }
                });
            });
        });
    }
};

/* ── TOAST ── */
const Toast = {
    el: $('#toast'), msg: $('#toastMsg'), timer: null,
    show(text) { this.msg.textContent = text; this.el.classList.add('show'); clearTimeout(this.timer); this.timer = setTimeout(() => this.el.classList.remove('show'), 2400); }
};

/* ── WISHLIST ── */
const Wishlist = {
    key: 'rachna_wishlist',
    items: [],
    init() {
        try { this.items = JSON.parse(localStorage.getItem(this.key)) || []; } catch { this.items = []; }
        this.renderButtons();
        document.addEventListener('click', e => {
            const btn = e.target.closest('.wish-btn');
            if (!btn) return;
            const card = btn.closest('.prod-card');
            this.toggle(card.dataset.id, btn, card.dataset.name);
        });
    },
    toggle(id, btn, name) {
        const idx = this.items.indexOf(id);
        if (idx === -1) { this.items.push(id); btn.classList.add('wished'); Toast.show(`❤️ ${name} wishlisted!`); }
        else { this.items.splice(idx, 1); btn.classList.remove('wished'); Toast.show(`Removed from wishlist`); }
        localStorage.setItem(this.key, JSON.stringify(this.items));
        btn.innerHTML = this.heartSVG(this.items.includes(id));
    },
    heartSVG(filled) { return `<svg viewBox="0 0 24 24" fill="${filled?'currentColor':'none'}" stroke="currentColor" stroke-width="2"><path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/></svg>`; },
    renderButtons() {
        $$('.prod-card').forEach(card => {
            const id = card.dataset.id, top = $('.prod-top', card);
            if (!top || $('.wish-btn', card)) return;
            const btn = document.createElement('button');
            btn.className = 'wish-btn' + (this.items.includes(id) ? ' wished' : '');
            btn.title = 'Wishlist'; btn.innerHTML = this.heartSVG(this.items.includes(id));
            top.appendChild(btn);
        });
    }
};

/* ── SEARCH ── */
const Search = {
    init() {
        const actions = $('.nav-actions');
        if (!actions) return;
        const wrapper = document.createElement('div');
        wrapper.className = 'search-wrap';
        wrapper.innerHTML = `
            <button class="search-toggle" id="searchToggle" title="Search (/)">
                <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><circle cx="11" cy="11" r="8"/><line x1="21" y1="21" x2="16.65" y2="16.65"/></svg>
            </button>
            <div class="search-box" id="searchBox">
                <input type="text" placeholder="Search products… (press / )" id="searchInput" autocomplete="off">
                <div class="search-results" id="searchResults"></div>
            </div>`;
        actions.prepend(wrapper);

        const input = $('#searchInput'), box = $('#searchBox'), results = $('#searchResults');

        $('#searchToggle').addEventListener('click', () => { box.classList.toggle('open'); if (box.classList.contains('open')) input.focus(); });
        input.addEventListener('input', debounce(() => this.search(input.value.trim(), results), 180));
        document.addEventListener('click', e => { if (!wrapper.contains(e.target)) box.classList.remove('open'); });
        document.addEventListener('keydown', e => {
            if (e.key === '/' && document.activeElement.tagName !== 'INPUT' && document.activeElement.tagName !== 'TEXTAREA') { e.preventDefault(); box.classList.add('open'); input.focus(); }
            if (e.key === 'Escape') box.classList.remove('open');
        });
    },
    search(query, resultsEl) {
        if (!query) { resultsEl.innerHTML = ''; resultsEl.classList.remove('show'); return; }
        const q = query.toLowerCase();
        const matches = $$('.prod-card').filter(c => (c.dataset.name||'').toLowerCase().includes(q) || ($('.prod-type', c)?.textContent||'').toLowerCase().includes(q) || ($('.prod-desc', c)?.textContent||'').toLowerCase().includes(q));
        resultsEl.innerHTML = matches.length === 0
            ? `<div class="sr-empty">No results for "<strong>${query}</strong>"</div>`
            : matches.map(c => `<div class="sr-item" data-id="${c.dataset.id}"><span class="sr-icon">${($('.prod-emoji',c)||{textContent:'📦'}).textContent}</span><div><strong>${c.dataset.name}</strong><span>$${parseFloat(c.dataset.price).toFixed(2)}</span></div></div>`).join('');
        resultsEl.querySelectorAll('.sr-item').forEach(item => {
            item.addEventListener('click', () => {
                const card = $$(`.prod-card[data-id="${item.dataset.id}"]`)[0];
                if (card) { card.scrollIntoView({ behavior:'smooth', block:'center' }); card.style.outline = '2px solid var(--green)'; setTimeout(() => card.style.outline='', 1800); }
                $('#searchBox').classList.remove('open');
            });
        });
        resultsEl.classList.add('show');
    }
};

/* ── ANNOUNCEMENT TICKER ── */
const Ticker = {
    msgs: [
        '🎉 New product dropping soon — Lucky Blocks v2!',
        '⚡ All datapacks tested on Minecraft 1.21',
        '💬 Join our Discord for exclusive discounts!',
        '🔥 Grass Drops OP Items — most downloaded this week!',
        '✅ Instant download after checkout — no waiting',
    ],
    init() {
        const ticker = document.createElement('div');
        ticker.className = 'ticker-wrap';
        ticker.innerHTML = `<div class="ticker-label">NEWS</div><div class="ticker-track"><div class="ticker-inner">${[...this.msgs,...this.msgs].map(m=>`<span class="ticker-item">${m}</span>`).join('')}</div></div><button class="ticker-close" title="Close">×</button>`;
        const navbar = $('#navbar');
        if (navbar && navbar.nextSibling) navbar.parentNode.insertBefore(ticker, navbar.nextSibling);
        ticker.querySelector('.ticker-close').addEventListener('click', () => ticker.remove());
    }
};

/* ── CHAT BUBBLE ── */
const ChatBubble = {
    init() {
        const bubble = document.createElement('div');
        bubble.className = 'chat-bubble';
        bubble.innerHTML = `
            <button class="chat-btn" id="chatBubbleBtn" title="Chat with us">
                <svg viewBox="0 0 24 24" fill="currentColor"><path d="M20.317 4.492c-1.53-.69-3.17-1.2-4.885-1.49a.075.075 0 0 0-.079.036c-.21.369-.444.85-.608 1.23a18.566 18.566 0 0 0-5.487 0 12.36 12.36 0 0 0-.617-1.23A.077.077 0 0 0 8.562 3c-1.714.29-3.354.8-4.885 1.491a.07.07 0 0 0-.032.027C.533 9.093-.32 13.555.099 17.961a.08.08 0 0 0 .031.055 20.03 20.03 0 0 0 5.993 2.98.078.078 0 0 0 .084-.026c.462-.62.874-1.275 1.226-1.963a.074.074 0 0 0-.041-.104 13.201 13.201 0 0 1-1.872-.878.075.075 0 0 1-.008-.125c.126-.093.252-.19.372-.287a.075.075 0 0 1 .078-.01c3.927 1.764 8.18 1.764 12.061 0a.075.075 0 0 1 .079.009c.12.098.245.195.372.288a.075.075 0 0 1-.006.125c-.598.344-1.22.635-1.873.877a.075.075 0 0 0-.041.105c.36.687.772 1.341 1.225 1.962a.077.077 0 0 0 .084.028 19.963 19.963 0 0 0 6.002-2.981.076.076 0 0 0 .032-.054c.5-5.094-.838-9.52-3.549-13.442a.06.06 0 0 0-.031-.028z"/></svg>
                <span class="chat-pulse"></span>
            </button>
            <div class="chat-popup" id="chatPopup">
                <div class="chat-popup-head">
                    <div class="chat-avatar">RH</div>
                    <div><strong>Rachna Hub Support</strong><span class="chat-status"><span class="pulse-dot"></span> Online now</span></div>
                    <button class="chat-popup-close" id="chatClose">×</button>
                </div>
                <div class="chat-popup-body">
                    <p>👋 Hey! Need help or have a question?</p>
                    <p>We're active on Discord — reply in minutes!</p>
                </div>
                <a href="https://discord.gg/8Hj8p8cvBz" target="_blank" class="chat-popup-cta">Open Discord →</a>
            </div>`;
        document.body.appendChild(bubble);
        const popup = $('#chatPopup');
        setTimeout(() => popup.classList.add('show'), 8000);
        $('#chatBubbleBtn').addEventListener('click', () => popup.classList.toggle('show'));
        $('#chatClose').addEventListener('click', e => { e.stopPropagation(); popup.classList.remove('show'); });
    }
};

/* ── CART ─────────────────────────────────────
   ✅ FIXED: badge = unique products in cart
   ✅ FIXED: checkout triggers download for ALL items
─────────────────────────────────────────────── */
const Cart = {
    key: 'rachna_v4_cart', items: [],
    panel: $('#cartPanel'), mask: $('#cartMask'), badge: $('#cartBadge'), list: $('#cpItems'), total: $('#cpTotal'),

    init() {
        this.load(); this.render(); this.updateBadge();
        $('#cartBtn').addEventListener('click', () => this.open());
        $('#cartClose').addEventListener('click', () => this.close());
        this.mask.addEventListener('click', () => this.close());
        $('#checkoutBtn').addEventListener('click', () => {
            if (!this.items.length) { Toast.show('Your cart is empty!'); return; }
            this.close();
            Modal.open(this.items); // ✅ all items passed
        });
        document.addEventListener('click', e => {
            const addBtn = e.target.closest('.add-cart-btn');
            const buyBtn = e.target.closest('.buy-now-btn');
            if (addBtn) { this.add(this.cardData(addBtn.closest('.prod-card'))); return; }
            if (buyBtn) { Modal.open([this.cardData(buyBtn.closest('.prod-card'))]); } // ✅ buy now = instant single download
        });
    },

    cardData(card) { return { id: card.dataset.id, name: card.dataset.name, price: parseFloat(card.dataset.price), file: card.dataset.file, icon: $('.prod-emoji', card)?.textContent || '📦' }; },

    add(product) {
        if (this.items.find(i => i.id === product.id)) { Toast.show(`${product.name} already in cart!`); return; }
        this.items.push({ ...product, qty: 1 });
        this.save(); this.render(); this.updateBadge();
        Toast.show(`${product.name} added!`);
        this.badge.style.transform = 'scale(1.4)';
        setTimeout(() => this.badge.style.transform = '', 250);
    },

    remove(id) { this.items = this.items.filter(i => i.id !== id); this.save(); this.render(); this.updateBadge(); },
    clear()     { this.items = []; this.save(); this.render(); this.updateBadge(); },
    getTotal()  { return this.items.reduce((s,i) => s + i.price, 0).toFixed(2); },
    getCount()  { return this.items.length; }, // ✅ unique items count

    save() { localStorage.setItem(this.key, JSON.stringify(this.items)); },
    load() { try { this.items = JSON.parse(localStorage.getItem(this.key)) || []; } catch { this.items = []; } },

    updateBadge() { const c = this.getCount(); this.badge.textContent = c; this.badge.classList.toggle('show', c > 0); },

    render() {
        this.list.innerHTML = !this.items.length
            ? `<div class="cp-empty"><svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="1.5"><path d="M6 2L3 6v14a2 2 0 0 0 2 2h14a2 2 0 0 0 2-2V6l-3-4z"/><line x1="3" y1="6" x2="21" y2="6"/><path d="M16 10a4 4 0 0 1-8 0"/></svg><p>Your cart is empty</p></div>`
            : this.items.map(item => `
                <div class="cp-item" data-id="${item.id}">
                    <div class="cp-item-icon">${item.icon}</div>
                    <div class="cp-item-info"><h4>${item.name}</h4><span>$${item.price.toFixed(2)}</span></div>
                    <div class="cp-item-ctrl"><button class="rm" onclick="Cart.remove('${item.id}')">×</button></div>
                </div>`).join('');
        this.total.textContent = this.getTotal();
    },

    open()  { this.render(); this.panel.classList.add('open'); this.mask.classList.add('show'); document.body.style.overflow = 'hidden'; },
    close() { this.panel.classList.remove('open'); this.mask.classList.remove('show'); document.body.style.overflow = ''; }
};

/* ── CHECKOUT MODAL ────────────────────────────
   ✅ FIXED: shows one Download button per item
   ✅ No backend — direct file links
─────────────────────────────────────────────── */
const Modal = {
    wrap: $('#modal'), closeBtn: $('#modalClose'), stepProc: $('#stepProcessing'),
    stepSucc: $('#stepSuccess'), titleEl: $('#modalTitle'), statusEl: $('#modalStatus'), dlLink: $('#downloadLink'),
    msgs: ['Verifying order...','Preparing your files...','Packaging downloads...','Almost ready...','Done!'],

    init() {
        this.closeBtn.addEventListener('click', () => this.hide());
        this.wrap.addEventListener('click', e => { if (e.target === this.wrap) this.hide(); });
    },

    open(items) {
        // Clean up previous download buttons
        const old = $('#stepSuccess .dl-buttons');
        if (old) old.remove();
        if (this.dlLink) this.dlLink.style.display = 'none';

        this.stepProc.classList.remove('hidden');
        this.stepSucc.classList.add('hidden');
        this.titleEl.textContent = items.length === 1 ? `Checkout: ${items[0].name}` : `Checkout: ${items.length} items`;
        this.statusEl.textContent = this.msgs[0];
        this.wrap.classList.add('show');
        document.body.style.overflow = 'hidden';

        // Animate msgs then show success
        let idx = 0;
        const t = setInterval(() => {
            idx++;
            if (idx < this.msgs.length) { this.statusEl.textContent = this.msgs[idx]; }
            else { clearInterval(t); setTimeout(() => this.showSuccess(items), 300); }
        }, 650);
    },

    showSuccess(items) {
        this.stepProc.classList.add('hidden');
        this.stepSucc.classList.remove('hidden');

        // Build one download button per file
        const wrap = document.createElement('div');
        wrap.className = 'dl-buttons';
        items.forEach(item => {
            const a = document.createElement('a');
            a.href = `downloads/${item.file}`;
            a.download = item.file;
            a.className = 'btn-download';
            a.innerHTML = `<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/><polyline points="7 10 12 15 17 10"/><line x1="12" y1="15" x2="12" y2="3"/></svg> Download ${item.name}`;
            wrap.appendChild(a);
        });
        $('#stepSuccess').appendChild(wrap);

        Cart.clear();
        Toast.show(items.length > 1 ? `${items.length} files ready!` : `${items[0].name} ready!`);
    },

    hide() {
        this.wrap.classList.remove('show');
        document.body.style.overflow = '';
        const old = $('#stepSuccess .dl-buttons');
        if (old) old.remove();
        if (this.dlLink) this.dlLink.style.display = '';
    }
};

/* ── CONTACT FORM ── */
const ContactForm = {
    init() {
        const form = $('#contactForm');
        if (!form) return;
        form.addEventListener('submit', e => {
            e.preventDefault();
            const btn = $('#submitBtn', form), orig = btn.innerHTML;
            btn.innerHTML = '<span>Sending...</span>'; btn.disabled = true;
            setTimeout(() => {
                btn.innerHTML = `<span>Sent! ✓</span>`; btn.style.background = '#22c55e'; form.reset();
                Toast.show("Message sent! We'll reply on Discord soon.");
                setTimeout(() => { btn.innerHTML = orig; btn.style.background = ''; btn.disabled = false; }, 3500);
            }, 1200);
        });
    }
};

/* ── GSAP ANIMATIONS ── */
const Animations = {
    ready: false,
    init() {
        if (typeof gsap === 'undefined') return;
        this.ready = true; gsap.registerPlugin(ScrollTrigger);
        $$('.prod-card').forEach(card => {
            card.addEventListener('mousemove', e => {
                const r = card.getBoundingClientRect();
                gsap.to(card, { rotateX: ((e.clientY-r.top)/r.height-0.5)*-6, rotateY: ((e.clientX-r.left)/r.width-0.5)*6, transformPerspective: 800, duration: .3, ease: 'power2.out' });
            });
            card.addEventListener('mouseleave', () => gsap.to(card, { rotateX:0, rotateY:0, duration:.5, ease:'elastic.out(1,0.5)' }));
        });
    },
    onLoaderDone() {
        if (!this.ready) return;
        gsap.utils.toArray('.feat-card').forEach((card, i) => {
            gsap.from(card, { scrollTrigger: { trigger: card, start: 'top 88%', once: true }, y:40, opacity:0, duration:.6, delay: i%3*0.1, ease:'power3.out' });
        });
    }
};

/* ── SMOOTH SCROLL ── */
function initSmoothScroll() {
    document.querySelectorAll('a[href^="#"]').forEach(a => {
        a.addEventListener('click', e => {
            const target = document.querySelector(a.getAttribute('href'));
            if (!target) return; e.preventDefault();
            window.scrollTo({ top: target.getBoundingClientRect().top + window.scrollY - 72, behavior: 'smooth' });
        });
    });
}

/* ── BOOT ── */
document.addEventListener('DOMContentLoaded', () => {
    document.body.style.overflow = 'hidden';
    Loader.init(); Cursor.init(); Theme.init(); Nav.init(); Reveal.init(); Counter.init();
    FAQ.init(); Filter.init(); Cart.init(); Modal.init(); ContactForm.init();
    Wishlist.init(); Search.init(); Ticker.init(); ChatBubble.init();
    initSmoothScroll();
    window.addEventListener('load', () => Animations.init());
    console.log('%c[RACHNA HUB v4] ✓', 'color:#00f5a0;font-weight:bold;font-size:13px');
});
