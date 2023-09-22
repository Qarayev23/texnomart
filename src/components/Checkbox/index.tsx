import { CheckboxProps } from '../../types'
import { capitalizeFirstLetter } from '../../utils'

const Checkbox = ({ item, name, filterProducts }: CheckboxProps) => {
    return (
        <>
            <label htmlFor={`${item}-${name}`}> {typeof item === 'string' && capitalizeFirstLetter(item)}  </label>
            <input
                type='checkbox'
                className='check-box'
                name={name}
                id={`${item}-${name}`}
                value={item}
                onChange={filterProducts}
            />
        </>
    )
}

export default Checkbox