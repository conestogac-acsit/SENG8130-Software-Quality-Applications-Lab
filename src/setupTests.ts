import '@testing-library/jest-dom';

// Polyfill TextEncoder and TextDecoder (needed by some libraries like react-router in Jest/Node)
import { TextEncoder, TextDecoder as NodeTextDecoder } from 'util';

if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}

if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = NodeTextDecoder as typeof global.TextDecoder;
}
