import Carousel from "../Carousel/carousel.jsx"
import { ProductCard } from "../ProductCard/ProductCard"
import "./styles.scss"

export const CarouselProducts = ({ categories, data }) => {
  return (
    <section className="carousel-section">
      <div className="container">
        <div className="ml-3 row">
          <a
            className="d-flex align-items-end categories-title"
            href={`products/category/${categories}`}
          >
            {categories}
          </a>
        </div>

        <div className="carousel-pre-container">
          <Carousel show={4} infiniteloop={true}>
            {data.map((product) => {
              return <ProductCard key={product.id} product={product} />
            })}
          </Carousel>
        </div>
      </div>
    </section>
  )
}
