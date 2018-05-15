import React from 'react';
import { createRenderer } from 'react-test-renderer/shallow';

import FAQ from '../FAQ';

const DEFAULT_PROPS = {
  onClose: jest.fn()
};

describe('<FAQ />', () => {
  it('Renders Correctly', () => {
    const renderer = createRenderer();
    const tree = renderer.render(<FAQ {...DEFAULT_PROPS} />);
    expect(tree).toMatchSnapshot();
  });

  it('does not render the button if no onClose function is passed', () => {
    const renderer = createRenderer();
    const tree = renderer.render(<FAQ />);
    expect(tree).toMatchSnapshot();
  });
});