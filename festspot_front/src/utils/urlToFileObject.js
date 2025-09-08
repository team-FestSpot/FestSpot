export const urlToFileObject = async (url, filename, mimeType) => {
  const response = await fetch(url); // URL에서 데이터 가져오기
  const blob = await response.blob(); // Blob으로 변환
  return new File([blob], filename, { type: mimeType });
};

export const fileToDataUrl = (file) =>
  new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.onload = () => resolve(reader.result);
    reader.onerror = (err) => reject(err);
    reader.readAsDataURL(file);
  });
