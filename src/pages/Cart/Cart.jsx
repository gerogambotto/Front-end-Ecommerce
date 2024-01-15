import React, { useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../../components/Layout/Layout";
import { CartContext } from "../../context/cartContext/CartContext";
import { authGlobalState } from "../../context/authcontext/AuthContext";
import CardModal from "../../components/CardModal/CardModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";

const Cart = () => {
  const { cartData, clearCart, getCartProducts } = useContext(CartContext);
  const { showCart, setShowCart } = authGlobalState(false);
  useEffect(() => {
    getCartProducts();
  }, []);

  const handleClearCart = () => {
    clearCart();
    setShowCart();
  };

  const navigate = useNavigate();

  const onFinishBuy = () => {
    Swal.fire("Purchase completed! ", "Go and check your email!", "success");
  };

  return (
    <Layout>
      <Container className="cart-container cartview">
        <h2 className="cart-title mt-4">Mi carrito </h2>
        {cartData && cartData.length > 0 ? (
          <Row>
            {cartData.map((item) => (
              <Col key={item.id} sm={8} className="cart-items-container mt-4">
                <CardModal key={item.id} cart={item} />
              </Col>
            ))}
            <Col sm={4}>
              <div className="cart-summary-container mt-4">
                <div className="cart-summary">
                  <button onClick={() => navigate("/")}>
                    Seguir comprando
                  </button>
                  <button
                    className="modal-buy-botton-button"
                    onClick={() => {
                      handleClearCart();
                      onFinishBuy();
                    }}
                  >
                    Finalizar compra
                  </button>
                </div>
              </div>
            </Col>
          </Row>
        ) : (
          <p>No hay productos en el carrito</p>
        )}
      </Container>
    </Layout>
  );
};

export default Cart;
