import React from 'react';
import renderer from 'react-test-renderer';

import Count from '../Count';

const MOCK_DATA = [{ size: 300 }, { size: 200 }, { size: 500 }];

const MOCK_DATA_SMALL = [{ size: 300 }];

describe('<Checkbox />', () => {
  it('renders correctly', () => {
    const count = renderer.create(<Count />).toJSON();
    expect(count).toMatchSnapshot();
  });

  it('displays the correct data', () => {
    const count = renderer
      .create(<Count data={MOCK_DATA} total={MOCK_DATA.length} />)
      .toJSON();
    expect(count).toMatchSnapshot();
  });

  it('displays the correct data when a smaller total is passed', () => {
    const count = renderer
      .create(<Count data={MOCK_DATA_SMALL} total={MOCK_DATA_SMALL.length} />)
      .toJSON();
    expect(count).toMatchSnapshot();
  });
});
