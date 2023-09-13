import { useEffect} from 'react'
import { useLocation, useNavigate, useSearchParams } from 'react-router-dom'
//import Nouislider from "nouislider-react"
// import "nouislider/distribute/nouislider.css"
import { filterData } from '../../constants'
import Checkbox from '../Checkbox'
import { CheckboxComponentProps } from '../../types'
import styles from './sidebar.module.scss';

const SideBar = ({ limit, setCurrentPage, openSidebar, handleSidebar }: CheckboxComponentProps) => {
  const navigate = useNavigate()
  let location = useLocation();
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
    <div className={openSidebar ? 'backdrop active' : 'backdrop'}>
      <div className="sidebar">
        <button className="close-sidebar" onClick={handleSidebar}>Filteri bağla</button>

        <div className='sidebar-inner'>
          {/* <div className='filter-row'>
          <h4>Qiymət</h4>
          <div className='range-slide'>
            <div className='range-slide-inputs'>
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

          <div className='filter-row'>
            <h4>Model</h4>
            <ul className='filter-list'>
              {filterData["brand"].map(((item, index) => (
                <li className='filter-item' key={index}>
                  <Checkbox item={item} filterProducts={filterProducts} />
                </li>
              )))}
            </ul>
          </div>

          <div className='filter-row'>
            <h4>Daxili yaddaş</h4>
            <ul className='filter-list'>
              {filterData["memory"].map(((item, index) => (
                <li className='filter-item' key={index}>
                  <Checkbox item={item} filterProducts={filterProducts} />
                </li>
              )))}
            </ul>
          </div>

          <div className='filter-row'>
            <h4>Operativ yaddaş</h4>
            <ul className='filter-list'>
              {filterData["ram"].map(((item, index) => (
                <li className='filter-item' key={index}>
                  <Checkbox item={item} filterProducts={filterProducts} />
                </li>
              )))}
            </ul>
          </div>
        </div>
      </div>
    </div >
  )
}

export default SideBar