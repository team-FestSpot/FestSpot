import React, { useState } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { baseURL } from "../../api/axios";
import ReactQuill from "react-quill-new";
import Button from "@mui/material/Button";

function Feed(props) {
  const [value, setValue] = useState("");
  const modules = {
    toolbar: false, // 이 부분을 true로 설정하면 툴바가 나타납니다.
  };

  return (
    <div css={s.feedLayout}>
      <div css={s.contentsContainer}>
        <header css={s.header}>
          <div>제목</div>
          <div>국내 공연/국내 페스티벌/내한 공연</div>
        </header>
        <main css={s.main}>
          <div css={s.posterContainer}>
            <img src={`${baseURL}/image/poster/strawberry.jpg`} alt="" />
          </div>
          <div css={s.feedContentContainer}>
            <div css={s.feedContents}>
              <div>공연 지역</div>
              <div>공연 장소</div>
              <div>공연 일자</div>
              <div>공연 상태</div>
              <div>출연진</div>
            </div>
            <div css={s.ticketings}>
              <div>예매처 링크1 버튼</div>
              <div>예매처 링크2 버튼</div>
            </div>
          </div>
          <div css={s.feedCommentContainer}>
            <div css={s.quillContainer}>
              <p>댓글 입력</p>
              <ReactQuill
                theme="snow"
                modules={modules}
                value={value}
                onChange={setValue}
              />
              <Button variant="contained">댓글 작성</Button>
            </div>
            <div>댓글1</div>
            <div>댓글2</div>
            <div>댓글...</div>
          </div>
          <div css={s.prevNextButtonsContainer}>
            <div>이전공연</div>
            <div>다음공연</div>
          </div>
          <div css={s.toListButtonContainer}>
            <div>목록</div>
          </div>
        </main>
      </div>
    </div>
  );
}

export default Feed;
