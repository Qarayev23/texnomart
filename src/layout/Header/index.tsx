import { useEffect, useState } from 'react'
import { Link, useLocation } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input';
import { useProductsQuery } from '../../redux/productApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { FaRegHeart } from 'react-icons/fa';
import styles from './header.module.scss';
import Spinner from '../../components/Spinner';
import SideBar from '../../components/Sidebar';

const Header = () => {
  const [query, setQuery] = useState("")
  const [skip, setSkip] = useState(true)
  const [isOpen, setIsOpen] = useState(false)
  const [width, setWidth] = useState(window.innerWidth)
  const { data, isLoading } = useProductsQuery({ category: "allProducts?q=", q: query }, { skip: skip });
  const products = data?.apiResponse
  const { basket } = useAppSelector(state => state.basketReducer)
  const { wishlist } = useAppSelector(state => state.wishlistReducer)
  const { compare } = useAppSelector(state => state.compareReducer)
  const navigate = useNavigate()
  const location = useLocation()

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
      const id = products !== undefined && products[0].id
      const category = products !== undefined && products[0].category

      setQuery("")
      return navigate(`/${category}/${id}`);
    }
  }

  function handleNavigate(id: number, category: string) {
    setSkip(true)
    setQuery("")
    return navigate(`/${category}/${id}`);
  }

  const basketQuantity = basket.reduce((acc, element) => {
    return acc + (element.count ?? 0)
  }, 0)

  const wishlistQuantity = wishlist.reduce((acc, element) => {
    return acc + (element.count ?? 0)
  }, 0)

  const compareQuantity = compare.reduce((acc, element) => {
    return acc + (element.count ?? 0)
  }, 0)

  const handleOpen = () => {
    setIsOpen(!isOpen)
  }

  window.onresize = () => {
    setWidth(window.innerWidth)
  }

  useEffect(() => {
    setIsOpen(false)
    setQuery("")
  }, [location])

  return (
    <header className={styles.header}>
      <div className="g-container">
        <nav className={styles.navbar}>
          <Link to="/" className={styles.navbar__logo} >
            <img src="/img/logo.png" alt="Texnomart logo" />
          </Link>
          <div className={styles.navbar__holder}>
            {
              (location.pathname === "/" && width > 991) ? null :
                <button className={styles.menu__icon} onClick={handleOpen}>
                  <span className={isOpen ? styles.open : ""}></span>
                  <span className={isOpen ? styles.open : ""}></span>
                  <span className={isOpen ? styles.open : ""}></span>
                </button>
            }
            <div className={styles.search__holder}>
              <form onSubmit={handleSubmit} className={styles.navbar__form}>
                <DebounceInput
                  type="text"
                  onChange={(e) => setQuery(e.target.value)}
                  value={query}
                  debounceTimeout={500}
                  placeholder="Axtar..." />
                <button
                  type="button"
                  className={styles.search__btn}>
                  Axtar
                </button>

                {isLoading && <Spinner classname="search__spinner" />}
              </form>

              <div className={query.length > 2 ? `${styles.search__results} ${styles.active}` : styles.search__results}>
                {products?.length === 0 && !isLoading ? <li className={styles.no__result}>Məhsul tapılmadı.</li> : null}

                {products?.map((item) => (
                  <button className={styles.directed__btn} onClick={() => handleNavigate(item.id, item.category)} key={item.id}>
                    <div className={styles.product__image}>
                      <img className={styles.front} src={item.img[0]} />
                    </div>
                    <div className={styles.product__data}>
                      <h3>{item.name}</h3>
                      <div className={styles.product__price__box}>
                        <span className={styles.price}>
                          <span className={styles.in__price}>
                            <span className={styles.amount__title}><small>Qiymət</small></span>
                            <span className={styles.amount}>
                              <del>
                                <span className={styles.amount}>
                                  <bdi>{item.price}&nbsp;M</bdi>
                                </span>
                              </del>
                            </span>
                          </span>
                          <span className={styles.in__parts}>
                            <span className={styles.amount__title}><small>Hissə-hissə ödəniş</small></span>
                            <span className={styles.amount}>12 ay&nbsp;
                              <strong>{(item.price / 12).toFixed(2)}</strong>
                              <span className={styles.aznb}>M</span>
                            </span>
                          </span>
                        </span>
                      </div>
                    </div>
                  </button>
                ))}
              </div>
            </div>
          </div>
          <div className={styles.navbar__icons}>
            <Link to="/compare" className={styles.navbar__icon}>
              <span className={styles.count}>
                {compareQuantity}
              </span>
              <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 30 30'><path d='M23.141,27.466a6.876,6.876,0,0,1-6.859-6.876.82.82,0,0,1,.059-.329l5.44-12.509H8.231l5.44,12.512a.78.78,0,0,1,.061.313A6.866,6.866,0,0,1,0,20.605a1.409,1.409,0,0,1,.057-.329l.008-.027.051-.095.118-.306A1,1,0,0,0,.3,19.689l.268-.6c.035-.093.065-.168.1-.236l.3-.666.172-.091-.111-.041c.022-.061.126-.3.126-.3l.064-.144c.024-.051.046-.1.065-.152.038-.1.225-.522.27-.612l.164-.4a3.074,3.074,0,0,0,.151-.355l.975-2.235c.059-.125.118-.254.167-.384l.436-.984L3.9,11.406c.033-.075.219-.483.236-.542a2.3,2.3,0,0,0,.1-.237L5.005,8.88l.119-.3L5.469,7.8l.1-.222.057-.152.248-.565A1.813,1.813,0,0,1,6,6.6l.25-.592h.073C6.5,6,6.7,5.992,6.9,5.989h7.2V2.534h1.774V5.989H22.8c.3.007.592.007.886.007H23.8v.118a2.141,2.141,0,0,0,.176.484,2.4,2.4,0,0,1,.1.224s.3.71.324.743l.112.237.217.52.663,1.5c.042.111.087.208.133.307a3.982,3.982,0,0,0,.165.379l.153.37c.021.056.208.465.208.465l.107.257.654,1.51.054.109A2.554,2.554,0,0,1,27,13.5a3.27,3.27,0,0,0,.156.366l.646,1.508a2.635,2.635,0,0,1,.163.369l.165.362c.046.118.1.237.154.355l.323.749c.059.132.084.187.105.244.067.15.1.23.132.315a1.975,1.975,0,0,1,.132.293l-.038.212.108-.05.175.392.391.913.089.189a.975.975,0,0,0,.059.137.677.677,0,0,1,.053.142l.1.218a1.3,1.3,0,0,1,.089.374,6.881,6.881,0,0,1-6.87,6.871ZM1.962,22a5.083,5.083,0,0,0,6.286,3.532A5.148,5.148,0,0,0,11.775,22l.077-.282H1.89Zm16.279,0a5.146,5.146,0,0,0,3.527,3.533,4.993,4.993,0,0,0,1.379.194,5.147,5.147,0,0,0,4.905-3.726l.073-.283H18.163Zm9.627-2.046L23.145,9.109,18.421,19.958Zm-16.277,0L6.869,9.109,2.145,19.958Z' /></svg>
            </Link>
            <Link to="/wish-list" className={styles.navbar__icon}>
              <FaRegHeart />
              <span className={styles.count}>{wishlistQuantity}</span>
            </Link>
            <Link to="/basket" className={styles.navbar__icon}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"></path>
              </svg>
              <span className={styles.count}>
                {basketQuantity}
              </span>
            </Link>
            {/* <Link to="/" className={styles.navbar__icon}>
              <FaRegUser />
            </Link> */}
          </div>
        </nav>
      </div>
      <SideBar isOpen={isOpen} handleOpen={handleOpen} />
    </header>
  )
}

export default Header