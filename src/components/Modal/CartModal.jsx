import { Modal, ModalFooter } from "react-bootstrap"
import { authGlobalState } from "../../context/authcontext/AuthContext"
import CardModal from "../CardModal/CardModal"
import axios from "axios"
import { useEffect, useState } from "react"
import "./styles.scss"

const CartModal = () => {
  const { showCart, setShowCart } = authGlobalState(false)
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
  useEffect(() => {
    getCartProducts()
  }, [])

  return (
    <>
      <Modal show={!!showCart} onHide={() => setShowCart()} animation={false}>
        <Modal.Header>
          <Modal.Title>Cart</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          {cartData?.map((item) => (
            <CardModal key={item.id} cart={item} />
          ))}
        </Modal.Body>
        <ModalFooter className="" ><div className="number-container">
          <span>Subtotal $</span>
          <span>Total $ </span>
        </div></ModalFooter>
      </Modal>
    </>
  )
}

export default CartModal
