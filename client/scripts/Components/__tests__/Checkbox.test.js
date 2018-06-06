import React from 'react';
import renderer from 'react-test-renderer';

import Checkbox from '../Checkbox';

const LABEL = 'LABEL TEXT';
// const mockCallback = jest.fn();

describe('<Checkbox />', () => {
  it('Renders Correctly', () => {
    const checkbox = renderer.create(<Checkbox />).toJSON();
    expect(checkbox).toMatchSnapshot();
  });

  it('Renders a label', () => {
    const checkbox = renderer.create(<Checkbox label={LABEL} />).toJSON();
    expect(checkbox).toMatchSnapshot();
  });
});
