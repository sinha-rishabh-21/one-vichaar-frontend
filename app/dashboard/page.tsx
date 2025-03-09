"use client";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusIcon, SquareArrowOutUpRight } from "lucide-react";
//import getToken from "@/components/utils/getToken";
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogHeader,
  DialogTitle,
  DialogTrigger,
  DialogFooter,
} from "@/components/ui/dialog";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";

interface DocListProps {
  name: string;
  docID: string;
  _id: string;
}

const Dashboard = () => {
  const router = useRouter();
  const [docList, setDocList] = useState<DocListProps[]>([]);
  const [token, setToken] = useState<string | null>(null);
  const [docName, setDocName] = useState<string>("");

  const handlerDocClick = (docID: string) => () => {
    router.push(`/docs/${docID}`);
  };

  async function redirectToNewDocument() {
    if (!token) return;
    const newId = nanoid(16);
    await axios
      .put(
        "http://localhost:8000/saveDoc",
        {
          docID: newId,
          docName: docName,
        },
        {
          withCredentials: true,
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      )
      .then((res) => {
        console.log(res);
        router.push(`/docs/${newId}`);
      })
      .catch((err) => {
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("/api/get-token", { withCredentials: true })
      .then((res) => setToken(res.data.token))
      .catch((err) => console.error("Error fetching token:", err));
  }, []);

  useEffect(() => {
    if (!token) return;
    axios
      .get("http://localhost:8000/listDocs", {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res.data);
        setDocList(res.data);
      })
      .catch((err) => {
        console.log(err);
      });
  }, [token]);
  return (
    <div className="bg-white m-10 p-10 h-[800px] w-[95%] rounded-lg">
      <div className="flex justify-end m-4">
        {/* <Button onClick={redirectToNewDocument}>
          Create New Doc
          <PlusIcon />
        </Button> */}
        <Dialog>
          <DialogTrigger asChild>
            <Button>
              Create a new Doc
              <PlusIcon />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Enter a name</DialogTitle>
              <DialogDescription>
                Enter a name for the doc here.
              </DialogDescription>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <Label htmlFor="name" className="text-right">
                  Name
                </Label>
                <Input
                  id="name"
                  value={docName}
                  onChange={(e) => {
                    setDocName(e.target.value);
                  }}
                  className="col-span-3"
                />
              </div>
            </div>
            <DialogFooter>
              <Button type="submit" onClick={redirectToNewDocument}>
                Create New Doc
              </Button>
            </DialogFooter>
          </DialogContent>
        </Dialog>
      </div>
      <div className="flex flex-col gap-3">
        {docList.map((doc) => {
          return (
            <div
              key={doc._id}
              className="flex p-2 items-center justify-between mx-16 shadow-inner bg-gray-100 rounded-lg"
            >
              {doc.name}
              <Button onClick={handlerDocClick(doc.docID)} className="ml-2">
                Goto This Doc <SquareArrowOutUpRight />
              </Button>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
