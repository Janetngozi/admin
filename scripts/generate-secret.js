// Quick script to generate NEXTAUTH_SECRET
const crypto = require('crypto');
console.log(crypto.randomBytes(32).toString('base64'));

