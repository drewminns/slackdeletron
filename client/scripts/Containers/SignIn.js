import React, { Component, Fragment } from 'react';
import cc from 'classcat';
import Button from '../Components/Button';
import FriendlyBud from '../../images/friendlyBud.svg';

const FAQ = [
  {
    question: 'How does this work?',
    answer:
      'This app uses the <a href="https://api.slack.com/methods" target="_blank">Slack Web API Methods</a>',
  },
  { question: '', answer: '' },
  { question: '', answer: '' },
  { question: '', answer: '' },
  { question: '', answer: '' },
];

export default class SignIn extends Component {
  static propTypes = {};

  constructor(props) {
    super(props);

    this.state = {
      showFAQ: true,
    };
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
        <h1 className="SignIn__Title">Welcome to the Slack Deletron!</h1>
        <p className="SignIn__Lead">Delete files from your Slack Workspace!</p>
        <p>
          Slack Deletron uses the Slack API to help you search, manage and
          delete files from your Slack Workspace.
        </p>
        <p>
          We save nothing <span className="purple">(seriously)</span> and only
          help you get rid of stuff
        </p>
        <Button text="Login with Slack" isLink href="api/slack/login" />
        <p>
          <button onClick={this.toggleFAQ}>
            Find this sketchy? Got a question? Here’s the F.A.Q.
          </button>
        </p>
      </Fragment>
    );

    const backFace = (
      <Fragment>
        <button onClick={this.toggleFAQ}>Back</button>
        <h3>What is this thing?!</h3>
        <ul className="FAQ__List">
          {FAQ.map((faq, index) => (
            <li key={index} className="FAQ__List-Item">
              <p className="FAQ__Question">{faq.question}</p>
              <p className="FAQ__Answer">{faq.answer}</p>
            </li>
          ))}
        </ul>
      </Fragment>
    );

    return (
      <div className="SignIn">
        <div className={contentClass}>
          <div className="SignIn__Face SignIn__Face--Front">{frontFace}</div>
          <div className="SignIn__Face SignIn__Face--Back">{backFace}</div>
        </div>
      </div>
    );
  }
}
