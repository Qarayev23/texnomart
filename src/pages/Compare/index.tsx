import Select, { SingleValue } from 'react-select'
import { Link } from "react-router-dom"
import { useAppDispatch, useAppSelector } from "../../redux/hooks"
import { FaLongArrowAltLeft } from "react-icons/fa"
import styles from "./compare.module.scss"
import { useEffect, useState } from 'react'
import { useGetFilterItemsQuery } from '../../redux/productApi'
import { capitalizeFirstLetter, setFiterTitle } from '../../utils'
import { clearCompare, removeFromCompare } from '../../redux/features/compareSlice'
import { addToBasket } from '../../redux/features/basketSlice'

const Compare = () => {
    const dispatch = useAppDispatch()
    const { compare } = useAppSelector(state => state.compareReducer)

    const options = [...new Set(compare.map(item => item.category))].map(item => ({ value: item, label: capitalizeFirstLetter(item.replace("-", " ").replace("ler", "lər")) }))

    const [value, setValue] = useState(options[0])

    const [data, setData] = useState(compare.filter(item => item.category === value!.value))

    useEffect(() => {
        setData(compare.filter(item => item.category === value!.value))
        if (data.length - 1 === 0) {
            setValue(options[0])
            setData(compare.filter(item => item.category === options[0].value))
        }
    }, [compare])

    function handleOnChange(newValue: SingleValue<{ value: string; label: string; }>) {
        setValue(newValue!)
        setData(compare.filter(item => item.category === newValue!.value))
    }

    const { data: nese } = useGetFilterItemsQuery({ category: value?.value! ?? "" });

    const filterItems = nese?.filterItems.map(item => item[0])

    return (
        <section className={styles.compare}>
            <div className="g-container">
                <h1 className="page-title">Müqayisə</h1>
                {
                    compare.length > 0 &&
                    <Select
                        className={styles.compare__select}
                        value={value}
                        options={options}
                        onChange={handleOnChange}
                        isSearchable={false}
                    />
                }
                <div className={styles.compare__content}>
                    {compare.length > 0 ?
                        <table className={styles.compare__table}>
                            <tbody>
                                <tr>
                                    <th>Məhsul</th>
                                    {
                                        data.map(item => (
                                            <td key={item.id}>
                                                <div className={styles.compare__product}>
                                                    <button className={styles.compare__remove} onClick={() => dispatch(removeFromCompare(item.id))}>
                                                        <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 44 44"><path d="M30.984,29.279v-.157h-.148l-7.792-7.563,7.864-7.635a.734.734,0,0,0,.017-1.039h0a.74.74,0,0,0-1.043-.013l-7.895,7.66-7.9-7.663a.742.742,0,0,0-1.043.014.732.732,0,0,0-.21.522.724.724,0,0,0,.219.515l7.871,7.64L13.06,29.192a.735.735,0,0,0-.014,1.043.742.742,0,0,0,1.044.015l7.894-7.663,7.9,7.663a.738.738,0,0,0,.516.208.752.752,0,0,0,.528-.223.719.719,0,0,0,.209-.521A.729.729,0,0,0,30.984,29.279Z" /><path d="M22,0A22,22,0,0,0,0,22H0a22,22,0,0,0,44,0h0A22,22,0,0,0,22,0Zm0,42A20,20,0,1,1,42,22,20.023,20.023,0,0,1,22,42Z" /></svg>
                                                    </button>
                                                    <Link to={`/${item.category}/${item.id}`}>
                                                        <img className={styles.compare__img} src={item.img} alt={item.name} />
                                                    </Link>
                                                    <Link to={`/${item.category}/${item.id}`}>
                                                        <h4 className={styles.compare__title}>{item.name}</h4>
                                                    </Link>
                                                    <button
                                                     className={styles.compare__add} onClick={() => dispatch(addToBasket(item))}>Səbətə at</button>
                                                </div>
                                            </td>
                                        ))
                                    }
                                </tr>
                                <tr>
                                    <th>Qiymət</th>
                                    {data.map(item => (
                                        <td key={item.id}>{item.price}&nbsp;<span className='azn'>M</span></td>
                                    ))}
                                </tr>
                                {filterItems?.map((filterItem, index) => (
                                    <tr key={index}>
                                        <th>{setFiterTitle(filterItem)}</th>
                                        {data.map(item => <td>{typeof item[filterItem] === 'string' && capitalizeFirstLetter(item[filterItem])}</td>)}
                                    </tr>
                                ))}
                            </tbody>
                        </table>

                        : <div className={styles.compare__empty}>Müqayisədə məhsul yoxdur.</div>
                    }

                    <div className={styles.compare__footer}>
                        <Link to="/category/smartfonlar" className="g-button g-button--red">
                            <FaLongArrowAltLeft />
                            Mağazaya keç
                        </Link>
                        {compare.length > 0 &&
                            <button className="g-button g-button--white" onClick={() => dispatch(clearCompare())}>
                                Cədvəli təmizlə
                            </button>
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}

export default Compare