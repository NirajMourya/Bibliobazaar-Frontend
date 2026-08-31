import { render, screen } from '@testing-library/react';
import { Provider } from 'react-redux';
import App from './App';
import { store } from './logic/store';

test('renders the application root', () => {
  render(
    <Provider store={store}>
      <App />
    </Provider>
  );
  const titleElement = screen.getByText(/BiblioBazaar/i);
  expect(titleElement).toBeInTheDocument();
});
