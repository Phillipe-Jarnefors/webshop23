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

import AdminParent, {
  loader as adminProductsLoader,
} from "./Pages/Admin/AdminParent";
import Cart from "./Pages/Cart/Cart";
import { CartProvider } from "./Utilities/CartContext";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Layout />}>
        <Route index element={<AllProducts />} loader={allProductsLoader} />
      </Route>
      <Route
        path="/admin"
        element={<AdminParent />}
        loader={adminProductsLoader}
      />
      <Route path="/cart" element={<Cart />} />
      <Route
        path="/products/productdetail/:productId"
        element={<ProductDetail />}
      />
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

const theme = createTheme({
  palette: {
    primary: {
      main: "#013e87",
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
