import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { increase, decrease, remove, clearBaket } from '../../redux/features/cartSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { FaLongArrowAltLeft, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import styles from './basket.module.scss';

const Basket = () => {
        const dispatch = useAppDispatch()

        const { cart } = useAppSelector(state => state.cartReducer)

        useEffect(() => {
            localStorage.setItem("cartItems", JSON.stringify(cart))
        }, [cart])


        const totalPrice = cart.reduce((acc, element) => {
            return acc + element.price * element.count
        }, 0)

        const totalQuantity = cart.reduce((acc, element) => {
            return acc + element.count
        }, 0)

        return (
            <section className={styles.basketPage}>
                <div className="g-container">
                    <div className={styles.basketPage__content}>
                        <h1 className={styles.basketPage__title}>Səbət</h1>
                        {cart.length > 0 ?
                            <div className={styles.basketPage__header}>
                                <div className={styles.basketPage__header__left}>
                                    <h5>Məhsul</h5>
                                </div>
                                <div className={styles.basketPage__header__right}>
                                    <h5 className={styles.basketPage__header__title}>QİYMƏT</h5>
                                    <h5 className={styles.basketPage__header__title}>MİQDARI</h5>
                                    <h5 className={styles.basketPage__header__title}>ÜMUMİ</h5>
                                </div>
                            </div>
                            : <div className={styles.basketPage__empty}>Səbətiniz hazırda boşdur.</div>
                        }
                        <ul className={styles.basketPage__list}>
                            {
                                cart.map((item) => {
                                    const amount = item.price * item.count
                                    return (
                                        <li className={styles.basketPage__item} key={item.id}>
                                            <div className={styles.basketPage__item__left}>
                                                <div className={styles.basketPage__item__img}>
                                                    <img src={item.img} alt={item.name} />
                                                </div>
                                                <Link to={`/products/${item.id}`} className={styles.basketPage__item__name}>
                                                    <h4>{item.name}</h4>
                                                </Link>
                                            </div>
                                            <div className={styles.basketPage__item__right}>
                                                <div className={styles.basketPage__item__price}>
                                                    <span className={styles.mobScreen}>Qiymət:</span>
                                                    <span>{item.price}M</span>
                                                </div>
                                                <div className={styles.basketPage__item__quantity}>
                                                    <button type="button" className={styles.minusBtn} onClick={() => dispatch(decrease(item.id))}>
                                                        <FaMinus />
                                                    </button>
                                                    <span className={styles.count}>{item.count}</span>
                                                    <button type="button" className={styles.plusBtn} onClick={() => dispatch(increase(item.id))}>
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                                <div className={styles.basketPage__item__total}>
                                                    <span className={styles.mobScreen}>Ümumi:</span>
                                                    <span>{amount}M</span>
                                                </div>
                                                <div className={styles.basketPage__item__remove}>
                                                    <button onClick={() => dispatch(remove(item.id))}>
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                        </ul>
                        <div className={styles.basketPage__footer}>
                            <Link to="/category/smartphones" className="g-button g-button--red">
                                <FaLongArrowAltLeft />
                                Mağazaya keç
                            </Link>
                            {cart.length > 0 &&
                                <button className="g-button g-button--white" onClick={() => dispatch(clearBaket())}>
                                    Səbəti təmizlə
                                </button>}
                        </div>
                        {cart.length > 0 &&
                            <div className={styles.basketPage__totals}>
                                <h5>Səbətdəki məhsullar</h5>
                                <ul>
                                    <li>
                                        <span>Ümumi say</span>
                                        <span>{totalQuantity}</span>
                                    </li>
                                    <li>
                                        <span>Ümumi məbləğ</span>
                                        <span>{totalPrice}M</span>
                                    </li>
                                </ul>
                                <button className="g-button g-button--white ml-auto lg:ml-0">Kartla ödə</button>
                            </div>}
                    </div>
                </div>
            </section>
        )
    }

export default Basket
