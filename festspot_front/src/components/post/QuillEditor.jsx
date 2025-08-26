/** @jsxImportSource @emotion/react */
import ReactQuill from "react-quill-new";
import React from "react";

function QuillEditor({ quillRef }) {
  const [content, setContent] = useState("");

  return (
    <div>
      <ReactQuill
        ref={quillRef}
        theme="snow"
        value={content}
        onChange={setContent}
        modules={modules}
        style={{
          width: "100%",
          height: "100%",
        }}
        placeholder="내용을 작성해주세요..."
      />
    </div>
  );
}

export default QuillEditor;
