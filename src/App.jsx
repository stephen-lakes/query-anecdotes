import { useReducer } from "react";
import PropTypes from "prop-types";

export const Display = ({ counter }) => {
  return <div>{counter}</div>;
};

Display.propTypes = {
  counter: PropTypes.number.isRequired,
};

export const Button = ({ dispatch, type, label }) => {
  return (
    <button
      onClick={() => {
        dispatch({ type });
      }}
    >
      {label}
    </button>
  );
};

Button.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

const counterReducer = (state, action) => {
  switch (action.type) {
    case "INC":
      return state + 1;
    case "DEC":
      return state - 1;
    case "ZERO":
      return 0;
    default:
      return state;
  }
};

const App = () => {
  const [counter, counterDispatch] = useReducer(counterReducer, 0);

  return (
    <div>
      <Display counter={counter} />
      <Button dispatch={counterDispatch} type="INC" label="+" />
      <Button dispatch={counterDispatch} type="DEC" label="-" />
      <Button dispatch={counterDispatch} type="ZERO" label="0" />
    </div>
  );
};

export default App;
