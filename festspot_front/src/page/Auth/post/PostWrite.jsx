/** @jsxImportSource @emotion/react */
import React, { useState, useRef, useMemo } from "react";
import ReactQuill from "react-quill-new";
import "react-quill-new/dist/quill.snow.css";
import * as s from "./styles";
import { AiOutlineCamera, AiOutlineSave } from "react-icons/ai";
import { MdClose, MdArrowBack } from "react-icons/md";
import { useNavigate } from "react-router-dom";

const PostWrite = () => {
  const navigate = useNavigate();
  const [ title, setTitle ] = useState("");
  const [ content, setContent ] = useState("");
  const [ images, setImages ] = useState([]);
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
    const files = Array.from(e.target.files);
    const remainingSlots = MAX_IMAGES - images.length;

    if (files.length > remainingSlots) {
      alert(`이미지는 최대 ${MAX_IMAGES}장까지만 업로드 할 수 있습니다. ${remainingSlots}장 만 추가됩니다.`);
    }

    const filesToAdd = files.slice(0, remainingSlots);

    filesToAdd.forEach((file) => {
      if (file.type.startsWith('image/')) {
        const reader = new FileReader();
        reader.onload = (e) => {
          const imageUrl = e.target.result;
          insertImageToEditor(imageUrl);
          setImages(prev => [...prev, { file, url: imageUrl, id: Date.now() + Math.random() }]);
        };
        reader.readAsDataURL(file);
      }
    });

    e.target.value = "";
  };

  const insertImageToEditor = (imageUrl) => {
    const quill = quillRef.current?.getEditor();
    if (quill) {
      const range = quill.getSelection();
      const index = range ? range.index : quill.getLength();
      quill.insertEmbed(index, 'image', imageUrl);
      quill.setSelection(index + 1);
    }
  };

  const removeImage = (imageId) => {
    setImages(prev => prev.filter(img => img.id !== imageId));

    const quill = quillRef.current?.getEditor();
    if (quill) {
      const delta = quill.getContents();
      const imageToRemove = delta.ops.filter(op => {
        if(op.insert && op.insert.image) {
          return op.insert.image !== imageToRemove?.url;
        }
        return true;
      });
      quill.setContent({ ops: newDelta });
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
    'list', 'bullet', 'link', 'image'
  ]

  const handleSubmitOnClick = () => {
    if (!title.trim()) {
      alert("제목을 입력해주세요.");
      return;
    }

    if(!content.trim() || content === '<p><br></p>') {
      alert("내용을 입력해주세요.");
      return;
    }

    setSaveSubmit(true);

    try {
      const postData = {
        title: title.trim(),
        content,
        images: images.map(img => img.file),
      };

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
      {/* 고정 헤더 */}
      <div css={s.headerStyle}>
        <div css={s.headerContentStyle}>
          <button css={s.backButtonStyle} onClick={() => navigate(-1)}>
            <MdArrowBack />
            뒤로가기
          </button>
          <h1 css={s.headerTitleStyle}>글쓰기</h1>
          <button 
            css={[s.saveButtonStyle, saveSubmit && s.disabledButtonStyle]} 
            onClick={handleSubmitOnClick}
            disabled={saveSubmit}
          >
            <AiOutlineSave />
            {saveSubmit ? '저장 중...' : '저장'}
          </button>
        </div>
      </div>

      {/* 메인 콘텐츠 영역 */}
      <div css={s.mainContentStyle}>
        {/* 에디터 영역 */}
        <div css={s.editorWrapperStyle}>
          {/* 제목 섹션 */}
          <div css={s.titleSectionStyle}>
            <textarea
              placeholder="제목을 입력하세요"
              value={title}
              onChange={(e) => setTitle(e.target.value)}
              css={s.titleInputStyle}
              maxLength={100}
              rows={1}
              onInput={(e) => {
                e.target.style.height = 'auto';
                e.target.style.height = e.target.scrollHeight + 'px';
              }}
            />
            <div css={s.titleCountStyle}>{title.length}/100</div>
          </div>

          {/* React Quill 에디터 */}
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

        {/* 사이드바 */}
        <div css={s.sidebarStyle}>
          {/* 이미지 업로드 섹션 */}
          <div css={s.sidebarSectionStyle}>
            <h3>이미지 ({images.length}/10)</h3>
            <button css={s.imageUploadButtonStyle} onClick={hanldeImgUploadOnClick}>
              <AiOutlineCamera />
              이미지 추가
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
                    <button 
                      css={s.removeImageButtonStyle}
                      onClick={() => removeImage(image.id)}
                    >
                      <MdClose />
                    </button>
                  </div>
                ))}
              </div>
            )}
          </div>

          {/* 설정 섹션 */}
          <div css={s.sidebarSectionStyle}>
            <h3>글 설정</h3>
            <div css={s.settingsStyle}>
              <div css={s.settingItemStyle}>
                <label>댓글 허용</label>
                <select>
                  <option>허용</option>
                  <option>비허용</option>
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