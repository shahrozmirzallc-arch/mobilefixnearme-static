const fs = require('fs');

// Load URL mapping
const urlMapping = JSON.parse(fs.readFileSync('cloudinary-urls.json', 'utf8'));

// Add Cloudinary transformations for better SEO
// f_auto = auto format (WebP, AVIF)
// q_auto = auto quality
// w_auto = auto width based on DPR
const cloudinaryTransform = '/f_auto,q_auto:good';

// Function to add transformations to Cloudinary URLs
function addTransformations(url) {
  return url.replace('/upload/', `/upload${cloudinaryTransform}/`);
}

// Update URL mapping with transformations
const optimizedMapping = {};
for (const [unsplashUrl, cloudinaryUrl] of Object.entries(urlMapping)) {
  optimizedMapping[unsplashUrl] = addTransformations(cloudinaryUrl);
}

// Files to update
const filesToUpdate = [
  'index.html'
];

console.log('🔄 Replacing image URLs in HTML files...\n');

filesToUpdate.forEach(file => {
  if (!fs.existsSync(file)) {
    console.log(`⚠️  File not found: ${file}`);
    return;
  }

  let content = fs.readFileSync(file, 'utf8');
  let replacements = 0;

  for (const [unsplashUrl, cloudinaryUrl] of Object.entries(optimizedMapping)) {
    const regex = new RegExp(unsplashUrl.replace(/[.*+?^${}()|[\]\\]/g, '\\$&'), 'g');
    const matches = content.match(regex);
    
    if (matches) {
      content = content.replace(regex, cloudinaryUrl);
      replacements += matches.length;
      console.log(`✅ ${file}: Replaced ${matches.length}x → ${cloudinaryUrl}`);
    }
  }

  // Write updated content
  fs.writeFileSync(file, content, 'utf8');
  console.log(`\n✅ ${file}: Total ${replacements} replacements\n`);
});

console.log('🎉 All images replaced with Cloudinary URLs!');
console.log('\n📊 CLOUDINARY BENEFITS:');
console.log('✅ Auto WebP/AVIF format (smaller file sizes)');
console.log('✅ Auto quality optimization');
console.log('✅ CDN delivery (faster loading)');
console.log('✅ Responsive images');
console.log('✅ Better SEO rankings!');
