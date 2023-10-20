import '@testing-library/jest-dom';
import React from 'react';
import { render, screen } from '@testing-library/react';
import NotFound from '../pages/NotFound';
import { MemoryRouter } from 'react-router-dom';

describe('<NotFound />', () => {
  it('renders NotFound text', () => {
    render(
      <MemoryRouter>
        <NotFound />
      </MemoryRouter>,
    );
    expect(screen.getByText('NOT FOUND')).toBeInTheDocument();
    expect(screen.getByText(/FOUND/)).toHaveTextContent('NOT FOUND');
  });
});
