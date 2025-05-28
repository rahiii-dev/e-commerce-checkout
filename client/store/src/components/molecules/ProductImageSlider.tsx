import { Swiper, SwiperSlide } from 'swiper/react';
import { Navigation, Pagination, Autoplay } from 'swiper/modules';
import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';

const ProductImageSlider = ({ images }: { images: string[] }) => {
  return (
    <Swiper
      modules={[Navigation, Pagination, Autoplay]}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      navigation
      pagination={{ clickable: true }}
      loop
      className="w-full h-full"
    >
      {images.map((img, idx) => (
        <SwiperSlide key={idx}>
          <img
            src={img}
            alt={`Product ${idx + 1}`}
            className="w-full h-full object-contain"
          />
        </SwiperSlide>
      ))}
    </Swiper>
  );
};


export default ProductImageSlider;
