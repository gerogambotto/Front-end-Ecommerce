import { createContext, useContext } from "react"
import { useState } from 'react'

export const CartContext = createContext()
export const CartGlobalState = () => {
  const context = useContext(CartContext)
  if (!context)
    throw new Error("CartContext must be used within an CartProvider")
  return context
}
export const CartContextProvider = ({children}) => {
    const [cartList, setCartList] = useState([])

    const addToCart = (product, qty) => {
      const found = cartList.find(item => item.id === product.id)
      if (found === undefined){
        setCartList([...cartList,{...product,qty}])
      }else{
      found.qty += qty
      setCartList([...cartList])
    }}
    const removeFromCart = (product) => {
        setCartList(cartList.filter(item => item.id !== product.id))
    }
    const clearCart = () => {
      setCartList([])
    }


  return (
    <CartContext.Provider value={{
        cartList,
        addToCart,
        removeFromCart,
        clearCart
    }}
    >{children}</CartContext.Provider>
  )
}

export default CartContextProvider
