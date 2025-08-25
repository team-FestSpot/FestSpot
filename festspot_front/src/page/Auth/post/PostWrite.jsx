/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import * as s from "./styles";
import { AiOutlineCamera, AiOutlineSave } from "react-icons/ai";
import { MdClose, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../../../constants/BoardContext";
import { css } from "@emotion/react";

const PostWrite = () => {
  const navigate = useNavigate();
  const { currentBoard } = useBoard();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [isFixed, setIsFixed] = useState(false);
  const [allowComments, setAllowComments] = useState(true);
  const [saveSubmit, setSaveSubmit] = useState(false);

  const quillRef = useRef(null);
  const fileInputRef = useRef(null);
  const titleInputRef = useRef(null);

  const MAX_IMAGES = 10;

  const hanldeImgUploadOnClick = () => {
    if (images.length >= MAX_IMAGES) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드할 수 있습니다.`);
      return;
    }
    fileInputRef.current?.click();
  };

  const handleFileOnChange = (e) => {
    const files = Array.from(e.target.files || []);
    const remainingSlots = MAX_IMAGES - images.length;

    if (files.length > remainingSlots) {
      alert(
        `이미지는 최대 ${MAX_IMAGES}장까지만 업로드 할 수 있습니다. ${remainingSlots}장 만 추가됩니다.`
      );
    }

    const filesArray = [...e.target.files];

    Promise.all(
      filesArray.map((file) => {
        return new Promise((resolve) => {
          const fileReader = new FileReader();
          fileReader.onload = (e) => {
            console.log(e.target.result);
            resolve({ file, dataUrl: e.target.result });
          };
          fileReader.readAsDataURL(file);
        });
      })
    ).then((resolves) => {
      setImages((prev) => [...prev, ...resolves]);
    });
  };

  const insertImageToEditor = (imageUrl) => {
    const quill = quillRef.current?.getEditor();
    if (!quill) return;
    const range = quill.getSelection();
    const index = range ? range.index : quill.getLength();
    quill.insertEmbed(index, "image", imageUrl);
    quill.setSelection(index + 1);
  };

  const removeImage = (imageId) => {
    const img = images.find((i) => i.id === imageId);
    setImages((prev) => prev.filter((i) => i.id !== imageId));

    const quill = quillRef.current?.getEditor();
    if (!!quill && img) {
      const contents = quill.getContents();
      const newOps = [];
      (contents.ops || []).forEach((op) => {
        //remove 누른 이미지면 패스
        if (op.insert.image === img.url) return;
        newOps.push(op);
      });
      quill.setContents({ ops: newOps });
    }
  };

  useEffect(() => {
    const handleScroll = (e) => {
      if (window.scrollY > 0) {
        setIsFixed(true);
      } else {
        setIsFixed(false);
      }
      console.log("e", e);
      console.log("scroll", window.scrollY);
    };

    window.addEventListener("scroll", handleScroll);
    return () => window.removeEventListener("scroll", handleScroll);
  }, []);

  const modules = {
    toolbar: {
      container: [
        [
          { header: [1, 2, 3, false] },
          "bold",
          "italic",
          "underline",
          "strike",
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
      handlers: {
        image: hanldeImgUploadOnClick,
      },
    },
  };

  const handleSubmitOnClick = async () => {
    const clean = (content || "").replace(/\s/g, "");

    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim() || content === "<p><br></p>")
      return alert("내용을 입력해주세요.");

    setSaveSubmit(true);

    try {
      const postData = await createPostForm({
        boardKey: currentBoard || "free",
        title: title.trim(),
        conten: content,
        allowComments,
        files: images.map((i) => i.file),
      });

      console.log("Post Data : ", postData);

      alert("게시글이 성공적으로 저장되었습니다.");
      navigate(-1); // 이전 페이지로 이동
    } catch (error) {
      console.error("Save Fail", error);
      alert("게시글 저장에 실패했습니다.");
    } finally {
      setSaveSubmit(false);
    }
  };

  const handleTitleOnClick = (e) => {
    titleInputRef.current?.focus();
  };

  return (
    <div css={s.postWriteLayout}>
      <header css={s.header}>
        <button css={s.backButton} onClick={() => navigate(-1)}>
          <MdArrowBack /> 뒤로가기
        </button>
        <h1 css={s.headerTitle}>게시판 명</h1>
        <div css={s.commentableButton}>
          <label>댓글 허용</label>
          <select
            value={allowComments ? "Y" : "N"}
            onChange={(e) => setAllowComments(e.target.value === "Y")}
          >
            <option value="Y">허용</option>
            <option value="N">비허용</option>
          </select>
        </div>
        <button
          css={[s.saveButton, saveSubmit && s.disabledButtonStyle]}
          onClick={handleSubmitOnClick}
          disabled={saveSubmit}
        >
          <AiOutlineSave /> {saveSubmit ? "저장 중..." : "저장"}
        </button>
      </header>

      <main css={s.main}>
        <div css={s.postContainer}>
          <div css={s.title} onClick={handleTitleOnClick}>
            <input
              name="quillTitle"
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              css={s.titleInput}
              maxLength={100}
              ref={titleInputRef}
            />
            <div css={s.titleCount}>{title.length}/100</div>
          </div>

          <div
            css={[
              s.quillContainer,
              isFixed ? s.fixedQuillContainer : s.unfixedQuillContainer,
            ]}
          >
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
        </div>

        <div css={s.extensionContainer}>
          <h3>이미지 ({images.length}/10)</h3>
          <button css={s.imageUploadButton} onClick={hanldeImgUploadOnClick}>
            <AiOutlineCamera /> 이미지 추가
          </button>
          <input
            ref={fileInputRef}
            type="file"
            accept="image/*"
            multiple
            onChange={handleFileOnChange}
            css={s.hiddenFileInput}
          />
          {images.length > 0 && (
            <div css={s.imagePreviewContainer}>
              {images.map((image) => (
                <div key={image.id} css={s.imagePreviewItem}>
                  <img src={image.url} alt="preview" />
                  <button
                    css={s.removeImageButton}
                    onClick={() => removeImage(image.id)}
                  >
                    <MdClose />
                  </button>
                </div>
              ))}
            </div>
          )}
        </div>
      </main>
    </div>
  );
};

export default PostWrite;
