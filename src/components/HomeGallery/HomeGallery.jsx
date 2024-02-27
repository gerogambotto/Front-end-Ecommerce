import React from "react";
import { Link } from "react-router-dom";
import "./styles.scss";

function HomeGallery() {
  const categories = [
    { name: "fragrances", image: "fragrances.jpg" },
    { name: "furniture", image: "furniture.jpg" },
    { name: "laptops", image: "laptops.jpg" },
    { name: "lighting", image: "lighting.jpg" },
    { name: "motorcycle", image: "motorcycle.jpg" },
    { name: "mens-shirts", image: "shirt-mens.jpg" },
    { name: "mens-shoes", image: "shoes-mens.jpeg" },
    { name: "smartphones", image: "smartphones.jpg" },
    { name: "womens-bags", image: "womens-bags.jpg" },
  ];

  return (
    <div className="home-gallery">
      {categories.map((category, index) => (
        <Link
          key={index}
          to={`/products/category/${category.name}`}
          className="text-img-conteiner"
        >
          <img
            className="image-home-gallery"
            src={`../../../public/assets/images/${category.image}`}
            alt={category.name}
          />
          <p className="text-image-hover">{category.name.replace(/-/g, " ")}</p>
        </Link>
      ))}
    </div>
  );
}

export default HomeGallery;
