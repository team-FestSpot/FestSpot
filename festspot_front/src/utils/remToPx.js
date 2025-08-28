export const remToPx = (remString) => {
  // "4rem" → 4
  const remValue = parseFloat(remString);

  // font-size를 가져와서 1rem 구하기
  const rootFontSize = parseFloat(
    getComputedStyle(document.documentElement).fontSize
  );

  return remValue * rootFontSize;
};
