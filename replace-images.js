const fs = require('fs');
const path = require('path');

// Image mappings from Unsplash to Cloudinary
const imageMap = {
  'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_1920/mobile-fix-hero.jpg',
  'https://images.unsplash.com/photo-1511974212900-3548856b1d24': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_800/phone-repair-service.jpg',
  'https://images.unsplash.com/photo-1598327105666-5b89351aff97': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_800/tablet-repair-service.jpg',
  'https://images.unsplash.com/photo-1517336714731-489689fd1ca8': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_800/laptop-repair-service.jpg',
  'https://images.unsplash.com/photo-1484788984921-03950022c9ef': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_800/computer-repair-service.jpg',
  'https://images.unsplash.com/photo-1556656793-08538906a9f8': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_800/data-recovery-service.jpg',
  'https://images.unsplash.com/photo-1519389950473-47ba0277781c': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_800/gaming-console-repair.jpg',
  'https://images.unsplash.com/photo-1530893609608-32a9af3aa95c': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_1200/blog-screen-repair.jpg',
  'https://images.unsplash.com/photo-1609921212029-bb5a28e60960': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_1200/blog-battery-replacement.jpg',
  'https://images.unsplash.com/photo-1550751827-4bd374c3f58b': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_1200/blog-water-damage.jpg',
  'https://images.unsplash.com/photo-1592899677977-9c10ca588bbd': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_1200/blog-choose-repair-shop.jpg',
  'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_1200/blog-phone-maintenance.jpg',
  'https://images.unsplash.com/photo-1533093818801-e9b0b5f84d69': 'https://res.cloudinary.com/ddbfcnajs/image/upload/f_auto,q_auto,w_1200/blog-upgrade-vs-repair.jpg'
};

// Files to update
const filesToUpdate = [
  'index.html',
  'services.html',
  'blog.html',
  'about.html',
  'contact.html',
  'js/blog-posts.js'
];

console.log('🔄 Starting image replacement...\n');

filesToUpdate.forEach(file => {
  const filePath = path.join(__dirname, file);
  
  if (!fs.existsSync(filePath)) {
    console.log(`⚠️  Skipping ${file} (not found)`);
    return;
  }
  
  let content = fs.readFileSync(filePath, 'utf8');
  let changed = false;
  
  // Replace each Unsplash URL with Cloudinary URL
  Object.entries(imageMap).forEach(([unsplashUrl, cloudinaryUrl]) => {
    if (content.includes(unsplashUrl)) {
      content = content.replace(new RegExp(unsplashUrl, 'g'), cloudinaryUrl);
      changed = true;
      console.log(`✅ Replaced in ${file}: ${path.basename(unsplashUrl)}`);
    }
  });
  
  if (changed) {
    fs.writeFileSync(filePath, content, 'utf8');
    console.log(`💾 Updated: ${file}\n`);
  } else {
    console.log(`ℹ️  No changes needed in ${file}\n`);
  }
});

console.log('✨ Image replacement complete!');
console.log('\n📊 BENEFITS:');
console.log('   ✅ Auto WebP/AVIF format conversion');
console.log('   ✅ Automatic quality optimization');
console.log('   ✅ Responsive image sizing');
console.log('   ✅ CDN delivery (faster loading)');
console.log('   ✅ Better SEO performance');
console.log('\n🚀 Your images are now powered by Cloudinary!');
