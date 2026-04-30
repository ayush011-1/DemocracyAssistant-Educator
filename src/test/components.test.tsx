import { describe, it, expect } from 'vitest';
import { render, screen, act } from '@testing-library/react';
import { MemoryRouter } from 'react-router-dom';
import { UIProvider } from '../context/UIContext';
import { AuthProvider } from '../context/AuthContext';
import App from '../App';

describe('App Accessibility', () => {
  it('renders with appropriate landmark roles', async () => {
    await act(async () => {
      render(
        <MemoryRouter initialEntries={['/registration']}>
          <AuthProvider>
            <UIProvider>
              <App />
            </UIProvider>
          </AuthProvider>
        </MemoryRouter>
      );
    });
    
    // Check for main landmarks
    expect(screen.getByRole('banner')).toBeDefined();
    expect(screen.getByRole('navigation')).toBeDefined();
    expect(screen.getByRole('main')).toBeDefined();
  });
});
