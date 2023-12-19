import { Col, Container, Row } from "react-bootstrap";
import categoriesClassification from "../../../categoriesClassification.json";
import "./styles.scss";
import { Link } from "react-router-dom";
export const Footer = () => {
  return (
    <footer>
      <Container className="footer-container pt-5 ">
        <Row className="footer-row ">
          <Col>
            <h5>Customer Support</h5>
            <p> 08 a 20 hs</p>
            <p> 0810-222-7777</p>
            <p>Monday to Saturday</p>
          </Col>

          <Col>
            <h5>Companies</h5>
            <Link to={`/products/search?q=samsung`}>
              <p>Samsung</p>
            </Link>
            <Link to={`/products/search?q=iphone`}>
              <p>Iphone</p>
            </Link>
            <Link to={`/products/search?q=microsoft`}>
              <p>Microsoft</p>
            </Link>
            <Link to={`/products/search?q=huawei`}>
              <p>Huawei</p>
            </Link>
            <Link to={`/products/search?q=hp`}>
              <p>Hp</p>
            </Link>
          </Col>
          <Col>
            <h5>Categories</h5>
            {categoriesClassification.map((e) => {
              return (
                <Link to={`/products/category/${Object.keys(e)}`}>
                  <p key={Object.keys(e)} className="footer-categories">
                    {" "}
                    {Object.keys(e)}
                  </p>
                </Link>
              );
            })}
          </Col>
          <Col>
            <h5>Help</h5>
            <p>Frequent questions</p>
            <p>Terms and Conditions</p>
          </Col>
        </Row>
        <Row className="mt-4"></Row>
        <Row>
          <Col>
            <img src="../../../public/assets/logos/logo.png" alt=""></img>
          </Col>
          <Col className="d-flex flex-column justify-content-center align-items-center text-center terminos col-8 ">
            <div>Copyright © 2023 CompraLoca SMG S.A</div>
            <div>San Nicolas de los Arroyos,Buenos Aires,Argentina</div>
          </Col>
          <Col>
            <div className="terminos justify-content-center align-items-center text-center powered">
              Powered by sebaDor
            </div>
          </Col>
        </Row>
      </Container>
    </footer>
  );
};
