import { useChatRooms } from "../../../context/chatRoomContext";
import { useSelectRoom } from "../hooks/useSelectRoom";
import { useMemo } from "react";

export const SidebarLists = () => {
  const { chatRooms } = useChatRooms();

  const roomsToRender = useMemo(() => {
    return Object.values(chatRooms).filter(
      (room) => room.roomName !== "🌍 General"
    );
  }, [chatRooms]);

  return (
    <ul className="sidebar-nav__list">
      {roomsToRender.length < 1 ? (
        <>
          <p className="sidebar-nav__skeleton-p">It's a bit lonely here...</p>
          <p className="sidebar-nav__skeleton-p">
            Add a room to get started! 👀
          </p>
        </>
      ) : (
        roomsToRender.map((room) => {
          return (
            <SidebarItem
              key={`${room.roomName} | ${room.roomID}`}
              room={room}
            />
          );
        })
      )}
    </ul>
  );
};

const SidebarItem = ({ room }) => {
  const { selectChatRoom } = useSelectRoom();

  return (
    <li
      title={room.roomName}
      onClick={() => selectChatRoom(room)}
      className="sidebar-nav__item"
    >
      {room.roomName}
    </li>
  );
};
