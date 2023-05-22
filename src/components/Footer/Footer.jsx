import { Col, Container, Row } from "react-bootstrap";
import categoriesClassification from "../../../categoriesClassification.json";
import "./styles.scss";

export const Footer = () => {
  return (
    <footer>
      <Container className="footer-container pt-5 ">
        <Row className="footer-row ">
          <Col>
            <h5>Atencion al cliente</h5>
            <p>08 a 20 hs</p>
            <p> 0810-222-7322</p>
            <p>Contacta a tu vendedor</p>
            <p>Lunes a sabados</p>
          </Col>
          <Col>
            <h5>Marcas</h5>
            <p>Samsung</p>
            <p>Iphone</p>
            <p>Puma</p>
            <p>Yagmour</p>
            <p>Tcl</p>
            <p>Hp</p>
          </Col>
          <Col>
            <h5>Categorias</h5>
            {categoriesClassification.map((e) => {
              return (
                <p key={Object.keys(e)} className="footer-categories">
                  {" "}
                  {Object.keys(e)}
                </p>
              );
            })}
          </Col>
          <Col>
            <h5>Ayuda</h5>
            <p>Preguntas frecuentes</p>
            <p>Medios de pago</p>
            <p>Terminos y condiciones</p>
            <p className="border border-1 rounded p-2 justify-content-center align-items-center">
              Arrepentimiento de compra
            </p>
          </Col>
        </Row>
        <Row className="mt-4">
          <Col className="d-flex justify-content-center align-items-center text-light p-3">
            <p>Seguinos en : Facebook, Instagram, Twitter</p>
          </Col>
        </Row>
        <Row>
          <Col>
            <img
              src="https://baproar.vtexassets.com/assets/vtex/assets-builder/baproar.bapro-store-theme/2.0.10/footer/banco-provincia___1ec6ded06bbc30602319af4357a5a067.png"
              alt=""
            ></img>
            <img
              src="https://baproar.vtexassets.com/assets/vtex/assets-builder/baproar.bapro-store-theme/2.0.10/footer/banco-provincia-net___00767a0655a635b989120e18e5706f09.png"
              alt=""
            ></img>
          </Col>
          <Col className="d-flex flex-column justify-content-center align-items-center text-center terminos col-8 ">
            <div>Terminos y condiciones de navegabilidad del sitio web</div>
            <div>Copyright © 2023 Telar SMG S.A</div>
            <div>San Nicolas de los Arroyos,Buenos Aires,Argentina</div>
          </Col>
          <Col>
            <div className="terminos justify-content-center align-items-center text-center">
              Powered by sebaDor
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
