import { useEffect, useState } from 'react'
import { Link } from 'react-router-dom'
import { DebounceInput } from 'react-debounce-input';
import { useProductBySearchQuery } from '../../redux/productApi';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../redux/hooks';
import { FaRegUser } from 'react-icons/fa';
import styles from './header.module.scss';
import Spinner from '../../components/Spinner';

const Header = () => {
  const [query, setQuery] = useState("")
  const [skip, setSkip] = useState(true)
  const { data: productBySearch, isLoading } = useProductBySearchQuery(query, { skip: skip });
  const { cart } = useAppSelector(state => state.cartReducer)
  const navigate = useNavigate()

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

  const totalQuantity = cart.reduce((acc, element) => {
    return acc + element.count
  }, 0)

  return (
    <header className={styles.header}>
      <div className="g-container">
        <nav className={styles.navbar}>
          <Link to="/" className={styles.navbar__logo} >
            <img src="/img/logo.png" alt="Texnomart logo" />
          </Link>
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
              {productBySearch?.length === 0 && !isLoading ? <li className={styles.no__result}>Məhsul tapılmadı.</li> : null}

              {productBySearch?.map((item) => (
                <button className={styles.directed__btn} onClick={() => handleNavigate(item.id)} key={item.id}>
                  <div className={styles.product__image}>
                    <img className={styles.front} src={item.img} />
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
                          <span className={styles.amount}>12 ay
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
          <div className={styles.navbar__icons}>
            <Link to="/" className={`${styles.navbar__icons__item} ${styles.tel}`}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 32 32">
                <path d="M27.308,20.649l-2.2-2.2a3.521,3.521,0,0,0-4.938-.021,2.152,2.152,0,0,1-2.729.267A15.026,15.026,0,0,1,13.3,14.562a2.181,2.181,0,0,1,.284-2.739A3.521,3.521,0,0,0,13.553,6.9l-2.2-2.2a3.514,3.514,0,0,0-4.961,0l-.633.634c-3.3,3.3-3.053,10.238,3.813,17.1,4.14,4.141,8.307,5.875,11.686,5.875a7.5,7.5,0,0,0,5.418-2.061l.634-.634A3.513,3.513,0,0,0,27.308,20.649ZM25.894,24.2l-.634.634c-2.6,2.6-8.339,2.125-14.276-3.813S4.571,9.34,7.171,6.74L7.8,6.107a1.511,1.511,0,0,1,2.133,0l2.2,2.2a1.511,1.511,0,0,1,.021,2.11,4.181,4.181,0,0,0-.531,5.239,17.01,17.01,0,0,0,4.713,4.706,4.179,4.179,0,0,0,5.231-.517,1.512,1.512,0,0,1,2.118.013l2.2,2.2A1.51,1.51,0,0,1,25.894,24.2Z"></path>
              </svg>
              <span>*3344</span>
            </Link>
            {/* <Link to="/" className={styles.navbar__icons__item}>
              <FaRegHeart />
              <span className={styles.count}>0</span>
            </Link> */}
            <Link to="/basket" className={styles.navbar__icons__item}>
              <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
                <path d="M19,7H16V6A4,4,0,0,0,8,6V7H5A1,1,0,0,0,4,8V19a3,3,0,0,0,3,3H17a3,3,0,0,0,3-3V8A1,1,0,0,0,19,7ZM10,6a2,2,0,0,1,4,0V7H10Zm8,13a1,1,0,0,1-1,1H7a1,1,0,0,1-1-1V9H8v1a1,1,0,0,0,2,0V9h4v1a1,1,0,0,0,2,0V9h2Z"></path>
              </svg>
              <span className={styles.count}>
                {totalQuantity}
              </span>
            </Link>
            <Link to="/" className={`${styles.navbar__icons__item} ${styles.register}`}>
              <FaRegUser />
              <div className="flex-col hidden md:flex">
                <span className={styles.register__text}>Daxil ol</span>
                <span className={styles.register__text}>Qeydiyyat</span>
              </div>
            </Link>
          </div>
        </nav>
      </div>
    </header>
  )
}

export default Header