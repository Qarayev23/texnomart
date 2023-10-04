import Select from 'react-select'
import Product from '../Product'
import { FaFilter, FaListUl } from 'react-icons/fa';
import { BsFillGrid3X3GapFill } from "react-icons/bs";
import styles from './products.module.scss';
import { ProductsComponentProps } from '../../types';
import { useLocation } from 'react-router-dom';
import { useState } from 'react';

const Products = ({ products, productCount, currentPage, limit, value, handleOpen, handleOnChange, options }: ProductsComponentProps) => {
    const location = useLocation()
    const [sort, setSort] = useState({ row: false, grid: true })

    const handleSort = () => {
        setSort({ row: !sort.row, grid: !sort.grid })
    }

    return (
        <div className={styles.products__content}>
            <div className={styles.products__content__top}>
                {products?.length! > 0 ?
                    <>
                        <div className={styles.products__found}>
                            {productCount}&nbsp;nəticədən &nbsp;{(currentPage * limit) - limit}&nbsp;-&nbsp;
                            {(currentPage * limit) - limit + products?.length!} &nbsp;Məhsul tapıldı
                            <div className='sm:hidden flex gap-3'>
                                <button className={sort.row ? `${styles.products__sort} ${styles.active}` : styles.products__sort} onClick={handleSort}>
                                    <FaListUl />
                                </button>
                                <button className={sort.grid ? `${styles.products__sort} ${styles.active}` : styles.products__sort} onClick={handleSort}>
                                    <BsFillGrid3X3GapFill />
                                </button>
                            </div>
                        </div>
                        <div className="flex gap-4 items-center lg:w-fit w-full">
                            <div className={styles.products__content__top__filter}>
                                <Select
                                    className='flex-1 mb:flex-initial'
                                    value={value}
                                    options={options}
                                    onChange={handleOnChange}
                                    isSearchable={false} />
                                {
                                    location.pathname.split("/")[1] !== "brands" &&
                                    <button className={styles.openFilterBar} onClick={handleOpen}>
                                        <FaFilter />
                                        Filter
                                    </button>
                                }
                            </div>
                            <div className='hidden sm:flex gap-3'>
                                <button className={sort.row ? `${styles.products__sort} ${styles.active}` : styles.products__sort} onClick={handleSort}>
                                    <FaListUl />
                                </button>
                                <button className={sort.grid ? `${styles.products__sort} ${styles.active}` : styles.products__sort} onClick={handleSort}>
                                    <BsFillGrid3X3GapFill />
                                </button>
                            </div>
                        </div>
                    </> :
                    <div className={styles.products__notFound}>
                        Seçiminizə uyğun məhsul tapılmadı.
                        {
                            location.pathname.split("/")[1] !== "brands" &&
                            <button className={styles.openFilterBar} onClick={handleOpen}>
                                <FaFilter />
                                Filter
                            </button>
                        }
                    </div>
                }
            </div>
            <div className={sort.row ? `${styles.products__list} ${styles.row}` : styles.products__list}>
                {products?.map((product) => {
                    return <Product product={product} key={product.id} sort={sort} />
                })}
            </div>
        </div>
    )
}

export default Products