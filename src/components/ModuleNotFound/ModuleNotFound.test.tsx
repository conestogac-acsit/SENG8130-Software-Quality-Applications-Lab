import { render, screen } from '@testing-library/react';
import ModuleNotFound from './index';
 
describe('ModuleNotFound Component', () => {
  test('renders fallback UI with proper message', () => {
    render(<ModuleNotFound />);
    expect(screen.getByText(/Module Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/The module you are trying to access is not available yet/i)).toBeInTheDocument();
  });
});