import { useEffect, useState } from 'react'
import { useAppSelector } from "../redux/hooks";
import { useLocation, useSearchParams } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'
import Product from './Product'
import { useProductsQuery } from '../redux/productApi';
import Spinner from './Spinner';
import PaginationComp from './Pagination';
import { convertIntObj } from '../utils';
import SideBar from './SideBar';

const Products = () => {
    const limit = 8;
    const sort = "price"
    const options = [
        { value: 'standart', label: 'Standart sıralama' },
        { value: 'asc', label: 'Ucuzdan bahaya' },
        { value: 'desc', label: 'Bahadan ucuza' }
    ]
    let location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("_page")) || 1);
    const [value, setValue] = useState(searchParams.get("_order") === "asc" && options[1] || searchParams.get("_order") === "desc" && options[2] || options[0])
    const { data, isLoading, isFetching } = useProductsQuery(location.search === "" ? `?_page=${currentPage}&_limit=${limit}` : location.search);
    // `?_page=${currentPage}&_limit=${limit}&_order=${value.value}&_sort=${sort}`
    const products = data?.apiResponse;
    const productCount = data?.totalCount!;
    const { cart } = useAppSelector(state => state.cartReducer)

    const changePage = (selected: number) => {
        const formerSearchParams = Object.fromEntries([...searchParams])
        const result = convertIntObj(formerSearchParams);
        setSearchParams({ ...result, _page: selected, _limit: limit })
        setCurrentPage(selected)
    };

    function handleOnChange(newValue: SingleValue<{ value: string; label: string; }>) {
        const formerSearchParams = Object.fromEntries([...searchParams])
        const result = convertIntObj(formerSearchParams);
        setSearchParams({ ...result, _order: newValue?.value!, _sort: sort, _limit: limit, _page: 1 })
        setValue(newValue!)
        setCurrentPage(1)
    }

    useEffect(() => {
        // if (searchParams.get("_page")) {
        //     setCurrentPage(Number(searchParams.get("_page")))
        //     setSkip(false)
        // } 
        if (location.search === "") {
            setCurrentPage(1)
        }
        // else if (searchParams.get("_order") === "asc") {
        //     setValue(options[1])
        // } else if (searchParams.get("_order") === "desc") {
        //     setValue(options[2])
        // }
        // else {
        //         dispatch(getProducts(location.search))
        //     }
        // setSkip(false)
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
                            limit={limit}
                        />
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
                                                onChange={handleOnChange}
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