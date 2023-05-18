import { Modal } from "react-bootstrap"
import { authGlobalState } from "../../context/authcontext/AuthContext"
import CardModal from "../CardModal/CardModal"

const CartModal = () => {
  const { showCart, setShowCart } = authGlobalState(false)

  return (
    <>
      <Modal show={!!showCart} onHide={() => setShowCart()} animation={false}>
        <Modal.Header>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <CardModal />
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CartModal
