import axios from "axios"
import { createContext, useContext } from "react"
import { useState } from "react"
import { useNavigate } from "react-router-dom"
import jwt_decode from "jwt-decode"

export const CartContext = createContext()
export const CartGlobalState = () => {
  const context = useContext(CartContext)
  if (!context)
    throw new Error("CartContext must be used within an CartProvider")
  return context
}

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([])

  const addToCart = async (product, quantity) => {
    const token = localStorage.getItem("token")
    const { id } = jwt_decode(token)
    const body = {
      userId: id,
      products: [
        {
          id: product.id,
          quantity: quantity,
        },
      ],
    }
    const res = await axios.post("https://dummyjson.com/carts/add", body)
    if (res.status === 200) {
     addToLocalStorage(product.id,quantity)
    } else {
      console.log("error")
    }
  }

  const addToLocalStorage = (productId, productQuantity = 1) => {
    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify(productId,productQuantity))
    }else{ 
      const cart= JSON.parse(localStorage.getItem("cart"))
      cart.push(product)
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }

  const getCartFromUser = () => {
    const res = axios.get(`https://dummyjson.com/carts/user/6`)
    console.log(res.data)
  }
  const removeFromCart = (product) => {
    setCartList(cartList.filter((item) => item.id !== product.id))
  }
  const clearCart = () => {
    setCartList([])
  }

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        clearCart,
        removeFromCart,
        addToLocalStorage,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
