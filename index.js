require('dotenv').config();
const crypto = require('crypto');

/**
 * Encrypts a text using AES in ECB mode
 * @param {string} text - The text to encrypt
 * @returns {string} - The encrypted text in base64 format
 */
function encryptAES_ECB(text) {
  // Check if AES_KEY is defined in the .env file
  if (!process.env.AES_KEY) {
    throw new Error('AES_KEY is not defined in the .env file');
  }

  // Decode the key from base64
  const key = Buffer.from(process.env.AES_KEY, 'base64');
  
  // Create the cipher with AES in ECB mode
  const cipher = crypto.createCipheriv('aes-256-ecb', key, null);
  
  // Encrypt the text and apply padding
  let encrypted = cipher.update(text, 'utf8', 'base64');
  encrypted += cipher.final('base64');
  
  return encrypted;
}

/**
 * Decrypts a text using AES in ECB mode
 * @param {string} encryptedText - The encrypted text in base64 format
 * @returns {string} - The decrypted text
 */
function decryptAES_ECB(encryptedText) {
  if (!process.env.AES_KEY) {
    throw new Error('AES_KEY is not defined in the .env file');
  }

  // Decode the key from base64
  const key = Buffer.from(process.env.AES_KEY, 'base64');
  
  // Create the decipher
  const decipher = crypto.createDecipheriv('aes-256-ecb', key, null);
  
  // Decrypt the text
  let decrypted = decipher.update(encryptedText, 'base64', 'utf8');
  decrypted += decipher.final('utf8');
  
  return decrypted;
}

// Check if an argument was passed via command line
const textToEncrypt = process.argv[2];

if (textToEncrypt) {
  console.log('Original text:', textToEncrypt);
  const encryptedText = encryptAES_ECB(textToEncrypt);
  console.log('Encrypted text (base64):', encryptedText);
  
  // Also show the decryption to verify
  const decryptedText = decryptAES_ECB(encryptedText);
  console.log('Decrypted text:', decryptedText);
} else {
  console.log('Please provide a text to encrypt as an argument.');
  console.log('Example: node index.js "secret text"');
} 