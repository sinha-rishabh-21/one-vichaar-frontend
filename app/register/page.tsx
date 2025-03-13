"use client";
import React from "react";
import { useState } from "react";
import { useRouter } from "next/navigation";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import { toast } from "sonner";

const RegisterPage = () => {
  const router = useRouter();
  const [email, setEmail] = useState("");
  const [name, setName] = useState("");
  const [password, setPassword] = useState("");

  const hanlderSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    axios
      .post(`${process.env.NEXT_PUBLIC_SERVER}/register`, {
        name,
        email,
        password,
      })
      .then((res) => {
        console.log(res);
        router.push("/login");
      })
      .catch((err) => {
        toast.error("Unable to Register. Try Again!", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        console.log(err);
      });
  };
  return (
    <div className="flex justify-center items-center h-[700px]">
      <div className="flex justify-center items-center bg-[hsl(var(--card))] h-[400px] rounded-xl shadow-md w-80">
        <form
          className="flex flex-col items-center w-full"
          onSubmit={hanlderSubmit}
        >
          <h1 className="text-2xl font-semibold text-center">Register</h1>
          <Input
            type="name"
            name="name"
            placeholder="Name"
            className="mt-4 w-3/4 bg-[hsl(var(--background))]"
            onChange={(e) => setName(e.target.value)}
          />
          <Input
            type="email"
            name="email"
            placeholder="Email"
            className="mt-4 w-3/4 bg-[hsl(var(--background))]"
            onChange={(e) => setEmail(e.target.value)}
          />
          <Input
            type="password"
            name="password"
            placeholder="Password"
            className="mt-4 w-3/4 bg-[hsl(var(--background))]"
            onChange={(e) => setPassword(e.target.value)}
          />
          <Button type="submit" className="mt-4 w-3/4 ">
            Become our member
          </Button>
          <p className="mt-3 text-sm">
            Already a member?{" "}
            <Link href="/login" className="text-blue-600">
              LOGIN
            </Link>
          </p>
        </form>
      </div>
    </div>
  );
};

export default RegisterPage;
