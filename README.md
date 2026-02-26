# 🌐 Rachna Hub — Vercel Frontend

This folder is your **Vercel deployment** (the website visitors see).

## Files
```
vercel-frontend/
├── index.html     ← Main store page
├── style.css      ← All styles
├── script.js      ← Frontend logic (edit API_BASE here!)
├── vercel.json    ← Vercel config
└── images/        ← Product images & video
```

## ✏️ Step 1 — Set your Railway URL

Open `script.js` and find line ~11:
```js
const API_BASE = 'https://YOUR-RAILWAY-APP.up.railway.app';
```
Replace with your actual Railway URL after deploying the backend.

## 🚀 Step 2 — Deploy to Vercel

**Option A — Drag & Drop (easiest):**
1. Go to [vercel.com](https://vercel.com) → New Project
2. Drag this entire folder onto the page
3. Click Deploy — done!

**Option B — GitHub:**
1. Push this folder to a GitHub repo
2. Import repo on Vercel
3. Deploy

## ✅ That's it!
Your frontend will be live at `https://your-site.vercel.app`
