import React from 'react'
import ReactDOM from 'react-dom/client'
import { Route, RouterProvider, createBrowserRouter, createRoutesFromElements  } from "react-router-dom"
import './index.css'
import Layout from "./components/Layout"
import AllProducts, { loader as allProductsLoader } from './pages/Products/AllProducts'
import ProductDetail from './Pages/Products/ProductDetail'



const router = createBrowserRouter(createRoutesFromElements(
  <>
    <Route path='/' element={<Layout />}>
      <Route 
        index 
        element={<AllProducts />} 
        loader={allProductsLoader}
      />
      <Route path="/products/productdetail/:productId" element={<ProductDetail/>}/>
    </Route>
  </>
))


function App () {
  return (
    <RouterProvider router={router} />
  )
}

ReactDOM.createRoot(document.getElementById('root')!).render(
  <React.StrictMode>
    <App />
  </React.StrictMode>,
)
