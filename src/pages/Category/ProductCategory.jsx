import { useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout";
import "./styles.scss";
import axios from "axios";
import { Col, Container, Row } from "react-bootstrap";
import Filters from "./Filters";
import { ProductCard } from "../../components/ProductCard/ProductCard.jsx";
const ProductsCategory = () => {
  const { category } = useParams();
  const [products, setProducts] = useState();
  const [filteredProducts, setFilteredProducts] = useState(null);
  const [maxPrice, setMaxPrice] = useState("0");
  const [filters, setFilters] = useState({ maxPrice: 0 });

  const getProducts = async () => {
    let categoryUrls = {
      electronics: ["smartphones", "laptops", "tablets"],
      fashion: [
        "womens-dresses",
        "mens-shirts",
        "mens-shoes",
        "mens-watches",
        "womens-watches",
        "womens-bags",
      ],
      vehicles: ["automotive", "motorcycle"],
      house: ["home-decoration", "furniture", "lighting"],
      beauty: ["fragrances", "skincare"],
    };

    if (category in categoryUrls) {
      const categoryRequests = categoryUrls[category].map((subCategory) =>
        axios.get(`https://dummyjson.com/products/category/${subCategory}`)
      );

      const responses = await Promise.all(categoryRequests);

      const categoryProducts = responses.flatMap((res) => res.data.products);

      setProducts(categoryProducts);
      getMaxPrice(categoryProducts);
    }
  };

  const getFilterProducts = (products) => {
    const res = products?.filter(
      (product) => product.price <= filters.maxPrice
    );
    setFilteredProducts(res);
  };

  const getMaxPrice = (products) => {
    const prices = products.map((product) => product.price);
    setMaxPrice(Math.max(...prices).toString());
  };

  useEffect(() => {
    getFilterProducts(products);
  }, [filters]);

  useEffect(() => {
    getProducts();
  }, [category]);

  useEffect(() => {
    setFilters({ maxPrice: maxPrice });
  }, [maxPrice]);

  return (
    <Layout>
      <div className="container container-category ">
        <div className="row m-auto">
          <div className="col-lg-3 col-md-3">
            <Filters
              setFilters={setFilters}
              filters={filters}
              maxPrice={maxPrice}
            />
          </div>
          <div className="col lg-9 col-md-9">
            <div className="row">
              {filteredProducts
                ? filteredProducts.map((product) => (
                    <div className="col-lg-4 col-md-4 mb-4" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))
                : products?.map((product) => (
                    <div className="col-lg-4 col-md-4" key={product.id}>
                      <ProductCard product={product} />
                    </div>
                  ))}
            </div>
          </div>
        </div>
      </div>
    </Layout>
  );
};

export default ProductsCategory;
