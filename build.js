const { execSync } = require('child_process');
const fs = require('fs');
const path = require('path');

console.log('🚀 Building MEMS D-AMP Blog...\n');

// Step 1: Build Tailwind CSS
console.log('📦 Building Tailwind CSS...');
try {
    execSync('npx tailwindcss -i ./src/css/tailwind.css -o ./src/css/styles.css --minify', { stdio: 'inherit' });
    console.log('✅ Tailwind CSS built successfully\n');
} catch (error) {
    console.error('❌ Error building Tailwind CSS:', error.message);
    process.exit(1);
}

// Step 2: Build Eleventy site
console.log('🏗️ Building Eleventy site...');
try {
    execSync('npx @11ty/eleventy', { stdio: 'inherit' });
    console.log('✅ Eleventy site built successfully\n');
} catch (error) {
    console.error('❌ Error building Eleventy site:', error.message);
    process.exit(1);
}

// Step 3: Copy compiled CSS to _site
console.log('📁 Copying compiled CSS...');
try {
    const cssSource = path.join(__dirname, 'src', 'css', 'styles.css');
    const cssDest = path.join(__dirname, '_site', 'css', 'styles.css');
    
    // Ensure css directory exists
    const cssDir = path.dirname(cssDest);
    if (!fs.existsSync(cssDir)) {
        fs.mkdirSync(cssDir, { recursive: true });
    }
    
    fs.copyFileSync(cssSource, cssDest);
    console.log('✅ CSS copied to _site successfully\n');
} catch (error) {
    console.error('❌ Error copying CSS:', error.message);
    process.exit(1);
}

// Step 4: Copy JavaScript files
console.log('📁 Copying JavaScript files...');
try {
    const jsSource = path.join(__dirname, 'src', 'js');
    const jsDest = path.join(__dirname, '_site', 'js');
    
    // Ensure js directory exists
    if (!fs.existsSync(jsDest)) {
        fs.mkdirSync(jsDest, { recursive: true });
    }
    
    // Copy all JS files
    const jsFiles = fs.readdirSync(jsSource);
    jsFiles.forEach(file => {
        if (file.endsWith('.js')) {
            fs.copyFileSync(
                path.join(jsSource, file),
                path.join(jsDest, file)
            );
        }
    });
    console.log('✅ JavaScript files copied successfully\n');
} catch (error) {
    console.error('❌ Error copying JavaScript files:', error.message);
    process.exit(1);
}

// Step 5: Copy assets
console.log('📁 Copying assets...');
try {
    const assetsSource = path.join(__dirname, 'src', 'assets');
    const assetsDest = path.join(__dirname, '_site', 'assets');
    
    if (fs.existsSync(assetsSource)) {
        if (!fs.existsSync(assetsDest)) {
            fs.mkdirSync(assetsDest, { recursive: true });
        }
        
        // Copy all assets
        const copyRecursive = (src, dest) => {
            const items = fs.readdirSync(src);
            items.forEach(item => {
                const srcPath = path.join(src, item);
                const destPath = path.join(dest, item);
                
                if (fs.statSync(srcPath).isDirectory()) {
                    if (!fs.existsSync(destPath)) {
                        fs.mkdirSync(destPath, { recursive: true });
                    }
                    copyRecursive(srcPath, destPath);
                } else {
                    fs.copyFileSync(srcPath, destPath);
                }
            });
        };
        
        copyRecursive(assetsSource, assetsDest);
        console.log('✅ Assets copied successfully\n');
    } else {
        console.log('ℹ️ No assets directory found, skipping...\n');
    }
} catch (error) {
    console.error('❌ Error copying assets:', error.message);
    process.exit(1);
}

console.log('🎉 Build completed successfully!');
console.log('📂 Site built in: _site/');
console.log('🌐 To serve locally: npm run serve');
console.log('🚀 To deploy: Upload _site/ contents to your hosting platform'); 