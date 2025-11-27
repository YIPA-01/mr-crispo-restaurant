const menu = require('./src/data/menu_1.json');
const https = require('https');
const http = require('http');

// Function to check if URL is valid
function checkImageUrl(url) {
  return new Promise((resolve) => {
    const protocol = url.startsWith('https') ? https : http;
    const request = protocol.get(url, { method: 'HEAD' }, (response) => {
      resolve({
        url,
        status: response.statusCode,
        valid: response.statusCode === 200,
        contentType: response.headers['content-type']
      });
    });

    request.on('error', (error) => {
      resolve({
        url,
        status: 'ERROR',
        valid: false,
        error: error.message
      });
    });

    request.setTimeout(5000, () => {
      request.destroy();
      resolve({
        url,
        status: 'TIMEOUT',
        valid: false,
        error: 'Request timeout'
      });
    });
  });
}

// Collect all unique image URLs
const imageUrls = new Set();

// From items
menu.items.forEach(item => {
  if (item.image) imageUrls.add(item.image);
});

// From categories
menu.categories.forEach(category => {
  if (category.image) imageUrls.add(category.image);
});

console.log(`Checking ${imageUrls.size} unique image URLs...\n`);

// Check all URLs
(async () => {
  const results = [];
  const urlsArray = Array.from(imageUrls);
  
  // Check in batches to avoid overwhelming
  for (let i = 0; i < urlsArray.length; i++) {
    const url = urlsArray[i];
    process.stdout.write(`Checking ${i + 1}/${urlsArray.length}... `);
    const result = await checkImageUrl(url);
    results.push(result);
    
    if (result.valid) {
      console.log('✓ OK');
    } else {
      console.log(`✗ FAILED (${result.status})`);
    }
  }

  // Summary
  console.log('\n=== SUMMARY ===');
  const valid = results.filter(r => r.valid).length;
  const invalid = results.filter(r => !r.valid).length;
  
  console.log(`Valid: ${valid}`);
  console.log(`Invalid: ${invalid}`);
  
  if (invalid > 0) {
    console.log('\n=== INVALID URLs ===');
    results.filter(r => !r.valid).forEach(r => {
      console.log(`${r.status}: ${r.url}`);
    });
  }
})();
