import { useEditor, EditorContent } from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";
import Placeholder from "@tiptap/extension-placeholder";
import Underline from "@tiptap/extension-underline";
import styled from "styled-components";
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
} from "react-icons/fa";
import {
  FaStrikethrough,
  FaQuoteLeft,
  FaAlignLeft,
  FaAlignCenter,
  FaAlignRight,
  FaAlignJustify,
  FaLink,
  FaUnlink,
  FaHighlighter,
  FaCode,
} from "react-icons/fa";
import TextAlign from "@tiptap/extension-text-align";
import Link from "@tiptap/extension-link";
import Highlight from "@tiptap/extension-highlight";
import CodeBlockLowlight from "@tiptap/extension-code-block-lowlight";
import { common, createLowlight } from "lowlight";
const lowlight = createLowlight(common);
const EditorContainer = styled.div`
  width: 100%;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-family: "Arial", sans-serif;
  overflow: hidden;
`;

const Toolbar = styled.div`
  display: flex;
  flex-wrap: wrap;
  gap: 8px;
  padding: 12px;
  background: #f8f9fa;
  border-bottom: 1px solid #ddd;
`;

const Button = styled.button<{ active?: boolean }>`
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 5px;
  padding: 10px;
  font-size: 14px;
  font-weight: bold;
  border: none;
  border-radius: 6px;
  cursor: pointer;
  transition: all 0.2s ease-in-out;
  background: ${({ active }) => (active ? "#007BFF" : "#e9ecef")};
  color: ${({ active }) => (active ? "#fff" : "#333")};

  &:hover {
    background: ${({ active }) => (active ? "#0056b3" : "#d6d6d6")};
  }
`;
const EditorContentStyled = styled(EditorContent)`
  min-height: 200px; /* 🔹 Increased initial height */
  padding: 20px;
  font-size: 16px;
  border: none; /* 🔹 Ensures no extra borders */
  outline: none !important; /* 🔹 Removes outline when focused */
  overflow-y: auto;
  white-space: pre-wrap;
  resize: vertical; /* 🔹 Allows manual resizing */
`;

const TiptapEditor = ({ onChange }: { onChange?: (data: string) => void }) => {
  const editor = useEditor({
    extensions: [
      StarterKit,
      Placeholder.configure({ placeholder: "Start typing here..." }),
      Underline,
      TextAlign.configure({ types: ["heading", "paragraph"] }),
      Link,
      Highlight,
      CodeBlockLowlight.configure({ lowlight }),
    ],
    content: "",
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  if (!editor) return null;

  return (
    <EditorContainer>
      {/* Toolbar */}
      <Toolbar>
        <Button
          onClick={() => editor.chain().focus().toggleBold().run()}
          active={editor.isActive("bold")}
        >
          <FaBold />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive("italic")}
        >
          <FaItalic />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive("underline")}
        >
          <FaUnderline />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleStrike().run()}
          active={editor.isActive("strike")}
        >
          <FaStrikethrough />
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive("heading", { level: 1 })}
        >
          <FaHeading /> H1
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 2 }).run()
          }
          active={editor.isActive("heading", { level: 2 })}
        >
          <FaHeading /> H2
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 3 }).run()
          }
          active={editor.isActive("heading", { level: 3 })}
        >
          <FaHeading /> H3
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive("bulletList")}
        >
          <FaListUl />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive("orderedList")}
        >
          <FaListOl />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBlockquote().run()}
          active={editor.isActive("blockquote")}
        >
          <FaQuoteLeft />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleCodeBlock().run()}
          active={editor.isActive("codeBlock")}
        >
          <FaCode />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("left").run()}
          active={editor.isActive({ textAlign: "left" })}
        >
          <FaAlignLeft />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("center").run()}
          active={editor.isActive({ textAlign: "center" })}
        >
          <FaAlignCenter />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("right").run()}
          active={editor.isActive({ textAlign: "right" })}
        >
          <FaAlignRight />
        </Button>
        <Button
          onClick={() => editor.chain().focus().setTextAlign("justify").run()}
          active={editor.isActive({ textAlign: "justify" })}
        >
          <FaAlignJustify />
        </Button>
        <Button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo />
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo />
        </Button>
        <Button
          onClick={() => {
            const url = prompt("Enter URL");
            if (url) editor.chain().focus().setLink({ href: url }).run();
          }}
        >
          <FaLink />
        </Button>
        <Button onClick={() => editor.chain().focus().unsetLink().run()}>
          <FaUnlink />
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleHighlight().run()}
          active={editor.isActive("highlight")}
        >
          <FaHighlighter />
        </Button>
      </Toolbar>

      {/* Editor Content */}
      <EditorContentStyled editor={editor} />
    </EditorContainer>
  );
};

export default TiptapEditor;
