import { Link } from 'react-router-dom';
import styles from './brands.module.scss';
import { brandItems } from '../../constants';

const Brands = () => {
    return (
        <section className={styles.brands}>
            <div className="g-container">
                <h1 className='page-title'>Brendlər</h1>
                <div className={styles.brands__list}>
                    {
                        brandItems.map((item, index) => (
                            <Link to={item.path} key={index} className={styles.brands__item}>
                                <img src={item.img} alt={item.label} className={styles.brands__img}/>
                                <h4 className={styles.brands__name}>{item.label}</h4>
                            </Link>
                        ))
                    }
                </div>
            </div>
        </section>
    )
}

export default Brands