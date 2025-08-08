export const getLocalDotDate = (date) => {
  const now = date ?? new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}.${month}.${day}`;
}; // 현재 날짜를 YYYY.MM.DD 형식으로 출력

export const getLocalDate = (date) => {
  const now = date ?? new Date();
  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
}; // 현재 날짜를 YYYYMMDD 형식으로 출력

export const getLocalDateAfterMonths = () => {
  const now = new Date();
  now.setMonth(now.getMonth() + 6); // 6개월 뒤 공연까지 검색

  const year = now.getFullYear();
  const month = String(now.getMonth() + 1).padStart(2, "0");
  const day = String(now.getDate()).padStart(2, "0");

  return `${year}${month}${day}`;
};
