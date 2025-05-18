import { useChatRoom } from "../../context/chatRoomContext";
import useChatRoomHandler from "../../hooks/useChatRoomHandler";
import useToast from "../../hooks/useToast";

const ShareComponent = ({ shareURL, closeToast }) => {
  // const { leaveRoom } = useChatRoomHandler();
  const { leaveRoom } = useChatRoom();
  const { showToast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      closeToast();
      try {
        await navigator.share({
          title: "Join my room!",
          text: `Here's the room ID: ${shareURL}`,
        });
      } catch (error) {
        showToast({
          type: "error",
          payload: "Failed to share",
          config: { position: "bottom-right" },
        });
      }
    } else {
      showToast({
        type: "info",
        payload: "Sharing is not supported on this device.",
        config: { position: "bottom-right" },
      });
    }
  };

  const handleCopy = async () => {
    closeToast();
    try {
      await navigator.clipboard.writeText(shareURL);
      showToast({
        type: "success",
        payload: "Room ID copied to clipboard!",
        config: { position: "bottom-right" },
      });
    } catch (error) {
      showToast({
        type: "error",
        payload: "Failed to copy room ID.",
        config: { position: "bottom-right" },
      });
    }
  };

  const handleLeave = () => {
    closeToast();
    try {
      leaveRoom(shareURL);
      showToast({
        type: "success",
        payload: "You left the room!",
        config: { position: "bottom-right" },
      });
    } catch (error) {
      showToast({
        type: "error",
        payload: "Failed to leave room.",
        config: { position: "bottom-right" },
      });
    }
  };

  return (
    <div className="share-toast">
      <h1 className="share-toast__heading">Room Options</h1>
      <div className="share-toast__action">
        <div className="share-toast__row">
          <button onClick={handleShare} className="share-toast__button share">
            <span className="share-toast__icon center-icon">📤</span> Share
          </button>
          <button onClick={handleCopy} className="share-toast__button copy">
            <span className="share-toast__icon center-icon">📋</span> Copy
          </button>
        </div>
        <button onClick={handleLeave} className="share-toast__button leave">
          <span className="share-toast__icon center-icon">🙋‍♂️</span> Leave
        </button>
      </div>
    </div>
  );
};

export default ShareComponent;
