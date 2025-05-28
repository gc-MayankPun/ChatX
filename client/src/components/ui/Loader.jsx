import "../../stylesheets/loader.css"; 
import { ImSpinner9 } from "react-icons/im";

const Loader = () => {
  return (
    <div className="loader-container">
      <div className="loading-spinner">
        <span className="center-icon spin loader-icon">
          <ImSpinner9 />
        </span>
        <p className="loader-text">Loading...</p>
      </div>
    </div>
  );
};

export default Loader;
