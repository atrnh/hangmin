import React from 'react';
import ReactDOM from 'react-dom';
import Hangmin from './Hangmin';
import './index.css';

const WORDS = [
  'hangmin',
  'indubitably',
  'hopefully',
  'octopuses',
  'arbitrary',
  'disgusting',
  'adoration',
];
const secret_word = WORDS[Math.floor(Math.random() * WORDS.length)];

ReactDOM.render(
  <Hangmin word={secret_word} />,
  document.getElementById('root')
);
