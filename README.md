# Luka's Personal Site

Minimal personal website. Pure HTML + CSS, no build tools.

## Structure

```
luka-site/
├── index.html              ← Homepage
├── style.css               ← All styles (Cormorant Garamond)
├── README.md
├── posts/
│   ├── index.html          ← Posts list
│   └── example-post.html   ← Example (delete when ready)
└── projects/
    ├── index.html          ← Projects list
    └── example-project.html ← Example (delete when ready)
```

## Deploy to GitHub Pages

### 1. Create a GitHub repository

Go to https://github.com/new and create a repo named `yourusername.github.io`
(replace `yourusername` with your actual GitHub username).

Set it to **Public**. Do NOT initialize with a README (you already have one).

### 2. Push this site

```bash
cd luka-site
git init
git add .
git commit -m "Initial commit"
git branch -M main
git remote add origin https://github.com/yourusername/yourusername.github.io.git
git push -u origin main
```

### 3. Enable GitHub Pages

Go to your repo → **Settings** → **Pages** → set Source to:
- **Deploy from a branch**
- Branch: `main`
- Folder: `/ (root)`

Click Save. Your site will be live at `https://yourusername.github.io` within a few minutes.

## Adding a new post

1. Copy `posts/example-post.html` → `posts/your-post-name.html`
2. Edit the title, date, reading time, and content
3. Add a new entry in `posts/index.html`:

```html
<div class="list-item">
  <div class="meta">June 2026 · 8 min read</div>
  <h3><a href="your-post-name.html">Your Post Title</a></h3>
  <p>A short description.</p>
</div>
```

4. Commit and push:

```bash
git add .
git commit -m "Add new post: Your Post Title"
git push
```

## Adding a new project

Same as posts, but in the `projects/` folder. Project entries don't need a date.

## Custom domain (optional)

1. Buy a domain (e.g. from Namecheap, Cloudflare, Google Domains)
2. Add a file named `CNAME` in the root with your domain:
   ```
   yourdomain.com
   ```
3. Configure DNS: add a CNAME record pointing to `yourusername.github.io`
4. In repo Settings → Pages, enter your custom domain

## Future: migrating to Hugo

If you want Markdown-based writing and auto-generated list pages later, this structure maps cleanly to Hugo:

- `posts/*.html` → `content/posts/*.md`
- `projects/*.html` → `content/projects/*.md`
- `style.css` → theme CSS
