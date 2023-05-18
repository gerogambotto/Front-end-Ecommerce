import axios from "axios"
import { createContext, useContext } from "react"
import { useState } from "react"

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
    
    const body = {
      userId: 1,
      products: [
        {
          id: product.id,
          quantity: quantity,
        },
        {
          id: 50,
          quantity: 2,
        },
      ],
    }
    const res = await axios.post("https://dummyjson.com/carts/add", body) 
      if(res.status === 200){
        console.log("success")
      }else {
        console.log("error")
      }
  }
  
  /* {

      const found = cartList.find(item => item.id === product.id)
      if (found === undefined){
        setCartList([...cartList,{...product,quantity}])
      }else{
      found.quantity+= quantity
      setCartList([...cartList])
    }}
    const removeFromCart = (product) => {
        setCartList(cartList.filter(item => item.id !== product.id))
    }
    const clearCart = () => {
      setCartList([])
    }
 */

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
      }}
    >
      {children}
    </CartContext.Provider>
  )
}

export default CartContextProvider
