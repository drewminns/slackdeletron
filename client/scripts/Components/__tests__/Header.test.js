import React from 'react';
import { shallow, mount } from 'enzyme';
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

  it('renders a Header component', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper).toHaveLength(1);
  });

  it('renders a Header component in the loggedOut State', () => {
    const wrapper = mount(<Header />);
    expect(wrapper.find('a.LoginButton').props().href).toContain('auth/slack');
  });

  it('renders a loggedIn Header with a name and an avatar', () => {
    const wrapper = mount(<Header name={NAME} avatar={AVATAR} isLoggedIn />);
    const text = wrapper.find('p');
    const image = wrapper.find('img');
    const link = wrapper.find('a');
    expect(link.text()).toBe('Logout');
    expect(text.text()).toBe(`Hey ${NAME} `);
    expect(image.prop('src')).toEqual(AVATAR);
    expect(image.prop('alt')).toEqual(NAME);
  });

  it('does not render a Header component in the loggedIn State with no other props provided', () => {
    const wrapper = shallow(<Header isLoggedIn />);
    expect(wrapper.find('a.LoginButton').props().href).toContain('auth/slack');
  });

  it('does not render a Header component in the loggedIn State when other values are provided', () => {
    const wrapper = shallow(<Header name={NAME} avatar={AVATAR} />);
    const linkText = wrapper.find('a.LoginButton');
    const text = wrapper.find('p');
    const image = wrapper.find('img.Header__Avatar');
    expect(linkText.props().href).toContain('auth/slack');
    expect(text).toHaveLength(0);
    expect(image).toHaveLength(0);
  });
});
