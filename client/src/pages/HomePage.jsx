import { useChatRoomActions, useChatRooms } from "../context/chatRoomContext";
import useChatRoomListener from "../hooks/useChatRoomListener";
import { toastAnimation } from "../utils/toastAnimation";
import { useSocket } from "../context/socketContext";
import ChatRoom from "../features/Chatroom/ChatRoom";
import Sidebar from "../features/Sidebar/Sidebar";
import Loader from "../components/ui/Loader";
import "../stylesheets/home-page.css";
import { memo, useEffect } from "react";
import { useAuth } from "../context/authContext";

const HomePage = () => {
  const { joinRoomThroughUrl } = useChatRoomActions();
  const { emitJoinRoom } = useChatRoomListener();
  const { socket, isConnected } = useSocket();
  const { chatRooms } = useChatRooms();
  // const { authLoading } = useAuth();

  useEffect(() => {
    if (socket && isConnected && chatRooms) {
      Object.keys(chatRooms).forEach(async (roomID) => {
        emitJoinRoom(roomID);
      });
    }
  }, [socket, isConnected, emitJoinRoom]);

  useEffect(() => {
    const params = new URLSearchParams(window.location.search);
    const roomID = params.get("roomID");
    toastAnimation(false);

    if (roomID) {
      joinRoomThroughUrl(roomID);

      // Remove the roomID from URL
      const newURL = window.location.origin + window.location.pathname;
      window.history.replaceState({}, document.title, newURL);
    }
  }, []);

  // if (authLoading || !socket || !isConnected) return <Loader />;
  if (!socket || !isConnected) return <Loader />;

  return (
    <main className="home">
      <Sidebar />
      <ChatRoom />
    </main>
  );
};

export default memo(HomePage);
