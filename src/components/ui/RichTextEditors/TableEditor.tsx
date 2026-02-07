"use client";

import React, { useCallback, useState } from "react";

import RcTiptapEditor from "reactjs-tiptap-editor";
import {
  BaseKit,
  Blockquote,
  Bold,
  BulletList,
  Clear,
  Code,
  CodeBlock,
  Color,
  ColumnActionButton,
  Emoji,
  ExportPdf,
  ExportWord,
  FontFamily,
  FontSize,
  FormatPainter,
  Heading,
  Highlight,
  History,
  HorizontalRule,
  Iframe,
  Image,
  ImportWord,
  Indent,
  Italic,
  Katex,
  LineHeight,
  Link,
  MoreMark,
  OrderedList,
  SearchAndReplace,
  SlashCommand,
  Strike,
  Table,
} from "reactjs-tiptap-editor/extension-bundle";

import "katex/dist/katex.min.css";

import "reactjs-tiptap-editor/style.css";
import { Input } from "../input";
import { Button } from "../button";
import { Settings } from "lucide-react";
import { FormSettingsModal } from "../../form-builder-2/form-settings-modal";
import { toast } from "../use-toast";

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

export default function TableEditor() {
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
