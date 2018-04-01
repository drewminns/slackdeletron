import React, { Component } from 'react';
import PropTypes from 'prop-types';
import moment from 'moment';
import 'react-dates/initialize';

import { DateRangePicker } from 'react-dates';

import 'react-dates/lib/css/_datepicker.css';

const isAfterToday = (day) => {
  if (!moment.isMoment(day)) {
    return false;
  }
  return moment(day).isSameOrAfter(moment());
};

export default class DateFields extends Component {
  static propTypes = {
    onChange: PropTypes.func,
    startDate: PropTypes.object,
    endDate: PropTypes.object,
  };

  constructor(props) {
    super(props);

    this.state = {
      focusedInput: null,
    };
  }

  onFocusChange = (focusedInput) => {
    this.setState({ focusedInput: focusedInput });
  };

  render() {
    const { startDate, endDate, onChange } = this.props;
    return (
      <div>
        <DateRangePicker
          onFocusChange={this.onFocusChange}
          onDatesChange={onChange}
          focusedInput={this.state.focusedInput}
          startDate={startDate}
          startDateId={'startDate'}
          endDate={endDate}
          endDateId={'endDateId'}
          isOutsideRange={isAfterToday}
          showClearDates
          small
        />
      </div>
    );
  }
}
