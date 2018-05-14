import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import Checkbox from '../Checkbox';

const LABEL = 'LABEL TEXT';
const mockCallback = jest.fn();

describe('<Checkbox />', () => {
  it('Renders Correctly', () => {
    const checkbox = renderer.create(<Checkbox />).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it('Renders a label', () => {
    const checkbox = shallow(<Checkbox label={LABEL} />);
    expect(checkbox.text()).toBe(LABEL);
  });

  it('Calls a function when clicked', () => {
    const checkbox = shallow(
      <Checkbox label={LABEL} onChange={mockCallback} />
    );
    checkbox.find('input.Checkbox__Input').simulate('change');
    expect(mockCallback).toBeCalled();
  });
});
