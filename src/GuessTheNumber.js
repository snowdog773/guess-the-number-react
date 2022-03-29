import { randomInteger } from "./random.js";

export default class GuessTheNumber {
	static TOO_LOW = Symbol('too low');
	static TOO_HIGH = Symbol('too high');
	static EXACT_MATCH = Symbol('exact match');
	static OUT_OF_BOUNDS = Symbol('out of bounds');
	static GAME_OVER = Symbol('game over');

	#lower;
	#upper;

	get lower() {
		return this.#lower;
	};
	get upper() {
		return this.#upper;
	};

	target;

	maxTries;
	attempts = [];

	get attemptsRemaining() {
		return this.maxTries - this.attempts.length;
	}

	constructor(settings = {}) {
		const {
			lower = 1,
			upper = 100,
			tries: maxTries = 10,
		} = settings;

		this.#lower = lower;
		this.#upper = upper;

		Object.assign(this, {
			maxTries,
			target: randomInteger(lower, upper),
		});
	}

	guess(num = 1) {
		this.attempts.push(num);

		if (this.attemptsRemaining === 0)
			return GuessTheNumber.GAME_OVER;

		if (num === this.target)
			return GuessTheNumber.EXACT_MATCH;

		if (num < this.lower || num > this.upper)
			return GuessTheNumber.OUT_OF_BOUNDS;

		if (num < this.target)
			return GuessTheNumber.TOO_LOW;

		if (num > this.target)

		return GuessTheNumber.TOO_HIGH;
	}

	help() {
		const lastGuess = this.attempts.at(-1);

		if (isNaN(lastGuess))
			return 0;

		return Math.ceil(Math.abs(this.target - lastGuess) / 10) * 10;
	}
}
