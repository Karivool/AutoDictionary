import React from "react";
import ReactDOM from "react-dom";

const Dictionary = require('../constants/dictionary.js');
const SoundFX = require('../constants/sounds.js');
const Keys = require('../constants/keys.js');

let autoDictionary = React.createClass({

  getInitialState () {
    let word = "";

    return {
      word: word,
      definition: "",
      dict: Dictionary,
      sounds: SoundFX,
      keys: Keys,
    };
  },

  handleChange(property, event) {
    this.setState({word: event.target.value}, this.handleLookup(event.target.value));
    this.playSound();
  },

  handleLookup(word) {
    let upWord = word.toUpperCase();
    let definition = this.state.dict[upWord];

    if (definition !== undefined) {
      this.setState({ definition: definition });
    } else {
      this.setState({
        definition: "",
      })
    }
  },

  handleLookupClick(word) {
    let upWord = word.toUpperCase();
    upWord = this.wordCheck(upWord);

    let definition = this.state.dict[upWord];

    if (definition !== undefined) {
      this.setState({ definition: definition });
      this.setState({ word: word });
    }

    this.playSound();
  },

  handleSubmit(event) {
    event.preventDefault();
  },

  playSound() {
    const sounds = this.state.sounds;
    let trackNumber = Math.abs(Math.round(Math.random() * sounds.length - 1));
    let track = sounds[trackNumber];
    let sound = new Audio(track);

    sound.currentTime = 0;
    sound.play();
  },

  wordCheck(word) {
    const keys = this.state.keys;
    let beginning = keys[word[0]];
    let end = keys[word[word.length -1]];
    if (beginning === true) {
      word = word.substr(1);
    } else if (end === true) {
      word = word.slice(0, -1);
    }
    return word;
  },

  render: function() {
    return (
      <div className="main">
        <div className="instructions">
          • Type in a word to look it up. Click on words in the definition to look those up
        </div>
        <form className="dict-form" onSubmit={this.handleSubmit}>
          Word: <input type="text"
                       value={this.state.word}
                       onChange={this.handleChange.bind(this, "word")}
                       className="dict-form-word"
                       pattern="[A-Za-z]*"
                       />
        </form>
        <div className="dict-def">
          Definition: { this.state.definition.split(" ").map((word, idx) => {
              return (<span
                key={`${word}-${idx}`}
                value={word}
                onClick={this.handleLookupClick.bind(this, word)}>
              {word} </span>);
            })
          }
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(autoDictionary),
  document.querySelector("#container")
);
