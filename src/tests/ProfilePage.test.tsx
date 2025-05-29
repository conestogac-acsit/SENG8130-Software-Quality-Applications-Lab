import React from 'react';
import { render, screen } from '@testing-library/react';
import ProfilePage from '../components/ProfilePage';

const mockUser = {
  name: 'Yash Ketanbhai Shah',
  email: 'yash.shah@example.com',
  role: 'professor',
};

describe('ProfilePage Component (UI Test)', () => {
  it('renders the profile title and welcome heading', () => {
    render(<ProfilePage {...mockUser} />);
    expect(screen.getByText('Welcome, Yash')).toBeInTheDocument();
  });

  it('displays the user\'s name, email, and role description', () => {
    render(<ProfilePage {...mockUser} />);
    expect(screen.getByText('Yash Ketanbhai Shah')).toBeInTheDocument();
    expect(screen.getByText('📧 yash.shah@example.com')).toBeInTheDocument();
    expect(screen.getByText('You are a Professor')).toBeInTheDocument();
  });

  it('shows introductory text about the profile', () => {
    render(<ProfilePage {...mockUser} />);
    expect(screen.getByText(/This is your personal profile page/i)).toBeInTheDocument();
  });

  it('renders a placeholder profile image', () => {
    render(<ProfilePage {...mockUser} />);
    const img = screen.getByAltText('Profile') as HTMLImageElement;
    expect(img).toBeInTheDocument();
    expect(img.src).toContain('https://via.placeholder.com/100');
  });
});
