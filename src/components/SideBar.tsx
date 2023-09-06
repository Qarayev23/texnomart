import { useEffect, useState } from 'react'
import { useSearchParams } from 'react-router-dom'

//import Nouislider from "nouislider-react"
// import "nouislider/distribute/nouislider.css"
import capitalizeFirstLetter, { convertIntObj } from '../utils'
import { filterData } from '../constants'

const SideBar = ({ handleSidebar, openSidebar, limit }) => {
  const [searchParams, setSearchParams] = useSearchParams()
  const filterProducts = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (!e.target.checked) {
      searchParams.delete(e.target.name)
      setSearchParams(searchParams)
    } else {
      const formerSearchParams = Object.fromEntries([...searchParams])
      const result = convertIntObj(formerSearchParams);
      setSearchParams({
        ...result,
        _page: 1,
        _limit: limit,
        [e.target.name]: e.target.value
    })
    }
}

useEffect(() => {
  let keys = []
  for (const entry of searchParams.entries()) {
    const [param, value] = entry;
    keys.push(param)

    document.querySelectorAll(".check-box").forEach((item) => {
      if (item.name === param && item.value === value) {
        item.checked = true
      }
    })
  }
}, [])

// const minPrice = 0
// const maxPrice = 5000
// const [startPrice, setStartPrice] = useState(minPrice)
// const [endPrice, setendPrice] = useState(maxPrice)

// const onSlide = (value) => {
//   setStartPrice(value[0])
//   setendPrice(value[1])
// };

return (
  <div className={openSidebar ? 'sidebar' : 'sidebar active'}>
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
          {
            filterData["brand"].map(((item, index) => (
              <li className='filter-item' key={index}>
                <label>{capitalizeFirstLetter(item.value)}</label>
                <input type='checkbox'
                  className='check-box'
                  name={item.name}
                  value={item.value}
                  onChange={filterProducts}
                />
              </li>
            )))
          }
        </ul>
      </div>

      <div className='filter-row'>
        <h4>Daxili yaddaş</h4>
        <ul className='filter-list'>
          {
            filterData["memory"].map(((item, index) => (
              <li className='filter-item' key={index}>
                <label>{item.value} GB</label>
                <input type='checkbox'
                  className='check-box'
                  name={item.name}
                  value={item.value}
                  onChange={filterProducts}
                />
              </li>
            )))
          }
        </ul>
      </div>

      <div className='filter-row'>
        <h4>Operativ yaddaş</h4>
        <ul className='filter-list'>
          {
            filterData["ram"].map(((item, index) => (
              <li className='filter-item' key={index}>
                <label>{item.value} GB</label>
                <input type='checkbox'
                  className='check-box'
                  name={item.name}
                  value={item.value}
                  onChange={filterProducts}
                />
              </li>
            )))
          }
        </ul>
      </div>
    </div>
  </div>
)
}

export default SideBar