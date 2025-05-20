import { useEffect } from "react";
import useChatRoomListener from "../hooks/useChatRoomListener";
import useMessageHandler from "../hooks/useMessageHandler";
import { useChatRoom } from "../context/chatRoomContext";
import ChatRoom from "../components/layout/ChatRoom";
import { useSocket } from "../context/socketContext";
import Sidebar from "../components/layout/Sidebar";
import Loader from "../components/ui/Loader";
import "../stylesheets/home-page.css";

const HomePage = () => {
  const { fetchGeneralMessages } = useMessageHandler();
  const { emitJoinRoom } = useChatRoomListener();
  const { socket, isConnected } = useSocket();
  const { chatRooms, joinRoomThroughUrl } = useChatRoom();

  useEffect(() => {
    if (socket && isConnected && chatRooms) {
      Object.keys(chatRooms).forEach((roomID) => {
        if (roomID === "🌍 General") {
          fetchGeneralMessages();
        }
        emitJoinRoom(roomID);
      });
    }
  }, [socket, isConnected, emitJoinRoom, fetchGeneralMessages]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomID = params.get("roomID");

    if (roomID) {
      console.log("Yes");
      joinRoomThroughUrl(roomID);

      // Remove the roomID from URL (optional cleanup)
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
