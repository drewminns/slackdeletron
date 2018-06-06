import React from 'react';
import renderer from 'react-test-renderer';

import Button from '../Button';

describe('<Button />', () => {
  it('Renders Correctly', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Renders an A element when required', () => {
    const TEXT = 'CLICK ME';
    const button = renderer.create(<Button text={TEXT} isLink href="#" />)
      .toJSON;
    expect(button).toMatchSnapshot();
  });

  it('Does not render an A element if href prop is not provided', () => {
    const TEXT = 'CLICK ME';
    const button = renderer.create(<Button text={TEXT} isLink />);
    expect(button).toMatchSnapshot();
  });
});
