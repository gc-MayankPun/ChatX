import { createContext, useContext, useEffect, useRef, useState } from "react";
import { io } from "socket.io-client";

const SocketContext = createContext(null);

export const SocketProvider = ({ children }) => {
  const [isConnected, setIsConnected] = useState(false);
  const [socket, setSocket] = useState(null);
  const socketRef = useRef();

  useEffect(() => {
    const socketInstance = io(import.meta.env.VITE_SOCKET_SERVER_BASE_URL, {
      withCredentials: true,
      transports: ["websocket"],
      autoConnect: true,
    });

    socketRef.current = socketInstance;
    setSocket(socketInstance);

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      // console.log("✅ Socket connected", socketInstance.id);
      // console.log("User is Online")
    });

    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      // console.log("⚠️ Socket disconnected");
      // console.log("User is Offline")
    });

    return () => socketInstance.disconnect();
  }, []);

  return (
    <SocketContext.Provider
      value={{
        socket,
        isConnected,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};

export const useSocket = () => useContext(SocketContext);
