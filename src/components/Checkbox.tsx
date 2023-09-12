import { CheckboxProps } from '../types'
import { capitalizeFirstLetter } from '../utils'

const Checkbox = ({ item, filterProducts }: CheckboxProps) => {
    return (
        <>
            <label>{typeof item.value === 'string' ? capitalizeFirstLetter(item.value) : `${item.value} GB`}</label>
            <input
                type='checkbox'
                className='check-box'
                name={item.name}
                value={item.value}
                onChange={filterProducts}
            />
        </>
    )
}

export default Checkbox