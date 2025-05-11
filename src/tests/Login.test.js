import { render, screen, fireEvent } from '@testing-library/react';
import Login from '../pages/Login';
import { BrowserRouter } from 'react-router-dom';

beforeEach(() => {
  window.alert = jest.fn(); // Prevent actual alert popups
});

// Check if email and password fields render
test('renders email and password inputs', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  expect(screen.getByPlaceholderText("Email")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("Password")).toBeInTheDocument();
});

// Simulate login click without completing CAPTCHA
test('blocks login if CAPTCHA not completed', () => {
  render(<BrowserRouter><Login /></BrowserRouter>);
  fireEvent.click(screen.getByText("Login"));
  expect(window.alert).toHaveBeenCalledWith("Please verify you're not a robot.");
});
