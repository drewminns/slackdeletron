import React, { Component, Fragment } from 'react';
import cc from 'classcat';
import FAQ from '../Components/FAQ';
import FriendlyBud from '../../images/friendlyBud.svg';

import keys from '../../../config/keys/index';

export default class SignIn extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      showFAQ: false,
    };
  }

  componentWillMount() {
    document.body.style.overflow = 'hidden';
  }

  componentWillUnmount() {
    document.body.style.overflow = 'auto';
  }

  toggleFAQ = () => {
    this.setState({ showFAQ: !this.state.showFAQ });
  };

  render() {
    const contentClass = cc([
      'SignIn__Content',
      { 'SignIn__Content--FAQ': this.state.showFAQ },
    ]);

    const frontFace = (
      <Fragment>
        <img src={FriendlyBud} alt="Slack Deletron Mascot" />
        <h1 className="SignIn__Title blue">Welcome to the Slack Deletron!</h1>
        <p className="SignIn__Lead title">
          Delete files from your Slack Workspace!
        </p>
        <p>
          Slack Deletron uses the Slack API to help you search, manage and
          delete files from your Slack Workspace.
        </p>
        <p>
          We save nothing <span className="purple">(seriously)</span> and only
          help you get rid of stuff
        </p>
        <a
          href={`https://slack.com/oauth/authorize?client_id=${
            process.env.SLACK_CLIENT_ID
          }&scope=users:read,files:read,files:write:user,channels:read`}
        >
          <img
            alt="Add to Slack"
            height="40"
            width="139"
            src="https://platform.slack-edge.com/img/add_to_slack.png"
            srcSet="https://platform.slack-edge.com/img/add_to_slack.png 1x, https://platform.slack-edge.com/img/add_to_slack@2x.png 2x"
          />
        </a>
        <p>
          <button onClick={this.toggleFAQ} className="SignIn__button">
            Got a question? Check out the F.A.Q.
          </button>
        </p>
      </Fragment>
    );
    const backFace = (
      <Fragment>
        <button onClick={this.toggleFAQ} className="SignIn__button">
          Back
        </button>
        <FAQ />
      </Fragment>
    );

    return (
      <div className="SignIn">
        <div className={contentClass}>
          <div className="SignIn__Card">
            <div className="SignIn__Face SignIn__Face--Front">{frontFace}</div>
            <div className="SignIn__Face SignIn__Face--Back">{backFace}</div>
          </div>
        </div>
      </div>
    );
  }
}
