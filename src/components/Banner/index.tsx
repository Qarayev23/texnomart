import Menu from '../Menu'
import Carousel from '../BannerCarousel'
import styles from './banner.module.scss';

const Banner = () => {
    return (
        <section className={styles.banner}>
            <div className="g-container">
                <div className={styles.banner__content}>
                    <Menu />
                    <Carousel />
                </div>
            </div>
        </section>
    )
}

export default Banner