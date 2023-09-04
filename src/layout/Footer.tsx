import { Link } from "react-router-dom"

const Footer = () => {
  return (
    <footer>
      <div className="container">
        <section className="footer-info">
          <div className="footer-info-container">
            <div className="footer-info-content">
              <i className="fas fa-rocket"></i>
              <div>
                <h3>Sürətli çatdırılma</h3>
                <p>Bütün ölkәyә çatdırılma edirik</p>
              </div>
            </div>
            <div className="footer-info-content">
              <i className="fas fa-sync"></i>
              <div>
                <h3>Zəmanət</h3>
                <p>Saytda olan bütün mәhsullara zəmanət</p>
              </div>
            </div>
            <div className="footer-info-content">
              <i className="far fa-credit-card"></i>
              <div>
                <h3>100% Təhlükəsiz</h3>
                <p>Ödəniş</p>
              </div>
            </div>
            <div className="footer-info-content">
              <i className="far fa-comments"></i>
              <div>
                <h3>24/7</h3>
                <p>Xidmət</p>
              </div>
            </div>
          </div>
        </section>

        {/* <section className="footer-menu">
                    <div className="footer-menu-container">
                        <div className="footer-menu-list">
                            <h3>Şirkət</h3>
                            <ul>
                                <li><a href="">Haqqımızda</a></li>
                                <li><a href="">Hesabım</a></li>
                                <li><a href="">Əlaqə</a></li>
                                <li><a href="">Mağazalar</a></li>
                            </ul>
                        </div>
                        <div className="footer-menu-list">
                            <h3>Müştərilər üçün</h3>
                            <ul>
                                <li><a href="">Tez-tez verilən suallar</a></li>
                                <li><a href="">Kampaniyalar</a></li>
                                <li><a href="">Çatdırılma</a></li>
                                <li><a href="">Geri qaytarma siyasəti</a></li>
                                <li><a href="">Konfidensiallıq Siyasəti</a></li>
                                <li><a href="">Saytın istifadə şərtləri</a></li>
                                <li><a href="">İstək siyahısı</a></li>
                            </ul>
                        </div>
                        <div className="footer-menu-list">
                            <h3>Bizi izləyin</h3>
                            <ul>
                                <li>
                                    <a href="">
                                        <i className="fab fa-facebook-f" aria-hidden="true"></i>
                                        Facebook
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fab fa-instagram" aria-hidden="true"></i>
                                        Instagram
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fab fa-whatsapp"></i>
                                        WhatsApp
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fab fa-youtube" aria-hidden="true"></i>
                                        YouTube
                                    </a>
                                </li>
                                <li>
                                    <a href="">
                                        <i className="fab fa-telegram"></i>
                                        Telegram
                                    </a>
                                </li>
                            </ul>
                        </div>
                    </div>

                </section> */}

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
