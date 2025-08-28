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

  const page = parseInt(searchParams.get("page")) || 1;

  const currentPageGroupNum = Math.floor((page - 1) / count);
  const startPage = currentPageGroupNum * count + 1;
  const endPage = startPage + count - 1;

  const gap = "0.4rem";
  const paginationArray = Array.from(
    { length: count },
    (element, index) => index
  );

  //버튼 개수 반응형
  useEffect(() => {
    const width = divWidth;
    const buttonCount = Math.floor(
      (width - // 버튼이 정사각형이라서 높이 = 너비
        (startPage === 1 ? 0 : parentHeight) - // prev 버튼이 있으면 뺌
        (endPage >= totalPage ? 0 : parentHeight) + // next 버튼이 있으면 뺌
        remToPx(gap)) / // gap 하나는 기본으로 뺌
        (parentHeight + remToPx(gap)) // 버튼 크기 + gap (실질적인 크기)
    );

    setCount(buttonCount);
    if (buttonCount < 3) setCount(3);
    if (buttonCount > 10) setCount(10);
  }, [divWidth, parentHeight]);

  const handlePageNumOnclick = (e, currentPage) => {
    setSearchParams({ page: currentPage + 1 });
  };

  const handlePrevOnClick = (e) => {
    setSearchParams({ page: startPage - count });
  };

  const handleNextOnClick = (e) => {
    setSearchParams({ page: startPage + count });
  };

  useEffect(() => {
    console.log(endPage);
  }, [endPage]);

  return (
    <div css={s.paginationBarLayout} ref={layoutRef}>
      {startPage === 1 || (
        <div css={s.paginationButton} onClick={handlePrevOnClick}>
          <IoChevronBack />
        </div>
      )}
      <div css={s.paginationNumContainer(gap)}>
        {paginationArray.map((index) => (
          <>
            {startPage + index > totalPage || (
              <div
                key={index}
                css={s.paginationNum(
                  page % count === 0 // page = 현재 페이지, count = 버튼 개수, 나머지 = 0 이다 -> 현재 페이지가 맨 끝에 있다
                    ? index === count - 1 // 마지막 index에서 불들어옴
                    : index === (page % count) - 1 // 나머지(현재 페이지 index)에 불 들어옴
                )}
                onClick={(e) => handlePageNumOnclick(e, index)}
              >
                {startPage + index}
              </div>
            )}
          </>
        ))}
      </div>
      {endPage >= totalPage || (
        <div css={s.paginationButton} onClick={handleNextOnClick}>
          <IoChevronForward />
        </div>
      )}
    </div>
  );
}

export default PaginationBar;
