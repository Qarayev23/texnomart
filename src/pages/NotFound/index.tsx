import styles from './notFound.module.scss';

const NotFound = () => {
  return (
    <div className={styles.notFound}>
        <img src='/img/404.jpeg' alt='Not found image'/>
    </div>
  )
}

export default NotFound