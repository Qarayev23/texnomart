import { useRef, useState } from 'react'
import styles from './info.module.scss';
import { useInfoQuery } from '../../redux/productApi';

const Info = ({ category }: { category: string }) => {
    const [show, setShow] = useState(false)
    const [height, setHeight] = useState(63)
    const { data } = useInfoQuery({ category: `${category}_info` });

    const textRef = useRef<HTMLParagraphElement | null>(null);
    const handleShow = () => {
        setShow(!show)
        setHeight((textRef?.current?.clientHeight! / 16) ?? 0);
    }

    return (
        <section className={styles.info}>
            <div className="g-container">
                <div className="flex items-start gap-5">
                    <div className={styles.info__img}>
                        <img src={data?.img} alt={data?.title} />
                    </div>
                    <div>
                        <h1 className={styles.info__title}>{data?.title}</h1>
                        <div className={styles.info__text} style={{ maxHeight: show ? `${height}rem` : `${67 / 16}rem` }}>
                            <p ref={textRef}>
                                {data?.description}
                            </p>
                        </div>
                    </div>
                </div>
                <button onClick={handleShow}>{show ? "daha az göstər" : "daha çox göstər"}</button>
            </div>
        </section>
    )
}

export default Info
