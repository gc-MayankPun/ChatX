import { useSidebar } from "../../context/sidebarContext";
import { GoSidebarCollapse } from "react-icons/go";
import "../../stylesheets/chat-room-skeleton.css";

const ChatRoomSkeleton = () => {
  const { openSidebar } = useSidebar();

  return (
    <div className="chat-room_skeleton">
      <span className="toggle-sidebar center-icon" onClick={openSidebar}>
        <GoSidebarCollapse />
      </span>

      <div className="chat-room_skeleton__text">
        <p>
          👋 Welcome to <strong>ChatX</strong> — where chaos meets conversation.
        </p>
        <p>
          🌍 Want to shout into the void? Try <strong>General Chat</strong> —
          everyone's invited, even that one weird kid.
        </p>

        <p className="mobile-only">
          📱 On mobile? That sidebar isn't just vibing — tap it like you mean
          it!
        </p>
        <p className="desktop-only">
          ➕ Desktop gang? Smash that plus icon and birth a brand-new chatroom.
        </p>

        <p>
          🧠 We store your user data — but only while you're active. Go MIA for
          3 days and poof, you're gone. Not ghosted — *auto-deleted*. Thanks,
          MongoDB free tier.
        </p>
        <p>
          💬 By the way, we don't store your chats because, well, MongoDB's free
          tier isn't big enough to handle that kind of drama. 😅
        </p>
        <p>
          ✨ Confess your love, drop memes, or overshare dramatically — ChatX
          doesn't judge (but we might log it for science) 🌚.
        </p>
      </div>
    </div>
  );
};

export default ChatRoomSkeleton;
