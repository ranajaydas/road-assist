import { render } from '@testing-library/react';

import { Navbar } from './navbar';

describe('Navbar component', () => {
  it('renders the Navbar', () => {
    const { getByText } = render(<Navbar />);

    // Check that the navbar title is displayed
    const heroTitle = getByText('Roadside Assist');
    expect(heroTitle).toBeTruthy();
  });
});
