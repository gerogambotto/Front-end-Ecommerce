import { Modal } from "react-bootstrap"
import { authGlobalState } from "../../context/authcontext/AuthContext"
import CardModal from "../CardModal/CardModal"


const CartModal = () => {
  const { showCart, setShowCart } = authGlobalState(false)

  const products = JSON.parse(localStorage.getItem("cart"))
  console.log(products)

  return (
    <>
      <Modal show={!!showCart} onHide={() => setShowCart()} animation={false}>
        <Modal.Header>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
        {/* {products.map((item)=>(
          <CardModal key={item.id} cart={item} />
        ))} */}
        </Modal.Body>
      </Modal>
    </>
  )
}

export default CartModal
