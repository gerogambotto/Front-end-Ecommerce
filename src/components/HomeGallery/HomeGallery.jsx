import React from "react";
import { useNavigate } from "react-router-dom";
import "./styles.scss";

function HomeGallery() {
  const navigate = useNavigate();

  return (
    <div className="home-gallery">
      <div
        onClick={() => navigate("/products/category/fragrances")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/fragrances.jpg"
        />
        <p className="text-image-hover">Fragrances</p>
      </div>
      <div
        onClick={() => navigate("/products/category/furniture")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/furniture.jpg"
        />
        <p className="text-image-hover">Furniture</p>
      </div>

      <div
        onClick={() => navigate("/products/category/laptops")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/laptops.jpg"
        />

        <p className="text-image-hover">Laptops</p>
      </div>

      <div
        onClick={() => navigate("/products/category/lighting")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/lighting.jpg"
        />
        <p className="text-image-hover">Lighting</p>
      </div>

      <div
        onClick={() => navigate("/products/category/motorcycle")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/motorcycle.jpg"
        />
        <p className="text-image-hover">Motorcycle</p>
      </div>

      <div
        onClick={() => navigate("/products/category/mens-shirts")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/shirt-mens.jpg"
        />
        <p className="text-image-hover">Mens-Shirts</p>
      </div>
      <div
        onClick={() => navigate("/products/category/mens-shoes")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/shoes-mens.jpeg"
        />
        <p className="text-image-hover">Mens-Shoes</p>
      </div>
      <div
        onClick={() => navigate("/products/category/smartphones")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/smartphones.jpg"
        />
        <p className="text-image-hover">Smartphones</p>
      </div>
      <div
        onClick={() => navigate("/products/category/womens-bags")}
        className="text-img-conteiner"
      >
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/womens-bags.jpg"
        />
        <p className="text-image-hover">Womens-bags</p>
      </div>
    </div>
  );
}

export default HomeGallery;
