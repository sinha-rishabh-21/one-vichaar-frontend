"use client";
import dynamic from "next/dynamic";

const CollaborativeEditor = dynamic(() => import("@/components/textEditor"), {
  ssr: false,
});

const Home = () => {
  return (
    <div className="">
      <CollaborativeEditor />
    </div>
  );
};

export default Home;
