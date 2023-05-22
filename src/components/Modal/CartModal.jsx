import { Button, Modal, ModalFooter } from "react-bootstrap"
import { authGlobalState } from "../../context/authcontext/AuthContext"
import { CartGlobalState } from "../../context/cartContext/CartContext"
import CardModal from "../CardModal/CardModal"
import axios from "axios"
import { useEffect, useState } from "react"
import "./styles.scss"

const CartModal = () => {
  const { showCart, setShowCart } = authGlobalState(false)
  const { cartData, getCartProducts} = CartGlobalState()

  useEffect(() => {
    getCartProducts()
  }, [])

  return (
    <>
      <Modal
        id="carrito-modal"
        show={!!showCart}
        onHide={() => setShowCart()}
        animation={false}
      >
        <Modal.Header>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartData?.length === 0 ? (
            <div> Your cart is empty</div>
          ) : (
            cartData?.map((item) => <CardModal key={item.id} cart={item} />)
          )}
        </Modal.Body>
        <ModalFooter className="footer-container">
          <div className="number-container">
            <span>Subtotal: $</span>
            <span>Total: $  </span>
          </div>
        </ModalFooter>
        <ModalFooter className="modal-buy-botton">
          <button className="modal-buy-botton-button">Finish Buy</button>
        </ModalFooter>
      </Modal>
    </>
  )
}

export default CartModal
