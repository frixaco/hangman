import React from 'react';
import { generateRandomWord } from './words';
import './Hangman.scss';
import step0 from './images/0.jpg';
import step1 from './images/1.jpg';
import step2 from './images/2.jpg';
import step3 from './images/3.jpg';
import step4 from './images/4.jpg';
import step5 from './images/5.jpg';
import step6 from './images/6.jpg';

let gameStat;
class Hangman extends React.Component {
  static defaultProps = {
    maxMistakes: 6,
    images: [step0, step1, step2, step3, step4, step5, step6]
  };

  constructor(props) {
    super(props);
    this.state = {
      mistakes: 0,
      guesses: new Set(),
      answer: generateRandomWord()
    };
    window.addEventListener('keydown', this.handleKeyPress);
  }

  currentWord = () =>
    this.state.answer.split('').map(c => (this.state.guesses.has(c) ? c : '_'));

  handleGuesses = key => {
    let letter = key;
    this.setState(preSt => ({
      guesses: preSt.guesses.add(letter),
      mistakes: preSt.mistakes + (preSt.answer.includes(letter) ? 0 : 1)
    }));
  };

  handleKeyPress = event => {
    if (gameStat === 'YOU WON' || gameStat === 'YOU LOST') {
      if (event.keyCode === 8 || event.keyCode === 13 || event.keyCode === 32) {
        this.handleReset();
      }
    } else if (
      (event.keyCode >= 65 && event.keyCode <= 90) ||
      (event.keyCode >= 97 && event.keyCode <= 122)
    ) {
      this.handleGuesses(event.key);
    } else if (
      event.keyCode === 8 ||
      event.keyCode === 13 ||
      event.keyCode === 32
    ) {
      this.handleReset();
    }
  };

  generateButtons() {
    return 'abcdefghijklmonpqrstuvwxyz'.split('').map(letter => (
      <button
        key={letter}
        value={letter}
        onClick={e => this.handleGuesses(e.target.value)}
        className='btn'>
        {letter}
      </button>
    ));
  }

  handleReset = () => {
    this.setState({
      mistakes: 0,
      guesses: new Set(),
      answer: generateRandomWord()
    });
  };

  render() {
    const gameLost = this.state.mistakes >= this.props.maxMistakes;
    const altText = `${this.state.mistakes}/${this.props.maxMistakes} wrong guesses`;
    const gameWon = this.currentWord().join('') === this.state.answer;
    gameStat = this.generateButtons();

    if (gameWon) {
      gameStat = 'YOU WON';
    }
    if (gameLost) {
      gameStat = 'YOU LOST';
    }

    return (
      <div className='Hangman'>
        <nav className='top'>
          <a href='https://reactjs-hangman.netlify.com/' className='title'>
            Hangman by frixacoder
          </a>
          <div className='wrong-guesses'>
            Guessed wrong: {this.state.mistakes}
          </div>
        </nav>
        <div className='main'>
          <div className='left'>
            <div className='showimg'>
              <img src={this.props.images[this.state.mistakes]} alt={altText} />
            </div>
            <div className='output-area'>
              <p>Guess the programming language?</p>
              <p className='letters'>
                {!gameLost ? this.currentWord() : this.state.answer}
              </p>
            </div>
          </div>
          <div className='right'>
            <div>{gameStat}</div>
            <button className='btn-reset' onClick={this.handleReset}>
              Reset
            </button>
          </div>
        </div>
      </div>
    );
  }
}

export default Hangman;
