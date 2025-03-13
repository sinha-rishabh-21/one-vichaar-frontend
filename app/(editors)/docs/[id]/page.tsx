"use client";
import dynamic from "next/dynamic";
import { useEffect, useState } from "react";

const CollaborativeEditor = dynamic(() => import("@/components/textEditor"), {
  ssr: false, // Disable Server-Side Rendering
});

const Home = ({ params }: { params: Promise<{ id: string }> }) => {
  const [id, setId] = useState<string>("");
  useEffect(() => {
    const fetchId = async () => {
      const { id } = await params;
      setId(id);
    };
    fetchId();
  }, [params]);
  return (
    <div className="p-10">
      <div className="bg-[hsl(var(--card))] shadow-xl">
        {id ? <CollaborativeEditor id={id} /> : <p>Loading...</p>}
      </div>
    </div>
  );
};

export default Home;
