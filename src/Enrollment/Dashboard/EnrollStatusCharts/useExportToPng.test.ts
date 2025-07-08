import { renderHook, act } from '@testing-library/react';
import { useExportToPng } from './useExportToPng';
import { toPng } from 'html-to-image';
import download from 'downloadjs';

// Mock dependencies
jest.mock('html-to-image', () => ({
  toPng: jest.fn(),
}));
jest.mock('downloadjs', () => jest.fn());

describe('useExportToPng (no spyOn)', () => {
  const ELEMENT_ID = 'export-div';
  const MOCK_IMAGE = 'data:image/png;base64,abc123';

  let originalAlert: typeof window.alert;
  let originalError: typeof console.error;

  beforeEach(() => {
    document.body.innerHTML = '';
    jest.clearAllMocks();

    // Save originals
    originalAlert = window.alert;
    originalError = console.error;
  });

  afterEach(() => {
    // Restore originals
    window.alert = originalAlert;
    console.error = originalError;
  });

  test('✅ exports when element exists', async () => {
    const div = document.createElement('div');
    div.id = ELEMENT_ID;
    document.body.appendChild(div);

    (toPng as jest.Mock).mockResolvedValue(MOCK_IMAGE);

    const { result } = renderHook(() => useExportToPng(ELEMENT_ID));

    await act(async () => {
      await result.current();
    });

    expect(toPng).toHaveBeenCalledWith(div, expect.any(Object));
    expect(download).toHaveBeenCalledWith(MOCK_IMAGE, `${ELEMENT_ID}.png`);
  });

  test('❌ shows alert when element is not found', () => {
    let alertCalled = false;
    let errorCalled = false;

    window.alert = () => { alertCalled = true };
    console.error = () => { errorCalled = true };

    const { result } = renderHook(() => useExportToPng('non-existent'));

    act(() => {
      result.current();
    });

    expect(alertCalled).toBe(true);
    expect(errorCalled).toBe(true);
  });

  test('❌ shows alert when toPng fails', async () => {
    const div = document.createElement('div');
    div.id = ELEMENT_ID;
    document.body.appendChild(div);

    const error = new Error('Conversion failed');
    (toPng as jest.Mock).mockRejectedValue(error);

    let alertCalled = false;
    let errorCalled = false;

    window.alert = () => { alertCalled = true };
    console.error = () => { errorCalled = true };

    const { result } = renderHook(() => useExportToPng(ELEMENT_ID));

    await act(async () => {
      await result.current();
    });

    expect(alertCalled).toBe(true);
    expect(errorCalled).toBe(true);
  });
});
