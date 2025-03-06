import { useEffect, useState } from "react";

const useSocket = () => {
  const [socket, setSocket] = useState<WebSocket | null>(null);

  useEffect(() => {
    const ws = new WebSocket("ws://localhost:8000"); // Connect to WebSocket server

    ws.onopen = () => {
      console.log("✅ Connected to WebSocket Server");
    };

    ws.onmessage = (event) => {
      console.log("📩 Received:", event.data);
    };

    ws.onclose = () => {
      console.log("❌ Disconnected from WebSocket Server");
    };

    setSocket(ws);

    return () => {
      ws.close();
    };
  }, []);

  return socket;
};

export default useSocket;
