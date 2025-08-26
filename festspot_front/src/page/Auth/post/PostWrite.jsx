/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useMemo, useEffect } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import * as s from "./styles";
import { AiOutlineSave } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFixQuillToolBarStore } from "../../../stores/useFixQuillToolBarStore";
import usePostCategoryQuery from "../../../querys/post/usePostCategoryQuery";
import { dataURLtoFile } from "../../../utils/dataUrlToFileObject";
import QuillEditor from "../../../components/post/QuillEditor";

const PostWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const { isFixed } = useFixQuillToolBarStore();
  const [selectedCategory, setSelectedCategory] = useState({});
  const [selectIsOpen, setSelecteIsOpen] = useState(false);

  const dropdownRef = useRef();
  const quillRef = useRef(null);
  const titleInputRef = useRef(null);

  const postCategoryQuery = usePostCategoryQuery();
  const postCategories = postCategoryQuery.data?.data?.body || [];

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

  //기본 select 등록
  useEffect(() => {
    if (postCategoryQuery.isSuccess && !!postCategories[0]) {
      setSelectedCategory(postCategories[0]);
    }
  }, [postCategoryQuery.isSuccess]);

  //ref 등록
  useEffect(() => {
    //이미지 핸들러 커스텀
    if (quillRef.current) {
      const quill = quillRef.current.getEditor();
      const toolbar = quill.getModule("toolbar");
      toolbar.addHandler("image", hanldeImgUploadOnClick);
    }

    //selectTitle 드롭다운
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelecteIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
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
              resolve({ file, dataUrl: e.target.result, seq: idx });
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

  useEffect(() => {
    console.log(images);
  }, [images]);

  //selct 선택
  const handleSelectOnClick = (e, category) => {
    setSelectedCategory(category);
    setSelecteIsOpen(false);
  };

  const handleOpenSelectOnClick = (e) => {
    if (selectIsOpen) {
      setSelecteIsOpen(false);
      return;
    }
    setSelecteIsOpen(true);
  };

  //제목 클릭
  const handleTitleOnClick = (e) => {
    titleInputRef.current?.focus();
  };

  //저장 버튼
  const handleSubmitOnClick = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim() || content === "<p><br></p>")
      return alert("내용을 입력해주세요.");

    const delta = quillRef.current.getEditor().root;
    // const reqContent = delta.map((row) =>
    //   !!row.insert.image ? dataURLtoFile(row.insert.image) : row
    // );
    console.log(delta);

    try {
      // navigate("/board/free"); // 이전 페이지로 이동
    } catch (error) {
      console.error("Save Fail", error);
      alert("게시글 저장에 실패했습니다.");
    }
  };

  useEffect(() => {
    const content = quillRef.current.getEditor().getContents();
    console.log(content);
  }, [content]);

  return (
    <div css={s.postWriteLayout}>
      <header css={s.header}>
        <button css={s.backButton} onClick={() => navigate(-1)}>
          <MdArrowBack /> 뒤로가기
        </button>
        <div css={s.selectCategory} ref={dropdownRef}>
          <div css={s.selected(selectIsOpen)} onClick={handleOpenSelectOnClick}>
            {selectedCategory.postCategoryName} <FaCaretDown />
          </div>
          {selectIsOpen && (
            <div css={s.options}>
              {postCategories.map((postCategory) => (
                <div onClick={(e) => handleSelectOnClick(e, postCategory)}>
                  {postCategory.postCategoryName}
                </div>
              ))}
            </div>
          )}
        </div>
        <button css={s.saveButton} onClick={handleSubmitOnClick}>
          <AiOutlineSave /> 저장
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
            <QuillEditor />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostWrite;
