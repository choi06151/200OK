export const preloadImages = (urls) => {
  return Promise.all(
    urls.map(
      (url) =>
        new Promise((resolve, reject) => {
          const img = new Image();
          img.src = url;
          img.onload = () => resolve(img); // 로드 완료된 이미지 객체 반환
          img.onerror = (err) => reject(err); // 에러 발생 시 reject
        })
    )
  );
};
