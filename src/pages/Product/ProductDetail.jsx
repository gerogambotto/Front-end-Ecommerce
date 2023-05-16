import "./styles.scss";
import Spinner from "react-bootstrap/Spinner";
import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout.jsx";
import { useParams } from "react-router";
import { Col, Container, Row } from "react-bootstrap";
import { Link } from "react-router-dom";
import visa from "./visa.svg";
import mastercard from "./mastercard.svg";

export function ProductDetail() {
  const { id } = useParams();
  const [product, setProduct] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const getProduct = async () => {
    setIsLoading(true);
    const products = await fetch(`https://dummyjson.com/products/${id}`);
    const data = await products.json();
    setProduct(data);
    setIsLoading(false);
  };

  useEffect(() => {
    getProduct();
  }, []);

  return (
    <Layout>
      <div className="categories"></div>

      <Container >
        {isLoading ? (
          <div className="loader-container row justify-content-center align-items-center">
            <div className="loader"></div>
          </div>
        ) : (
          <Row className="productContainer">
            <Col sm={8} className="productImage">
              <img
                src={product?.images[0]}
                alt=""
                className=" mt-5"
              ></img>
            </Col>
            <Col sm={4}>
              <div className="productBrand mt-5">{product?.brand}</div>
              <div className="productName ">{product?.title}</div>
              <div className="subtitle mt-3">
                Vendido por <strong>{product?.brand}</strong>
              </div>
              <div className="price mt-4"> $ {product?.price}</div>
              <div className="ItemCount"></div>
              <div className="cuotas">
                Hasta 6 cuotas sin interés de ${Math.round(product?.price / 6)}
              </div>
              <div className="tarjetasDeCredito"></div>
              <img className="tarjetas" src={visa} alt="visa" />
              <img className="tarjetas" src={mastercard} alt="mastercard" />
              <p className="mediosDePago"> Ver todos los medios de pago</p>
              <div className="tiempoEnvio"></div>
              <button className="buyButton">
                <Link to="/" style={{ color: "white" }}>
                  Comprar
                </Link>
              </button>
              <button className="cartButton">
                <Link to="/" className="carttext">
                  Agregar al Carrito
                </Link>
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
  );
}
