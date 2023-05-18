import { useEffect, useState } from "react"
import add from "./add.svg"
import minus from "./dash.svg"
import "./styles.scss"

const ItemCount = ({ initial = 0, stock, onAdd }) => {
  const [count, setCount] = useState(0)

  useEffect(() => {
    setCount(initial)
  }, [])

  const increment = () => {
    if (count < stock) {
      setCount(count + 1)
    }
  }

  const decrement = () => {
    if (count > initial) {
      setCount(count - 1)
    }
  }

  return (
    <div>
      <button onClick={increment} className="add mr-">
        <img src={add} />
      </button>
      {count}
      <button className="border-0 ml-2 " onClick={decrement}>
        <img className="minus" src={minus} />
      </button>

      {/*   {stock && count ? (
        <button
          variant="contained"
          color="primary"
          onClick={() => onAdd(count)}
        >
          Add to Cart
        </button>
      ) : (
        <button  variant="contained" disabled>
          Add to Cart
        </button>
      )}  */}
    </div>
  )
}

export default ItemCount
