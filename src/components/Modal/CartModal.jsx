import React, { useEffect, useMemo, useState } from "react";
import { Modal, ModalFooter } from "react-bootstrap";
import { authGlobalState } from "../../context/authcontext/AuthContext";
import { CartGlobalState } from "../../context/cartContext/CartContext";
import Swal from "sweetalert2";
import CardModal from "../CardModal/CardModal";
import axios from "axios";
import "./styles.scss";

const CartModal = () => {
  const { showCart, setShowCart } = authGlobalState(false);
  const { cartData, getCartProducts, clearCart, addToCart } = CartGlobalState();
  const [quantities, setQuantities] = useState({});

  useEffect(() => {
    getCartProducts();
  }, [showCart]);

  const handleCloseCart = () => {
    setShowCart();
    getCartProducts();
  };

  const handleClearCart = () => {
    clearCart();
    setShowCart();
  };

  const handleAddToCart = (productId, quantity) => {
    addToCart(productId, quantity);
    getCartProducts();
  };

  const handleQuantityChange = (productId, quantity) => {
    setQuantities((prevQuantities) => ({
      ...prevQuantities,
      [productId]: quantity,
    }));
  };

  const onFinishBuy = () => {
    Swal.fire("Purchase completed! ", "Go and check your email!", "success");
  };

  const total = useMemo(() => {
    if (!cartData || cartData.length === 0) {
      return 0;
    }

    return cartData.reduce(
      (acc, item) => acc + (item.price || 0) * (quantities[item.id] || 0),
      0
    );
  }, [cartData, quantities]);

  return (
    <>
      <Modal
        id="carrito-modal"
        show={!!showCart}
        onHide={handleCloseCart}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartData?.length === 0 ? (
            <div>Your cart is empty</div>
          ) : (
            cartData?.map((item) => (
              <CardModal
                key={item.id}
                cart={item}
                onQuantityChange={handleQuantityChange}
              />
            ))
          )}
        </Modal.Body>
        <ModalFooter className="modal-footer-container">
          <div className="number-container">
            <span>Total: ${total.toFixed(2)} </span>
          </div>
        </ModalFooter>
        <ModalFooter className="modal-buy-botton">
          <button
            className="modal-buy-botton-button"
            onClick={() => {
              handleClearCart();
              onFinishBuy();
            }}
          >
            Finish Buy
          </button>
          <button className="modal-buy-botton-button" onClick={handleClearCart}>
            Clear Cart
          </button>
        </ModalFooter>
      </Modal>
    </>
  );
};

export default CartModal;
