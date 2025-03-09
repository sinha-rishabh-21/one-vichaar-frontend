"use client";
import React from "react";
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoonStar, Sun, Copy } from "lucide-react";
// import { io } from 'socket.io-client';

// const socket = io("http://localhost:3001", {
//   transports: ["websocket"], // Use WebSocket transport
//   reconnection: true,
// });

const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);

  //const [text, setText] = useState<string>('');

  // useEffect(() =>{
  //     socket.on("document", (data: string) => {
  //       setText(data);
  //     });
  //     return () => {
  //       socket.off("document"); // Clean up event listener
  //     };
  // },[])

  useEffect(() => {
    // Check user preference from localStorage
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  const toggleTheme = () => {
    if (darkMode) {
      document.documentElement.classList.remove("dark");
      localStorage.setItem("theme", "light");
    } else {
      document.documentElement.classList.add("dark");
      localStorage.setItem("theme", "dark");
    }
    setDarkMode(!darkMode);
  };
  //const textToCopy = "https://google.com/";
  // const [copied, setCopied] = useState<boolean>(false);
  // const copyToClipboard = async () => {
  //   try {
  //     await navigator.clipboard.writeText(textToCopy);
  //     setCopied(true);
  //     setTimeout(() => setCopied(false), 2000); // Reset after 2 sec
  //   } catch (err) {
  //     console.error("Failed to copy!", err);
  //   }
  // };
  return (
    <div className="h-16 flex items-center px-10 justify-end gap-x-5 shadow-sm bg-white dark:bg-gray-500">
      <Input className="w-64" type="text" readOnly />
      <Button className="">
        <Copy size={18} />
      </Button>
      <Button className="" onClick={toggleTheme}>
        {darkMode ? <Sun size={18} /> : <MoonStar size={18} />}
      </Button>
    </div>
  );
};

export default Navbar;
