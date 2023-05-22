import { Col, Container, Row } from "react-bootstrap"
import { Layout } from "../../components/Layout/Layout"
import "./styles.scss"
import { useEffect, useState } from "react"
import { CartGlobalState } from "../../context/cartContext/CartContext"
import CardModal from "../../components/CardModal/CardModal"

const Cart = () => {
  const { cartData, getCartProducts } = CartGlobalState()

  useEffect(() => {
    getCartProducts()
  }, [])

  return (
    <Layout>
      <Container className="cart-container ">
        <h2 className="cart-title mt-4">My cart </h2>
        <Row>
          {cartData?.map((item) => (
            <Col key={item.id} sm={8} className="cart-items-container mt-4">
              <CardModal key={item.id} cart={item} />
            </Col>
          ))}

          <Col sm={4}>
            <div className="cart-summary-container mt-4">
              <div className="cart-summary">
                <div>subtotal</div>
                <div>discounts</div>

                <div>total</div>

                <button>Finish buy</button>

                <button>Keep buying</button>
              </div>
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  )
}

export default Cart
