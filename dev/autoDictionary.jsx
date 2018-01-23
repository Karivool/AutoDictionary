import React from "react";
import ReactDOM from "react-dom";

const Dictionary = require('../constants/dictionary.js');

let autoDictionary = React.createClass({

  getInitialState () {
    let word = "";

    return {
      word: word,
      definition: "",
      dict: Dictionary,
    };
  },

  createChoices(definition) {
    let words = definition.split(" ");
    let output = words.map((word, idx) => {
      console.log(this);
      return (
        <span key={`${word}-${idx}`}
              onClick={this.handleLookupClick(word)}
        >
        {word}
      </span>);
    })
    console.log(output);
  },

  handleChange(property, event) {
    this.setState({word: event.target.value}, this.handleLookup(event.target.value));
  },

  handleLookup(word) {
    let upWord = word.toUpperCase();
    let definition = this.state.dict[upWord];

    if (definition !== undefined) {
      this.setState({ definition: definition });
      // this.createChoices(definition);
    } else {
      this.setState({
        definition: "",
      })
    }
  },

  handleLookupClick(word) {
    console.log("in handleLookupClick");
  },

  handleSubmit(event) {
    event.preventDefault();
  },

  render: function() {
    return (
      <div className="main">
        <form className="dict-form" onSubmit={this.handleSubmit}>
          Word: <input type="text"
                       value={this.state.word}
                       onChange={this.handleChange.bind(this, "word")}
                       className="dict-form-word"
                       pattern="[A-Za-z]*"
                       />
        </form>

        <div className="dict-def">
          Definition: {this.state.definition}
        </div>
      </div>
    );
  }
});

ReactDOM.render(
  React.createElement(autoDictionary),
  document.querySelector("#container")
);
