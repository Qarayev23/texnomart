import { Link } from "react-router-dom"
import { catalogİtems } from "../../constants"
import styles from './productsCatalog.module.scss';

const ProductsCatalog = () => {
  return (
    <section className={styles.productCatalog}>
      <div className="g-container">
        <div className={styles.productCatalog__content}>
          {
            catalogİtems.map(item => (
              <Link to={item.path} className={styles.productCatalog__item} key={item.label}>
                <img src={item.img} alt={item.label} className={styles.productCatalog__img} />
                <h4 className={styles.productCatalog__title}>{item.label}</h4>
              </Link>
            ))
          }
        </div>
      </div>
    </section>
  )
}

export default ProductsCatalog