import React, { useRef } from "react";
import "../stylesheets/home-page.css";
import { useContext } from "react";
import { UserContext } from "../context/UserContext";
import Sidebar from "../components/layout/Sidebar";
import ChatBox from "../components/layout/ChatBox";

const HomePage = () => {
  const { user } = useContext(UserContext);
  console.log("Mujhe kyu todha?")

  return (
    <main className="app-wrapper">
      <Sidebar />
      <ChatBox />
    </main>
  );
};

export default HomePage;
