"use client";
import { Button } from "@/components/ui/button";
import Link from "next/link";
import Image from "next/image";

const Home = () => {
  return (
    <div className="flex justify-around sm:flex-row flex-col items-center">
      <div className="flex flex-col justify-center items-center h-[700px] p-20">
        <h1 className="sm:text-[50px] text-[30px] font-semibold">
          ONE VICHAAR
        </h1>
        <h1>Its Fun when Everyone Collab</h1>
        <div className="flex gap-4 mt-10">
          <Link href="/login" prefetch={false}>
            <Button>Login</Button>
          </Link>
          <Link href="/register" prefetch={false}>
            <Button>Register</Button>
          </Link>
        </div>
      </div>
      <Image alt="" src="/homeBG.svg" width={500} height={500} />
    </div>
  );
};

export default Home;
