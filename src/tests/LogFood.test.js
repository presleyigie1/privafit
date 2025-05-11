import { render, screen } from '@testing-library/react';
import LogFood from "../pages/LogFood";
import { BrowserRouter } from 'react-router-dom';

// Check that LogFood loads with heading and search input
test('renders LogFood page and search input', () => {
  render(<BrowserRouter><LogFood /></BrowserRouter>);
  expect(screen.getByText("Log Food")).toBeInTheDocument();
  expect(screen.getByPlaceholderText("e.g. Chicken, Rice, Egg")).toBeInTheDocument();
});
