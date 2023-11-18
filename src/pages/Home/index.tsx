import { Helmet } from "react-helmet-async"
import Banner from "../../components/Banner"
import BarndCarousel from "../../components/BrandCarousel"
import ProductCarousel from "../../components/ProductCarousel"
import ProductsCatalog from "../../components/ProductsCatalog"

const Home = () => {
  return (
    <>
      <Helmet>
        <title>Texnomart | Elektronika və Məişət Texnikası Mağazalar Şəbəkəsi</title>
      </Helmet>
      <ProductsCatalog />
      <Banner />
      <ProductCarousel category={"smartfonlar"} title={"Smartfonlar"} />
      <ProductCarousel category={"televizorlar"} title={"Televizorlar"} />
      <BarndCarousel />
    </>
  )
}

export default Home