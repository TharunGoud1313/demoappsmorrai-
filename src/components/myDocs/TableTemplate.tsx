"use client";

import React, { useState } from "react";

import RcTiptapEditor from "reactjs-tiptap-editor";
import { BaseKit, Table } from "reactjs-tiptap-editor/extension-bundle";


import "katex/dist/katex.min.css";

import "reactjs-tiptap-editor/style.css";

function convertBase64ToBlob(base64: string) {
  const arr = base64.split(",");
  const mime = arr[0].match(/:(.*?);/)![1];
  const bstr = atob(arr[1]);
  let n = bstr.length;
  const u8arr = new Uint8Array(n);
  while (n--) {
    u8arr[n] = bstr.charCodeAt(n);
  }
  return new Blob([u8arr], { type: mime });
}

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
    characterCount: {
      limit: 50_000,
    },
  }),
  Table,
];

interface TableTemplateProps {
  content: string;
  onContentChange: (content: string) => void;
  readOnly?: boolean;
}

export default function TableTemplate({
  content,
  onContentChange,
  readOnly,
}: TableTemplateProps) {
  const [theme, setTheme] = useState("light");

  return (
    <main className="">
      <div className="max-w-[1024px] mx-auto">
        <RcTiptapEditor
          //   ref={refEditor}
          output="html"
          content={content}
          onChangeContent={onContentChange}
          extensions={extensions}
          dark={theme === "dark"}
          disabled={readOnly}
          disableBubble={readOnly}
          //   disabled={disable}
        />
      </div>
    </main>
  );
}
