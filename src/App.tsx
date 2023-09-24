import { RouterProvider } from "react-router-dom"
import { router } from "./routes/routes"
import { useEffect } from "react"
import { useAppSelector } from "./redux/hooks"

function App() {
  const { basket } = useAppSelector(state => state.basketReducer)
  const { wishlist } = useAppSelector(state => state.wishlistReducer)
  const { compare } = useAppSelector(state => state.compareReducer)

  useEffect(() => {
    localStorage.setItem("basketItems", JSON.stringify(basket))
  }, [basket])

  useEffect(() => {
    localStorage.setItem("wishlistItems", JSON.stringify(wishlist))
  }, [wishlist])

  useEffect(() => {
    localStorage.setItem("compareItems", JSON.stringify(compare))
  }, [compare])

  return (
    <>
      <RouterProvider router={router} />
    </>
  )
}

export default App
