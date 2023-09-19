import Select from 'react-select'
import Product from '../Product'
import { FaFilter } from 'react-icons/fa';
import styles from './products.module.scss';
import { ProductsComponentProps } from '../../types';

const Products = ({ products, productCount, currentPage, limit, value, handleSidebar, handleOnChange, options }: ProductsComponentProps) => {
    return (
        <div className={styles.products__content}>
            <div className={styles.products__content__top}>
                {products?.length! > 0 ?
                    <>
                        <div className={styles.products__found}>
                            {productCount}&nbsp;nəticədən &nbsp;{(currentPage * limit) - limit}&nbsp;-&nbsp;
                            {(currentPage * limit) - limit + products?.length!} &nbsp;Məhsul tapıldı
                        </div>
                        <div className={styles.products__content__top__filter}>
                            <Select
                                className='flex-1 sm:flex-initial'
                                value={value}
                                options={options}
                                onChange={handleOnChange}
                                isSearchable={false} />
                            <button className={styles.openSidebar} onClick={handleSidebar}>
                                <FaFilter />
                                Filter
                            </button>
                        </div>
                    </> :
                    <div className={styles.products__notFound}>
                        Seçiminizə uyğun məhsul tapılmadı.
                        <button className={styles.openSidebar} onClick={handleSidebar}>
                            <FaFilter />
                            Filter
                        </button>
                    </div>
                }
            </div>
            <div className={styles.products__list}>
                {products?.map((product) => {
                    return <Product product={product} key={product.id} />
                })}
            </div>
        </div>
    )
}

export default Products