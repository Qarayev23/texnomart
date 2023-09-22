import Banner from "../../components/Banner"
import BarndCarousel from "../../components/BrandCarousel"
import ProductCarousel from "../../components/ProductCarousel"
import ProductsCatalog from "../../components/ProductsCatalog"

const Home = () => {
  return (
    <>
      <ProductsCatalog />
      <Banner />
      <ProductCarousel category={"smartphones"} title={"Smartfonlar"}/>
      <ProductCarousel category={"laptops"} title={"Noutbuklar"} />
      <BarndCarousel />
    </>
  )
}

export default Home