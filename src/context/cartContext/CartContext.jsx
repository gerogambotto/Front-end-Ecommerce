import React, { createContext, useContext, useState, useEffect } from "react";
import axios from "axios";
import jwt_decode from "jwt-decode";

export const CartContext = createContext();

export const CartGlobalState = () => {
  const context = useContext(CartContext);
  if (!context)
    throw new Error("CartContext must be used within a CartProvider");
  return context;
};

export const CartContextProvider = ({ children }) => {
  const [cartList, setCartList] = useState([]);
  const [cartData, setCartData] = useState([]);

  const addToCart = async (productId, quantity) => {
    const token = localStorage.getItem("token");
    const { id } = jwt_decode(token);
    const body = {
      userId: id,
      products: [
        {
          id: productId,
          quantity: quantity,
        },
      ],
    };
    try {
      const res = await axios.post("https://dummyjson.com/carts/add", body);

      if (res.status === 200) {
        addToLocalStorage(productId, quantity);
        setCartList(JSON.parse(localStorage.getItem("cart")) || []);
      } else {
        console.log("error");
      }
    } catch (error) {
      console.error("Error al agregar al carrito:", error);
    }
  };

  const addToLocalStorage = (productId, productQuantity = 1) => {
    const productCart = {
      productId: productId,
      quantity: productQuantity,
    };

    if (!localStorage.getItem("cart")) {
      localStorage.setItem("cart", JSON.stringify([productCart]));
    } else {
      const cart = JSON.parse(localStorage.getItem("cart"));
      const existingProduct = cart.find((p) => p.productId === productId);
      if (existingProduct) {
        existingProduct.quantity += 1;
      } else {
        cart.push(productCart);
      }
      localStorage.setItem("cart", JSON.stringify(cart));
    }
  };

  const updateLocalStorage = (updatedCart) => {
    localStorage.setItem("cart", JSON.stringify(updatedCart));
  };

  const removeFromCart = (productId) => {
    // Busca el índice del producto en el carrito
    const productIndex = cartList.findIndex(
      (item) => item.productId === productId
    );

    if (productIndex !== -1) {
      // Si el producto está en el carrito, cópialo y elimínalo del array
      const updatedCart = [...cartList];
      updatedCart.splice(productIndex, 1);

      // Actualiza el estado del carrito y el almacenamiento local
      setCartList(updatedCart);
      updateLocalStorage(updatedCart);
    }
  };

  const getCartProducts = async () => {
    try {
      const cartProducts = JSON.parse(localStorage.getItem("cart")) || [];
      if (cartProducts.length > 0) {
        const promises = cartProducts.map(async (item) => {
          const res = await axios.get(
            `https://dummyjson.com/products/${item.productId}`
          );
          return res.data;
        });

        const cartAwaited = await Promise.all(promises);
        setCartData(cartAwaited);
        setCartList(JSON.parse(localStorage.getItem("cart")) || []);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const clearCart = () => {
    localStorage.removeItem("cart");
    setCartList([]);
    setCartData([]);
  };

  useEffect(() => {
    getCartProducts();
  }, []);

  return (
    <CartContext.Provider
      value={{
        cartList,
        addToCart,
        addToLocalStorage,
        getCartProducts,
        cartData,
        clearCart,
        removeFromCart,
      }}
    >
      {children}
    </CartContext.Provider>
  );
};

export default CartContextProvider;
