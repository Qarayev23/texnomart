import { FaCreditCard, FaRegComments, FaRocket, FaSyncAlt } from "react-icons/fa"
import { Link } from "react-router-dom"
import styles from './footer.module.scss';

const Footer = () => {
  return (
    <footer className={styles.footer}>
      <div className="g-container">
        <section className={styles.footer__info}>
          <ul className={styles.footer__info__list}>
            <li className={styles.footer__info__item}>
              <FaRocket />
              <div>
                <h3 className={styles.footer__info__title}>Sürətli çatdırılma</h3>
                <p className={styles.footer__info__text}>Bütün ölkәyә çatdırılma edirik</p>
              </div>
            </li>
            <li className={styles.footer__info__item}>
              <FaSyncAlt />
              <div>
                <h3 className={styles.footer__info__title}>Zəmanət</h3>
                <p className={styles.footer__info__text}>Saytda olan bütün mәhsullara zəmanət</p>
              </div>
            </li>
            <li className={styles.footer__info__item}>
              <FaCreditCard />
              <div>
                <h3 className={styles.footer__info__title}>100% Təhlükəsiz</h3>
                <p className={styles.footer__info__text}>Ödəniş</p>
              </div>
            </li>
            <li className={styles.footer__info__item}>
              <FaRegComments />
              <div>
                <h3 className={styles.footer__info__title}>24/7</h3>
                <p className={styles.footer__info__text}>Xidmət</p>
              </div>
            </li>
          </ul>
        </section>

        <section className={styles.footer__bottom}>
          <div className={styles.footer__copyright}>
            <p>© 2021 Texnomart.az.</p>
            <img src="/img/footer-logo.png" alt="footer logo" />
          </div>
          <div className={styles.footer__carts}>
            <img src="/img/visa.png" alt="visa" />
            <img src="/img/master-card.png" alt="master card" />
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
