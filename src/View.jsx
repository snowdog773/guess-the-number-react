export default function View(props) {
  if (props.difficulty) {
    return (
      <>
        <h2>
          {`Guess the number between ${props.lower} and ${props.upper} in ${props.attempts} tries.`}
        </h2>

        <input onChange={props.onInput} type="number" />
        <button onClick={props.guess}>Guess</button>
        <button onClick={props.help}>Help</button>
        <p>{props.message}</p>
      </>
    );
  } else {
    return (
      <>
        <h1>Guess the Number</h1>
        <h2>Select difficulty</h2>
        <button value="easy" onClick={props.initGame}>
          Easy
        </button>
        <button value="medium" onClick={props.initGame}>
          Medium
        </button>
        <button value="hard" onClick={props.initGame}>
          Hard
        </button>
      </>
    );
  }
}
