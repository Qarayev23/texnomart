import { useState } from 'react'
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner';
import { addToCart } from '../redux/features/cartSlice';
import { useProductQuery } from '../redux/productApi';
import { useAppDispatch } from '../redux/hooks';
import { monthlyPaymentBtns } from '../constants';

type Params = {
  id: string;
};

const ProductDetail = () => {
  const { id } = useParams<Params>();
  const { data: product, isLoading } = useProductQuery(id!);
  const dispatch = useAppDispatch()
  const [month, setMonth] = useState("sixMonths");

  function handleCreditCalculator(monthParam: string) {
    setMonth(monthParam);
  }

  if (isLoading) {
    return <Spinner />;
  }

  return (
    <section className='product-detail'>
      <div className='container'>
        <div className='product-detail-header'>
          <h3 className='product-detail-title'>
            {product?.name}
          </h3>
        </div>
        <div className='product-detail-body'>
          <div className='product-detail-left'>
            <div className='product-detail-img'>
              <img src={product?.img} alt='' />
            </div>
            <div className='product-detail-info'>
              <span className='product-detail-price'>{product?.price} M</span>
              <div className='product-detail-calc'>
                <span className='product-detail-calc-title'>Kredit kalkulyatoru</span>
                <span className='product-detail-calc-text'>Aylıq ödəniş:&nbsp;{product?.monthlyPayment?.[month]}&nbsp;M</span>
                <div className="calc-list-inner-class">
                  {monthlyPaymentBtns.map((item, index) => (
                    <button
                      key={index}
                      onClick={() => handleCreditCalculator(item.value)}
                      className={month === item.value ? "month active" : "month"}>
                      {item.label}
                    </button>
                  ))}
                </div>
                <button
                  className='add-basket-btn'
                  onClick={() => dispatch(addToCart(product!))} >
                  Səbətə at
                </button>
              </div>
            </div>
          </div>
          <div className='product-detail-right'>
            <table className='product-detail-table'>
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
                <tr>
                  <th>Daxili yaddaş</th>
                  <td>{product?.memory} GB</td>
                </tr>
                <tr>
                  <th>Operativ yaddaş</th>
                  <td>{product?.ram} GB</td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </section>

  )
}

export default ProductDetail