import React from 'react';
import { render, screen } from '@testing-library/react';
import EnrollStatus from './EnrollStatus';

//ResizeObserver is a built-in browser API used to detect element size changes.
// Recharts relies on it for rendering responsive charts.
// Since Jest (jsdom) doesn't include it, we mock it below to avoid test failures.
global.ResizeObserver = class {
  observe() {}
  unobserve() {}
  disconnect() {}
};

describe('EnrollStatus Dashboard - Basic Tests', () => {

  });