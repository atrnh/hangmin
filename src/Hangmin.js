import React, { Component } from 'react';
import './Hangmin.css';

const WIN = 'You won! Reload to play again ^ ^';
const ALPHABET = 'abcdefghijklmnopqrstuvwxyz';
const STATUS = [
  'Weeeew, this is fun!',
  'Wew... This is fun.',
  'This... is...',
  '...funnn?',
  'Oh.',
  'My goodness.',
  'You\'re so dead now.',
  'YOU\'RE SO DEAD NOW!!!!!',
  'Sorry, game over :(',
];

function Letter(props) {
  return (
    <div className="Letter-square">
      <span className="Letter-text">{props.letter}</span>
    </div>
  );
}

function Guess(props) {
  if (props.enabled) {
    return (
      <a className="Guess-enabled" href="#" onClick={props.onClick}>
        {props.value}
      </a>
    );
  } else {
    return (
      <span className="Guess-disabled">
        {props.value}
      </span>
    );
  }
}

class Hangmin extends Component {
  constructor(props) {
    super(props);
    this.state = {
      deadness: 0,
      letters: Array(this.props.word.length).fill(null),
      // Letters of the word and where they are in the array
      letterIndices: [...this.props.word].reduce((obj, ltr, i) => {
        obj[ltr] = obj[ltr] ? [...obj[ltr], i] : [i];
        return obj;
      }, {}),
      // Available guesses
      guesses: [...ALPHABET].reduce((obj, ltr) => {
        obj[ltr] = true;
        return obj;
      }, {}),
    };
  }

  handleClick(guess) {
    // Don't do anything if player has won or lost
    if (isWinner(this.state.letters) || this.state.deadness === 7) {
      return;
    }
    // Disable guessed letter
    const guesses = Object.assign({}, this.state.guesses);
    guesses[guess] = false;

    if (this.state.letterIndices[guess]) {
      const letters = this.state.letters.slice();
      this.state.letterIndices[guess].forEach(i => { letters[i] = guess; });

      this.setState({
        letters: letters,
        guesses: guesses,
      });
    } else { // Guess was incorrect
      const deadness = this.state.deadness + 1;
      this.setState({
        deadness: deadness,
        guesses: guesses,
      });
    }
  }

  renderGuess(guess) {
    return (
      <Guess
        value={guess}
        enabled={this.state.guesses[guess]}
        onClick={() => this.handleClick(guess)}
      />
    );
  }

  render() {
    const letters = this.state.letters.map(letter => {
      return (
        <Letter letter={letter} />
      );
    });

    const guesses = [...ALPHABET].map(guess => {
      return this.renderGuess(guess);
    });

    return (
      <div className="Hangmin">
        <p>
          {isWinner(this.state.letters) ?
           WIN : STATUS[this.state.deadness]}
        </p>
        <div>
          {letters}
        </div>
        <div className="Guesses">
          {guesses}
        </div>
      </div>
    );
  }
}

function isWinner(letters) {
  for (let i=0; i < letters.length; i++) {
    if (!letters[i]) {
      return false;
    }
  }

  return true;
}

export default Hangmin;
