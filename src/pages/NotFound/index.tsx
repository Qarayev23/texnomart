import { Helmet } from 'react-helmet-async';
import styles from './notFound.module.scss';

const NotFound = () => {
  return (
    <>
      <Helmet>
        <title>Not found - Texnomart</title>
      </Helmet>
      <div className={styles.notFound}>
        <img src='/img/404.jpeg' alt='Not found image' />
      </div>
    </>
  )
}

export default NotFound