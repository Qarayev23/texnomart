import { CheckboxProps } from '../../types'
import { capitalizeFirstLetter } from '../../utils'

const Checkbox = ({ item, filterProducts }: CheckboxProps) => {
    return (
        <>
            <label htmlFor={`${item.value.toString()}-${item.name}`}>
                {typeof item.value === 'string' ? capitalizeFirstLetter(item.value) : item.name === "operationTime" ? 
                `${item.value} saat` : `${item.value} GB`}
            </label>
            <input
                type='checkbox'
                className='check-box'
                name={item.name}
                id={`${item.value.toString()}-${item.name}`}
                value={item.value}
                onChange={filterProducts}
            />
        </>
    )
}

export default Checkbox