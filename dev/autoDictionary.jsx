import React from "react";
import ReactDOM from "react-dom";

const Dictionary = require('../constants/dictionary.js');
const SoundFX = require('../constants/sounds.js');

let autoDictionary = React.createClass({

  getInitialState () {
    let word = "";

    return {
      word: word,
      definition: "",
      dict: Dictionary,
    };
  },

  handleChange(property, event) {
    this.setState({word: event.target.value}, this.handleLookup(event.target.value));
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
    let definition = this.state.dict[upWord];

    if (definition !== undefined) {
      this.setState({ definition: definition });
      this.setState({ word: word });
    }
  },

  handleSubmit(event) {
    event.preventDefault();
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
