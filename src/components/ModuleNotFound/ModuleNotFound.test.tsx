import { render, screen } from '@testing-library/react';
import ModuleNotFound from './ModuleNotFound';
 
describe('ModuleNotFound Component', () => {
  test('renders fallback UI with proper message', () => {
    const testModuleName = "TestModule";
    render(<ModuleNotFound moduleName={testModuleName}/>);

    expect(screen.getByText(/Module Not Found/i)).toBeInTheDocument();
    expect(screen.getByText(/TestModule/i)).toBeInTheDocument();
    expect(screen.getByText(/The module you are trying to access is not available yet/i)).toBeInTheDocument();
  });
});