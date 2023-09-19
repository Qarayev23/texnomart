import { Link, Params, useParams } from 'react-router-dom'
import { ProductsProps } from '../../types'
import { addToCart } from '../../redux/features/cartSlice'
import { useAppDispatch } from "../../redux/hooks";
import styles from './product.module.scss';

const Product = ({ product, category }: { product: ProductsProps, category?: string }) => {
    const dispatch = useAppDispatch()
    const { category: categoryParam } = useParams<Params>();
    const pathname = `${categoryParam ? categoryParam : category}/${product.id}`

    return (
        <div className={styles.product}>
            <Link to={`/${pathname}`} className={styles.product__img}>
                <img src={product.img} alt={product.name} />
            </Link>
            <Link to={`/${pathname}`} className={styles.product__name}>
                <h4>{product.name}</h4>
            </Link>
            <div className={styles.product__footer}>
                <div className={styles.product__price}>
                    <span className={styles.small}>Qiymət</span>
                    <b>{product.price}M</b>
                </div>
                <div className={styles.product__payment}>
                    <span className={styles.small}>Hissə-hissə ödəniş</span>
                    <span>12ay <b>{(product.price / 12).toFixed(2)}M</b></span>
                </div>
            </div>
            <button
                className={styles.product__btn}
                onClick={() => dispatch(addToCart(product))}>
                Səbətə at
            </button>
        </div>
    )
}

export default Product