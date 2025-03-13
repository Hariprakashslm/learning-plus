import { useEditor, EditorContent } from '@tiptap/react';
import StarterKit from '@tiptap/starter-kit';
import Placeholder from '@tiptap/extension-placeholder';
import Underline from '@tiptap/extension-underline';
import styled from 'styled-components';
import {
  FaBold,
  FaItalic,
  FaUnderline,
  FaHeading,
  FaListUl,
  FaListOl,
  FaUndo,
  FaRedo,
} from 'react-icons/fa';

const EditorContainer = styled.div`
  width: 100%;
  max-width: 100%;
  border: 1px solid #ccc;
  border-radius: 10px;
  background: #fff;
  box-shadow: 0px 4px 12px rgba(0, 0, 0, 0.1);
  font-family: 'Arial', sans-serif;
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
  background: ${({ active }) => (active ? '#007BFF' : '#e9ecef')};
  color: ${({ active }) => (active ? '#fff' : '#333')};

  &:hover {
    background: ${({ active }) => (active ? '#0056b3' : '#d6d6d6')};
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
      Placeholder.configure({
        placeholder: 'Start typing here...',
      }),
      Underline,
    ],
    content: '',
    onUpdate: ({ editor }) => {
      if (onChange) onChange(editor.getHTML());
    },
  });

  if (!editor) return null;
  const toolbarSettings = [
    {
      onClick: editor.chain().focus().toggleBold().run,
      key: 'bold',
      icon: FaBold,
    },
  ];
  return (
    <EditorContainer>
      {/* Toolbar */}
      <Toolbar>
        {toolbarSettings.map((tool) => (
          <Button
            onClick={() => tool.onClick()}
            active={editor.isActive(tool.key)}
          >
            <FaBold />
          </Button>
        ))}
        <Button
          onClick={() => editor.chain().focus().toggleItalic().run()}
          active={editor.isActive('italic')}
        >
          <FaItalic /> Italic
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleUnderline().run()}
          active={editor.isActive('underline')}
        >
          <FaUnderline /> Underline
        </Button>
        <Button
          onClick={() =>
            editor.chain().focus().toggleHeading({ level: 1 }).run()
          }
          active={editor.isActive('heading', { level: 1 })}
        >
          <FaHeading /> H1
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleBulletList().run()}
          active={editor.isActive('bulletList')}
        >
          <FaListUl /> Bullet List
        </Button>
        <Button
          onClick={() => editor.chain().focus().toggleOrderedList().run()}
          active={editor.isActive('orderedList')}
        >
          <FaListOl /> Ordered List
        </Button>
        <Button onClick={() => editor.chain().focus().undo().run()}>
          <FaUndo /> Undo
        </Button>
        <Button onClick={() => editor.chain().focus().redo().run()}>
          <FaRedo /> Redo
        </Button>
      </Toolbar>

      {/* Editor Content */}
      <EditorContentStyled editor={editor} />
    </EditorContainer>
  );
};

export default TiptapEditor;
