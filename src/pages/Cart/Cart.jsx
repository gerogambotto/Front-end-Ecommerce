import React, { useEffect, useContext } from "react";
import { Container, Row, Col } from "react-bootstrap";
import { Layout } from "../../components/Layout/Layout";
import { CartContext } from "../../context/cartContext/CartContext";
import { authGlobalState } from "../../context/authcontext/AuthContext";
import CardModal from "../../components/CardModal/CardModal";
import { useNavigate } from "react-router-dom";
import Swal from "sweetalert2";
import "./styles.scss";

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
        <h2 className="cart-title mt-4">Your cart</h2>
        {cartData && cartData.length > 0 ? (
          <div className="cart-products-container">
            {cartData.map((item) => (
              <div key={item.id} sm={8} className="cart-items-container mt-4">
                <CardModal key={item.id} cart={item} />
              </div>
            ))}
          </div>
        ) : (
          <p>No hay productos en el carrito</p>
        )}
        <div className="cart-summary">
          <div class="portfolio-experiment" onClick={() => navigate("/")}>
            <a className="button-animation">
              <span class="text">Keep buying</span>
              <span class="line -right"></span>
              <span class="line -top"></span>
              <span class="line -left"></span>
              <span class="line -bottom"></span>
            </a>
          </div>
          <div
            class="portfolio-experiment"
            onClick={() => {
              handleClearCart();
              onFinishBuy();
            }}
          >
            <a className="button-animation">
              <span class="text">Funish Buy</span>
              <span class="line -right"></span>
              <span class="line -top"></span>
              <span class="line -left"></span>
              <span class="line -bottom"></span>
            </a>
          </div>
        </div>
      </Container>
    </Layout>
  );
};

export default Cart;
