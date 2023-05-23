import axios from "axios"
import { createContext, useContext } from "react"
import { useState } from "react"
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

  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem("token")
    const { id } = jwt_decode(token)
    const body = {
      userId: id,
      products: [
        {
          id: productId,
          quantity: quantity,
        },
      ],
    }
    const res = await axios.post("https://dummyjson.com/carts/add", body)

    if (res.status === 200) {
      addToLocalStorage(productId, quantity)
    } else {
      console.log("error")
    }
  }

  const addToLocalStorage = (productId, productQuantity = 1) => {
    const productCart = {
      productId: productId,
      quantity: productQuantity,
    }

    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([productCart]))
    } else {
      const cart = JSON.parse(localStorage.getItem("cart"))
      const existingProduct = cart.find((p) => p.productId === productId)
      if (existingProduct) {
        existingProduct.quantity += 1
      } else {
        cart.push(productCart)
      }
      localStorage.setItem("cart", JSON.stringify(cart))
    }
  }

  const getCartFromUser = () => {
    const res = axios.get(`https://dummyjson.com/carts/user/6`)
    console.log(res.data)
  }
 /*  const removeFromCart = (product) => {
    setCartList(cartList.filter((item) => item.id !== product.id))
  } */

  const cartProducts = JSON.parse(localStorage.getItem("cart"))
  const [cartData, setCartData] = useState([])
  const getCartProducts = async () => {
    try {
      const promises = cartProducts.map(async (item) => {
        const res = await axios.get(
          `https://dummyjson.com/products/${item.productId}`
        )
        return res.data
      })

      const cartAwaited = await Promise.all(promises)
      setCartData(cartAwaited)
    } catch (error) {
      console.log(error)
    }
  }

  

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        addToLocalStorage,
        getCartProducts,
        cartData,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider