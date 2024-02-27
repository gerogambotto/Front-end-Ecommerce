import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import "./styles.scss";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Filters from "../Category/Filters";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
const ProductsPage = () => {
  const { category } = useParams();

  const [products, setProducts] = useState();

  const getProductsBySearch = async () => {
    const res = await axios(
      `https://dummyjson.com/products/search${window.location.search}`
    );
    setProducts(res.data.products);
    getMaxPrice(res.data.products);
  };

  const getProducts = async () => {
    const res = await axios(
      `https://dummyjson.com/products/category/${category}`
    );
    setProducts(res.data.products);
    getMaxPrice(res.data.products);
  };

  const [filteredProducts, setFilteredProducts] = useState(null);
  const getFilterProducts = (products) => {
    const res = products?.filter(
      (product) => product.price <= filters.maxPrice
    );
    setFilteredProducts(res);
  };

  const [maxPrice, setMaxPrice] = useState("0");
  const getMaxPrice = (products) => {
    const prices = products.map((product) => product.price);
    setMaxPrice(Math.max(...prices).toString());
  };

  const [filters, setFilters] = useState({ maxPrice: 0 });

  useEffect(() => {
    getFilterProducts(products);
  }, [filters]);

  useEffect(() => {
    if (false) getProducts();
    else if (window.location.search) {
      getProductsBySearch();
    }
  }, []);

  useEffect(() => {
    getProductsBySearch();
  }, [window.location.search]);

  useEffect(() => {
    setFilters({ maxPrice: maxPrice });
  }, [maxPrice]);

  return (
    <Layout>
      <Container className="container-category ">
        <Row className="row m-auto">
          <Col lg={3}>
            <Filters
              setFilters={setFilters}
              filters={filters}
              maxPrice={maxPrice}
            />
          </Col>
          <Col lg={9}>
            <div className="row">
              {filteredProducts
                ? filteredProducts.map((product) => (
                    <div className="col-4 mb-4">
                      <ProductCard key={product.id} product={product} />
                    </div>
                  ))
                : products?.map((product) => (
                    <div className="col-4">
                      <ProductCard key={product.id} product={product} />
                    </div>
                  ))}
            </div>
          </Col>
        </Row>
      </Container>
    </Layout>
  );
};

export default ProductsPage;
