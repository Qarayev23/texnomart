// import React, { useEffect, useState } from 'react'
// import { useSelector, useDispatch } from 'react-redux'
// import { useLocation, useSearchParams } from 'react-router-dom'
// import Select from 'react-select'
import Product from './Product'
import { useProductsQuery } from '../redux/productApi';
import Spinner from './Spinner';
// import { getProducts } from '../redux/features/productSlice'
// import PaginationComp from './Pagination'

const Products = () => {
    const { data: products, isLoading } = useProductsQuery();

    // const { products, productCount, loading } = useSelector(state => state.productSlice)
    // const { cart } = useSelector(state => state.cartSlice)
    // const dispatch = useDispatch()
    // let location = useLocation();
    // const [searchParams, setSearchParams] = useSearchParams()

    // const limit = 8;
    // const [currentPage, setCurrentPage] = useState(1)

    // const changePage = (selected) => {
    //     const formerSearchParams = Object.fromEntries([...searchParams])
    //     setSearchParams({
    //       ...formerSearchParams,
    //         _page: selected,
    //         _limit: limit
    //     })
    //     window.scrollTo({ top: 0, behavior: 'smooth' })
    // };

    // const options = [
    //     { value: 'standart', label: 'Standart sıralama' },
    //     { value: 'asc', label: 'Ucuzdan bahaya' },
    //     { value: 'desc', label: 'Bahadan ucuza' }
    // ]

    // const [value, setValue] = useState(options[0]);

    // function filterByPriceFunc(selected) {
    //     const nese = Object.fromEntries([...searchParams])

    //     setSearchParams({
    //         ...nese,
    //         _order: selected.value,
    //         _sort: "price",
    //         _page: 1,
    //         _limit: limit
    //     })
    //     setValue(selected)
    //     setCurrentPage(1)
    // }

    // useEffect(() => {
    //     searchParams.get("_page") && setCurrentPage(Number(searchParams.get("_page")))
    //     if (location.search === "") {
    //         dispatch(getProducts(`?_page=1&_limit=${limit}`))
    //         setCurrentPage(1)
    //         setValue(options[0])
    //     } else if (searchParams.get("_order") === "asc") {
    //         dispatch(getProducts(location.search))
    //         setValue(options[1])
    //     } else if (searchParams.get("_order") === "desc") {
    //         dispatch(getProducts(location.search))
    //         setValue(options[2])
    //     } else {
    //         dispatch(getProducts(location.search))
    //     }
    // }, [location])

    // useEffect(() => {
    //     localStorage.setItem("cartItems", JSON.stringify(cart))
    // }, [cart])

    // const [openSidebar, setOpenSidebar] = useState(true)

    // const handleSidebar = () => {
    //     document.querySelector(".backdrop").classList.toggle("active")
    //     setOpenSidebar(!openSidebar)
    // }

    if (isLoading) {
        return <Spinner />;
    }

    return (
        <section className="products">
            <div className="container">
                <div className='wrapper'>
                    <div className='products-left'>
                        {/* <SideBar
                            openSidebar={openSidebar}
                            handleSidebar={handleSidebar}
                            limit={limit} /> */}
                    </div>
                    <div className='products-right'>
                        <div className="products-content">
                            {/* <div className="products-content-top">
                                {products.length > 0 ?
                                    <>
                                        <div className="products-found">
                                            {productCount}&nbsp;nəticədən &nbsp;{(currentPage * limit) - limit}&nbsp;-&nbsp;
                                            {(currentPage * limit) - limit + products.length} &nbsp;Məhsul tapıldı
                                        </div>
                                        <div className='price-filter'>
                                            <Select
                                                value={value}
                                                options={options}
                                                onChange={filterByPriceFunc}
                                                isSearchable={false} />
                                            <button className="open-sidebar" onClick={handleSidebar}>
                                                <i className="fa fa-filter" aria-hidden="true"></i>
                                                Filter
                                            </button>
                                        </div>
                                    </> :
                                    <div className="products-not-found">
                                        Seçiminizə uyğun məhsul tapılmadı.
                                        <button className="open-sidebar" onClick={handleSidebar}>
                                            <i className="fa fa-filter" aria-hidden="true"></i>
                                            Filter
                                        </button>
                                    </div>
                                }
                            </div> */}
                            <div className="products-list">
                                {products?.map((product) => {
                                    return <Product product={product} key={product.id} />
                                })}
                            </div>
                            {/* {products.length > 0 &&
                                <PaginationComp
                                    changePage={changePage}
                                    productCount={productCount}
                                    currentPage={currentPage}
                                    limit={limit} />} */}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products