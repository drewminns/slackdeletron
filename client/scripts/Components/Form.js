import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import * as actions from '../actions';

const TYPES_DICT = {
  all: 'All',
  spaces: 'Posts',
  snippets: 'Snippets',
  images: 'Images',
  videos: 'Videos',
  gdocs: 'Google Docs',
  zips: 'Zip Files',
  pdfs: 'PDF Files',
};

const INIT_TYPES_STATE = {
  all: true,
  spaces: false,
  snippets: false,
  images: false,
  videos: false,
  gdocs: false,
  zips: false,
  pdfs: false,
};

class Form extends Component {
  static propTypes = {
    getFiles: PropTypes.func,
  };

  constructor(props) {
    super(props);

    this.state = {
      startDate: '',
      endDate: '',
      types: INIT_TYPES_STATE,
      channel: null,
    };
  }

  getFiles = () => {
    const { startDate, endDate, types, channel } = this.state;
    const fileTypes = Object.keys(types)
      .filter((type) => types[type] === true)
      .join(',');
    this.props.getFiles(startDate, endDate, fileTypes, channel);
  };

  updateField = (field, value) => {
    this.setState({ [field]: value });
  };

  updateType = (e) => {
    const types = this.state.types;
    const value = types[e.target.value];
    if (e.target.value !== 'all') {
      this.setState({
        types: { ...this.state.types, all: false, [e.target.value]: !value },
      });
    } else {
      this.setState({
        types: { ...INIT_TYPES_STATE, all: true },
      });
    }
  };

  renderTypeOptions = () => {
    return Object.keys(TYPES_DICT).map((type) => {
      return (
        <div key={type}>
          <input
            type="checkbox"
            id={type}
            checked={this.state.types[type]}
            onChange={this.updateType}
            value={type}
          />
          <label htmlFor={type}>{TYPES_DICT[type]}</label>
        </div>
      );
    });
  };

  render() {
    return (
      <div>
        <input
          type="date"
          value={this.state.startDate}
          onChange={(e) => this.updateField('startDate', e.target.value)}
        />
        <input
          type="date"
          value={this.state.endDate}
          onChange={(e) => this.updateField('endDate', e.target.value)}
        />
        <div>{this.renderTypeOptions()}</div>
        <button onClick={this.getFiles}>Get Files</button>
      </div>
    );
  }
}

function mapStateToProps({ form }) {
  return {};
}

export default connect(mapStateToProps, actions)(Form);
