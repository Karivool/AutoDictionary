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

  handleChange(property, event) {
    this.setState({
      word: event.target.value,
    });
    let upWord = this.state.word.toUpperCase();

    if (this.state.dict[upWord] !== undefined) {
      console.log("word found");
      this.setState({
        definition: this.state.dict[upWord],
      });
    } else {
      this.setState({
        definition: "",
      })
    }
  },

  handleSubmit(event) {
    event.preventDefault();
  },

  render: function() {
    console.log(this.state.word);
    console.log(this.state.definition);
    return (
      <div className="main">
        <form className="dict-form" onSubmit={this.handleSubmit}>
          Word: <input type="text" value={this.state.word} onChange={this.handleChange.bind(this, "word")} className="dict-form-word"/><br/>
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
