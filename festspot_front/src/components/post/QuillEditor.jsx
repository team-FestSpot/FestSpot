/** @jsxImportSource @emotion/react */
import ReactQuill from "react-quill-new";
import React, { useEffect } from "react";
import { v4 } from "uuid";

function QuillEditor({ quillRef, content, setContent, setImages }) {
  const modules = {
    toolbar: {
      container: [
        [
          { header: [1, 2, 3, false] },
          "bold",
          "italic",
          "underline",
          "strike",
          "image",
          { color: [] },
          { background: [] },
          { align: [] },
          "blockquote",
          "code-block",
          { list: "ordered" },
          { list: "bullet" },
          "link",
          "clean",
        ],
      ],
    },
  };

  useEffect(() => {
    //이미지 핸들러 커스텀
    if (quillRef.current) {
      const quill = quillRef.current?.getEditor();
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("image", hanldeImgUploadOnClick);
    }
  }, []);

  //커스텀 이미지 핸들러
  const hanldeImgUploadOnClick = function (e) {
    const fileInput = document.createElement("input");
    fileInput.setAttribute("type", "file");
    fileInput.setAttribute("accept", "image/*");
    fileInput.setAttribute("name", "file");
    fileInput.setAttribute("multiple", "true");
    fileInput.click();

    fileInput.onchange = async (e) => {
      const filesArray = [...e.target.files];

      Promise.all(
        filesArray.map((file, idx) => {
          return new Promise((resolve) => {
            const fileReader = new FileReader();
            fileReader.onload = (e) => {
              const uuid = v4();
              resolve({ file, dataUrl: e.target.result });
            };
            fileReader.readAsDataURL(file);
          });
        })
      ).then((resolves) => {
        resolves.map((resolve) => insertImageToEditor(resolve.dataUrl));
        setImages((prev) => [...prev, ...resolves]);
      });
    };
  };

  //quill에 이미지 추가
  const insertImageToEditor = (imageUrl) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    const range = quill.getSelection();
    const index = range ? range.index : quill.getLength();
    quill.insertEmbed(index, "image", imageUrl);
    quill.setSelection(index + 1);
  };

  return (
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
  );
}

export default QuillEditor;
