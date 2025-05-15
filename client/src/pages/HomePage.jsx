import "../stylesheets/home-page.css";
import Sidebar from "../components/layout/Sidebar";
import ChatRoom from "../components/layout/ChatRoom";
import { useContext, useEffect } from "react";
import { ChatContext } from "../context/chatContext";

const HomePage = () => {
  const { setIsActionInProgress } = useContext(ChatContext);

  useEffect(() => {
    console.log("Mujhe kyu todha?");
    setIsActionInProgress(false);
  }, []);

  return (
    <main className="app-wrapper">
      <Sidebar />
      <ChatRoom />
    </main>
  );
};

export default HomePage;
