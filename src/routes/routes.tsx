import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import Root from "../layout/Root";
import Category from "../pages/Category";
import BrandPage from "../pages/Brand";
import WishList from "../pages/WishList";
import Compare from "../pages/Compare";

export const router = createBrowserRouter([
    {
        path: "/",
        element: <Root />,
        children: [
            {
                index: true,
                element: <Home />
            },
            {
                path: "*",
                element: <NotFound />,
            },
            {
                path: "basket",
                element: <Basket />,
            },
            {
                path: "wish-list",
                element: <WishList />,
            },
            {
                path: "compare",
                element: <Compare />,
            },
            {
                path: "category/:category",
                element: <Category />,
            },
            {
                path: ":category/:id",
                element: <ProductDetail />,
            },
            {
                path: "product-brand/:brand",
                element: <BrandPage />,
            },
        ],
    },
]);