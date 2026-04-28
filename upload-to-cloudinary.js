const cloudinary = require('cloudinary').v2;
const https = require('https');
const fs = require('fs');
const path = require('path');

// Configure Cloudinary
cloudinary.config({
  cloud_name: 'ddbfcnajs',
  api_key: '118141743884383',
  api_secret: '8B0PTJylzKU_sIhNUX43bOKOXDc'
});

// Images to upload from Unsplash
const images = [
  {
    url: 'https://images.unsplash.com/photo-1519389950473-47ba0277781c?q=80&w=2000',
    name: 'hero-background',
    folder: 'mobilefixnearme'
  },
  {
    url: 'https://images.unsplash.com/photo-1556656793-08538906a9f8?q=80&w=2000',
    name: 'mobile-service-bg',
    folder: 'mobilefixnearme'
  },
  {
    url: 'https://images.unsplash.com/photo-1423666639041-f56000c27a9a?q=80&w=2000',
    name: 'contact-cta-bg',
    folder: 'mobilefixnearme'
  },
  {
    url: 'https://images.unsplash.com/photo-1512941937669-90a1b58e7e9c?q=80&w=800',
    name: 'mobile-phone-repair',
    folder: 'mobilefixnearme/services'
  },
  {
    url: 'https://images.unsplash.com/photo-1544244015-0df4b3ffc6b0?q=80&w=800',
    name: 'tablet-repair',
    folder: 'mobilefixnearme/services'
  },
  {
    url: 'https://images.unsplash.com/photo-1496181133206-80ce9b88a853?q=80&w=800',
    name: 'laptop-repair',
    folder: 'mobilefixnearme/services'
  },
  {
    url: 'https://images.unsplash.com/photo-1611186871348-b1ce696e52c9?q=80&w=800',
    name: 'macbook-repair',
    folder: 'mobilefixnearme/services'
  },
  {
    url: 'https://images.unsplash.com/photo-1587831990711-23ca6441447b?q=80&w=800',
    name: 'desktop-repair',
    folder: 'mobilefixnearme/services'
  },
  {
    url: 'https://images.unsplash.com/photo-1621768216002-5ac171876625?q=80&w=800',
    name: 'cracked-iphone-screen',
    folder: 'mobilefixnearme/blog'
  },
  {
    url: 'https://images.unsplash.com/photo-1563770660941-20978e870e26?q=80&w=800',
    name: 'water-damaged-phone',
    folder: 'mobilefixnearme/blog'
  },
  {
    url: 'https://images.unsplash.com/photo-1517336714731-489689fd1ca8?q=80&w=800',
    name: 'macbook-wont-turn-on',
    folder: 'mobilefixnearme/blog'
  },
  {
    url: 'https://images.unsplash.com/photo-1610945415295-d9bbf067e59c?q=80&w=800',
    name: 'samsung-screen-repair',
    folder: 'mobilefixnearme/blog'
  },
  {
    url: 'https://images.unsplash.com/photo-1588872657578-7efd1f1555ed?q=80&w=800',
    name: 'laptop-running-slow',
    folder: 'mobilefixnearme/blog'
  },
  {
    url: 'https://images.unsplash.com/photo-1609091839311-d5365f9ff1c5?q=80&w=800',
    name: 'phone-battery-draining',
    folder: 'mobilefixnearme/blog'
  },
  {
    url: 'https://images.unsplash.com/photo-1601784551446-20c9e07cdbdb?q=80&w=800',
    name: 'screen-repair-gallery',
    folder: 'mobilefixnearme/gallery'
  },
  {
    url: 'https://images.unsplash.com/photo-1518770660439-4636190af475?q=80&w=800',
    name: 'professional-tools',
    folder: 'mobilefixnearme/gallery'
  },
  {
    url: 'https://images.unsplash.com/photo-1484788984921-03950022c9ef?q=80&w=800',
    name: 'mobile-service',
    folder: 'mobilefixnearme/gallery'
  }
];

// Function to download image
function downloadImage(url, filepath) {
  return new Promise((resolve, reject) => {
    const file = fs.createWriteStream(filepath);
    https.get(url, response => {
      response.pipe(file);
      file.on('finish', () => {
        file.close();
        resolve(filepath);
      });
    }).on('error', err => {
      fs.unlink(filepath);
      reject(err);
    });
  });
}

// Function to upload to Cloudinary
async function uploadToCloudinary(filepath, publicId, folder) {
  try {
    const result = await cloudinary.uploader.upload(filepath, {
      public_id: publicId,
      folder: folder,
      transformation: [
        { quality: 'auto', fetch_format: 'auto' },
        { flags: 'progressive' }
      ]
    });
    console.log(`✅ Uploaded: ${publicId} → ${result.secure_url}`);
    return result.secure_url;
  } catch (error) {
    console.error(`❌ Error uploading ${publicId}:`, error.message);
    return null;
  }
}

// Main function
async function main() {
  console.log('🚀 Starting image upload to Cloudinary...\n');
  
  const tempDir = './temp-images';
  if (!fs.existsSync(tempDir)) {
    fs.mkdirSync(tempDir);
  }

  const urlMapping = {};

  for (const img of images) {
    try {
      console.log(`📥 Downloading: ${img.name}...`);
      const tempFile = path.join(tempDir, `${img.name}.jpg`);
      
      await downloadImage(img.url, tempFile);
      
      console.log(`📤 Uploading to Cloudinary: ${img.name}...`);
      const cloudinaryUrl = await uploadToCloudinary(tempFile, img.name, img.folder);
      
      if (cloudinaryUrl) {
        urlMapping[img.url] = cloudinaryUrl;
      }
      
      // Clean up temp file
      fs.unlinkSync(tempFile);
      
    } catch (error) {
      console.error(`❌ Error processing ${img.name}:`, error.message);
    }
  }

  // Clean up temp directory
  fs.rmdirSync(tempDir);

  console.log('\n✅ All images uploaded to Cloudinary!');
  console.log('\n📋 URL Mapping:');
  console.log(JSON.stringify(urlMapping, null, 2));

  // Save mapping to file
  fs.writeFileSync('cloudinary-urls.json', JSON.stringify(urlMapping, null, 2));
  console.log('\n💾 URL mapping saved to cloudinary-urls.json');

  return urlMapping;
}

// Run
main().then(urlMapping => {
  console.log('\n🎉 DONE! Ready to update HTML files.');
}).catch(error => {
  console.error('❌ Error:', error);
});
