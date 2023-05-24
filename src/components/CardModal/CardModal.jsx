import "./styles.scss"
const CardModal = ({cart}) => {
  
  return (
    <div className="cart-card">
      <a style={{ color: "#fff" }} className="" href={`/product/${cart.id}`}>
        <div className="cart-img">
          <img
            className="cart-img"
            src={cart.thumbnail}
            alt={cart.title}
          />
        </div>
      </a>
      <div className="d-flex justify-content-center align-items-center">
        <p className="title-cart">{cart.title}</p>
        <p className="price-cart">$ {cart.price}</p>
        <p>Item Count</p>
        <p>X</p>
      </div>
    </div>
  )
}

export default CardModal
