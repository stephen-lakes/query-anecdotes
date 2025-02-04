import React from "react";
import PropTypes from "prop-types";

const ErrorPage = ({ message }) => {
  return (
    <div>
      <p>Anecdote service is not available due to problems in the server</p>
      {message}
    </div>
  );
};

ErrorPage.propTypes = {
  message: PropTypes.string,
};

export default ErrorPage;
