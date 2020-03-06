import React from "react"

const Header = ({ status }) => (
  <nav className="top">
    <a href="https://reactjs-hangman.netlify.com/" className="title">
      Hangman by frixacoder
    </a>
    <div className="wrong-guesses">Guessed wrong: {status}</div>
  </nav>
)

export default Header
