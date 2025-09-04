/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useState, useRef, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import { AiOutlineSave } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useNavigate, useSearchParams } from "react-router-dom";
import { useFixQuillToolBarStore } from "../../../stores/useFixQuillToolBarStore";
import usePostCategoryQuery from "../../../querys/post/usePostCategoryQuery";
import QuillEditor from "../../../components/post/QuillEditor/QuillEditor";
import SparkMD5 from "spark-md5";
import { reqPostRegister } from "../../../api/postApi";
import Swal from "sweetalert2";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import { css, Global } from "@emotion/react";

const PostWrite = () => {
  const navigate = useNavigate();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const { isFixed } = useFixQuillToolBarStore();
  const [selectIsOpen, setSelecteIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const principal = usePrincipalQuery().data?.data?.body;

  const dropdownRef = useRef();
  const quillRef = useRef(null);
  const titleInputRef = useRef(null);

  const postCategoryQuery = usePostCategoryQuery();
  const postCategories = postCategoryQuery.data?.data?.body || [];

  useEffect(() => {
    if (!searchParams.get("boardKey")) {
      setSearchParams({ boardKey: "free" });
    }
    if (!principal) {
      Swal.fire({
        title: "로그인 정보 없음",
        text: "로그인 후 이용해 주세요",
        icon: "error",
      });
    }
  }, []);

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
  const handleSelectOnClick = (e, boardKey) => {
    setSearchParams({ boardKey: boardKey });
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
    if (!title.trim())
      return Swal.fire({ icon: "error", title: "제목을 입력해주세요." });
    if (!content.trim() || content === "<p><br></p>")
      return Swal.fire({ icon: "error", title: "내용을 입력해주세요." });

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
          seq: idx + 1,
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
      } else {
        reqContent = content;
      }

      const postReq = {
        boardKey: searchParams.get("boardKey"),
        postTitle: title,
        postContent: reqContent,
        files: sortedImages.map((image) => image.file),
      };

      await reqPostRegister(postReq);

      navigate(`/board/${searchParams.get("boardKey")}`);
    } catch (error) {
      await Swal.fire({
        title: error?.response?.data?.body,
        text: error?.response?.data?.message,
        icon: "error",
      });
    }
  };

  return (
    <>
      <Global
        styles={css`
          .swal2-modal {
            font-size: 12px;
          }
        `}
      />
      <div css={s.postWriteLayout}>
        <header css={s.header}>
          <button css={s.backButton} onClick={() => navigate(-1)}>
            <MdArrowBack /> 뒤로가기
          </button>
          <div css={s.selectCategory} ref={dropdownRef}>
            <div
              css={s.selected(selectIsOpen)}
              onClick={handleOpenSelectOnClick}
            >
              {
                postCategories.find(
                  (postCategory) =>
                    postCategory.postCategoryKey ===
                    searchParams.get("boardKey")
                )?.postCategoryName
              }
              <FaCaretDown />
            </div>
            {selectIsOpen && (
              <div css={s.options}>
                {postCategories.map((postCategory, idx) => (
                  <div
                    key={idx}
                    onClick={(e) =>
                      handleSelectOnClick(e, postCategory.postCategoryKey)
                    }
                  >
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
    </>
  );
};

export default PostWrite;
