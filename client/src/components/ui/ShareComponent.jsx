import { useChatRoomActions } from "../../context/chatRoomContext";
import useToast from "../../hooks/useToast";

const ShareComponent = ({ roomID, roomName, closeToast }) => {
  const { leaveRoom } = useChatRoomActions();
  const { showToast } = useToast();

  const handleShare = async () => {
    if (navigator.share) {
      closeToast();

      const baseURL = window.location.origin;
      const shareURL = `${baseURL}?roomID=${encodeURIComponent(roomID)}`;
      try {
        await navigator.share({
          // title: `Join my chat room "${roomName}"`,
          // text: `Hey! I created a chat room called "${roomName}".\n\nTo join:\n1. Open the app: ${baseURL}\n2. Paste this Room ID: ${roomID}`,
          title: `Join my chat room "${roomName}"`,
          text: `Hey! I created a chat room called "${roomName}".\n\nJoin me here:\n${shareURL}`,
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
      await navigator.clipboard.writeText(roomID);
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
      leaveRoom(roomID);
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
