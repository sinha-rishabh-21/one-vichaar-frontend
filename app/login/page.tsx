"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";

const LoginPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handlerSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    try {
      const res = await axios.post(
        `${process.env.NEXT_PUBLIC_SERVER}/login`,
        { email, password },
        { withCredentials: true } // ✅ Allows cookies
      );
      console.log(res);
      router.push("/dashboard");
    } catch (err) {
      toast.error("Login Failed. Try Again!", {
        action: {
          label: "Close",
          onClick: () => toast.dismiss(),
        },
      });
      console.log(err);
    }
  };

  return (
    <div className="flex justify-center items-center h-[700px]">
      <div className="flex justify-center items-center bg-[hsl(var(--card))] h-96 rounded-xl shadow-md w-80">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={handlerSubmit}
        >
          <h1 className="text-2xl font-semibold text-center">Login</h1>
          <Input
            type="email"
            placeholder="Email"
            className="mt-4 w-3/4 bg-[hsl(var(--background))]"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            required
          />
          <Input
            type="password"
            placeholder="Password"
            className="mt-4 w-3/4 bg-[hsl(var(--background))]"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            required
          />
          <Button type="submit" className="mt-4 w-3/4">
            Login
          </Button>
          <p className="mt-3 text-sm">
            New to One-Vichhar?{" "}
            <Link href="/register" className="text-blue-600">
              JOIN NOW
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default LoginPage;
