/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import React, { useState, useRef, useEffect } from "react";
import "react-quill-new/dist/quill.snow.css";
import { AiOutlineSave } from "react-icons/ai";
import { MdArrowBack } from "react-icons/md";
import { useLocation, useNavigate, useSearchParams } from "react-router-dom";
import SparkMD5 from "spark-md5";
import Swal from "sweetalert2";
import usePrincipalQuery from "../../../../querys/auth/usePrincipalQuery";
import { css, Global } from "@emotion/react";
import PostEditor from "../../../../components/post/PostEditor/PostEditor";
import PostCategory from "../../../../components/post/PostCategory/PostCategory";
import { usePostDetailQuery } from "../../../../querys/post/usePostDetailQuery";
import { getQuillDataUrl } from "../../../../utils/getQuillContent";
import {
  fileToDataUrl,
  urlToFileObject,
} from "../../../../utils/urlToFileObject";
import { reqPostUpdate } from "../../../../api/postApi";

const PostEdit = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [images, setImages] = useState([]);
  const [searchParams, setSearchParams] = useSearchParams();
  const principal = usePrincipalQuery().data?.data?.body;

  const quillRef = useRef(null);
  const titleInputRef = useRef(null);

  const boardKey = searchParams.get("boardKey");
  const postId = location.pathname.split("/")[3];

  const postDetailQuery = usePostDetailQuery(boardKey, postId);
  const postDetail = postDetailQuery.data?.data?.body;

  useEffect(() => {
    const setQuill = async () => {
      const quillContet = await getQuillDataUrl(
        postDetail.postContent,
        postDetail.postImgs
      );

      setTitle(postDetail.postTitle);
      const delta = JSON.parse(quillContet);
      quillRef.current.getEditor().setContents(delta);

      postDetail.postImgs.map(async (img) => {
        const filename = img.postImgUrl.split("/")[5];
        const type = filename.split(".")[1];
        const file = await urlToFileObject(
          img.postImgUrl,
          filename,
          `image/${type}`
        );
        const dataUrl = await fileToDataUrl(file);

        setImages((prev) => [...prev, { dataUrl: dataUrl, file: file }]);
      });
    };

    setQuill();
  }, [postDetail]);

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

  //저장 버튼
  const handleSubmitOnClick = async () => {
    if (!title.trim())
      return Swal.fire({ icon: "error", title: "제목을 입력해주세요." });
    if (!content.trim() || content === "<p><br></p>")
      return Swal.fire({ icon: "error", title: "내용을 입력해주세요." });

    try {
      const delta = quillRef.current.getEditor().getContents();

      const hashedImageDataUrls = delta
        .filter((row) => !!row.insert.image)
        .map((row) => SparkMD5.hash(row.insert.image));

      const sortedImages = hashedImageDataUrls.map((hashedImageUrl, idx) => {
        const foundImage = images.find(
          (image) => SparkMD5.hash(image.dataUrl) === hashedImageUrl
        );

        return {
          ...foundImage,
          seq: idx + 1,
        };
      });

      let idx = 0;
      const quillDelta = delta.map((row) => {
        if (!!row.insert.image) {
          return {
            ...row,
            insert: {
              ...row.insert,
              image: `[img-${sortedImages[idx++].seq}]`,
            },
          };
        }
        return row;
      });

      const postReq = {
        boardKey: searchParams.get("boardKey"),
        postTitle: title,
        postContent: JSON.stringify(quillDelta),
        files: sortedImages.map((image) => image.file),
      };

      await reqPostUpdate(postReq, postId);

      navigate(`/board/${searchParams.get("boardKey")}/${postId}`);
      postDetailQuery.refetch();
    } catch (error) {
      await Swal.fire({
        title: error?.response?.data?.body,
        text: error?.reponse?.data?.message,
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
