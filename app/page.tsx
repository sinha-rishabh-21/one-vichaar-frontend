"use client";
import { nanoid } from "nanoid";
import { Button } from "@/components/ui/button";
import { useRouter } from "next/navigation"; // ✅ Use useRouter()

const Home = () => {
  const router = useRouter(); // ✅ Initialize router

  function redirectToNewDocument() {
    const newId = nanoid(16);
    router.push(`/docs/${newId}`); // ✅ Client-side navigation
  }

  return (
    <div>
      This is the home page.
      <Button onClick={redirectToNewDocument}>Generate new ID</Button>
    </div>
  );
};

export default Home;
