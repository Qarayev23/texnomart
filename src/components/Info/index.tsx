import { useState } from 'react'
import styles from './info.module.scss';

const Info = () => {
    const [show, setShow] = useState(false)

    return (
        <section className={styles.info}>
            <div className="g-container">
                <h3 className={styles.info__title}>Mobil telefonlar</h3>
                <p className={show ? `${styles.info__text} ${styles.show}` : styles.info__text}>
                    Məşhur brend smartfonlar üçün “Texnomart”a müraciət etmək ən doğrusudur. Mağazamızda ən son telefon
                    modelləri ilə tanış
                    olaraq onları sərfəli qiymətə əldə edə bilərsiniz. Müasir dövrdə telefonlardan yalnız zənglər üçün
                    deyil, həm də
                    şəkillər, videolar çəkmək və internetə daxil olmaq üçün istifadə edirlər. Telefonlar gündəlik
                    həyatımızın ayrılmaz
                    hissəsinə çevrilib. Mobil telefonlar, telefon modelləri, ən son model smartfonların funksiyaları ilə
                    tanış olmaq üçün
                    “Texnomart.az” saytına baş çəkin. Mobil telefon almaq dövrümüzün ən aktual alış-verişlərindəndir.
                    Mobil telefonlar
                    bir-birindən funksiya, dizayn və parametrlərinə görə fərqlənir. Dünyaca məşhur brend markalar hər
                    kəsin büdcəsini nəzərə
                    alaraq fərqli qiymət diapazonunda smartfonlar istehsal edir. Sərfəli qiymətə telefon yeniləmək
                    istəyirsinizsə,
                    “Texnomart”a baş çəkin. Kiçik büdcə ilə də keyfiyyətli smartfona sahib ola bilərsiniz. Səmərəli
                    təkliflər və sərfəli
                    qiymətdən faydalanmağa tələsin.
                </p>
                <button onClick={() => setShow(!show)}>{show ? "daha az göstər" : "daha çox göstər"}</button>
            </div>
        </section>
    )
}

export default Info
