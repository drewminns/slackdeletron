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
      <div className="Filters">
        <Select
          label="Sort by Date"
          options={CHANNELS}
          onChange={this.props.onDateChange}
          value={this.props.dateValue}
        />
        <Select
          label="Sort by Size"
          emptyValue="none"
          emptyText="None"
          options={SIZE}
          onChange={this.props.onSizeChange}
          value={this.props.sizeValue}
        />
      </div>
    );
  }
}

export default Filters;
