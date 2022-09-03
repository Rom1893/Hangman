import React, { Component } from "react";
import "./Hangman.css";
import img0 from "./0.jpg";
import img1 from "./1.jpg";
import img2 from "./2.jpg";
import img3 from "./3.jpg";
import img4 from "./4.jpg";
import img5 from "./5.jpg";
import img6 from "./6.jpg";
import { randomWord } from "./words";

class Hangman extends Component {
  /** by default, allow 6 guesses and use provided gallows images. */


  static defaultProps = {
    maxWrong: 6,
    images: [img0, img1, img2, img3, img4, img5, img6]
  };

  constructor(props) {
    super(props);
    let random = randomWord()
    console.log(random)
    this.state = { nWrong: 0, guessed: new Set(), answer: random};
    this.handleGuess = this.handleGuess.bind(this);
  }

  /** guessedWord: show current-state of word:
    if guessed letters are {a,p,e}, show "app_e" for "apple"
  */
  guessedWord() {
    return this.state.answer
      .split("")
      .map(ltr => (this.state.guessed.has(ltr) ? ltr : "_"));
  }

  /** handleGuest: handle a guessed letter:
    - add to guessed letters
    - if not in answer, increase number-wrong guesses
  */
  handleGuess(evt) {
    let ltr = evt.target.value;
    this.setState(st => ({
      guessed: st.guessed.add(ltr),
      nWrong: st.nWrong + (st.answer.includes(ltr) ? 0 : 1)
    }));
  }

  /** generateButtons: return array of letter buttons to render */
  generateButtons() {
    return "abcdefghijklmnopqrstuvwxyz".split("").map(ltr => (
      <button
        key={ltr}
        value={ltr}
        onClick={this.handleGuess}
        disabled={this.state.guessed.has(ltr)}
      >
        {ltr}
      </button>
    ));
  }

  restartGame = () => {
    let random = randomWord()
    console.log(random)
    this.setState({ nWrong: 0, guessed: new Set(), answer: random})
  }

  /** render: render game */
  render() {
    let title
    if (this.state.nWrong === this.props.maxWrong) {
      title =
        <div>
          <img className="Hangman-image" src={this.props.images[this.state.nWrong]} alt={this.state.nWrong} />
          <h1>You lose!</h1>
          <h2>The correct word was "{this.state.answer}"</h2>
        </div>
    } else {
      title =
        <div className='Hangman'>
          <div>
            <h1>Hangman</h1>
            <img src={this.props.images[this.state.nWrong]} alt={this.state.nWrong} />
            <p>Number wrong: {this.state.nWrong}</p>
          </div>

          <section className="Hangman-btns-container">
            <p className='Hangman-word'>{this.guessedWord()}</p>
            <p className='Hangman-btns'>{this.generateButtons()}</p>
          </section>
        </div>
    }
    return (
      <div>
        {title}
        <button className="restart" onClick={this.restartGame}>RESTART</button>
      </div>
    );
  }
}

export default Hangman;
