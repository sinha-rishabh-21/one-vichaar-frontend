"use client";
import { nanoid } from "nanoid";
import { useEffect, useState } from "react";
import { useRouter } from "next/navigation";
import axios from "axios";
import { Button } from "@/components/ui/button";
import { PlusIcon, SquareArrowOutUpRight, Trash2 } from "lucide-react";
import {
  Tooltip,
  TooltipContent,
  TooltipProvider,
  TooltipTrigger,
} from "@/components/ui/tooltip";

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
import { toast } from "sonner";

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
  const [IsChanged, setIsChanged] = useState<boolean>(false);
  const handlerDocClick = (docID: string) => () => {
    router.push(`/docs/${docID}`);
  };

  const handlerDocDelete = (docId: string) => {
    if (!token) return;
    axios
      .delete(`${process.env.NEXT_PUBLIC_SERVER}/deleteDoc/${docId}`, {
        withCredentials: true,
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then((res) => {
        console.log(res);
        setIsChanged(!IsChanged);
      })
      .catch((err) => {
        toast.error("Unable to Delete. Try Again!", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        console.log(err);
      });
  };

  async function redirectToNewDocument() {
    if (!token) return;
    const newId = nanoid(16);
    await axios
      .put(
        `${process.env.NEXT_PUBLIC_SERVER}/saveDoc`,
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
        toast.error("Unexpected Error. Try Again!", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        console.log(err);
      });
  }

  useEffect(() => {
    axios
      .get("/api/get-token", { withCredentials: true })
      .then((res) => setToken(res.data.token))
      .catch((err) => {
        toast.error("Unable to Authenticate", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        console.log("Error fetching token:", err);
      });
  }, []);

  useEffect(() => {
    if (!token) return;
    axios
      .get(`${process.env.NEXT_PUBLIC_SERVER}/listDocs`, {
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
        toast.error("Unable to fetch List. Try Again!", {
          action: {
            label: "Close",
            onClick: () => toast.dismiss(),
          },
        });
        console.log(err);
      });
  }, [token, IsChanged]);
  return (
    <div className="bg-[hsl(var(--card))] m-10 p-10 min-h-[600px] w-[95%] rounded-lg">
      <div className="flex justify-end m-4">
        {/* <Button onClick={redirectToNewDocument}>
          Create New Doc
          <PlusIcon />
        </Button> */}
        <Dialog>
          <TooltipProvider>
            <Tooltip>
              <TooltipTrigger asChild>
                <DialogTrigger asChild>
                  <Button>
                    <PlusIcon />
                  </Button>
                </DialogTrigger>
              </TooltipTrigger>
              <TooltipContent>
                <p>Create a new Doc</p>
              </TooltipContent>
            </Tooltip>
          </TooltipProvider>
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
              <Button
                type="submit"
                onClick={redirectToNewDocument}
                className=""
              >
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
              className="flex p-2 items-center justify-between mx-16 shadow-inner bg-[hsl(var(--background))] rounded-lg"
            >
              {doc.name}
              <div>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={handlerDocClick(doc.docID)}
                        className="ml-2"
                      >
                        {" "}
                        <SquareArrowOutUpRight />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> Goto This Doc</p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
                <TooltipProvider>
                  <Tooltip>
                    <TooltipTrigger asChild>
                      <Button
                        onClick={(e) => {
                          e.preventDefault();
                          handlerDocDelete(doc.docID);
                        }}
                        className="ml-2"
                      >
                        {" "}
                        <Trash2 />
                      </Button>
                    </TooltipTrigger>
                    <TooltipContent>
                      <p> Delete </p>
                    </TooltipContent>
                  </Tooltip>
                </TooltipProvider>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Dashboard;
