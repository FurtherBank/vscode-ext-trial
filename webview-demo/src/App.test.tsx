import React from 'react';
import { render, screen } from '@testing-library/react';
import App from './App';
import { CustomMessageEvent } from './helper/event/CustomMessageEvent'


test('renders learn react link', () => {
  render(<App />);
  // const linkElement = screen.getByText(/learn react/i);
  // expect(linkElement).toBeInTheDocument();
  window.dispatchEvent(new CustomMessageEvent('data', 'hello world'))
});
