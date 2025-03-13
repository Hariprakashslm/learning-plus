import { useState } from "react";
import Button from "../Button";
import TiptapEditor from "../TipTabEditor";

const Content: React.FC<{ isEditMode: boolean }> = ({ isEditMode }) => {
  const [content, setContent] = useState<string>("");
  const [contents, setContents] = useState<string[]>([]);
  return (
    <div>
      {contents.map((data) => {
        return <div dangerouslySetInnerHTML={{ __html: data }}></div>;
      })}
      {isEditMode && (
        <>
          <TiptapEditor onChange={(data) => setContent(data)} />
          <Button
            onClick={() => {
              setContents((prevContent) => [...prevContent, content]);
            }}
          >
            Add
          </Button>
        </>
      )}
    </div>
  );
};

export default Content;
