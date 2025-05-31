import { render, screen, fireEvent } from '@testing-library/react';
import DeveloperMetricsToggle from '../DeveloperMetricsToggle';
import * as logger from '../../utils/performanceLogger';

describe('DeveloperMetricsToggle', () => {
  it('renders toggle button', () => {
    render(<DeveloperMetricsToggle />);
    expect(screen.getByRole('button')).toBeInTheDocument();
  });

  it('shows and hides metrics on toggle', () => {
    render(<DeveloperMetricsToggle />);
    const toggleBtn = screen.getByRole('button');

    fireEvent.click(toggleBtn);
    expect(toggleBtn.textContent).toMatch(/hide metrics/i);

    fireEvent.click(toggleBtn);
    expect(toggleBtn.textContent).toMatch(/show metrics/i);
  });

  it('calls initPerformanceLogging when enabled', () => {
    const spy = jest.spyOn(logger, 'initPerformanceLogging').mockImplementation(() => {});

    render(<DeveloperMetricsToggle />);
    const toggleBtn = screen.getByRole('button');
    fireEvent.click(toggleBtn);

    expect(spy).toHaveBeenCalled();
    spy.mockRestore();
  });
});
