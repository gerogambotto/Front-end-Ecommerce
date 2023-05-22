import React from "react"
import { useNavigate } from "react-router-dom"
import "./styles.scss"

function HomeGallery() {
  const navigate = useNavigate()

  return (
    <div className="home-gallery">
      <a href="/products/category/fragrances" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/fragrances.jpg"
        />
        <p className="text-image-hover">Fragrances</p>
      </a>
      <a href="/products/category/furniture" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/furniture.jpg"
        />
        <p className="text-image-hover">Furniture</p>
      </a>

      <a href="/products/category/laptops" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/laptops.jpg"
        />

        <p className="text-image-hover">Laptops</p>
      </a>

      <a href="/products/category/lighting" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/lighting.jpg"
        />
        <p className="text-image-hover">Lighting</p>
      </a>

      <a href="/products/category/motorcycle" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/motorcycle.jpg"
        />
        <p className="text-image-hover">Motorcycle</p>
      </a>

      <a href="/products/category/mens-shirts" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/shirt-mens.jpg"
        />
        <p className="text-image-hover">Mens-Shirts</p>
      </a>
      <a href="/products/category/mens-shoes" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/shoes-mens.jpeg"
        />
        <p className="text-image-hover">Mens-Shoes</p>
      </a>
      <a href="/products/category/smartphones" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/smartphones.jpg"
        />
        <p className="text-image-hover">Smartphones</p>
      </a>
      <a href="/products/category/womens-bags" className="text-img-conteiner">
        <img
          className="image-home-gallery"
          src="../../../public/assets/images/womens-bags.jpg"
        />
        <p className="text-image-hover">Womens-bags</p>
      </a>
    </div>
  )
}

export default HomeGallery
