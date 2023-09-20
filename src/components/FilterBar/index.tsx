import { useEffect } from 'react'
import { Params, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
//import Nouislider from "nouislider-react"
// import "nouislider/distribute/nouislider.css"
import { laptopsFilterItems, smartphoneFilterItems, smartwatchFilterItems } from '../../constants'
import Checkbox from '../Checkbox'
import { FilterBarProps } from '../../types'
import styles from './filterBar.module.scss';

const FilterBar = ({ limit, setCurrentPage, openFilterBar, handleFilterBar}: FilterBarProps) => {
  const navigate = useNavigate()
  const location = useLocation();
  const { category } = useParams<Params>();
  const [searchParams, setSearchParams] = useSearchParams()

  const filterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      setSearchParams((prevParams) => {
        prevParams.set("_page", "1")
        prevParams.set("_limit", limit.toString())
        return prevParams
      })

      const categoryParams = `${e.target.name}=${e.target.value}`
      location.search.includes(`&${categoryParams}`) && navigate(`${location.search.replace(`&${categoryParams}`, "")}`)
    } else {
      setSearchParams((prevParams) => {
        prevParams.set("_page", "1")
        prevParams.set("_limit", limit.toString())
        prevParams.append(e.target.name, e.target.value)
        return prevParams
      })
    }

    setCurrentPage(1)
  }

  useEffect(() => {
    let keys = []
    for (const entry of searchParams.entries()) {
      const [param, value] = entry;
      keys.push(param)

      Array.from(document.getElementsByClassName('check-box') as HTMLCollectionOf<HTMLInputElement>).forEach((item) => {
        if (item.name === param && item.value === value) {
          item.checked = true
        }
      })
    }
  }, [searchParams])

  // const minPrice = 0
  // const maxPrice = 5000
  // const [startPrice, setStartPrice] = useState(minPrice)
  // const [endPrice, setendPrice] = useState(maxPrice)

  // const onSlide = (value) => {
  //   setStartPrice(value[0])
  //   setendPrice(value[1])
  // };

  return (
    <div>
      <div className={openFilterBar ? `${styles.filterBar} ${styles.active}` : `${styles.filterBar}`}>
        <button className={styles.filterBar__close} onClick={handleFilterBar}>Filteri bağla</button>
        <div className={styles.filter}>
          {/* <div className={styles.filter__row}>
          <h4 className={styles.filter__title}>Qiymət</h4>
          <div className={styles.range-slide}>
            <div className={styles.range-slide-inputs}>
              <input type='number' value={startPrice} onChange={(e) => setStartPrice(e.target.value)} />
              <span>-</span>
              <input type='number' value={endPrice} onChange={(e) => setendPrice(e.target.value)}/>
            </div>

            <Nouislider
              connect
              start={[minPrice, maxPrice]}
              range={{
                min: [minPrice],
                max: [maxPrice]
              }}
              onSlide={onSlide}
            />
          </div>
        </div> */}

          {category === "smartphones" &&
            <>
              <div className={styles.filter__row}>
                <h4 className={styles.filter__title}>Model</h4>
                <ul className={styles.filter__list}>
                  {smartphoneFilterItems["brand"].map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
              <div className={styles.filter__row}>
                <h4 className={styles.filter__title}>Daxili yaddaş</h4>
                <ul className={styles.filter__list}>
                  {smartphoneFilterItems["memory"].map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
              <div className={styles.filter__row}>
                <h4 className={styles.filter__title}>Operativ yaddaş</h4>
                <ul className={styles.filter__list}>
                  {smartphoneFilterItems["ram"].map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
            </>}
          {category === "smartwatches" &&
            <>
              <div className={styles.filter__row}>
                <h4 className={styles.filter__title}>Brend</h4>
                <ul className={styles.filter__list}>
                  {smartwatchFilterItems["brand"].map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
              <div className={styles.filter__row}>
                <h4 className={styles.filter__title}>İşləmə müddəti</h4>
                <ul className={styles.filter__list}>
                  {smartwatchFilterItems["operationTime"].map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
            </>}
          {category === "laptops" &&
            <>
              <div className={styles.filter__row}>
                <h4 className={styles.filter__title}>Brend</h4>
                <ul className={styles.filter__list}>
                  {laptopsFilterItems["brand"].map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
              <div className={styles.filter__row}>
                <h4 className={styles.filter__title}>Operativ yaddaş</h4>
                <ul className={styles.filter__list}>
                  {laptopsFilterItems["ram"].map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
              <div className={styles.filter__row}>
                <h4 className={styles.filter__title}>Daxili yaddaş</h4>
                <ul className={styles.filter__list}>
                  {laptopsFilterItems["memory"].map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
            </>}
        </div>
      </div>
      <div className={openFilterBar ? `${styles.backdrop} ${styles.active}` : `${styles.backdrop}`} onClick={handleFilterBar}></div>
    </div>
  )
}

export default FilterBar