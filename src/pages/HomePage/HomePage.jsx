import React, { useEffect, useState } from "react";
import { Layout } from "../../components/Layout/Layout.jsx";
import "./styles.scss";
import categoriesClassification from "../../../categoriesClassification.json";
import HomeGallery from "../../components/HomeGallery/HomeGallery.jsx";
import Carousel2 from "../../components/Carousel2/Carousel2.jsx";

export function HomePage() {
  const [products, setProducts] = useState(null);

  const getProduct = async () => {
    const products = await fetch(`https://dummyjson.com/products?limit=100`);
    const data = await products.json();
    setProducts(data);
  };

  useEffect(() => {
    getProduct();
  }, []);

  const filterByCategories = (arrayOfFilters) => {
    const filteredProducts = [];
    products?.products?.map((e) => {
      if (arrayOfFilters.includes(e.category)) filteredProducts.push(e);
    });
    return filteredProducts;
  };

  return (
    <Layout>
      <section className="home-section mt-5">
        {categoriesClassification.map((e) => (
          <Carousel2
            categories={Object.keys(e)}
            data={filterByCategories(Object.values(e)[0])}
            key={Object.keys(e)}
          />
        ))}
        <HomeGallery />
      </section>
    </Layout>
  );
}
