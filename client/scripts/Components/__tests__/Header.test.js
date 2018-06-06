import React from 'react';
import renderer from 'react-test-renderer';

import Header from '../Header';

const AVATAR =
  'https://secure.gravatar.com/avatar/f2d55f35afbc3f607e34504f5a2d7d88.jpg?s=192&d=https%3A%2F%2Fa.slack-edge.com%2F7fa9%2Fimg%2Favatars%2Fava_0006-192.png';
const NAME = 'George Jetson';

describe('<Header />', () => {
  it('Renders Correctly', () => {
    const header = renderer.create(<Header />).toJSON();
    expect(header).toMatchSnapshot();
  });

  it('renders a loggedIn Header with a name and an avatar', () => {
    const header = renderer
      .create(<Header name={NAME} avatar={AVATAR} isLoggedIn />)
      .toJSON();
    expect(header).toMatchSnapshot();
  });

  it('does not render a Header component in the loggedIn State with no other props provided', () => {
    const header = renderer.create(<Header isLoggedIn />).toJSON();
    expect(header).toMatchSnapshot();
  });

  it('does not render a Header component in the loggedIn State when other values are provided', () => {
    const header = renderer
      .create(<Header name={NAME} avatar={AVATAR} />)
      .toJSON();
    expect(header).toMatchSnapshot();
  });
});
