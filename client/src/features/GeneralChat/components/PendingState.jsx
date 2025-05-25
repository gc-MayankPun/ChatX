import Spinner from "../../../components/ui/Spinner";
import "../styles/pending-general-chat.css";

const PendingState = () => {
  return (
    <Spinner
      text={"Connecting to the cosmos..."}
      className={"loading-container"}
    />
  );
};

export default PendingState;
