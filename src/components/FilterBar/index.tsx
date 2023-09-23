import { SetStateAction, useEffect, useState } from 'react'
import { Params, useLocation, useNavigate, useParams, useSearchParams } from 'react-router-dom'
import Checkbox from '../Checkbox'
import { FilterBarProps } from '../../types'
import styles from './filterBar.module.scss';
import { setFiterTitle } from '../../utils';
import { useGetFilterItemsQuery } from '../../redux/productApi';
import RangeSlider from 'react-range-slider-input';
import 'react-range-slider-input/dist/style.css';

const FilterBar = ({ limit, setCurrentPage, isOpen, handleOpen }: FilterBarProps) => {
  const { category } = useParams<Params>();
  const navigate = useNavigate()
  const location = useLocation();
  const [searchParams, setSearchParams] = useSearchParams()
  const { data } = useGetFilterItemsQuery({ category: category! });
  const filterItems = data?.filterItems
  const minPrice = data?.minPrice ?? 0
  const maxPrice = data?.maxPrice ?? 0
  const [startPrice, setStartPrice] = useState(searchParams.get("price_gte") ? Number(searchParams.get("price_gte")) : minPrice)
  const [endPrice, setEndPrice] = useState(searchParams.get("price_lte") ? Number(searchParams.get("price_lte")) : maxPrice)

  const filterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      const categoryParams = `${e.target.name}=${e.target.value}`.replaceAll(" ", "+")
      const decoded = decodeURIComponent(location.search)
      decoded.includes(`&${categoryParams}`) && navigate(`${decoded.replace(`&${categoryParams}`, "")}`)
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

  const onInputChange = (value: SetStateAction<number>[]) => {
    setStartPrice(value[0])
    setEndPrice(value[1])
  };

  const handleDragEnd = () => {
    setSearchParams((prevParams) => {
      prevParams.set("_page", "1")
      prevParams.set("_limit", limit.toString())
      prevParams.set("price_gte", startPrice?.toString())
      prevParams.set("price_lte", endPrice?.toString())
      return prevParams
    })
    setCurrentPage(1)
  }

  const handleSubmit = (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()

    setSearchParams((prevParams) => {
      prevParams.set("_page", "1")
      prevParams.set("_limit", limit.toString())
      prevParams.set("price_gte", startPrice === 0 ? minPrice?.toString() : startPrice?.toString())
      prevParams.set("price_lte", endPrice === 0 ? maxPrice?.toString() : endPrice?.toString())
      return prevParams
    })
    setCurrentPage(1)
  }

  return (
    <div>
      <div className={isOpen ? `${styles.filterBar} ${styles.active}` : `${styles.filterBar}`}>
        <button className={styles.filterBar__close} onClick={handleOpen}>Bağla</button>
        <div className={styles.filter}>
          <div className={styles.filter__row}>
            <h4 className={styles.filter__title}>Qiymət</h4>
            <div className={styles.filter__price}>
              <form onSubmit={handleSubmit}>
                <div className={styles.filter__price__inputs}>
                  <input type='number' value={startPrice === 0 ? minPrice : startPrice} onChange={(e) => setStartPrice(parseFloat(e.target.value))} max={maxPrice} min={minPrice} />
                  <span>-</span>
                  <input type='number' value={endPrice === 0 ? maxPrice : endPrice} onChange={(e) => setEndPrice(parseFloat(e.target.value))} max={maxPrice} min={minPrice} />
                </div>
                <button type='submit' className='hidden'></button>
              </form>
              <RangeSlider
                min={minPrice}
                max={maxPrice!}
                defaultValue={[minPrice, maxPrice]}
                value={[startPrice === 0 ? minPrice : startPrice, endPrice === 0 ? maxPrice : endPrice]}
                onInput={(value: SetStateAction<number>[]) => onInputChange(value)}
                onThumbDragEnd={handleDragEnd}
              />
            </div>
          </div>
          {
            filterItems?.map((filterItem, i) => {
              return <div className={styles.filter__row} key={i}>
                <h4 className={styles.filter__title}>{setFiterTitle(filterItem[0])}</h4>
                <ul className={styles.filter__list}>
                  {[...new Set(filterItem[1])].sort((a: any, b: any): any => a.split(" ")[0] - b.split(" ")[0]).map(((item, index) => (
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