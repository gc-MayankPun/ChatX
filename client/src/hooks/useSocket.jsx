import { useState, useEffect, useRef } from "react";
import { io } from "socket.io-client";

let socketInstance = null;

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io(import.meta.env.VITE_SOCKET_SERVER_BASE_URL, {
        withCredentials: true
      });
    }

    socketRef.current = socketInstance;

    socketRef.current.on("connect", () => {
      setIsConnected(true);
      console.log("✅ Socket connected", socketRef.current.id);
    });
 
    socketRef.current.on("disconnect", () => {
      setIsConnected(false);
      console.log("⚠️ Socket disconnected");
    });

    return () => {
      socketRef.current.disconnect();
    };
  }, []);

  return { socket: socketRef.current, isConnected };
};

export default useSocket;
