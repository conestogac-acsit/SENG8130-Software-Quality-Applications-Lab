import '@testing-library/jest-dom';
import { TextEncoder, TextDecoder } from 'util';
if (typeof global.TextEncoder === 'undefined') {
  global.TextEncoder = TextEncoder as typeof global.TextEncoder;
}
if (typeof global.TextDecoder === 'undefined') {
  global.TextDecoder = TextDecoder as typeof global.TextDecoder;
<<<<<<< HEAD
}
=======
}

>>>>>>> 60325e8 (481-Mil1-Add Student Enrollment Card to Dashboard (TDD) (#511))
