import { useEffect } from 'react'
import { Link } from 'react-router-dom'
import { increase, decrease, remove, clearBaket } from '../redux/features/cartSlice'
import { useAppDispatch, useAppSelector } from '../redux/hooks'
import { FaLongArrowAltLeft, FaMinus, FaPlus, FaTrashAlt } from "react-icons/fa";

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
        <section className="cart-area">
            <div className="container">
                <div className="cart-content">
                    <h1>Səbət</h1>
                    {cart.length > 0 ?
                        <div className="cart-header">
                            <div className="cart-header-left">
                                <ul>
                                    <li><h3>Məhsul</h3></li>
                                </ul>
                            </div>
                            <div className="cart-header-right">
                                <ul>
                                    <li><h3>QİYMƏT</h3></li>
                                    <li><h3>MİQDARI</h3></li>
                                    <li><h3>ÜMUMİ</h3></li>
                                </ul>
                            </div>
                        </div>
                        : <div className="basket-empty">Səbətiniz hazırda boşdur.</div>
                    }
                    <div className="cart-body">
                        {
                            cart.map((item) => {
                                const amount = item.price * item.count

                                return <div className="cart-item" key={item.id}>
                                    <div className="cart-item-left">
                                        <div className="cart-img">
                                            <img src={item.img} alt={item.name} />
                                        </div>
                                        <div className="cart-name">
                                            <Link to={`/products/${item.id}`}>{item.name}</Link>
                                        </div>
                                    </div>
                                    <div className="cart-item-right">
                                        <div className="cart-price">
                                            <span className="mob-screen">Qiymət:</span>
                                            <span>{item.price}M</span>
                                        </div>
                                        <div className="cart-quantity">
                                            <button type="button" className="minus-btn" onClick={() => dispatch(decrease(item.id))}>
                                                <FaMinus />
                                            </button>
                                            <span className="count">{item.count}</span>
                                            <button type="button" className="plus-btn" onClick={() => dispatch(increase(item.id))}>
                                                <FaPlus />
                                            </button>
                                        </div>
                                        <div className="cart-total">
                                            <span className="mob-screen">Ümumi:</span>
                                            <span>{amount}M</span>
                                        </div>
                                        <div className="cart-remove">
                                            <button onClick={() => dispatch(remove(item.id))}>
                                                <FaTrashAlt />
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="cart-footer">
                        <Link to="/" className="go-to-store">
                        <FaLongArrowAltLeft />
                            Mağazaya keç
                        </Link>
                        {cart.length > 0 ?
                            <button className="clean-cart" onClick={() => dispatch(clearBaket())}>
                                Səbəti təmizlə
                            </button>
                            : ""
                        }
                    </div>
                    {cart.length > 0 ?
                        <div className="cart-totals">
                            <h3>Səbətdəki məhsullar</h3>
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
                            <button className="pay-cart">Kartla ödə</button>
                        </div>
                        : ""
                    }
                </div>
            </div>
        </section>
    )
}

export default Basket
