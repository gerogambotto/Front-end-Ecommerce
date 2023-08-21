import "./styles.scss";
import { useState } from "react";

function Categories({ category, border }) {
  const [showSubCategories, setShowSubCategories] = useState(false);

  return (
    <div className="categories-container">
      <div>
        <div
          className="sub-categories"
          onClick={() => setShowSubCategories(!showSubCategories)}
          onMouseEnter={() => {
            setShowSubCategories(true);
          }}
          onMouseLeave={() => {
            setShowSubCategories(false);
          }}
        >
          <h3 className={border}>{Object.keys(category)}</h3>
        </div>
        <div
          onMouseEnter={() => {
            setShowSubCategories(true);
          }}
          onMouseLeave={() => {
            setShowSubCategories(false);
          }}
          className={`bottomBorder ${
            showSubCategories ? "active" : "inactive"
          }`}
        ></div>
      </div>
      {showSubCategories && (
        <div
          className="sub-categories-modal"
          onMouseEnter={() => setShowSubCategories(true)}
          onMouseLeave={() => setShowSubCategories(false)}
        >
          {Object.values(category)[0].map((e) => (
            <a
              className="sub-categories borderbot"
              href={`/products/category/${e}`}
            >
              <span className="sub-categories-title">{e}</span>
            </a>
          ))}
        </div>
      )}
    </div>
  );
}
export default Categories;
