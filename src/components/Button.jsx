import { useContext } from "react";
import CounterContext from "../CounterContext";
import PropTypes from "prop-types";

const Button = ({ type, label }) => {
  const [counter, dispatch] = useContext(CounterContext);
  return <button onClick={() => dispatch({ type })}>{label}</button>;
};

Button.propTypes = {
  dispatch: PropTypes.func.isRequired,
  type: PropTypes.string.isRequired,
  label: PropTypes.string.isRequired,
};

export default Button;
