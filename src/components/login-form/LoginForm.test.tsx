import React from 'react';
import { render, screen } from '@testing-library/react';
import { LoginForm } from './LoginForm';

describe('LoginForm component', () => {
  test('Form rendered', () => {
    render(<LoginForm />);
    expect(screen.getAllByTestId('id')).toBeInTheDocument();
  });
});
