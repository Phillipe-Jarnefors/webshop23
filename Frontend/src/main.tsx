import React from "react";
import ReactDOM from "react-dom/client";
import {
  Route,
  RouterProvider,
  createBrowserRouter,
  createRoutesFromElements,
} from "react-router-dom";
import "./index.css";
import Layout from "./components/Layout";
import AllProducts, {
  loader as allProductsLoader,
} from "./pages/Products/AllProducts";
import AdminParent, {
  loader as adminProductsLoader,
} from "./Pages/Admin/AdminParent";

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
    </>
  )
);

function App() {
  return <RouterProvider router={router} />;
}

ReactDOM.createRoot(document.getElementById("root")!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>
);
