import React, { Component } from 'react';
import PropTypes from 'prop-types';
import DateFields from '../Components/DateFields';
// import Button from '../Components/Button';
// import Checkbox from '../Components/Checkbox';
import { Checkbox, Label, Button } from 'rebass';

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
      startDate: null,
      endDate: null,
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

  updateDate = ({ startDate, endDate }) => {
    // console.log(startDate, endDate);
    this.setState({ startDate, endDate });
  };

  updateType = (e) => {
    const selected = e.target.value;
    const types = this.state.types;
    const value = types[selected];
    if (selected === 'all') {
      this.setState({
        all: true,
        types: INIT_TYPES_STATE,
      });
      return;
    }

    this.setState({
      types: { ...this.state.types, all: false, [selected]: !value },
    });
  };

  renderTypeOptions = () => {
    return Object.keys(TYPES_DICT).map((type) => {
      return (
        <Label key={type}>
          <Checkbox
            id={type}
            checked={this.state.types[type]}
            onChange={this.updateType}
            value={type}
          />
          {TYPES_DICT[type]}
        </Label>
      );
    });
  };

  render() {
    const typeSelected = Object.keys(this.state.types).filter(
      (type) => this.state.types[type] === true
    );

    return (
      <div>
        <DateFields
          onChange={this.updateDate}
          startDate={this.state.startDate}
          endDate={this.state.endDate}
        />
        <div>
          <Label>
            <Checkbox
              id="all"
              value="all"
              checked={!typeSelected.length}
              onChange={this.updateType}
            />
            All
          </Label>
          {this.renderTypeOptions()}
        </div>
        <Button onClick={this.getFiles} children="Get Files" />
      </div>
    );
  }
}

export default Form;
