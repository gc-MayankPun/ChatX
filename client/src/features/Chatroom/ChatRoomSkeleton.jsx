import SidebarToggler from "../../components/ui/SidebarToggler";
import "./styles/chat-room-skeleton.css";

const ChatRoomSkeleton = () => {
  return (
    <div className="chat-room_skeleton">
      <SidebarToggler />

      <div className="chat-room_skeleton__text">
        <p>
          👋 Welcome to <strong>ChatX</strong> — where chaos meets conversation,
          and your secrets don't stick around.
        </p>
        <p>
          🌍 Want to shout into the void? Head over to{" "}
          <strong>General Chat</strong> — everyone's invited, even that one
          weird kid who always shows up.
        </p>

        <p className="mobile-only">
          📱 On mobile? That sidebar isn't just for show — tap it like you mean
          it!
        </p>
        <p className="desktop-only">
          ➕ Desktop gang? Smash that plus icon and create your own secret
          hideout (aka a chatroom).
        </p>

        <p>
          💬 Chats in your private rooms? They live only in real-time memory —
          no localStorage, no databases, no receipts. Close the tab or bounce,
          and your chats vanish like a magician's trick. 🪄
        </p>
        <p>
          ✨ Feel free to confess your love, drop memes, or overshare
          dramatically — ChatX doesn't judge (but hey, we might log it for
          science). 🌚
        </p>
        
        <p>
          💡 <strong>Quick tip:</strong> Create your own room or join others 
          for more flexibility and privacy than general chat.
        </p>
      </div>
    </div>
  );
};

export default ChatRoomSkeleton;
