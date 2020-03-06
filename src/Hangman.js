import React from "react"

import Header from "./components/Header.component"

import "./Hangman.scss"

import images from "./images"
import { generateRandomWord } from "./Data/words"
import alphabet from "./Data/alphabet"

class Hangman extends React.Component {
  constructor(props) {
    super(props)
    this.state = {
      wrongGuesses: 0,
      word: generateRandomWord(),
      currWord: "",
      gameStat: "",
      prevWord: ""
    }
    window.addEventListener("keydown", this.handleKeyPress)
  }

  handleClick = e => {
    this.checkLetter(e.target.innerText.toString())
    e.target.classList.add("checked")
  }

  handleKeyPress = e => {
    const ignoreList = [
      "Escape",
      192,
      "Alt",
      "Tab",
      "Control",
      "CapsLock",
      "Shift",
      "Enter",
      " ",
      "Backspace"
    ]
    if (!ignoreList.includes(e.key)) this.checkLetter(e.key.toString())
  }

  handleReset = stat => {
    const newWord = generateRandomWord()
    this.setState({
      wrongGuesses: 0,
      word: newWord,
      currWord: newWord
        .split("")
        .map(l => "_")
        .join(""),
      gameStat: stat ? true : false
    })
  }

  handleWLExit = () => {
    const newWord = generateRandomWord()
    this.setState({
      wrongGuesses: 0,
      word: newWord,
      currWord: newWord
        .split("")
        .map(l => "_")
        .join(""),
      gameStat: "",
      prevWord: newWord
    })
  }

  componentDidMount() {
    const word = this.state.word
    this.setState({
      currWord: word
        .split("")
        .map(l => "_")
        .join(""),
      prevWord: word
    })
  }

  loseCondition = letter => {
    if (this.state.wrongGuesses === 7) {
      this.handleReset(false)
    }
  }

  checkLetter = letter => {
    if (!this.state.word.includes(letter)) {
      this.setState({
        wrongGuesses: this.state.wrongGuesses + 1
      })
    }

    const currentW = this.state.currWord
      .split("")
      .map((c, idx) => {
        this.loseCondition(letter)
        return letter === this.state.word[idx] ? letter : c
      })
      .join("")
    this.setState({
      currWord: currentW
    })
    if (currentW === this.state.word) {
      this.handleReset(true)
    }
  }

  render() {
    const { wrongGuesses } = this.state
    const word = this.state.prevWord

    const showimg = (
      <div className="showimg">
        <img src={images[this.state.wrongGuesses]} alt="hangman-img" />
      </div>
    )
    const win = (
      <div className="game-status">
        {showimg}
        <p className="letters">{word}</p>
        <p style={{ color: "#ffc107" }} className="winlose">
          YOU WIN
        </p>
        <button className="winlose-btn" onClick={this.handleWLExit}>
          Restart
        </button>
      </div>
    )
    const lose = (
      <div className="game-status">
        {showimg}
        <p className="letters">{word}</p>
        <p style={{ color: "#ffc107" }}>YOU LOSE</p>
        <button className="winlose-btn" onClick={this.handleWLExit}>
          Restart
        </button>
      </div>
    )

    const notyet = (
      <React.Fragment>
        <div className="left">
          {showimg}
          <div className="output-area">
            <p>Guess the programming language?</p>
            <p className="letters">{this.state.currWord}</p>
          </div>
        </div>
        <div className="right">
          <div className="container">
            {alphabet.map((letter, idx) => (
              <button
                key={idx}
                value={letter}
                onClick={this.handleClick}
                className="btn">
                {letter}
              </button>
            ))}
          </div>
          <button className="btn reset" onClick={this.handleReset}>
            Reset
          </button>
        </div>
      </React.Fragment>
    )

    return (
      <div className="Hangman">
        <Header status={wrongGuesses} />
        <div className="main">
          {this.state.gameStat === ""
            ? notyet
            : this.state.gameStat
            ? win
            : lose}
        </div>
      </div>
    )
  }
}

export default Hangman
