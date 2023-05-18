import { Col, Container, Row } from "react-bootstrap"
import { Layout } from "../../components/Layout/Layout"
import "./styles.scss"

const Cart = () => {
  return (
    <Layout>
      <Container className="cart-container ">
        <h2 className="cart-title mt-4">My cart </h2>
        <Row>
          <Col sm={8} className="cart-items-container mt-4">
            <div className="cart-item">
              <div>product name</div>
              <div>quantity</div>
              <div>price</div>
              <button>remove item</button>
            </div>
          </Col>
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
