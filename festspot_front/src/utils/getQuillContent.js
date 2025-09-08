import { fileToDataUrl, urlToFileObject } from "./urlToFileObject";

export const getQuillContent = (content, imgList) => {
  //match = 정규식에 걸린 문자열, seqNum = 숫자 부분
  //정규식에 걸리는 부분이 있으면 뒷부분 함수가 실행 됨
  return content.replace(/\[img-(\d+)\]/g, (match, seqNum) => {
    const img = imgList.find((img) => img.seq === Number(seqNum));

    if (!img) return match; // 매칭되는 이미지가 없으면 그대로 둠

    //match 부분이 return 값으로 대체됨
    return img.postImgUrl;
  });
};

export const getQuillDataUrl = async (content, imgList) => {
  const parts = content.split(/\[img-(\d+)\]/g);

  const replace = await Promise.all(
    parts.map(async (part, idx) => {
      if (idx % 2 === 1) {
        const seqNum = Number(part);
        const img = imgList.find((img) => img.seq === seqNum);

        if (!img) return "잘못된 이미지";

        const filename = img.postImgUrl.split("/")[5];
        const type = filename.split(".")[1];

        const file = await urlToFileObject(
          img.postImgUrl,
          filename,
          `image/${type}`
        );
        const dataUrl = await fileToDataUrl(file);

        return dataUrl;
      } else {
        return part;
      }
    })
  );

  return replace.join("");
};
