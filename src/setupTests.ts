// jest-dom adds custom jest matchers for asserting on DOM nodes.
// allows you to do things like:
// expect(element).toHaveTextContent(/react/i)
// learn more: https://github.com/testing-library/jest-dom
import '@testing-library/jest-dom';

// Polyfill TextEncoder and TextDecoder (needed by some libraries like react-router in Jest/Node)
import { TextEncoder, TextDecoder as NodeTextDecoder } from 'util';

global.TextDecoder = NodeTextDecoder as unknown as typeof globalThis.TextDecoder;

global.TextEncoder = TextEncoder as unknown as typeof globalThis.TextEncoder;
