import "./styles.scss";
const Arrowcomponent = (props) => {
  const { className, style, onClick, type } = props;
  return (
    <div
      className={`${className} arrownext ${type}`}
      style={{ ...style, display: "block", background: "white" }}
      onClick={onClick}
    >
      <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24">
        <path
          d="m14.707 11.293-4-4A1 1 0 0 0 9 8v8a1 1 0 0 0 1.707.707l4-4a1 1 0 0 0 0-1.414z"
          style={{ fill: "#e86412" }}
          data-name="Right"
        />
      </svg>
    </div>
  );
};

export default Arrowcomponent;
