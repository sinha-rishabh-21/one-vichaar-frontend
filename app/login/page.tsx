"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        "http://localhost:8000/login",
        { email, password },
        { withCredentials: true } // ✅ Allows cookies
      );
      console.log(res);
      router.push("/dashboard");
    } catch (err) {
      console.error("Login failed:", err);
    }
  };

  return (
    <div className="flex justify-center items-center h-[700px]">
      <div className="flex justify-center items-center bg-gray-50 h-96 rounded-xl shadow-md w-80">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handlerSubmit}
        >
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <Input
            type="email"
            placeholder="Email"
            className="mt-4 w-3/4"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            className="mt-4 w-3/4"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="mt-4 w-3/4">
            Login
          </Button>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
