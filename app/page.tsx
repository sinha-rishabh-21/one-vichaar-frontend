"use client";
import { Button } from "@/components/ui/button";
//import { useRouter } from "next/navigation";
import Link from "next/link";

const Home = () => {
  //const router = useRouter();
  return (
    <div className="flex justify-center items-center h-[700px] gap-5">
      <Link href="/login" prefetch={false}>
        <Button>Login</Button>
      </Link>
      <Link href="/register" prefetch={false}>
        <Button>Register</Button>
      </Link>
    </div>
  );
};

export default Home;
