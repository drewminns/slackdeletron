import React, { Component } from 'react';
import PropTypes from 'prop-types';
import cc from 'classcat';

export default class ErrorBar extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      isActive: false,
    };
  }

  render() {
    const classes = cc(['Error', { 'Error--Active': this.state.isActive }]);
    return (
      <div className={classes}>
        <p>ERROR</p>
      </div>
    );
  }
}
