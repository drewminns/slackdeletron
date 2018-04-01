import React, { Component } from 'react';
import PropTypes from 'prop-types';

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
          <label>Sort by Date</label>
          <select
            onChange={this.props.onDateChange}
            value={this.props.dateValue}
          >
            <option value="none" disabled>
              None
            </option>
            <option value="newest">Newest</option>
            <option value="oldest">Oldest</option>
          </select>
        </div>
        <div>
          <label>Sort by Size</label>
          <select
            onChange={this.props.onSizeChange}
            value={this.props.sizeValue}
          >
            <option value="none" disabled>
              None
            </option>
            <option value="largest">Largest</option>
            <option value="smallest">Smallest</option>
          </select>
        </div>
      </div>
    );
  }
}

export default Filters;
