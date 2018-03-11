import React from 'react';
import { shallow, mount, render } from 'enzyme';

import Button from './Button';

describe('<Button />', () => {
  it('renders a button component', () => {
    const wrapper = shallow(<Button />);
    expect(wrapper.text()).toBe('button');
  });
});
