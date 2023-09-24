import { useEffect, useState } from "react";
import Info from "../../components/Info";
import Products from "../../components/Products";
import FilterBar from "../../components/FilterBar";
import { Params, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import { useProductsQuery } from "../../redux/productApi";
import { SingleValue } from "react-select";
import PaginationComp from "../../components/Pagination";
import Spinner from "../../components/Spinner";

const Category = () => {
    const { category } = useParams<Params>();
    const limit = 8;
    const sort = "price"
    const options = [
        { value: 'standart', label: 'Standart sıralama' },
        { value: 'asc', label: 'Ucuzdan bahaya' },
        { value: 'desc', label: 'Bahadan ucuza' }
    ]
    let location = useLocation();
    const navigate = useNavigate();
    const [isOpen, setIsOpen] = useState(false)
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("_page")) || 1);
    const [value, setValue] = useState(searchParams.get("_order") === "asc" && options[1] || searchParams.get("_order") === "desc" && options[2] || options[0])
    const { data, isLoading, isFetching, isError } = useProductsQuery({ category, q: location.search === "" ? `?_page=${currentPage}&_limit=${limit}` : location.search });
    const products = data?.apiResponse;
    const productCount = data?.totalCount!

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
            if (newValue?.value === "standart") {
                prevParams.delete("_order")
                prevParams.delete("_sort")
            } else {
                prevParams.set("_order", newValue?.value!)
                prevParams.set("_sort", sort)
            }
            return prevParams
        })
        setValue(newValue!)
        setCurrentPage(1)
    }

    useEffect(() => {
        setValue(options[0])
    }, [location.pathname])

    const handleOpen = () => {
        setIsOpen(!isOpen)
    }

    if (isError) {
        navigate("/not-found")
    }

    return (
        <>
            <Info category={category!} />
            <section className="products">
                <div className="g-container">
                    <div className='flex lg:gap-6 gap-0'>
                        {isLoading || isFetching ? <Spinner />
                            : <>
                                <FilterBar
                                    isOpen={isOpen}
                                    handleOpen={handleOpen}
                                    limit={limit}
                                    setCurrentPage={setCurrentPage}
                                />
                                <div className="w-full">
                                    <Products
                                        products={products!}
                                        productCount={productCount}
                                        currentPage={currentPage}
                                        limit={limit}
                                        handleOpen={handleOpen}
                                        value={value}
                                        handleOnChange={handleOnChange}
                                        options={options}
                                    />
                                    {products?.length! > 0 &&
                                        <PaginationComp
                                            changePage={changePage}
                                            productCount={productCount}
                                            currentPage={currentPage}
                                            limit={limit} />}
                                </div>
                            </>
                        }
                    </div>
                </div >
            </section >
        </>
    )
}

export default Category