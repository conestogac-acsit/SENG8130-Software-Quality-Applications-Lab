// jest.setup.js
const { TextEncoder, TextDecoder } = require('util');

// Polyfill TextEncoder if missing
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder;
}

// Polyfill TextDecoder if missing
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder;
}
