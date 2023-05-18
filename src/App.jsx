import "./App.scss"
import { Route, Routes } from "react-router-dom"
import { RegisterPage } from "./pages/RegisterPage/RegisterPage.jsx"
import ProductsPage from "./pages/ProductsPage/ProductsPage.jsx"
import { LoginPage } from "./pages/LoginPage/LoginPage.jsx"
import { HomePage } from "./pages/HomePage/HomePage.jsx"
import { ProductDetail } from "./pages/Product/ProductDetail.jsx"
import ProductsCategory from "./pages/Category/ProductCategory"
import { AuthProvider } from "./context/authcontext/AuthContext"
import Cart from "./pages/Cart/Cart"
import CartContextProvider from "./context/cartContext/CartContext"


function App() {
  return (
    <AuthProvider>
    <CartContextProvider value={[]}>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/products/search" element={<ProductsPage />} />
        
        <Route path="register" element={<RegisterPage />} />
        <Route path="login" element={<LoginPage />} />
        <Route path="/product/:id" element={<ProductDetail />} />
        <Route
          path="/products/category/:category"
          element={<ProductsCategory />}
        />
        <Route path='/cart' element={<Cart/>}/>
      </Routes>
      </CartContextProvider>
    </AuthProvider>
  )
}

export default App
