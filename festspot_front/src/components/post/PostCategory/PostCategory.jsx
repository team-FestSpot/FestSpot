/** @jsxImportSource @emotion/react */
import { useSearchParams } from "react-router-dom";
import * as s from "./styles";
import React, { useEffect, useRef, useState } from "react";
import { FaCaretDown } from "react-icons/fa";
import usePostCategoryQuery from "../../../querys/post/usePostCategoryQuery";

function PostCategory() {
  const [selectIsOpen, setSelecteIsOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const dropdownRef = useRef();

  const postCategoryQuery = usePostCategoryQuery();
  const postCategories = postCategoryQuery.data?.data?.body || [];

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

  const handleOpenSelectOnClick = (e) => {
    if (selectIsOpen) {
      setSelecteIsOpen(false);
      return;
    }
    setSelecteIsOpen(true);
  };

  //selct 선택
  const handleSelectOnClick = (e, boardKey) => {
    setSearchParams({ boardKey: boardKey });
    setSelecteIsOpen(false);
  };

  return (
    <>
      {!!postCategories && (
        <div css={s.selectCategory} ref={dropdownRef}>
          <div css={s.selected(selectIsOpen)} onClick={handleOpenSelectOnClick}>
            {
              postCategories.find(
                (postCategory) =>
                  postCategory.postCategoryKey === searchParams.get("boardKey")
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
      )}
    </>
  );
}

export default PostCategory;
