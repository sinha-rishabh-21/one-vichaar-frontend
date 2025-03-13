"use client";
import React, { useState, useEffect } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { MoonStar, Sun, Copy, Delete } from "lucide-react";
import Image from "next/image";
import Link from "next/link";
import checkURL from "./utils/checkURL";
import { usePathname } from "next/navigation";
import axios from "axios";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

const Navbar = () => {
  const [darkMode, setDarkMode] = useState<boolean>(false);
  const [isDocsPage, setIsDocsPage] = useState<boolean>(false);
  const [token, setToken] = useState<string | null>(null); // Ensure token is nullable
  const pathname = usePathname();
  const [copied, setCopied] = useState<boolean>(false);

  useEffect(() => {
    axios
      .get("/api/get-token", { withCredentials: true })
      .then((res) => setToken(res.data.token || null))
      .catch((err) => {
        console.error("Error fetching token:", err);
        setToken(null);
      });
  }, [pathname]);

  useEffect(() => {
    // Check user preference from localStorage
    const isDark = localStorage.getItem("theme") === "dark";
    if (isDark) {
      document.documentElement.classList.add("dark");
      setDarkMode(true);
    }
  }, []);

  useEffect(() => {
    setIsDocsPage(checkURL(pathname));
  }, [pathname]);

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

  const copyToClipboard = () => {
    navigator.clipboard.writeText(window.location.href).then(() => {
      setCopied(true);
      setTimeout(() => setCopied(false), 2000); // Reset after 2 seconds
    });
  };

  return (
    <div className="bg-[hsl(var(--navbar-bg))] h-16 flex items-center px-10 justify-end gap-x-5 shadow-sm">
      <div>
        <div className="h-3" />
        <Link href={"/"}>
          <Image
            alt=""
            src={`${
              !darkMode ? "/one-vichaar-black.svg" : "/one-vichaar-white.svg"
            }`}
            width={200}
            height={10}
          />
        </Link>
      </div>
      <div className="flex-grow"></div>
      {isDocsPage && (
        <div className="flex items-center gap-x-2">
          <Input className="w-64" type="text" value={document.URL} readOnly />
          {copied ? (
            "copied"
          ) : (
            <TooltipProvider>
              <Tooltip>
                <TooltipTrigger asChild>
                  <Button onClick={copyToClipboard}>
                    <Copy size={18} />
                  </Button>
                </TooltipTrigger>
                <TooltipContent>
                  <p>Copy Link</p>
                </TooltipContent>
              </Tooltip>
            </TooltipProvider>
          )}
        </div>
      )}
      <TooltipProvider>
        <Tooltip>
          <TooltipTrigger asChild>
            <Button onClick={toggleTheme}>
              {darkMode ? <Sun size={18} /> : <MoonStar size={18} />}
            </Button>
          </TooltipTrigger>
          <TooltipContent>
            <p>Toggle Dark Mode</p>
          </TooltipContent>
        </Tooltip>
      </TooltipProvider>
      {token && (
        <TooltipProvider>
          <Tooltip>
            <TooltipTrigger asChild>
              <Link href="/logout">
                <Button>
                  <Delete />
                </Button>
              </Link>
            </TooltipTrigger>
            <TooltipContent>
              <p>Logout</p>
            </TooltipContent>
          </Tooltip>
        </TooltipProvider>
      )}
    </div>
  );
};

export default Navbar;
