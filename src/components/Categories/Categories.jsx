import "./styles.scss"
import {useState} from "react";

function Categories({category}) {
  const [showSubCategories, setShowSubCategories] = useState(false)

  return (
    <div className='categories-container'>
      <div
        className='sub-categories'
        onMouseEnter={()=>setShowSubCategories(true)}
        onMouseLeave={()=>setShowSubCategories(false)}
      >
        <h3>
          {Object.keys(category)}
        </h3>
      </div>
      {
        showSubCategories &&
        <div
          className='sub-categories-modal'
            onMouseEnter={()=>setShowSubCategories(true)}
            onMouseLeave={()=>setShowSubCategories(false)}
        >
          {Object.values(category)[0].map(e => <a className='sub-categories' href={`/products/category/${e}`} >
          {e}</a>)}
        </div>
      }
    </div>

  )
}
export default Categories
