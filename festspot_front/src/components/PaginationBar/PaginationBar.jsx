/** @jsxImportSource @emotion/react */
import { remToPx } from "../../utils/remToPx";
import * as s from "./styles";
import React, { useEffect, useRef, useState } from "react";
import { BiSolidRightArrow, BiSolidLeftArrow } from "react-icons/bi";
import { IoChevronBack, IoChevronForward } from "react-icons/io5";
import { useDivSize } from "../../hooks/useDivSize";
import { useParentSize } from "../../hooks/useParentSize";
import { PAGE_SIZE } from "../../constants/boardPageSize";

function PaginationBar({ searchParams, setSearchParams, totalPage }) {
  const [count, setCount] = useState(3);
  const layoutRef = useRef();
  const { divWidth } = useDivSize(layoutRef);
  const { parentHeight } = useParentSize(layoutRef);
  const [currentPageGroupNum, setCurrentPageGroupNum] = useState(0);
  const [startPage, setStartPage] = useState(0);
  const [endPage, setEndPage] = useState(count);

  const page = parseInt(searchParams.get("page")) || 1;

  const gap = "0.4rem";
  const paginationArray = Array.from(
    { length: count },
    (element, index) => index
  );

  useEffect(() => {
    setCurrentPageGroupNum(Math.floor((page - 1) / count));
  }, [page, count]);
  useEffect(() => {
    setStartPage(currentPageGroupNum * count + 1);
  }, [currentPageGroupNum, count]);
  useEffect(() => {
    setEndPage(startPage - 1 + count);
  }, [startPage, count]);

  //버튼 개수 반응형
  useEffect(() => {
    const width = divWidth;
    const buttonCount = Math.floor(
      (width - // 버튼이 정사각형이라서 높이 = 너비
        2 * parentHeight -
        remToPx(gap)) / // gap 하나는 기본으로 뺌
        (parentHeight + remToPx(gap)) // 버튼 크기 + gap (실질적인 크기)
    );

    setCount(buttonCount);
    if (buttonCount < 3) setCount(3);
    if (buttonCount > 10) setCount(10);
  }, [divWidth, parentHeight]);

  const handlePageNumOnclick = (e, currentPage, isAble) => {
    if (!isAble) return;
    setSearchParams({ page: currentPage + 1 });
  };

  const handlePrevOnClick = (isAble) => {
    if (!isAble) return;
    setCurrentPageGroupNum((prev) => prev - 1);
  };

  const handleNextOnClick = (isAble) => {
    if (!isAble) return;
    setCurrentPageGroupNum((prev) => prev + 1);
  };

  const isCurrentPage = (index) =>
    page % count === 0 // page = 현재 페이지, count = 버튼 개수, 나머지 = 0 이다 -> 현재 페이지가 맨 끝에 있다
      ? index === count - 1 // 마지막 index에서 불들어옴
      : index === (page % count) - 1; // 나머지(현재 페이지 index)에 불 들어옴

  return (
    <div css={s.paginationBarLayout} ref={layoutRef}>
      <div
        css={s.paginationButton(startPage !== 1)}
        onClick={() => handlePrevOnClick(startPage !== 1)}
      >
        <IoChevronBack />
      </div>
      <div css={s.paginationNumContainer(gap)}>
        {paginationArray.map((index) => (
          <div
            key={index}
            css={s.paginationNum(
              isCurrentPage(index),
              startPage + index <= totalPage
            )}
            onClick={(e) =>
              handlePageNumOnclick(
                e,
                startPage + index - 1,
                startPage + index <= totalPage
              )
            }
          >
            {startPage + index}
          </div>
        ))}
      </div>
      <div
        css={s.paginationButton(endPage < totalPage)}
        onClick={() => handleNextOnClick(endPage < totalPage)}
      >
        <IoChevronForward />
      </div>
    </div>
  );
}

export default PaginationBar;
