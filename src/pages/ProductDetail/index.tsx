import { useState } from 'react'
import { Params, useNavigate, useParams } from "react-router-dom";
import Spinner from '../../components/Spinner';
import { addToBasket } from '../../redux/features/basketSlice';
import { useProductQuery } from '../../redux/productApi';
import { useAppDispatch, useAppSelector } from '../../redux/hooks';
import { monthlyPaymentBtns } from '../../constants';
import 'swiper/css';
import 'swiper/css/free-mode';
import 'swiper/css/thumbs';
import './swiper.scss';
import styles from './productDetail.module.scss';
import { setFiterTitle } from '../../utils';
import { FaRegHeart } from 'react-icons/fa';
import { addToCompare } from '../../redux/features/compareSlice';
import { addToWishlist } from '../../redux/features/wishlistSlice';
import { Swiper, SwiperSlide } from 'swiper/react';
import { FreeMode, Thumbs } from 'swiper/modules';
import ProductCarousel from '../../components/ProductCarousel';
import { Helmet } from 'react-helmet-async';

const ProductDetail = () => {
  const { id } = useParams<Params>();
  const [thumbsSwiper, setThumbsSwiper] = useState<any>(null);
  const category = window.location.pathname.split('/')[1]
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProductQuery({ category, id: id! })
  const dispatch = useAppDispatch()
  const [month, setMonth] = useState("sixMonths");
  const { wishlist } = useAppSelector(state => state.wishlistReducer)
  const { compare } = useAppSelector(state => state.compareReducer)

  function handleCreditCalculator(monthParam: string) {
    setMonth(monthParam);
  }

  if (isLoading) {
    return <Spinner />;
  }

  if (isError) {
    navigate("/not-found")
  }

  return (
    <>
      <Helmet>
        <title>{product?.name} - Texnomart</title>
      </Helmet>
      
      <section className={styles.productDetail}>
        <div className="g-container">
          <h3 className={styles.productDetail__title}>
            {product?.name}
          </h3>
          <div className={styles.productDetail__content}>
            <div className={styles.productDetail__left}>
              <div className={styles.productDetail__carousel}>
                <Swiper
                  spaceBetween={10}
                  navigation={true}
                  thumbs={{ swiper: thumbsSwiper && !thumbsSwiper.destroyed ? thumbsSwiper : null }}
                  modules={[FreeMode, Thumbs]}
                  speed={1000}
                >
                  {product?.img.map((img, index) => (
                    <SwiperSlide key={index}>
                      <div className={styles.productDetail__img}>
                        <img src={img} alt={product?.name} />
                      </div>
                    </SwiperSlide>
                  ))}
                </Swiper>
                <Swiper
                  onSwiper={setThumbsSwiper}
                  spaceBetween={10}
                  slidesPerView={4}
                  freeMode={true}
                  watchSlidesProgress={true}
                  modules={[FreeMode, Thumbs]}
                >
                  {product?.img.map((img, index) => (
                    <SwiperSlide key={index}>
                      <img src={img} alt={product?.name} className={styles.productDetail__thumbImg} key={index} />
                    </SwiperSlide>
                  ))}
                </Swiper>
              </div>
              <div className={styles.productDetail__info}>
                <span className={styles.productDetail__price}>{product?.price} <span className='azn'>M</span></span>
                <div className={styles.productDetail__calc}>
                  <span className={styles.productDetail__calc__title}>Kredit kalkulyatoru</span>
                  <span className={styles.productDetail__calc__text}>Aylıq ödəniş:&nbsp;{product?.monthlyPayment?.[month]}&nbsp;M</span>
                  <div className={styles.productDetail__calc__btn}>
                    {monthlyPaymentBtns.map((item, index) => (
                      <button
                        key={index}
                        onClick={() => handleCreditCalculator(item.value)}
                        className={month === item.value ? `${styles.active}` : ""}>
                        {item.label}
                      </button>
                    ))}
                  </div>
                  <button
                    className="g-button g-button--red"
                    onClick={() => dispatch(addToBasket(product!))} >
                    Səbətə at
                  </button>
                </div>
                <div className={styles.productDetail__icons}>
                  <button
                    className={compare.some(item => item.id === product?.id) ? `${styles.active} ${styles.productDetail__icon}` : styles.productDetail__icon}
                    onClick={() => dispatch(addToCompare(product!))}
                  >
                    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path d='M23.141,27.466a6.876,6.876,0,0,1-6.859-6.876.82.82,0,0,1,.059-.329l5.44-12.509H8.231l5.44,12.512a.78.78,0,0,1,.061.313A6.866,6.866,0,0,1,0,20.605a1.409,1.409,0,0,1,.057-.329l.008-.027.051-.095.118-.306A1,1,0,0,0,.3,19.689l.268-.6c.035-.093.065-.168.1-.236l.3-.666.172-.091-.111-.041c.022-.061.126-.3.126-.3l.064-.144c.024-.051.046-.1.065-.152.038-.1.225-.522.27-.612l.164-.4a3.074,3.074,0,0,0,.151-.355l.975-2.235c.059-.125.118-.254.167-.384l.436-.984L3.9,11.406c.033-.075.219-.483.236-.542a2.3,2.3,0,0,0,.1-.237L5.005,8.88l.119-.3L5.469,7.8l.1-.222.057-.152.248-.565A1.813,1.813,0,0,1,6,6.6l.25-.592h.073C6.5,6,6.7,5.992,6.9,5.989h7.2V2.534h1.774V5.989H22.8c.3.007.592.007.886.007H23.8v.118a2.141,2.141,0,0,0,.176.484,2.4,2.4,0,0,1,.1.224s.3.71.324.743l.112.237.217.52.663,1.5c.042.111.087.208.133.307a3.982,3.982,0,0,0,.165.379l.153.37c.021.056.208.465.208.465l.107.257.654,1.51.054.109A2.554,2.554,0,0,1,27,13.5a3.27,3.27,0,0,0,.156.366l.646,1.508a2.635,2.635,0,0,1,.163.369l.165.362c.046.118.1.237.154.355l.323.749c.059.132.084.187.105.244.067.15.1.23.132.315a1.975,1.975,0,0,1,.132.293l-.038.212.108-.05.175.392.391.913.089.189a.975.975,0,0,0,.059.137.677.677,0,0,1,.053.142l.1.218a1.3,1.3,0,0,1,.089.374,6.881,6.881,0,0,1-6.87,6.871ZM1.962,22a5.083,5.083,0,0,0,6.286,3.532A5.148,5.148,0,0,0,11.775,22l.077-.282H1.89Zm16.279,0a5.146,5.146,0,0,0,3.527,3.533,4.993,4.993,0,0,0,1.379.194,5.147,5.147,0,0,0,4.905-3.726l.073-.283H18.163Zm9.627-2.046L23.145,9.109,18.421,19.958Zm-16.277,0L6.869,9.109,2.145,19.958Z' /></svg>
                  </button>
                  <button
                    className={wishlist.some(item => item.id === product?.id) ? `${styles.active} ${styles.productDetail__icon}` : styles.productDetail__icon}
                    onClick={() => dispatch(addToWishlist(product!))}
                  >
                    <FaRegHeart />
                  </button>
                </div>
              </div>
            </div>
            <div className={styles.productDetail__right}>
              <table className={styles.productDetail__table}>
                <tbody>
                  <tr>
                    <th>Brend</th>
                    <td>{product?.brand}</td>
                  </tr>
                  <tr>
                    <th>Adı</th>
                    <td>{product?.name}</td>
                  </tr>
                  <tr>
                    <th>Qiymət</th>
                    <td>{product?.price} <span className='azn'>M</span></td>
                  </tr>
                  {
                    Object.entries(product?.filterItems!).map(([key, value]) => (
                      <tr key={key} className={key === "brand" ? "hidden" : ""}>
                        <th>{setFiterTitle(key)}</th>
                        <td>{value}</td>
                      </tr>
                    ))
                  }
                </tbody>
              </table>
            </div>
          </div>
        </div>

        <ProductCarousel title='Oxşar Məhsullar' category={product?.category!} id={product?.id} />
      </section>
    </>
  )
}

export default ProductDetail