# Deployment Guide

This guide covers deploying the MEMS D-AMP Blog to various hosting platforms.

## 🚀 Quick Start

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Test locally**
   ```bash
   npm run serve
   ```

3. **Deploy to your chosen platform**

## 📦 GitHub Pages

### Option 1: GitHub Actions (Recommended)

1. **Create `.github/workflows/deploy.yml`**
   ```yaml
   name: Deploy to GitHub Pages
   
   on:
     push:
       branches: [ main ]
   
   jobs:
     build-and-deploy:
       runs-on: ubuntu-latest
       steps:
         - name: Checkout
           uses: actions/checkout@v3
   
         - name: Setup Node.js
           uses: actions/setup-node@v3
           with:
             node-version: '18'
   
         - name: Install dependencies
           run: npm install
   
         - name: Build site
           run: npm run build
   
         - name: Deploy to GitHub Pages
           uses: peaceiris/actions-gh-pages@v3
           with:
             github_token: ${{ secrets.GITHUB_TOKEN }}
             publish_dir: ./_site
   ```

2. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to "Deploy from a branch"
   - Select `gh-pages` branch
   - Save

### Option 2: Manual Deployment

1. **Build the site**
   ```bash
   npm run build
   ```

2. **Create gh-pages branch**
   ```bash
   git checkout -b gh-pages
   git add _site
   git commit -m "Deploy site"
   git push origin gh-pages
   ```

3. **Enable GitHub Pages**
   - Go to repository Settings → Pages
   - Set source to `gh-pages` branch
   - Save

## 🌐 Netlify

1. **Connect to GitHub**
   - Sign up/login to Netlify
   - Click "New site from Git"
   - Connect your GitHub account
   - Select your repository

2. **Configure build settings**
   - Build command: `npm run build`
   - Publish directory: `_site`
   - Click "Deploy site"

3. **Custom domain (optional)**
   - Go to Site settings → Domain management
   - Add your custom domain
   - Follow DNS instructions

## ⚡ Vercel

1. **Import project**
   - Sign up/login to Vercel
   - Click "New Project"
   - Import your GitHub repository

2. **Configure build settings**
   - Framework Preset: Other
   - Build Command: `npm run build`
   - Output Directory: `_site`
   - Click "Deploy"

3. **Custom domain (optional)**
   - Go to Project settings → Domains
   - Add your custom domain

## 🔥 Firebase Hosting

1. **Install Firebase CLI**
   ```bash
   npm install -g firebase-tools
   ```

2. **Initialize Firebase**
   ```bash
   firebase login
   firebase init hosting
   ```

3. **Configure firebase.json**
   ```json
   {
     "hosting": {
       "public": "_site",
       "ignore": [
         "firebase.json",
         "**/.*",
         "**/node_modules/**"
       ],
       "rewrites": [
         {
           "source": "**",
           "destination": "/index.html"
         }
       ]
     }
   }
   ```

4. **Deploy**
   ```bash
   npm run build
   firebase deploy
   ```

## 🐳 Docker Deployment

1. **Create Dockerfile**
   ```dockerfile
   FROM node:18-alpine
   
   WORKDIR /app
   
   COPY package*.json ./
   RUN npm install
   
   COPY . .
   RUN npm run build
   
   FROM nginx:alpine
   COPY --from=0 /app/_site /usr/share/nginx/html
   COPY nginx.conf /etc/nginx/nginx.conf
   
   EXPOSE 80
   CMD ["nginx", "-g", "daemon off;"]
   ```

2. **Create nginx.conf**
   ```nginx
   events {
     worker_connections 1024;
   }
   
   http {
     include /etc/nginx/mime.types;
     default_type application/octet-stream;
   
     server {
       listen 80;
       server_name localhost;
       root /usr/share/nginx/html;
       index index.html;
   
       location / {
         try_files $uri $uri/ /index.html;
       }
     }
   }
   ```

3. **Build and run**
   ```bash
   docker build -t mems-damp-blog .
   docker run -p 80:80 mems-damp-blog
   ```

## 🔧 Environment Variables

For different environments, you can set these variables:

```bash
# Development
NODE_ENV=development

# Production
NODE_ENV=production
GOOGLE_ANALYTICS_ID=GA_MEASUREMENT_ID
```

## 📊 Analytics Setup

1. **Google Analytics**
   - Create a Google Analytics account
   - Get your Measurement ID
   - Replace `GA_MEASUREMENT_ID` in `src/_layouts/base.njk`

2. **Custom Analytics**
   - Add your tracking code to `src/_layouts/base.njk`
   - Or create a separate analytics include file

## 🔒 Security Headers

For better security, add these headers to your hosting configuration:

```http
X-Content-Type-Options: nosniff
X-Frame-Options: DENY
X-XSS-Protection: 1; mode=block
Referrer-Policy: strict-origin-when-cross-origin
```

## 🚨 Troubleshooting

### Common Issues

1. **Build fails**
   - Check Node.js version (requires 16+)
   - Clear node_modules and reinstall: `rm -rf node_modules && npm install`
   - Check for syntax errors in templates

2. **CSS not loading**
   - Ensure Tailwind CSS is built: `npm run build:css:prod`
   - Check file paths in `src/_layouts/base.njk`

3. **Images not showing**
   - Verify image paths are correct
   - Check if images are copied to `_site` directory

4. **Search not working**
   - Ensure Fuse.js is loaded
   - Check browser console for JavaScript errors

### Performance Optimization

1. **Minify assets**
   - CSS is already minified by Tailwind
   - Consider minifying JavaScript for production

2. **Image optimization**
   - Use WebP format where possible
   - Compress images before adding to assets

3. **Caching**
   - Set appropriate cache headers
   - Use CDN for static assets

## 📞 Support

For deployment issues:
- Check the hosting platform's documentation
- Review build logs for errors
- Contact the D-AMP team for assistance

---

**Happy Deploying! 🚀** 