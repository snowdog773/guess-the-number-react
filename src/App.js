import React, { Component } from "react";
import { randomInteger } from "./random.js";
import View from "./View.jsx";

class App extends Component {
  state = {
    lower: null,
    upper: null,
    maxTries: null,
    target: null,
    attempts: [],
    text: "",
    difficulty: null,
    guess: null,
    message: "",
  };

  static DIFFICULTY = {
    easy: {
      tries: 10,
      upper: 25,
      difficulty: "easy",
    },
    medium: {
      tries: 7,
      upper: 50,
      difficulty: "medium",
    },
    hard: {
      tries: 5,
      upper: 100,
      difficulty: "hard",
    },
  };

  initGame(difficulty) {
    const {
      lower = 1, //these are default values that will update when App.DIFFICULTY[difficulty] is evaluated
      upper,
      tries: maxTries,
    } = App.DIFFICULTY[difficulty];

    this.setState({
      lower,
      upper,
      maxTries,
      target: randomInteger(lower, upper),
      difficulty,
    });
  }

  get attemptsRemaining() {
    return this.state.maxTries - this.state.attempts.length;
  }

  guess(num = 1) {
    num = parseInt(num);
    this.setState({ attempts: [...this.state.attempts, num] });
    if (num === this.state.target) {
      this.setState({ message: "game won" });
      setTimeout(() => this.setState({ difficulty: "", attempts: [] }), 1000);
    } else if (num < this.state.lower || num > this.state.upper) {
      this.setState({ message: "out of bounds" });
    } else if (num < this.state.target) {
      this.setState({ message: "too low" });
    } else if (num > this.state.target) {
      this.setState({ message: "too high" });
    }
    if (this.attemptsRemaining === 0) {
      this.setState({ message: "game over" });
      setTimeout(() => this.setState({ difficulty: "", attempts: [] }), 1000);
    }
  }

  help() {
    console.log("help");
  }

  render() {
    return (
      <>
        <p>{this.state.target}</p>
        <View
          initGame={({ target: button }) => this.initGame(button.value)}
          lower={this.state.lower}
          higher={this.state.higher}
          attempts={this.attemptsRemaining}
          help={() => this.help()}
          guess={() => this.guess(this.state.guess)}
          onInput={(e) => {
            this.setState({ guess: e.target.value });
          }}
          difficulty={this.state.difficulty}
          message={this.state.message}
        />
      </>
    );
  }
}

export default App;
