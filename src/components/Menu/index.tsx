import { Link } from "react-router-dom"
import { menuİtems } from "../../constants"
import styles from './menu.module.scss';

const Menu = ({visible}) => {
    return (
        <ul className={`${visible ? `${styles.menu} ${styles.visible}` : styles.menu}`}>
            {menuİtems.map((item, index) => (
                <li key={index} className={styles.menu__item}>
                    <Link to={item.path} className={styles.menu__link}>
                        <img src={item.img} alt={item.label} />
                        <span>{item.label}</span>
                    </Link>
                </li>
            ))}
        </ul>
    )
}

export default Menu