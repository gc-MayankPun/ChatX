import "../stylesheets/home-page.css";
import Sidebar from "../components/layout/Sidebar";
import ChatRoom from "../components/layout/ChatRoom";

const HomePage = () => {
  console.log("Mujhe kyu todha?");

  return (
    <main className="app-wrapper">
      <Sidebar />
      <ChatRoom />
    </main>
  );
};

export default HomePage;
