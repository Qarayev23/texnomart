import { Link } from 'react-router-dom'
import { increase, decrease, clearBaket, removeFromBasket } from '../../redux/features/basketSlice'
import { useAppDispatch, useAppSelector } from '../../redux/hooks'
import { FaLongArrowAltLeft, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";
import styles from './basket.module.scss';

const Basket = () => {
        const dispatch = useAppDispatch()
        const { basket } = useAppSelector(state => state.basketReducer)
        
        const totalPrice = basket.reduce((acc, element) => {
            return acc + element.price * element.count!
        }, 0)

        const totalQuantity = basket.reduce((acc, element) => {
            return acc + element.count!
        }, 0)

        return (
            <section className={styles.basket}>
                <div className="g-container">
                    <div className={styles.basket__content}>
                        <h1 className="page-title">Səbət</h1>
                        {basket.length > 0 ?
                            <div className={styles.basket__header}>
                                <div className={styles.basket__header__left}>
                                    <h5>Məhsul</h5>
                                </div>
                                <div className={styles.basket__header__right}>
                                    <h5 className={styles.basket__header__title}>QİYMƏT</h5>
                                    <h5 className={styles.basket__header__title}>MİQDARI</h5>
                                    <h5 className={styles.basket__header__title}>ÜMUMİ</h5>
                                </div>
                            </div>
                            : <div className={styles.basket__empty}>Səbətiniz hazırda boşdur.</div>
                        }
                        <ul className={styles.basket__list}>
                            {
                                basket.map((item) => {
                                    const amount = item.price * item.count!
                                    return (
                                        <li className={styles.basket__item} key={item.id}>
                                            <div className={styles.basket__item__left}>
                                                <div className={styles.basket__item__img}>
                                                    <img src={item.img} alt={item.name} />
                                                </div>
                                                <Link to={`/${item.category}/${item.id}`} className={styles.basket__item__name}>
                                                    <h4>{item.name}</h4>
                                                </Link>
                                            </div>
                                            <div className={styles.basket__item__right}>
                                                <div className={styles.basket__item__price}>
                                                    <span className={styles.mobScreen}>Qiymət:</span>
                                                    <span>{item.price} <span className='azn'>M</span></span>
                                                </div>
                                                <div className={styles.basket__item__quantity}>
                                                    <button type="button" className={styles.minusBtn} onClick={() => dispatch(decrease(item.id))}>
                                                        <FaMinus />
                                                    </button>
                                                    <span className={styles.count}>{item.count}</span>
                                                    <button type="button" className={styles.plusBtn} onClick={() => dispatch(increase(item.id))}>
                                                        <FaPlus />
                                                    </button>
                                                </div>
                                                <div className={styles.basket__item__total}>
                                                    <span className={styles.mobScreen}>Ümumi:</span>
                                                    <span>{amount} <span className='azn'>M</span></span>
                                                </div>
                                                <div className={styles.basket__item__remove}>
                                                    <button onClick={() => dispatch(removeFromBasket(item.id))}>
                                                        <FaTrashAlt />
                                                    </button>
                                                </div>
                                            </div>
                                        </li>
                                    )
                                })}
                        </ul>
                        <div className={styles.basket__footer}>
                            <Link to="/category/smartfonlar" className="g-button g-button--red">
                                <FaLongArrowAltLeft />
                                Mağazaya keç
                            </Link>
                            {basket.length > 0 &&
                                <button className="g-button g-button--white" onClick={() => dispatch(clearBaket())}>
                                    Səbəti təmizlə
                                </button>}
                        </div>
                        {basket.length > 0 &&
                            <div className={styles.basket__totals}>
                                <ul>
                                    <li>
                                        <span>Ümumi say</span>
                                        <span>{totalQuantity}</span>
                                    </li>
                                    <li>
                                        <span>Ümumi məbləğ</span>
                                        <span>{totalPrice}  <span className='azn'>M</span></span>
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
