import { createBrowserRouter } from "react-router-dom";
import Home from "../pages/Home";
import Basket from "../pages/Basket";
import NotFound from "../pages/NotFound";
import ProductDetail from "../pages/ProductDetail";
import Root from "../layout/Root";

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
                path: "products/:id",
                element: <ProductDetail />,
            },
        ],
    },
]);