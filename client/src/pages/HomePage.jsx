import { useChatRoomActions, useChatRooms } from "../context/chatRoomContext";
import useChatRoomListener from "../hooks/useChatRoomListener";
import { toastAnimation } from "../utils/toastAnimation";
import { useSocket } from "../context/socketContext";
import ChatRoom from "../features/Chatroom/ChatRoom";
import Sidebar from "../features/Sidebar/Sidebar";
import { useAuth } from "../context/authContext";
import { useNavigate } from "react-router-dom";
import Loader from "../components/ui/Loader";
import useToast from "../hooks/useToast";
import { memo, useEffect } from "react";
import "../stylesheets/home-page.css";

const HomePage = () => {
  const { joinRoomThroughUrl } = useChatRoomActions();
  const { emitJoinRoom } = useChatRoomListener();
  const { socket, isConnected } = useSocket();
  const { token, authLoading } = useAuth();
  const { chatRooms } = useChatRooms();
  const { showToast } = useToast();
  const navigate = useNavigate();

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

  if (!authLoading && !token) {
    // If no token, redirect to login
    showToast({ type: "error", payload: "Session expired. Please login." });
    navigate("/auth/login");
  }
  if (authLoading || !socket || !isConnected) return <Loader />;

  return (
    <main className="home">
      <Sidebar />
      <ChatRoom />
    </main>
  );
};

export default memo(HomePage);
