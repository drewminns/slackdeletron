import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Header from '../Components/Header';

describe('<Header />', () => {
  it('renders a Header component in the loggedOut State', () => {
    const wrapper = shallow(<Header />);
    expect(wrapper.find('a').text()).toBe('Login With Slack');
  });

  it('renders a Header component in the loggedIn State', () => {
    const wrapper = shallow(<Header isLoggedIn />);
    expect(wrapper.find('a').text()).toBe('Logout');
  });
});
