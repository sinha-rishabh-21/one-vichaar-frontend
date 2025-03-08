"use client";
import { useEffect, useRef } from "react";
import Quill from "quill";
import QuillCursors from "quill-cursors";
import * as YJS from "yjs";
import { WebsocketProvider } from "y-websocket";
import { QuillBinding } from "y-quill";
import "quill/dist/quill.snow.css";

// Register Quill Cursors module
Quill.register("modules/cursors", QuillCursors);

const getRandomColor = () => {
  const colors = [
    "#FF5733",
    "#33FF57",
    "#3357FF",
    "#FF33A1",
    "#A133FF",
    "#33FFF5",
    "#FFC300",
    "#C70039",
  ];
  return colors[Math.floor(Math.random() * colors.length)];
};

interface CollaborativeEditorProps {
  id: string,
}

const CollaborativeEditor: React.FC<CollaborativeEditorProps> = ({ id }) => {
  const editorRef = useRef<HTMLDivElement | null>(null);
  const quillInstance = useRef<Quill | null>(null);

  useEffect(() => {
    if (editorRef.current && !quillInstance.current) {
      // Initialize Quill
      const quill = new Quill(editorRef.current, {
        placeholder: "Start collaborating...",
        theme: "snow",
        modules: {
          cursors: {
            transformOnTextChange: true,
          },
          toolbar: [
            [{ header: [1, 2, false] }],
            ["bold", "italic", "underline"],
            ["image", "code-block"],
          ],
          history: {
            userOnly: true,
          },
        },
      });

      // Initialize YJS
      const ydoc = new YJS.Doc();
      const provider = new WebsocketProvider(
        "ws://192.168.29.237:8000", // Change this to your WebSocket URL
        id,
        ydoc
      );
      const ytext = ydoc.getText("quill");

      // Bind Quill with YJS
      new QuillBinding(ytext, quill, provider.awareness);

      // Assign a unique color to each user
      provider.awareness.setLocalStateField("user", {
        name: `User-${Math.floor(Math.random() * 1000)}`, // Random user ID
        color: getRandomColor(),
      });

      quillInstance.current = quill;

      // Handle window blur
      const handleBlur = () => quill.blur();
      window.addEventListener("blur", handleBlur);

      return () => {
        window.removeEventListener("blur", handleBlur);
        editorRef.current = null;
      };
    }
  }, [id]);

  return <div ref={editorRef} id="editor" style={{ height: "400px" }} />;
};

export default CollaborativeEditor;
