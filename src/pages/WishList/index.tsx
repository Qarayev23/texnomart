import { Link } from 'react-router-dom'
import { clearWishlist, removeFromWishlist } from '../../redux/features/wishlistSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { FaLongArrowAltLeft, FaTrashAlt } from "react-icons/fa";
import styles from './wishList.module.scss';
import { addToBasket } from '../../redux/features/basketSlice';
import { Helmet } from 'react-helmet-async';

const WishList = () => {
    const dispatch = useAppDispatch()
    const { wishlist } = useAppSelector(state => state.wishlistReducer)

    return (
        <>
            <Helmet>
                <title>İstək siyahısı - Texnomart</title>
            </Helmet>

            <section className={styles.wishList}>
                <div className="g-container">
                    <div className={styles.wishList__content}>
                        <h1 className="page-title">İstək siyahısı</h1>
                        {wishlist.length > 0 ?
                            <div className={styles.wishList__header}>
                                <div className={styles.wishList__header__left}>
                                    <h5 className={styles.wishList__header__title}>Məhsul</h5>
                                </div>
                                <div className={styles.wishList__header__right}>
                                    <h5 className={styles.wishList__header__title}>QİYMƏT</h5>
                                    <h5 className={styles.wishList__header__title}>STOK</h5>
                                    <h5 className={styles.wishList__header__title}>ÜMUMİ</h5>
                                </div>
                            </div>
                            : <div className={styles.wishList__empty}>İstək siyahısı hazırda boşdur.</div>
                        }
                        <ul className={styles.wishList__list}>
                            {
                                wishlist.map((item) => (
                                    <li className={styles.wishList__item} key={item.id}>
                                        <div className={styles.wishList__item__left}>
                                            <div className={styles.wishList__item__img}>
                                                <img src={item.img[0]} alt={item.name} />
                                            </div>
                                            <Link to={`/${item.category}/${item.id}`} className={styles.wishList__item__name}>
                                                <h4>{item.name}</h4>
                                            </Link>
                                        </div>
                                        <div className={styles.wishList__item__right}>
                                            <p>{item.price} <span className='azn'>M</span></p>
                                            <p className={styles.wishList__item__stock}>Anbarda</p>
                                            <button
                                                className={styles.wishList__item__add}
                                                onClick={() => {
                                                    dispatch(addToBasket(item))
                                                    dispatch(removeFromWishlist(item.id))
                                                }}
                                            >
                                                Səbətə at
                                            </button>
                                            <div className={styles.wishList__item__remove}>
                                                <button onClick={() => dispatch(removeFromWishlist(item.id))}>
                                                    <FaTrashAlt />
                                                </button>
                                            </div>
                                        </div>
                                    </li>
                                )
                                )}
                        </ul>
                        <div className={styles.wishList__footer}>
                            <Link to="/category/smartfonlar" className="g-button g-button--red">
                                <FaLongArrowAltLeft />
                                Mağazaya keç
                            </Link>
                            {wishlist.length > 0 &&
                                <button className="g-button g-button--white" onClick={() => dispatch(clearWishlist())}>
                                    İstək siyahısını təmizlə
                                </button>
                            }
                        </div>
                    </div>
                </div>
            </section>
        </>
    )
}

export default WishList