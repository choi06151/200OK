import Slider from 'react-slick';
import 'slick-carousel/slick/slick.css'; // 기본 스타일
import 'slick-carousel/slick/slick-theme.css'; // 테마 스타일
import { useSelector } from 'react-redux';

export default function Panorama() {
  let settings = {
    dots: false, // dots 제거
    arrows: false, // 화살표 제거
    infinite: true, // 무한 반복
    speed: 12000, // 슬라이드 전환 속도 (밀리는 애니메이션의 시간)
    autoplay: true, // 자동 재생
    autoplaySpeed: 0, // 중간 멈춤 없이 계속
    cssEase: 'linear', // 부드러운 전환
    slidesToShow: 2, // 한 번에 보여줄 슬라이드 수
    slidesToScroll: 1, // 한 번에 넘길 슬라이드 수
  };

  const { imgs } = useSelector((state) => state.status);
  console.log(imgs);

  return (
    <div style={{ width: '100%', position: 'relative', paddingTop: '5%' }}>
      <Slider {...settings}>
        {imgs.map((img, index) => (
          <div
            key={index}
            style={{
              width: '90%',
              height: '90%',
              position: 'absolute', // 부모 크기 맞춤
              top: 0,
              left: 0,
              overflow: 'hidden',
            }}
          >
            <img
              src={img}
              alt={`slider-img-${index}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'contain',
                borderRadius: '10px',
              }}
            />
          </div>
        ))}
      </Slider>
    </div>
  );
}
