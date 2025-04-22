"use client";

import React, { useState } from "react";
import Editor from "@monaco-editor/react";
import type { Snippet } from "@/generated/prisma";
import { Button } from "./ui/button";
import { editAndSaveSnippet } from "@/actions";

const EditSnippetsForm = ({ snippet }: { snippet: Snippet }) => {
  const [code, setcode] = useState(snippet.code);

  const editSaveAction = editAndSaveSnippet.bind(null, snippet.id,code);

  const changeEventhandler = (value : string | "") => {
    setcode(value);
  }
  

  return (
    <div className="bg-white shadow-md border border-gray-200 rounded-xl p-6 max-w-4xl mx-auto space-y-6">
      <form action={editSaveAction} className="space-y-4">
        <h1 className="text-2xl font-semibold text-gray-800 mb-2"> Your Code Editor</h1>

        <Editor
          height="40vh"
          theme="vs-dark"
          defaultLanguage="javascript"
          defaultValue={code}
          onChange={changeEventhandler}
          className="rounded-md overflow-hidden border border-gray-300"
        />

        <div className="flex justify-end">
          <Button type="submit" className="bg-blue-700 hover:cursor-pointer text-white px-6 py-2 rounded hover:bg-blue-600 transition w-full sm:w-auto">
            Save Changes
          </Button>
        </div>
      </form>
    </div>
  );
};

export default EditSnippetsForm;
