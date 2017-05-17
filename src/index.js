import React from 'react';
import ReactDOM from 'react-dom';
import Hangmin from './Hangmin';
import './index.css';

const secret_word = 'hangmin';

ReactDOM.render(
  <Hangmin word={secret_word} />,
  document.getElementById('root')
);
