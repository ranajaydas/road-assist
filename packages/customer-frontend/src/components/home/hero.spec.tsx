import { render } from '@testing-library/react';

import Hero from './Hero';

describe('Hero component', () => {
  it('renders the hero image and title', () => {
    const { getByAltText, getByText } = render(<Hero />);

    // Check that the hero image is displayed
    const heroImage = getByAltText('car with an open bonnet');
    expect(heroImage).toBeTruthy();

    // Check that the hero title is displayed
    const heroTitle = getByText('How can we assist?');
    expect(heroTitle).toBeTruthy();
  });
});
