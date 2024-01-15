import React, { useContext, useEffect, useState } from "react";
import { CartContext } from "../../context/cartContext/CartContext";
import trashIcon from "../../../public/assets/trash.svg";
import "./styles.scss";

const CardModal = ({ cart, onQuantityChange }) => {
  const { cartList, removeFromCart, clearCart } = useContext(CartContext);
  const [totalQuantity, setTotalQuantity] = useState(0);
  const [onQuantityChangeCalled, setOnQuantityChangeCalled] = useState(false);

  useEffect(() => {
    const productInCart = cartList.find((item) => item.productId === cart.id);
    const quantity = productInCart ? productInCart.quantity : 0;

    if (typeof onQuantityChange === "function" && !onQuantityChangeCalled) {
      onQuantityChange(cart.id, quantity);
      setOnQuantityChangeCalled(true);
    }

    setTotalQuantity(quantity);
  }, [cartList, cart.id, onQuantityChange, onQuantityChangeCalled]);

  const handleDeleteFromCart = () => {
    if (totalQuantity === 1 && cartList.length === 1) {
      clearCart();
    } else {
      removeFromCart(cart.id);
    }
  };

  return (
    <div className="cart-card">
      <div className="trash-icon-container">
        <button className="trash-icon-button" onClick={handleDeleteFromCart}>
          <img src={trashIcon} alt="Delete" />
        </button>
      </div>
      <a style={{ color: "#fff" }} className="" href={`/product/${cart.id}`}>
        <div className="cart-img">
          <img className="cart-img" src={cart.thumbnail} alt={cart.title} />
        </div>
      </a>
      <div className="d-flex justify-content-center align-items-center">
        <p className="title-cart">{cart.title}</p>
        <p className="price-cart">$ {cart.price}</p>
        <p>Item Count: {totalQuantity}</p>
      </div>
    </div>
  );
};

export default CardModal;
