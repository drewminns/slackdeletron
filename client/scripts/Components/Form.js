import React, { Component, Fragment } from 'react';
import PropTypes from 'prop-types';

const TYPES_DICT = {
  spaces: 'Posts',
  snippets: 'Snippets',
  images: 'Images',
  videos: 'Videos',
  gdocs: 'Google Docs',
  zips: 'Zip Files',
  pdfs: 'PDF Files',
};

const INIT_TYPES_STATE = {
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
    const selected = e.target.value;
    const types = this.state.types;
    const value = types[selected];
    if (selected === 'all') {
      return;
    }

    this.setState({
      types: { ...this.state.types, all: false, [selected]: !value },
    });
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
    const typeSelected = Object.keys(this.state.types).filter(
      (type) => this.state.types[type] === true
    );

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
        <div>
          <div>
            <input
              type="checkbox"
              id="all"
              checked={!typeSelected.length}
              onChange={this.updateType}
              value="all"
            />
            <label htmlFor="all">All</label>
          </div>
          {this.renderTypeOptions()}
        </div>
        <button onClick={this.getFiles}>Get Files</button>
      </div>
    );
  }
}

export default Form;
