import { CheckboxProps } from '../../types'
import { capitalizeFirstLetter } from '../../utils'

const Checkbox = ({ item, name, filterProducts }: CheckboxProps) => {
    return (
        <>
            <label htmlFor={`${item.toString()}-${name}`}>
                {typeof item === 'string' ? capitalizeFirstLetter(item) : name === "operationTime" ?
                    `${item} saat` : `${item} GB`}
            </label>
            <input
                type='checkbox'
                className='check-box'
                name={name}
                id={`${item.toString()}-${name}`}
                value={item}
                onChange={filterProducts}
            />
        </>
    )
}

export default Checkbox