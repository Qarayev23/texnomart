import 'swiper/css/pagination';
import { Autoplay, Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Link } from "react-router-dom"
import styles from "./brandCarousel.module.scss"
import { brandItems } from '../../constants';

const BarndCarousel = () => {
    return (
        <section className={styles.brandCarousel}>
            <div className="g-container">
                <div className="carousel-headline">
                    <h2 className="carousel-title">Markalar</h2>
                    <Link to="/brands" className='btn-all'>Bütün markaları gör</Link>
                </div>
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination, Autoplay]}
                    slidesPerView={2}
                    spaceBetween={20}
                    speed={1000}
                    autoplay={{
                        delay: 3000,
                        disableOnInteraction: false,
                    }}
                    breakpoints={{
                        640: {
                            slidesPerView: 3,
                        },
                        991: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                    }}
                    className={styles.brandCarousel__swiper}
                >
                    {
                        brandItems.map((item, index) => {
                            return (
                                <SwiperSlide key={index}>
                                    <Link to={item.path} className={styles.brandCarousel__item}>
                                        <img src={item.img} className={styles.brandCarousel__img} alt={item.label} />
                                    </Link>
                                </SwiperSlide>
                            )
                        })
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default BarndCarousel