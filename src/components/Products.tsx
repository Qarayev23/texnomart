import { useEffect, useState } from 'react'
import { useAppSelector } from "../redux/hooks";
import { useLocation, useSearchParams } from 'react-router-dom'
import Select, { SingleValue } from 'react-select'
import Product from './Product'
import { useProductsQuery } from '../redux/productApi';
import Spinner from './Spinner';
import PaginationComp from './Pagination';
import SideBar from './SideBar';
import { FaFilter } from 'react-icons/fa';

const Products = () => {
    const limit = 8;
    const sort = "price"
    const options = [
        { value: 'standart', label: 'Standart sıralama' },
        { value: 'asc', label: 'Ucuzdan bahaya' },
        { value: 'desc', label: 'Bahadan ucuza' }
    ]
    let location = useLocation();
    const [openSidebar, setOpenSidebar] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("_page")) || 1);
    const [value, setValue] = useState(searchParams.get("_order") === "asc" && options[1] || searchParams.get("_order") === "desc" && options[2] || options[0])
    const { data, isLoading, isFetching } = useProductsQuery(location.search === "" ? `?_page=${currentPage}&_limit=${limit}` : location.search);
    const products = data?.apiResponse;
    const productCount = data?.totalCount!;
    const { cart } = useAppSelector(state => state.cartReducer)

    const changePage = (selected: number) => {
        setSearchParams((prevParams) => {
            prevParams.set("_page", selected.toString())
            prevParams.set("_limit", limit.toString())
            return prevParams
        })
        setCurrentPage(selected)
    };

    function handleOnChange(newValue: SingleValue<{ value: string; label: string; }>) {
        setSearchParams((prevParams) => {
            prevParams.set("_page", "1")
            prevParams.set("_limit", limit.toString())
            prevParams.set("_order", newValue?.value!)
            prevParams.set("_sort", sort)
            return prevParams
        })
        setValue(newValue!)
        setCurrentPage(1)
    }

    useEffect(() => {
        if (location.search === "") {
            setCurrentPage(1)
            setValue(options[0])
        }
    }, [location])

    useEffect(() => {
        localStorage.setItem("cartItems", JSON.stringify(cart))
    }, [cart])


    const handleSidebar = () => {
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
                            setCurrentPage={setCurrentPage}
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
                                                <FaFilter />
                                                Filter
                                            </button>
                                        </div>
                                    </> :
                                    <div className="products-not-found">
                                        Seçiminizə uyğun məhsul tapılmadı.
                                        <button className="open-sidebar" onClick={handleSidebar}>
                                            <FaFilter />
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
                                    limit={limit} />
                            }
                        </div>
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Products