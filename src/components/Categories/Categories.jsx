import "./styles.scss"
import {useState} from "react";

function Categories({category, border}) {

  const [showSubCategories, setShowSubCategories] = useState(false)

  return (
    <div className='categories-container'>
      <div>
        <div
          className='sub-categories'
          onMouseEnter={()=> {
            setShowSubCategories(true)
          }}
          onMouseLeave={()=> {
            setShowSubCategories(false)
          }}
        >
          <h3 className={border}>
            {Object.keys(category)}
          </h3>
        </div>
        <div className={`bottomBorder ${showSubCategories ? 'active' : 'inactive'}`}></div>
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
