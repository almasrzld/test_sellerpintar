"use client";

import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";
import TextAlign from "@tiptap/extension-text-align";
import {
  Bold,
  Italic,
  ImageIcon,
  AlignJustify,
  AlignLeft,
  AlignCenter,
  AlignRight,
  Undo2,
  Redo2,
} from "lucide-react";
import { useState } from "react";

interface TiptapEditorProps {
  value: string;
  onChange: (value: string) => void;
}

export const TiptapEditor: React.FC<TiptapEditorProps> = ({
  value,
  onChange,
}) => {
  const [wordCount, setWordCount] = useState(0);

  const editor = useEditor({
    extensions: [
      StarterKit,
      Image,
      Placeholder.configure({
        placeholder: "Type a content...",
        emptyEditorClass: "is-editor-empty",
      }),
      TextAlign.configure({
        types: ["heading", "paragraph"],
        alignments: ["left", "center", "right", "justify"],
      }),
    ],
    content: value?.trim() === "" ? null : value,
    onUpdate: ({ editor }) => {
      const text = editor.getText();
      const words = text.trim().split(/\s+/).filter(Boolean).length;

      setWordCount(words);
      onChange(editor.getHTML());
    },
    editorProps: {
      attributes: {
        class: "prose prose-sm sm:prose lg:prose-lg focus:outline-none",
      },
    },
    immediatelyRender: false,
  });

  if (!editor) return null;

  return (
    <div className="border bg-gray-50 rounded-[12px]">
      <div className="flex gap-1 flex-wrap border-b p-4 bg-white items-center text-slate-600 text-sm">
        <button
          type="button"
          onClick={() => editor.chain().focus().undo().run()}
          className="rounded hover:bg-muted transition disabled:opacity-30"
          disabled={!editor.can().undo()}
        >
          <Undo2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().redo().run()}
          className="rounded hover:bg-muted transition disabled:opacity-30"
          disabled={!editor.can().redo()}
        >
          <Redo2 className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleBold().run()}
          className={`rounded transition ml-4 ${
            editor.isActive("bold") ? "text-blue-500" : "hover:bg-muted"
          }`}
        >
          <Bold className="w-4 h-4" />
        </button>

        <button
          type="button"
          onClick={() => editor.chain().focus().toggleItalic().run()}
          className={`rounded transition ${
            editor.isActive("italic") ? "text-blue-500" : "hover:bg-muted"
          }`}
        >
          <Italic className="w-4 h-4" />
        </button>

        <span className="mx-4 h-5 w-[1px] bg-border" />

        <button
          type="button"
          onClick={() => {
            const url = prompt("Enter image URL");
            if (url) {
              editor.chain().focus().setImage({ src: url }).run();
            }
          }}
          className="rounded hover:bg-muted transition"
        >
          <ImageIcon className="w-4 h-4" />
        </button>

        <span className="mx-4 h-5 w-[1px] bg-border" />

        {["left", "center", "right", "justify"].map((align) => {
          const Icon =
            align === "left"
              ? AlignLeft
              : align === "center"
              ? AlignCenter
              : align === "right"
              ? AlignRight
              : AlignJustify;

          return (
            <button
              key={align}
              type="button"
              onClick={() => editor.chain().focus().setTextAlign(align).run()}
              className={`rounded transition ${
                editor.isActive({ textAlign: align })
                  ? "text-blue-500"
                  : "hover:bg-muted"
              }`}
            >
              <Icon className="w-4 h-4" />
            </button>
          );
        })}
      </div>

      <EditorContent
        editor={editor}
        className="h-[437px] bg-gray-50 px-4 py-3 text-sm overflow-y-auto whitespace-pre-wrap"
      />

      <p className="bg-white px-4 py-6 text-xs text-slate-900">
        {wordCount} Words
      </p>
    </div>
  );
};
