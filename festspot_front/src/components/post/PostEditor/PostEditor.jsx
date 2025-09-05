/** @jsxImportSource @emotion/react */
import { useFixQuillToolBarStore } from "../../../stores/useFixQuillToolBarStore";
import QuillEditor from "../QuillEditor/QuillEditor";
import * as s from "./styles";
import React from "react";

function PostEditor({
  title,
  setTitle,
  titleInputRef,
  content,
  setContent,
  quillRef,
  setImages,
}) {
  const { isFixed } = useFixQuillToolBarStore();
  return (
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
  );
}

export default PostEditor;
