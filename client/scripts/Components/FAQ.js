import React, { Fragment } from 'react';
import { FAQ as FAQQuestions } from '../../../config/constants';
import PropTypes from 'prop-types';

import Button from '../Components/Button';

const FAQ = ({ onClose = null }) => {
  return (
    <Fragment>
      {onClose && (
        <Button onClick={onClose} classes="FAQ__Close" text="Close" />
      )}

      <h3>What is this thing?!</h3>
      <ul className="FAQ__List">
        {FAQQuestions.map((faq, index) => (
          <li key={index} className="FAQ__List-Item">
            <p
              className="FAQ__Question"
              dangerouslySetInnerHTML={{ __html: faq.question }}
            />
            <p
              className="FAQ__Answer"
              dangerouslySetInnerHTML={{ __html: faq.answer }}
            />
          </li>
        ))}
      </ul>
    </Fragment>
  );
};

FAQ.propTypes = {
  onClose: PropTypes.oneOfType([PropTypes.func]),
};

export default FAQ;
