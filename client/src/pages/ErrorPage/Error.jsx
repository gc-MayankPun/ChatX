import { animateErrorMessage } from "./utils/animateErrorMessage";
import { useRouteError } from "react-router-dom";
import ErrorTitle from "./components/ErrorTitle";
import ErrorChat from "./components/ErrorChat";
import { useEffect } from "react";
import "./styles/error-page.css";

const Error = () => {
  const error = useRouteError();

  useEffect(() => {
    animateErrorMessage();
  }, []);

  const is404Error = error.status === 404;
  return (
    <div className="error-wrapper">
      <ErrorTitle is404Error={is404Error} />
      <div className="error__chat-wrapper">
        <ErrorChat is404Error={is404Error} />
      </div>
    </div>
  );
};

export default Error;
