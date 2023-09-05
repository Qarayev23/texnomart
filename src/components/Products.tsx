import { useEffect, useState } from 'react'
import { useAppSelector } from "../redux/hooks";
import { useLocation, useSearchParams } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'
import Product from './Product'
import { useProductsQuery } from '../redux/productApi';
import Spinner from './Spinner';
import PaginationComp from './Pagination';
import SideBar from './SideBar';

const Products = () => {
    const limit = 8;
    const options = [
        { value: 'standart', label: 'Standart sıralama' },
        { value: 'asc', label: 'Ucuzdan bahaya' },
        { value: 'desc', label: 'Bahadan ucuza' }
    ]
    const [currentPage, setCurrentPage] = useState(1)
    const [value, setValue] = useState(options[0]);
    const { data, isLoading, isFetching } = useProductsQuery(`?_page=${currentPage}&_limit=${limit}&_order=${value.value}&_sort=price`);
    const products = data?.apiResponse;
    const productCount = data?.totalCount!;
    const { cart } = useAppSelector(state => state.cartReducer)
    let location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams()

    const changePage = (selected: number) => {
        setSearchParams((prev) => {
            return { ...prev, _page: selected, _limit: limit }
        })
        setCurrentPage(selected)
    };

    function handleOnchange(newValue: SingleValue<{ value: string; label: string; }>) {
        setSearchParams((prev) => {
            return { ...prev, _order: newValue?.value, _sort: "price", _page: 1, _limit: limit }
        })
        setValue(newValue!)
        setCurrentPage(1)
    }

    useEffect(() => {
        // searchParams.get("_page") && setCurrentPage(Number(searchParams.get("_page")))

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
    }, [location])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])

    const [openSidebar, setOpenSidebar] = useState(true)

    const handleSidebar = () => {
        document.querySelector(".backdrop").classList.toggle("active")
        setOpenSidebar(!openSidebar)
    }

    if (isLoading || isFetching) {
        return <Spinner />;
    }

    return (
        <section className="products">
            <div className="container">
                <div className='wrapper'>
                    <div className='products-left'>
                        <SideBar
                            openSidebar={openSidebar}
                            handleSidebar={handleSidebar}
                            limit={limit} />
                    </div>
                    <div className='products-right'>
                        <div className="products-content">
                            <div className="products-content-top">
                                {products?.length! > 0 ?
                                    <>
                                        <div className="products-found">
                                            {productCount}&nbsp;nəticədən &nbsp;{(currentPage * limit) - limit}&nbsp;-&nbsp;
                                            {(currentPage * limit) - limit + products?.length!} &nbsp;Məhsul tapıldı
                                        </div>
                                        <div className='price-filter'>
                                            <Select
                                                value={value}
                                                options={options}
                                                onChange={handleOnchange}
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
                            </div>
                            <div className="products-list">
                                {products?.map((product) => {
                                    return <Product product={product} key={product.id} />
                                })}
                            </div>
                            {products?.length! > 0 &&
                                <PaginationComp
                                    changePage={changePage}
                                    productCount={productCount}
                                    currentPage={currentPage}
                                    limit={limit} />}
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products