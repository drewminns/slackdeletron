import React from 'react';
import { shallow } from 'enzyme';
import renderer from 'react-test-renderer';

import ErrorBar from '../ErrorBar';

const DEFAULT_PROPS = {
  message: 'Something bad happened!',
  styles: {
    color: 'blue'
  }
};

describe('<ErrorBar />', () => {
  it('Renders Correctly', () => {
    const tree = renderer.create(<ErrorBar {...DEFAULT_PROPS} />).toJSON();
    expect(tree).toMatchSnapshot();
  });

  it('renders the correct message if the "present" prop is passed', () => {
    const tree = shallow(<ErrorBar {...DEFAULT_PROPS} present />);
    expect(tree.text().includes(DEFAULT_PROPS.message)).toBe(true);
  });
});