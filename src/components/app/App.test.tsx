import React from 'react';
import { render, screen } from '@testing-library/react';
import { App } from './App';

describe('App', () => {
  test('App should be contains correct text', () => {
    render(<App />);
    const text = screen.getByText('Vehicles');
    expect(text).toBeInTheDocument();
  });
});
