import { useEffect } from "react";
import "../stylesheets/home-page.css";
import Sidebar from "../components/layout/Sidebar";
import ChatRoom from "../components/layout/ChatRoom";
import { useSocket } from "../context/socketContext";
import Loader from "../components/ui/Loader";

const HomePage = () => {
  const { socket, isConnected } = useSocket();

  useEffect(() => {
    console.log("Mujhe kyu todha?");
  }, []);

  if (!socket || !isConnected) return <Loader />;

  return (
    <main className="app-wrapper">
      <Sidebar />
      <ChatRoom />
    </main>
  );
};

export default HomePage;
