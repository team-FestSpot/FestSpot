/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import * as s from "./styles";
import { AiOutlineCamera, AiOutlineSave } from "react-icons/ai";
import { MdClose, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";
import { useBoard } from "../../../constants/BoardContext";
import { createPostForm, createPostJson } from "../../../api/boardApi";

const PostWrite = () => {
  const navigate = useNavigate();
  const { currentBoard } = useBoard();
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ images, setImages ] = useState([]);
  const [ allowComments, setAllowComments ] = useState(true);
  const [ saveSubmit, setSaveSubmit ] = useState(false);
  const quillRef = useRef(null);
  const fileInputRef = useRef(null);

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
      alert(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드 할 수 있습니다. ${remainingSlots}장 만 추가됩니다.`);
    }
    const filesToAdd = files.slice(0, remainingSlots);
    filesToAdd.forEach((file) => {
      if (file.type.startsWith("image/")) {
        const reader = new FileReader();
        reader.onload = (ev) => {
          const imageUrl = ev.target.result;
          insertImageToEditor(imageUrl);
          setImages((prev) => [...prev, { file, url: imageUrl, id: Date.now() + Math.random() }]);
        };
        reader.readAsDataURL(file);
      }
    });
    e.target.value = "";
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
    const img = images.find(i => i.id === imageId);
    setImages(prev => prev.filter(i => i.id !== imageId));

    const quill = quillRef.current?.getEditor();
    if (quill && img) {
      const delta = quill.getContents();
      const newOps = [];
      (delta.ops || []).forEach(op => {
        if (op.insert && op.insert.image === img.url) return; 
        newOps.push(op);
      });
      quill.setContents({ ops: newOps });
    }
  };

 const modules = useMemo(() => ({
    toolbar: {
      container: [
        [{ 'header': [1, 2, 3, false] }],
        ['bold', 'italic', 'underline', 'strike'],
        [{ 'color': [] }, { 'background': [] }],
        [{ 'align': [] }],
        ['blockquote', 'code-block'],
        [{ 'list': 'ordered'}, { 'list': 'bullet' }],
        ['link'],
        ['clean']
      ],
      handlers: {
        image: hanldeImgUploadOnClick
      }
    },
  }), [images.length]);

  const formats = [
    'header', 'bold', 'italic', 'underline', 'strike',
    'color', 'background', 'align',
    'blockquote', 'code-block',
    'list', 'link', 'image'
  ]

  const handleSubmitOnClick = async () => {
    const clean = (content || "").replace(/\s/g, "");

    if (!title.trim()) return alert("제목을 입력해주세요.");
    if(!content.trim() || content === '<p><br></p>') return alert("내용을 입력해주세요.");

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

    } catch(error) {
      console.error("Save Fail", error);
      alert("게시글 저장에 실패했습니다.");
    } finally {
      setSaveSubmit(false);
    }
  };

  return (
    <div css={s.containerStyle}>
      <div css={s.headerStyle}>
        <div css={s.headerContentStyle}>
          <button css={s.backButtonStyle} onClick={() => navigate(-1)}>
            <MdArrowBack /> 뒤로가기
          </button>
          <h1 css={s.headerTitleStyle}>글쓰기</h1>
          <button
            css={[s.saveButtonStyle, saveSubmit && s.disabledButtonStyle]}
            onClick={handleSubmitOnClick}
            disabled={saveSubmit}
          >
            <AiOutlineSave /> {saveSubmit ? "저장 중..." : "저장"}
          </button>
        </div>
      </div>

      <div css={s.mainContentStyle}>
        <div css={s.editorWrapperStyle}>
          <div css={s.titleSectionStyle}>
            <textarea
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              css={s.titleInputStyle}
              maxLength={100}
              rows={1}
              onInput={(e) => {
                e.target.style.height = "auto";
                e.target.style.height = e.target.scrollHeight + "px";
              }}
            />
            <div css={s.titleCountStyle}>{title.length}/100</div>
          </div>

          <div css={s.editorSectionStyle}>
            <ReactQuill
              ref={quillRef}
              theme="snow"
              value={content}
              onChange={setContent}
              modules={modules}
              formats={formats}
              placeholder="내용을 작성해주세요..."
            />
          </div>
        </div>

        <div css={s.sidebarStyle}>
          <div css={s.sidebarSectionStyle}>
            <h3>이미지 ({images.length}/10)</h3>
            <button css={s.imageUploadButtonStyle} onClick={hanldeImgUploadOnClick}>
              <AiOutlineCamera /> 이미지 추가
            </button>
            <input
              ref={fileInputRef}
              type="file"
              accept="image/*"
              multiple
              onChange={handleFileOnChange}
              css={s.hiddenFileInputStyle}
            />
            {images.length > 0 && (
              <div css={s.imagePreviewGridStyle}>
                {images.map((image) => (
                  <div key={image.id} css={s.imagePreviewItemStyle}>
                    <img src={image.url} alt="preview" css={s.previewImageStyle} />
                    <button css={s.removeImageButtonStyle} onClick={() => removeImage(image.id)}>
                      <MdClose />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          <div css={s.sidebarSectionStyle}>
            <h3>글 설정</h3>
            <div css={s.settingsStyle}>
              <div css={s.settingItemStyle}>
                <label>댓글 허용</label>
                <select
                  value={allowComments ? "Y" : "N"}
                  onChange={(e) => setAllowComments(e.target.value === "Y")}
                >
                  <option value="Y">허용</option>
                  <option value="N">비허용</option>
                </select>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default PostWrite;