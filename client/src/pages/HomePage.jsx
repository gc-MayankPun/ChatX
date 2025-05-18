import { useEffect } from "react";
import useChatRoomHandler from "../hooks/useChatRoomHandler";
import useMessageHandler from "../hooks/useMessageHandler";
import { useChatRoom } from "../context/chatRoomContext";
import ChatRoom from "../components/layout/ChatRoom";
import { useSocket } from "../context/socketContext";
import Sidebar from "../components/layout/Sidebar";
import Loader from "../components/ui/Loader";
import "../stylesheets/home-page.css";

const HomePage = () => {
  console.log("Home");
  // const { fetchGeneralMessages } = useMessageHandler();
  const { emitJoinRoom } = useChatRoomHandler();
  const { socket, isConnected } = useSocket();
  const { chatRooms } = useChatRoom();

  useEffect(() => {
    if (socket && isConnected && chatRooms) {
      console.log("Yes You")
      Object.keys(chatRooms).forEach((roomID) => {
        // if (roomID === "🌍 General") {
        //   fetchGeneralMessages();
        //   console.log("Fetching from database");
        // }
        console.log(`Joining ${chatRooms[roomID].roomName}`);
        emitJoinRoom(roomID);
      });
    }

    // }, [socket, isConnected, chatRooms, emitJoinRoom]);
  // }, [socket, isConnected, emitJoinRoom]);
  // }, [socket, isConnected, emitJoinRoom, fetchGeneralMessages]);
  }, [socket, isConnected, emitJoinRoom]);

  // useEffect(() => {
  //   if (socket && isConnected && chatRooms) {
  //     Object.keys(chatRooms).forEach((roomID) => {
  //       if (!joinedRooms.current.has(roomID)) {
  //         console.log("Joining room:", roomID);
  //         emitJoinRoom(roomID);
  //         joinedRooms.current.add(roomID);
  //       }
  //     });
  //   }
  // }, [socket, isConnected, chatRooms, emitJoinRoom]);

  if (!socket || !isConnected) return <Loader />;

  return (
    <main className="home">
      <Sidebar />
      <ChatRoom />
    </main>
  );
};

export default HomePage;
