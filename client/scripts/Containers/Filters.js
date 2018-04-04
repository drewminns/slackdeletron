import React, { Component } from 'react';
import PropTypes from 'prop-types';
import Select from '../Components/Select';

const CHANNELS = [
  { id: 'newest', name: 'Newest' },
  { id: 'oldest', name: 'Oldest' },
];

const SIZE = [
  { id: 'largest', name: 'Largest' },
  { id: 'smallest', name: 'Smallest' },
];

class Filters extends Component {
  static propTypes = {
    onDateChange: PropTypes.func,
    onSizeChange: PropTypes.func,
    sizeValue: PropTypes.string,
    dateValue: PropTypes.string,
  };

  render() {
    return (
      <div>
        <h2>Filters</h2>
        <div>
          <Select
            label="Sort by Date"
            emptyValue="none"
            emptyText="None"
            options={CHANNELS}
            onChange={this.props.onDateChange}
            value={this.props.dateValue}
          />
        </div>
        <div>
          <Select
            label="Sort by Size"
            emptyValue="none"
            emptyText="None"
            options={SIZE}
            onChange={this.props.onSizeChange}
            value={this.props.sizeValue}
          />
        </div>
      </div>
    );
  }
}

export default Filters;
