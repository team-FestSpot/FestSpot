import React, { useRef, useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import usePrincipalQuery from "../../../querys/auth/usePrincipalQuery";
import { usePerformanceCommentRegisterMutation } from "../../../querys/performance/usePerformanceCommentRegisterMutation";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import Button from "@mui/material/Button";

function FeedCommentSubmit(props) {
  const navigate = useNavigate(); // 비로그인 상태로 댓글 작성하려고 할 시 로그인 창으로 보냄
  const principalQuery = usePrincipalQuery(); // principal 쿼리
  const principal = principalQuery?.data?.data?.body?.user;

  const textareaRef = useRef(); // 댓글 입력창에 사용하는 Ref(드래그로 크기 조절하는거 막음)
  const [value, setValue] = useState(""); // 댓글 입력값 저장
  const commentRegisterMutation = usePerformanceCommentRegisterMutation(); // 댓글 등록 / 수정 mutation

  // 댓글 입력값 변경 시 상태에 저장, ref로 높이 자동조절
  const handleCommentInputOnChange = (e) => {
    setValue(e.target.value);
    textareaRef.current.style.height = "auto"; // 높이 초기화
    textareaRef.current.style.height = textareaRef.current.scrollHeight + "px";

    // 입력창이 늘어날 때 입력창이 위로 밀리지 않고 아래로 확장
    textareaRef.current.scrollIntoView({
      block: "nearest",
      behavior: "smooth",
    });
  };

  // 댓글 등록 버튼 눌러서 댓글 입력
  const handlePerformanceCommentRegisterButtonOnClick = async () => {
    if (!principal || !principal?.userId) {
      await Swal.fire({
        title: "사용자 정보가 없습니다.\n로그인 화면으로 이동합니다.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      navigate("/auth/login");
      return;
    }

    if (!value || value.length < 1) {
      await Swal.fire({
        title: "댓글을 입력하세요.",
        icon: "error",
        showCancelButton: false,
        showConfirmButton: false,
        timer: 1500,
      });
      return;
    }

    const commentData = {
      performanceId: performanceDetail?.performanceId,
      content: value,
    };

    try {
      await commentRegisterMutation.mutateAsync(commentData);
      setValue("");
    } catch (error) {
      return;
    }
  };

  return (
    <>
      <div css={s.commentSubmitNicknameContainer}>
        <p>{principal?.userNickName}</p>
      </div>
      <div css={s.commentInputContainer}>
        <textarea
          onChange={handleCommentInputOnChange}
          placeholder="댓글 입력"
          ref={textareaRef}
          value={value}
        />
      </div>
      <div css={s.commentSubmitButtonsContainer}>
        <Button
          variant="contained"
          sx={{
            backgroundColor: "#ef5a39",
            width: "4rem",
          }}
          onClick={handlePerformanceCommentRegisterButtonOnClick}
        >
          작성
        </Button>
      </div>
    </>
  );
}

export default FeedCommentSubmit;
