import { useChatRoomActions, useChatRooms } from "../context/chatRoomContext";
import useChatRoomListener from "../hooks/useChatRoomListener";
import useMessageHandler from "../hooks/useMessageHandler";
import { toastAnimation } from "../utils/toastAnimation";
import ChatRoom from "../components/layout/ChatRoom";
import { useSocket } from "../context/socketContext";
import Sidebar from "../components/layout/Sidebar";
import Loader from "../components/ui/Loader";
import "../stylesheets/home-page.css";
import { useEffect } from "react";

const HomePage = () => {
  const { fetchGeneralMessages } = useMessageHandler();
  const { joinRoomThroughUrl } = useChatRoomActions();
  const { emitJoinRoom } = useChatRoomListener();
  const { socket, isConnected } = useSocket();
  const { chatRooms } = useChatRooms();

  useEffect(() => {
    if (socket && isConnected && chatRooms) {
      Object.keys(chatRooms).forEach(async (roomID) => {
        if (roomID === "🌍 General") {
          // fetchGeneralMessages();
        }
        emitJoinRoom(roomID);
      });
    }
  }, [socket, isConnected, emitJoinRoom, fetchGeneralMessages]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomID = params.get("roomID");
    toastAnimation(false);

    if (roomID) {
      console.log("Yes");
      joinRoomThroughUrl(roomID);

      // Remove the roomID from URL
      const newURL = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newURL);
    }
  }, []);

  if (!socket || !isConnected) return <Loader />;

  return (
    <main className="home">
      <Sidebar />
      <ChatRoom />
    </main>
  );
};

export default HomePage;
