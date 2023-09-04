import { Link } from 'react-router-dom'
import { ProductsProps } from '../types'
// import { useDispatch } from 'react-redux'
// import { addToCart } from '../redux/features/cartSlice'

const Product = ({product}: {product: ProductsProps }) => {
    // const dispatch = useDispatch()
    
    return (
        <div className="product">
            <Link to={`/products/${product.id}`} className="product-img">
                <img src={product.img} alt={product.name} />
            </Link>
            <Link to={`/products/${product.id}`} className="product-name">{product.name}</Link>
            <div className="product-footer">
                <div className="product-price">
                    <span className="small">Qiymət</span>
                    <b>{product.price}$</b>
                </div>
                <div className="product-payment">
                    <span className="small">Hissə-hissə ödəniş</span>
                    <span>12ay <b>{(product.price / 12).toFixed(2)}$</b></span>
                </div>
            </div>
            {/* <button onClick={() => dispatch(addToCart(product))}>Səbətə at</button> */}
        </div>
    )
}

export default Product