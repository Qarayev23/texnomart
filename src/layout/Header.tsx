import { useEffect, useState } from 'react'
// import { useDispatch, useSelector } from 'react-redux'
import { Link } from 'react-router-dom'
// import { clearProductBySearch, getProductBySearch } from '../redux/features/searchSlice'
import { DebounceInput } from 'react-debounce-input';
import { useProductBySearchQuery } from '../redux/productApi';
import { useNavigate } from 'react-router-dom';
import Spinner from "../components/Spinner"
import { ProductsProps } from '../types';

const Header = () => {
  const [query, setQuery] = useState("")
  const [skip, setSkip] = useState(true)
  const { data: productBySearch, isLoading } = useProductBySearchQuery(query, { skip: skip });

  // const { cart } = useSelector(state => state.cartSlice)
  // const { productBySearch, loading } = useSelector(state => state.searchSlice)
  // const dispatch = useDispatch()
  const navigate = useNavigate();

  function handleSearch(e: React.ChangeEvent<HTMLInputElement>) {
    setQuery(e.target.value)
  }

  useEffect(() => {
    if (query.length > 2) {
      setSkip(false)
    } else {
      setSkip(true)
    }
  }, [query])

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    if (query.trim().length > 2) {
      const id = productBySearch !== undefined && productBySearch[0].id
      setQuery("")
      return navigate(`/products/${id}`);
    }
  }

  function handleNavigate(id: number) {
    setSkip(true)
    setQuery("")
    return navigate(`/products/${id}`);
  }

  // const totalQuantity = cart.reduce((acc, element) => {
  //     return acc + element.count
  // }, 0)

  return (
    <header id="header">
      <div className="container">
        <nav className="navbar">
          <Link className="nav-logo" to="/">
            <img src="/img/logo.png" alt="Texnomart logo" />
          </Link>
          <div className="nav-form">
            <form onSubmit={handleSubmit} className='search-holder'>
              <DebounceInput
                type="text"
                onChange={handleSearch}
                value={query}
                debounceTimeout={500}
                placeholder="Axtar..." />
              <button
                type="button"
                className='search-btn'>
                Axtar
              </button>

              {isLoading ? <Spinner /> : ""}
            </form>
            <div className={query.length > 2 ? "search-results active" : "search-results"}>
              <ul>
                {productBySearch?.length === 0 && !isLoading ? <li className='no-result'>Məhsul tapılmadı.</li> : null}

                {productBySearch?.map((item: ProductsProps) => {
                  return (
                    <li key={item.id}>
                      <button className='directed-btn' onClick={() => handleNavigate(item.id)}>
                        <div className="product-image">
                          <img className="front" src={item.img} />
                        </div>
                        <div className="product-data">
                          <h3>{item.name}</h3>
                          <div className="product-price-box">
                            <span className="price">
                              <span className="in-price">
                                <span className="amount-title"><small>Qiymət</small></span>
                                <span className="amount">
                                  <del>
                                    <span className="amount">
                                      <bdi>{item.price}&nbsp;$</bdi>
                                    </span>
                                  </del>
                                </span>
                              </span>
                              <span className="in-parts">
                                <span className="amount-title"><small>Hissə-hissə ödəniş</small></span>
                                <span className="amount">12 ay
                                  <strong>{(item.price / 12).toFixed(2)}</strong>
                                  <span className="aznb">$</span>
                                </span>
                              </span>
                            </span>
                          </div>
                        </div>
                      </button>
                    </li>
                  )
                })
                }
              </ul>
            </div>
          </div>
          <div className="nav-icons">
            <Link to="/" className="tel">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M27.308,20.649l-2.2-2.2a3.521,3.521,0,0,0-4.938-.021,2.152,2.152,0,0,1-2.729.267A15.026,15.026,0,0,1,13.3,14.562a2.181,2.181,0,0,1,.284-2.739A3.521,3.521,0,0,0,13.553,6.9l-2.2-2.2a3.514,3.514,0,0,0-4.961,0l-.633.634c-3.3,3.3-3.053,10.238,3.813,17.1,4.14,4.141,8.307,5.875,11.686,5.875a7.5,7.5,0,0,0,5.418-2.061l.634-.634A3.513,3.513,0,0,0,27.308,20.649ZM25.894,24.2l-.634.634c-2.6,2.6-8.339,2.125-14.276-3.813S4.571,9.34,7.171,6.74L7.8,6.107a1.511,1.511,0,0,1,2.133,0l2.2,2.2a1.511,1.511,0,0,1,.021,2.11,4.181,4.181,0,0,0-.531,5.239,17.01,17.01,0,0,0,4.713,4.706,4.179,4.179,0,0,0,5.231-.517,1.512,1.512,0,0,1,2.118.013l2.2,2.2A1.51,1.51,0,0,1,25.894,24.2Z"></path>
              </svg>
              <span>*3344</span>
            </Link>

            {/* <a href="#">
                            <i className="far fa-heart"></i>
                            <span className="item-count">0</span>
                        </a>
                        <a href="#">
                            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                                <path fill="none" d="M0 0h24v24H0V0z"></path>
                                <path d="M8 17c-.55 0-1-.45-1-1v-5c0-.55.45-1 1-1s1 .45 1 1v5c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1V8c0-.55.45-1 1-1s1 .45 1 1v8c0 .55-.45 1-1 1zm4 0c-.55 0-1-.45-1-1v-2c0-.55.45-1 1-1s1 .45 1 1v2c0 .55-.45 1-1 1zm2 2H6c-.55 0-1-.45-1-1V6c0-.55.45-1 1-1h12c.55 0 1 .45 1 1v12c0 .55-.45 1-1 1zm1-16H5c-1.1 0-2 .9-2 2v14c0 1.1.9 2 2 2h14c1.1 0 2-.9 2-2V5c0-1.1-.9-2-2-2z"></path>
                            </svg>
                            <span className="item-count">0</span>
                        </a> */}
            <Link to="/basket">
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"></path>
              </svg>
              <span className="item-count">
                {/* { totalQuantity } */}
                0
              </span>
            </Link>
            <Link to="/" className="log-in">
              <i className="far fa-user"></i>
              <div>
                <span>Daxil ol</span>
                <span>Qeydiyyat</span>
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header
