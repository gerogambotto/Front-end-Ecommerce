import "./styles.scss"
import React, { useEffect, useState } from "react"
import { Layout } from "../../components/Layout/Layout.jsx"
import { useParams } from "react-router"
import { Col, Container, Row } from "react-bootstrap"
import { Link } from "react-router-dom"
import visa from "./visa.svg"
import mastercard from "./mastercard.svg"
import { useNavigate } from "react-router-dom"
import { CartGlobalState } from "../../context/cartContext/CartContext"
import { authGlobalState } from "../../context/authcontext/AuthContext"
import add from "./add.svg"
import minus from "./dash.svg"

export function ProductDetail() {
  const { id } = useParams()
  const [product, setProduct] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [cartModal, setCartModal] = useState(false)
  const { showCart, setShowCart } = authGlobalState(false)

  const { addToCart, cartList } = CartGlobalState()
  const navigate = useNavigate()

  const onAdd = () => {
    setShowCart(!showCart)
    addToCart(product)
  }

  const ToggleModal = () => {
    setCartModal(!cartModal)
  }

  const getProduct = async () => {
    setIsLoading(true)
    const products = await fetch(`https://dummyjson.com/products/${id}`)
    const data = await products.json()
    setProduct(data)
    setIsLoading(false)
  }

  useEffect(() => {
    getProduct()
  }, [])

  const [count, setCount] = useState(1)
  const increment = () => {
    if (count < product?.stock) {
      setCount(count + 1)
    }
  }
  const decrement = () => {
    if (count > 1) {
      setCount(count - 1)
    }
  }

  return (
    <Layout>
      <div className="categories"></div>
      {cartModal && (
        <Container fluid className="cart-modal">
          <Row className="cart-modal-header">
            <Col sm={10}>
              <h3>Cart</h3>
            </Col>
            <Col sm={2}>
              <button className="" onClick={() => ToggleModal()}>
                X
              </button>
            </Col>
          </Row>
          <Row>
            <CartModal cart={cartList} />
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <div>sub total</div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <div>total</div>
          </Row>
          <Row className="d-flex justify-content-center align-items-center">
            <button onClick={() => navigate("/cart")}>Checkout</button>
          </Row>
        </Container>
      )}

      <Container>
        {isLoading ? (
          <div className="loader-container row justify-content-center align-items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <Row className="productContainer">
            <Col sm={8} className="productImage">
              <img src={product?.images[0]} alt="" className=" mt-5"></img>
            </Col>
            <Col sm={4}>
              <div className="productBrand mt-5">{product?.brand}</div>
              <div className="productName ">{product?.title}</div>
              <div className="subtitle mt-3">
                Vendido por <strong>{product?.brand}</strong>
              </div>
              <div className="price mt-4 mb-3"> $ {product?.price}</div>
              <div>
                <button className="border-0 ml-2 " onClick={decrement}>
                  <img className="minus" src={minus} alt="minus" />
                </button>
                <div>{count && count}</div>
                <button onClick={increment} className="add mr-">
                  <img src={add} alt="add" />
                </button>
              </div>
              <div className="cuotas mt-2">
                Hasta 6 cuotas sin interés de ${Math.round(product?.price / 6)}
              </div>
              <div className="tarjetasDeCredito"></div>
              <img className="tarjetas" src={visa} alt="visa" />
              <img className="tarjetas" src={mastercard} alt="mastercard" />
              <p className="mediosDePago"> Ver todos los medios de pago</p>
              <div className="tiempoEnvio"></div>
              <button className="buyButton">
                <div style={{ color: "white" }}>Buy</div>
              </button>
              <button className="cartButton">
                <div className="carttext" onClick={() => onAdd()}>
                  Add to cart
                </div>
              </button>
            </Col>

            <Col sm={12} style={{ marginTop: "30px" }}>
              <h3> Especificaciones técnicas</h3>
              <div className="h_line"></div>
              <h5>Descripcion del producto</h5>
              <p>{product?.description}</p>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  )
}
