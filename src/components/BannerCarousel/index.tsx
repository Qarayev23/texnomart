import 'swiper/css';
import 'swiper/css/navigation';
import 'swiper/css/pagination';
import './bannerCarousel.scss';
import { Autoplay, Navigation, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';

const Carousel = () => {
  return (
    <div className="banner-carousel">
      <Swiper
        navigation={true}
        pagination={{ clickable: true }}
        modules={[Navigation, Pagination, Autoplay]}
        spaceBetween={30}
        slidesPerView={1}
        speed={1000}
        autoplay={{
          delay: 3000,
          disableOnInteraction: false,
        }}
        loop={true}>
        <SwiperSlide>
          <img src="https://texnomart.az/wp-content/uploads/2023/08/texnomart-2816-x1676-novruz-7-oq6bx27mtcsaip1nvyuj.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://texnomart.az/wp-content/uploads/2023/08/texnomart-2816-x1676-novruz-7-oq6bx27mtcsaip1nvyuj.jpg" alt="" />
        </SwiperSlide>
        <SwiperSlide>
          <img src="https://texnomart.az/wp-content/uploads/2023/08/texnomart-2816-x1676-novruz-7-oq6bx27mtcsaip1nvyuj.jpg" alt="" />
        </SwiperSlide>
      </Swiper>
    </div>
  )
}

export default Carousel