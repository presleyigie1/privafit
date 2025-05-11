import { render, screen } from '@testing-library/react';
import Learn from '../components/Learn';
import { BrowserRouter } from 'react-router-dom';

// Check Learn loads with video categories and refresh
test('renders Learn page with categories and refresh button', () => {
  render(<BrowserRouter><Learn /></BrowserRouter>);
  expect(screen.getByText("Fitness Tutorials")).toBeInTheDocument();
  expect(screen.getByText("Refresh Videos")).toBeInTheDocument();
});
