"use client";

import React, { useState } from "react";

import RcTiptapEditor from "reactjs-tiptap-editor";
import { BaseKit, Heading } from "reactjs-tiptap-editor/extension-bundle";

import "katex/dist/katex.min.css";

import "reactjs-tiptap-editor/style.css";
import { toast } from "../use-toast";

const extensions = [
  BaseKit.configure({
    multiColumn: true,
    placeholder: {
      showOnlyCurrent: true,
    },
  }),

  Heading.configure({ spacer: true }),
];

export default function HeadingEditor() {
  const [content, setContent] = useState("");
  const [formInput, setFormInput] = useState("");

  const [theme, setTheme] = useState("light");

  const onValueChange = (value: any) => {
    setContent(value);
  };

  const handleSave = () => {
    const isContentEmpty =
      !content || content.replace(/<[^>]*>/g, "").trim() === "";

    if (!formInput || isContentEmpty) {
      toast({
        description: "Please enter both document name and content",
        variant: "destructive",
      });
      return;
    }

    console.log("data", { formInput, content });
  };

  return (
    <main className="">
      <div className="max-w-[1024px] mx-auto">
        <RcTiptapEditor
          //   ref={refEditor}
          output="html"
          content={content}
          onChangeContent={onValueChange}
          extensions={extensions}
          dark={theme === "dark"}
          //   disabled={disable}
        />
      </div>
    </main>
  );
}
