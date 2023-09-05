import { FaCreditCard, FaRegComments, FaRocket, FaSyncAlt } from "react-icons/fa"
import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <section className="footer-info">
          <div className="footer-info-container">
            <div className="footer-info-content">
              <FaRocket />
              <div>
                <h3>Sürətli çatdırılma</h3>
                <p>Bütün ölkәyә çatdırılma edirik</p>
              </div>
            </div>
            <div className="footer-info-content">
              <FaSyncAlt />
              <div>
                <h3>Zəmanət</h3>
                <p>Saytda olan bütün mәhsullara zəmanət</p>
              </div>
            </div>
            <div className="footer-info-content">
              <FaCreditCard />
              <div>
                <h3>100% Təhlükəsiz</h3>
                <p>Ödəniş</p>
              </div>
            </div>
            <div className="footer-info-content">
              <FaRegComments />
              <div>
                <h3>24/7</h3>
                <p>Xidmət</p>
              </div>
            </div>
          </div>
        </section>

        <section className="footer-bottom">
          <div className="footer-bottom-container">
            <div className="footer-copyright">
              <p>© 2021 Texnomart.az.</p>
              <Link to="/"><img src="/img/footer-logo.png" alt="footer logo" /></Link>
            </div>
            <div className="footer-cart">
              <Link to="/"><img src="/img/visa.png" alt="visa" /></Link>
              <Link to="/"><img src="/img/master-card.png" alt="master card" /></Link>
            </div>
          </div>
        </section>
      </div>
    </footer>
  )
}

export default Footer
