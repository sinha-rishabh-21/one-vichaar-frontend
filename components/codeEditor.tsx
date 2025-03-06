"use client";
import { useState } from "react";
import { Editor } from "@monaco-editor/react";
import {
  Select,
  SelectContent,
  SelectGroup,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";

export default function CodeEditor() {
  const [language, setLanguage] = useState<string>("javascript");
  return (
    <div>
      <div className="flex items-center justify-end p-5">
        <Select onValueChange={setLanguage}>
          <SelectTrigger className="w-[180px]">
            <SelectValue placeholder="JavaScript" />
          </SelectTrigger>
          <SelectContent>
            <SelectGroup>
              <SelectItem value="javascript">JavaScript</SelectItem>
              <SelectItem value="cpp">C++</SelectItem>
              <SelectItem value="python">Python</SelectItem>
            </SelectGroup>
          </SelectContent>
        </Select>
      </div>
      <Editor
        height="90vh"
        defaultLanguage="javascript"
        defaultValue="// Write your code here"
        theme="vs-dark"
        language={language}
        options={{ language }}
      />
    </div>
  );
}
