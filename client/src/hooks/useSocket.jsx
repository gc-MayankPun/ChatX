import { useEffect, useState, useRef } from "react";
import { io } from "socket.io-client";

let socketInstance = null;

const useSocket = () => {
  const [isConnected, setIsConnected] = useState(false);
  const socketRef = useRef();

  useEffect(() => {
    if (!socketInstance) {
      socketInstance = io("http://localhost:3000"); // Your backend server
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
