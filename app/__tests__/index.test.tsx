import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import IndexPage from '../pages';

describe('Index page', () => {
  it('renders Next.js example text', () => {
    const { getByText } = render(<IndexPage />);
    expect(getByText('Next.js example')).toBeInTheDocument();
  });
});
