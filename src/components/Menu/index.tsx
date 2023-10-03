import { NavLink } from "react-router-dom"
import { menuİtems } from "../../constants"
import styles from './menu.module.scss';

const Menu = ({ visible }: { visible?: boolean }) => {
    return (
        <ul className={`${visible ? `${styles.menu} ${styles.visible}` : styles.menu}`}>
            {menuİtems.map((item, index) => (
                <li key={index} className={styles.menu__item}>
                    <NavLink to={item.path} className={({ isActive }) => isActive ? `${styles.menu__link} ${styles.active}` : styles.menu__link}>
                        <img src={item.img} alt={item.label} />
                        <span>{item.label}</span>
                    </NavLink>
                </li>
            ))}
        </ul>
    )
}

export default Menu