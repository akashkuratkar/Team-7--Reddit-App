/* eslint-disable import/no-unresolved */
/* eslint-disable constructor-super */
import React, { useState, useEffect } from 'react';
import './Button.css';
import PropTypes from 'prop-types';

export default function Button(props) {
  const [text, setText] = useState('');
  const [name, setName] = useState('');

  Button.propTypes = {
    text: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
  };

  useEffect(() => {
    setText(props.text);
    setName(props.name);
  }, []);  

  return (
    <div className={`button ${name}`}>
      <div>{text}</div>
    </div>
  );
}
