import React, { Component } from "react";
import Slider from "react-slick";
import { ProductCard } from "../ProductCard/ProductCard";
import "./styles.scss";
import { Link } from "react-router-dom";
import Arrowcomponent from "../arrowcomponent/Arrowcomponent";

export default function Carousel2({ data, categories }) {
  const windowWidth = window.innerWidth;
  let slideToShowDinamic = 1;

  if (windowWidth > 1950) {
    slideToShowDinamic = 5;
  } else if (windowWidth > 1550) {
    slideToShowDinamic = 4;
  } else if (windowWidth > 1180) {
    slideToShowDinamic = 3;
  } else if (windowWidth > 780) {
    slideToShowDinamic = 2;
  } else {
    slideToShowDinamic = 1;
  }

  const settings = {
    dots: false,
    infinite: true,
    speed: 500,
    slidesToShow: slideToShowDinamic,
    slidesToScroll: 1,
    nextArrow: <Arrowcomponent type="next" />,
    prevArrow: <Arrowcomponent type="prev" />,
  };

  return (
    <div>
      <h2 className="d-flex align-items-end categories-title">
        <Link
          className="text-dark textcategories-margin text-capitalize"
          to={`products/category/${categories}`}
        >
          {categories}
        </Link>
      </h2>
      <Slider {...settings}>
        {data.map((product) => {
          return <ProductCard key={product.id} product={product} />;
        })}
      </Slider>
    </div>
  );
}
