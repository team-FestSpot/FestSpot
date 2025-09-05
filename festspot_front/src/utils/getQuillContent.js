export const getQuillContent = (content, imgList) => {
  //match = 정규식에 걸린 문자열, seqNum = 숫자 부분
  //정규식에 걸리는 부분이 있으면 뒷부분 함수가 실행 됨
  return content.replace(/\[img-(\d+)\]/g, (match, seqNum) => {
    const img = imgList.find((img) => img.seq === Number(seqNum));

    if (!img) return match; // 매칭되는 이미지가 없으면 그대로 둠

    //match 부분이 return 값으로 대체됨
    return `<img src="${img.postImgUrl}" alt="image-${img.seq}" />`;
  });
};
