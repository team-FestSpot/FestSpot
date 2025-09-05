/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useState, useRef, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import { AiOutlineSave } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { FaCaretDown } from "react-icons/fa";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import { useFixQuillToolBarStore } from "../../../../stores/useFixQuillToolBarStore";
import usePostCategoryQuery from "../../../../querys/post/usePostCategoryQuery";
import SparkMD5 from "spark-md5";
import { reqPostRegister } from "../../../../api/postApi";
import Swal from "sweetalert2";
import usePrincipalQuery from "../../../../querys/auth/usePrincipalQuery";
import { css, Global } from "@emotion/react";
import PostEditor from "../../../../components/post/PostEditor/PostEditor";
import PostCategory from "../../../../components/post/PostCategory/PostCategory";
import { usePostDetailQuery } from "../../../../querys/post/usePostDetailQuery";

const PostEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const principal = usePrincipalQuery().data?.data?.body;

  const [post, setPost] = useState({});

  const quillRef = useRef(null);
  const titleInputRef = useRef(null);

  const boardKey = searchParams.get("boardKey");
  const postId = location.pathname.split("/")[3];

  const postDetailQuery = usePostDetailQuery(boardKey, postId);
  const postDetail = postDetailQuery.data?.data?.body;

  useEffect(() => {
    const { post } = location.state || {};
    setPost(post);
  }, []);

  useEffect(() => {
    const contents = post.postContent
      .split(/<\/p><p>/)
      .map((str) => str.replace(/<\/?p>/g, ""));

    console.log(contents);
    quillRef.current.getEditor().setContents();
  }, [post]);

  useEffect(() => {
    if (!principal) {
      Swal.fire({
        title: "로그인 정보 없음",
        text: "로그인 후 이용해 주세요",
        icon: "error",
      });
    }
    if (!!principal && !!postDetail) {
      if (principal.user.userId !== postDetail.user.userId) {
        Swal.fire({
          title: "잘못된 접근",
          text: "게시글 작성자가 아닙니다.",
          icon: "error",
        });
        navigate(`/board/all`);
      }
    }
  }, [principal, postDetail.user.userId]);

  console.log(postDetail);

  //저장 버튼
  const handleSubmitOnClick = async () => {
    if (!title.trim())
      return Swal.fire({ icon: "error", title: "제목을 입력해주세요." });
    if (!content.trim() || content === "<p><br></p>")
      return Swal.fire({ icon: "error", title: "내용을 입력해주세요." });

    if (writeMode === "write") {
      try {
        const delta = quillRef.current.getEditor().getContents();
        const hashedImageUrls = delta
          .filter((row) => !!row.insert.image)
          .map((row) => SparkMD5.hash(row.insert.image));

        const sortedImages = hashedImageUrls.map((dataUrlHash, idx) => {
          const foundImage = images.find(
            (image) => SparkMD5.hash(image.dataUrl) === dataUrlHash
          );

          return {
            ...foundImage,
            seq: idx + 1,
          };
        });

        let quillContent;
        let idx = 0;

        if (/<img[^>]*>/.test(content)) {
          quillContent = content.replace(/<img[^>]*>/g, (match) => {
            const seqNum = sortedImages[idx].seq;
            idx++;
            return `[img-${seqNum}]`;
          });
        } else {
          quillContent = content;
        }

        const postReq = {
          boardKey: searchParams.get("boardKey"),
          postTitle: title,
          postContent: quillContent,
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
          <div css={s.selectSection}>
            <PostCategory />
          </div>
          <button css={s.saveButton} onClick={handleSubmitOnClick}>
            <AiOutlineSave /> 수정
          </button>
        </header>

        <main css={s.main}>
          <PostEditor
            title={title}
            setTitle={setTitle}
            titleInputRef={titleInputRef}
            quillRef={quillRef}
            content={content}
            setContent={setContent}
            setImages={setImages}
          />
        </main>
      </div>
    </>
  );
};

export default PostEdit;
