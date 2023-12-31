import 'swiper/css'
import 'swiper/css/pagination';
import { Pagination } from 'swiper/modules';
import { Swiper, SwiperSlide } from 'swiper/react';
import styles from './productCarousel.module.scss';
import Product from '../Product';
import { useProductsQuery } from '../../redux/productApi';
import { Link } from 'react-router-dom';
import { ProductCarauselProps } from '../../types';

const ProductCarousel = ({ category, title, id }: ProductCarauselProps) => {
    const { data } = useProductsQuery({ category, q: "?_start=1&_end=8" });
    const products = id ? data?.apiResponse.filter(item => item?.id !== id) : data?.apiResponse;

    return (
        <section className={styles.productCarousel}>
            <div className="g-container">
                <div className="carousel-headline">
                    <h2 className="carousel-title">{title}</h2>
                    <Link to={`/category/${category}`} className='btn-all'>Bütün təklifləri gör</Link>
                </div>
                <Swiper
                    pagination={{ clickable: true }}
                    modules={[Pagination]}
                    slidesPerView={2}
                    speed={1000}
                    breakpoints={{
                        768: {
                            slidesPerView: 3,
                        },
                        991: {
                            slidesPerView: 4,
                        },
                        1200: {
                            slidesPerView: 5,
                        },
                    }}
                    className={styles.productCarousel__swiper}
                >
                    {
                        products?.map((product) => (
                            <SwiperSlide key={product.id}>
                                <Product product={product} />
                            </SwiperSlide>
                        ))
                    }
                </Swiper>
            </div>
        </section>
    )
}

export default ProductCarousel