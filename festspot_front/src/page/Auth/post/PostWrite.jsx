/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useState, useRef, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import { AiOutlineSave } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate } from "react-router-dom";
import { useFixQuillToolBarStore } from "../../../stores/useFixQuillToolBarStore";
import usePostCategoryQuery from "../../../querys/post/usePostCategoryQuery";
import QuillEditor from "../../../components/post/QuillEditor";
import { v4 } from "uuid";
import SparkMD5 from "spark-md5";
import { reqPostRegister } from "../../../api/postApi";
import Swal from "sweetalert2";

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

  //기본 select 등록
  useEffect(() => {
    if (postCategoryQuery.isSuccess && !!postCategories[0]) {
      setSelectedCategory(postCategories[0]);
    }
  }, [postCategoryQuery.isSuccess]);

  //ref 등록
  useEffect(() => {
    //selectTitle 드롭다운
    const handleClickOutside = (event) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target)) {
        setSelecteIsOpen(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

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

  //저장 버튼
  const handleSubmitOnClick = async () => {
    if (!title.trim()) return alert("제목을 입력해주세요.");
    if (!content.trim() || content === "<p><br></p>")
      return alert("내용을 입력해주세요.");

    try {
      const delta = quillRef.current.getEditor().getContents();
      const imageUrls = delta
        .filter((row) => !!row.insert.image)
        .map((row) => SparkMD5.hash(row.insert.image));

      const sortedImages = imageUrls.map((dataUrlHash, idx) => {
        const foundImage = images.find(
          (image) => SparkMD5.hash(image.dataUrl) === dataUrlHash
        );

        return {
          ...foundImage,
          seq: idx,
        };
      });

      let reqContent;
      let idx = 0;

      if (/<img[^>]*>/.test(content)) {
        reqContent = content.replace(/<img[^>]*>/g, (match) => {
          const seqNum = sortedImages[idx].seq;
          idx++;
          return `[img-${seqNum}]`;
        });
      }

      const postReq = {
        boardKey: selectedCategory.postCategoryKey,
        postTitle: title,
        postContent: reqContent,
        files: sortedImages.map((image) => image.file),
      };

      await reqPostRegister(postReq);

      navigate(`/board/${selectedCategory.postCategoryKey}`);
    } catch (error) {
      await Swal.fire({
        title: "게시글 등록 실패",
        text: `잠시 후 시도해 주세요`,
        icon: "error",
      });
    }
  };

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
          <div css={s.title} onClick={() => titleInputRef.current?.focus()}>
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
            onClick={() => quillRef.current?.focus()}
          >
            <QuillEditor
              quillRef={quillRef}
              content={content}
              setContent={setContent}
              setImages={setImages}
            />
          </div>
        </div>
      </main>
    </div>
  );
};

export default PostWrite;
