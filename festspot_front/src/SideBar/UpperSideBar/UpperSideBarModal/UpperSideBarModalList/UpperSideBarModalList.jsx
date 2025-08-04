import React, { useEffect } from "react";
/** @jsxImportSource @emotion/react */
import * as s from "./styles";
import { css } from "@emotion/react";

function UpperSideBarModalList({ props }) {
  const major = props.majorCategory;
  const minors = props.minorCategory;

  return (
    <div css={s.container}>
      <div css={s.majorCategory}>
        <a href={major.link} css={s.majorLink}>
          {major.content}
        </a>
      </div>
      <div css={s.minorCategoryContainer}>
        {minors.map((minor, index) => (
          <a key={index} href={minor.link} css={s.minorLink}>
            {minor.content}
          </a>
        ))}
      </div>
    </div>
  );
}

export default UpperSideBarModalList;
