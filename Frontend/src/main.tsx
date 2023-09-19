import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Layout from "./Components/Layout";
import AllProducts, {
  loader as allProductsLoader,
} from "./Pages/Products/AllProducts";
import { ThemeProvider, createTheme } from "@mui/material";
import ProductDetail from "./Pages/Products/ProductDetail";
import AdminParent from "./Pages/Admin/AdminParent";
import Cart from "./Pages/Cart/Cart";
import { CartProvider } from "./Utilities/CartContext";
import AdminProducts, {
  loader as adminProductsLoader,
} from "./Pages/Admin/AdminProducts";
import AdminOrders, {
  loader as adminOrdersLoader,
} from "./Pages/Admin/AdminOrders";

import PersonalInformation from "./Pages/Cart/PersonalInformation";
import ShippingMethod from "./Pages/Cart/ShippingMethod";
import Checkout from "./Pages/Cart/Checkout";
import SubmittedOrder from "./Pages/Cart/SubmittedOrder";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllProducts />} loader={allProductsLoader} />

        <Route path="/admin" element={<AdminParent />}>
          <Route
            path="orders"
            element={<AdminOrders />}
            loader={adminOrdersLoader}
          />
          <Route
            path="products"
            element={<AdminProducts />}
            loader={adminProductsLoader}
          />
        </Route>
        <Route path="/cart" element={<Cart />} />
        <Route path="/userinfo" element={<PersonalInformation />} />
        <Route path="/shippingmethod" element={<ShippingMethod />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/submittedOrder" element={<SubmittedOrder />} />
        <Route
          path="/products/productdetail/:productId"
          element={<ProductDetail />}
        />
      </Route>
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#bc6c25",
    },
    secondary: {
      main: "#2e74c9",
    },
  },
  typography: {
    h1: {
      fontSize: "3rem",
      fontWeight: 600,
    },
    h2: {
      fontSize: "1.75rem",
      fontWeight: 600,
    },
    h3: {
      fontSize: "1.5rem",
      fontWeight: 600,
    },
  },
});

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <ThemeProvider theme={theme}>
      <CartProvider>
        <App />
      </CartProvider>
    </ThemeProvider>
  </React.StrictMode>
);
