import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux';
import { useParams } from "react-router-dom";
import Spinner from '../components/Spinner';
// import { addToCart } from '../redux/features/cartSlice';
// import { getProduct } from '../redux/features/productSlice';
import { useProductQuery } from '../redux/productApi';
type Params = {
  id: string;
};
const ProductDetail = () => {
  const { id } = useParams<Params>();
  const { data: product, isLoading } = useProductQuery(id!);

  // const { product, loading } = useSelector(state => state.productSlice)
  // const dispatch = useDispatch()


  const [monthlyPayment, setMonthlyPayment] = useState(product?.price !== undefined ? (product?.price / 6).toFixed(2) : 0)
  const [active, setActive] = useState(1);

  function handleCreditCalculator(month: number, index: number) {
    const result = product?.price !== undefined ? (product?.price / month).toFixed(2) : 0
    setMonthlyPayment(result)
    setActive(index);
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
              <span className='product-detail-price'>{product?.price} $</span>
              <div className='product-detail-calc'>
                <span className='product-detail-calc-title'>Kredit kalkulyatoru</span>
                <span className='product-detail-calc-text'>Aylıq ödəniş:&nbsp;{monthlyPayment}&nbsp;$</span>
                <div className="calc-list-inner-class">
                  <button
                    onClick={() => handleCreditCalculator(6, 1)}
                    className={active === 1 ? "month active" : "month"}
                  >
                    6 ay
                  </button>
                  <button
                    onClick={() => handleCreditCalculator(9, 2)}
                    className={active === 2 ? "month active" : "month"} >
                    9 ay
                  </button>
                  <button
                    onClick={() => handleCreditCalculator(12, 3)}
                    className={active === 3 ? "month active" : "month"}>
                    12 ay
                  </button>
                </div>
                <button
                  className='add-basket-btn'
                // onClick={() => dispatch(addToCart(product))}
                >
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
                  <td>{product?.price} $</td>
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