import { useNavigate } from "react-router-dom";
import PageNotFound from "./PageNotFound";
import ErrorPage from "./ErrorPage";

const ErrorChat = ({ is404Error }) => {
  const navigate = useNavigate();

  return (
    <div className="error__chat">
      {is404Error ? <PageNotFound /> : <ErrorPage />}

      <div className="error__button-container error__chat-div">
        <button className="error__back-button" onClick={() => navigate(-1)}>
          Go Back
        </button>
        <button
          className="error__refresh-button"
          onClick={() => window.location.reload()}
        >
          Try Again
        </button>
      </div>
    </div>
  );
};

export default ErrorChat;
