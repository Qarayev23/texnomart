import { useEffect } from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
//import Nouislider from "nouislider-react"
// import "nouislider/distribute/nouislider.css"
import Checkbox from '../Checkbox'
import { FilterBarProps } from '../../types'
import styles from './filterBar.module.scss';
import { setFiterTitle } from '../../utils';

const FilterBar = ({ limit, setCurrentPage, isOpen, handleOpen, filterItems }: FilterBarProps) => {
  const navigate = useNavigate()
  const location = useLocation();
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
      <div className={isOpen ? `${styles.filterBar} ${styles.active}` : `${styles.filterBar}`}>
        <button className={styles.filterBar__close} onClick={handleOpen}>Bağla</button>
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
          {
            filterItems?.map((filterItem, i) => {
              return <div className={styles.filter__row} key={i}>
                <h4 className={styles.filter__title}>{setFiterTitle(filterItem[0])}</h4>
                <ul className={styles.filter__list}>
                  {[...new Set(filterItem[1])].sort((a:any, b:any):any => a-b).map(((item, index) => (
                    <li className={styles.filter__item} key={index}>
                      <Checkbox item={item} name={filterItem[0]} filterProducts={filterProducts} />
                    </li>
                  )))}
                </ul>
              </div>
            })
          }
        </div>
      </div>
      <div className={isOpen ? `${styles.backdrop} ${styles.active}` : `${styles.backdrop}`} onClick={handleOpen}></div>
    </div>
  )
}

export default FilterBar