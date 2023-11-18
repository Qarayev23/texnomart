import { Params, useLocation, useNavigate, useParams, useSearchParams } from "react-router-dom";
import Products from "../../components/Products"
import { useProductsQuery } from "../../redux/productApi";
import { SingleValue } from "react-select";
import Info from "../../components/Info";
import PaginationComp from "../../components/Pagination";
import { useState } from "react";
import Spinner from "../../components/Spinner";
import { Helmet } from "react-helmet-async";

const Brand = () => {
    const { brand } = useParams<Params>()
    const limit = 8;
    const sort = "price"
    const options = [
        { value: 'standart', label: 'Standart sıralama' },
        { value: 'asc', label: 'Ucuzdan bahaya' },
        { value: 'desc', label: 'Bahadan ucuza' }
    ]
    const navigate = useNavigate();
    const location = useLocation();
    const [searchParams, setSearchParams] = useSearchParams()
    const [currentPage, setCurrentPage] = useState(Number(searchParams.get("_page")) || 1);
    const [value, setValue] = useState(searchParams.get("_order") === "asc" && options[1] || searchParams.get("_order") === "desc" && options[2] || options[0])
    const { data, isLoading, isFetching, isError } = useProductsQuery({ category: "allProducts", q: location.search === "" ? `?_page=${currentPage}&_limit=${limit}&brand=${brand}` : `${location.search}&brand=${brand}` });
    const products = data?.apiResponse;
    const productCount = data?.totalCount!;

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

    if (isError) {
        navigate("/not-found")
    }

    return (
        <>
            <Helmet>
                <title>{brand?.toUpperCase()} - Texnomart</title>
            </Helmet>
            <Info category={brand!} />
            <section className="products">
                <div className="g-container">
                    {
                        <div className="w-full">
                            {isLoading || isFetching ? <Spinner /> :
                                <>
                                    <Products
                                        products={products!}
                                        productCount={productCount}
                                        currentPage={currentPage}
                                        limit={limit}
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
                                </>
                            }
                        </div>
                    }
                </div>
            </section>
        </>
    )
}

export default Brand