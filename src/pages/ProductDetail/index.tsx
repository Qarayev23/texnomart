import { useState } from 'react'
import { Params, useNavigate, useParams } from "react-router-dom";
import Spinner from '../../components/Spinner';
import { addToBasket } from '../../redux/features/basketSlice';
import { useProductQuery } from '../../redux/productApi';
import { useAppDispatch } from '../../redux/hooks';
import { monthlyPaymentBtns } from '../../constants';
import styles from './productDetail.module.scss';
import { setFiterTitle } from '../../utils';

const ProductDetail = () => {
  const { id } = useParams<Params>();
  const category = window.location.pathname.split('/')[1]
  const navigate = useNavigate();
  const { data: product, isLoading, isError } = useProductQuery({ category, id: id! });
  const dispatch = useAppDispatch()
  const [month, setMonth] = useState("sixMonths");

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
    <section className={styles.productDetail}>
      <div className="g-container">
        <h3 className={styles.productDetail__title}>
          {product?.name}
        </h3>
        <div className={styles.productDetail__content}>
          <div className={styles.productDetail__left}>
            <div className={styles.productDetail__img}>
              <img src={product?.img} alt={product?.name} />
            </div>
            <div className={styles.productDetail__info}>
              <span className={styles.productDetail__price}>{product?.price} M</span>
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
                  <td>{product?.price} M</td>
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
    </section>
  )
}

export default ProductDetail