import React from 'react';
import { shallow, mount } from 'enzyme';
import renderer from 'react-test-renderer';

import Button from '../Button';

describe('<Button />', () => {
  it('Renders Correctly', () => {
    const button = renderer.create(<Button />).toJSON();
    expect(button).toMatchSnapshot();
  });

  it('Mounts a Button element correctly', () => {
    const button = shallow(<Button />);
    expect(button).toHaveLength(1);
  });

  it('Displays the correct text when provided as a prop', () => {
    const TEXT = 'CLICK ME';
    const button = mount(<Button text={TEXT} />);
    expect(button.text()).toBe(TEXT);
  });

  it('Renders a button element by default', () => {
    const TEXT = 'CLICK ME';
    const button = mount(<Button text={TEXT} />);
    expect(button.find('button')).toHaveLength(1);
    expect(button.find('a')).toHaveLength(0);
  });

  it('Renders an A element when required', () => {
    const TEXT = 'CLICK ME';
    const button = mount(<Button text={TEXT} isLink href="#" />);
    expect(button.find('button')).toHaveLength(0);
    expect(button.find('a')).toHaveLength(1);
  });

  it('Does not render an A element if href prop is not provided', () => {
    const TEXT = 'CLICK ME';
    const button = mount(<Button text={TEXT} isLink />);
    expect(button.find('button')).toHaveLength(1);
    expect(button.find('a')).toHaveLength(0);
  });
});
