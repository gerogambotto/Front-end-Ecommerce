import React, { useEffect, useState, useContext } from "react";
import { Layout } from "../../components/Layout/Layout.jsx";
import { useParams } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import visa from "./visa.svg";
import mastercard from "./mastercard.svg";
import { useNavigate } from "react-router-dom";
import {
  CartContext,
  CartGlobalState,
} from "../../context/cartContext/CartContext";
import { authGlobalState } from "../../context/authcontext/AuthContext";
import add from "./add.svg";
import minus from "./dash.svg";
import Swal from "sweetalert2";
import "./styles.scss";

function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [cartModal, setCartModal] = useState(false);
  const { showCart, setShowCart } = authGlobalState(false);
  const { addToCart, cartList } = CartGlobalState();
  const navigate = useNavigate();

  const onAddToCart = (productId, count) => {
    addToCart(productId, count);

    Swal.fire("Product Added", "Go and check your cart", "success");
  };

  const ToggleModal = () => {
    setCartModal(!cartModal);
  };

  const getProduct = async () => {
    setIsLoading(true);
    try {
      const products = await fetch(`https://dummyjson.com/products/${id}`);
      const data = await products.json();
      setProduct(data);
    } catch (error) {
      console.error("Error al obtener el producto:", error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    getProduct();
  }, []);

  const [count, setCount] = useState(1);

  const { removeFromCart } = useContext(CartContext);

  const onBuyButtonClick = () => {
    const purchasedProduct = {
      id: product?.id,
      quantity: count,
    };

    removeFromCart(purchasedProduct.id);

    Swal.fire("Purchase completed!", "Go and check your email!", "success");
  };

  return (
    <Layout>
      <div className="categories"></div>
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
              <div className="productBrand mt-5 mb-3">{product?.brand}</div>
              <div className="productName ">{product?.title}</div>
              <div className="subtitle mt-3">
                Seller: <strong>{product?.brand}</strong>
              </div>
              <div className="price mt-4 mb-3"> $ {product?.price}</div>

              <div className="cards-container">
                <img className="cards mr-4" src={visa} alt="visa" />
                <img className="cards" src={mastercard} alt="mastercard" />
              </div>
              <p className="mediosDePago">
                {" "}
                You will receive an email with the purchase information
              </p>
              <div className="tiempoEnvio"></div>
              <div className="d-flex flex-column justify-content-center align-items-center ">
                <button className="buyButton" onClick={onBuyButtonClick}>
                  <div style={{ color: "white" }}>Buy</div>
                </button>
                <button className="cartButton mt-3">
                  <div
                    className="carttext"
                    onClick={() => onAddToCart(product?.id, count)}
                  >
                    Add to cart
                  </div>
                </button>
              </div>
            </Col>

            <Col sm={12} style={{ marginTop: "30px" }}>
              <h3> Technical specifications</h3>
              <div className="h_line"></div>
              <h5>Product description</h5>
              <p>{product?.description}</p>
            </Col>
          </Row>
        )}
      </Container>
    </Layout>
  );
}

export default ProductDetail;
