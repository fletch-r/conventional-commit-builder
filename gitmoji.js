const fs = require('fs');
const https = require('https');

// Create gitmojis file.
const file = fs.createWriteStream('./src/vendors/gitmojis.json');

// Get the latest gitmojis
https.get('https://raw.githubusercontent.com/carloscuesta/gitmoji/master/packages/gitmojis/src/gitmojis.json', (response) => {
    response.pipe(file);
});
