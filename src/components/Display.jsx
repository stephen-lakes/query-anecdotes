import PropTypes from "prop-types";
import { useCounterValue } from "../CounterContext";

const Display = () => {
  const counter = useCounterValue();
  return <div>{counter}</div>;
};

Display.propTypes = {
  counter: PropTypes.number.isRequired,
};

export default Display;
