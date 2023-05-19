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
      <div >
        <p className="title-cart">{cart.title}</p>
        <p className="price-cart">$ {cart.price}</p>
        <p>Item Count</p>
        <p>Delete</p>
      </div>
    </div>
  )
}

export default CardModal
