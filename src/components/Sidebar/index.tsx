import { SideBarProps } from '../../types';
import Menu from '../Menu';
import styles from './sideBar.module.scss';

const SideBar = ({ isOpen, handleOpen }: SideBarProps) => {
    return (
        <div>
            <div className={isOpen ? `${styles.sideBar} ${styles.active}` : `${styles.sideBar}`}>
                <button className={styles.sideBar__close} onClick={handleOpen}>Bağla</button>
                <Menu visible={true} />
            </div>
            <div className={isOpen ? `${styles.backdrop} ${styles.active}` : `${styles.backdrop}`} onClick={handleOpen}></div>
        </div>
    )
}

export default SideBar