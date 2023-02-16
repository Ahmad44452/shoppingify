import "./styles.scss";
import bottleImg from "../../assets/source.svg";

const ShoppingList = () => {
  return (
    <div className="list">
      <div className="list__add">
        <img src={bottleImg} className="list__add--img" alt="bottle" />
        <div className="list__add--content">
          <p className="list__add--text">
            Didn't find what you
            <br />
            need?
          </p>
          <button className="list__add--button">Add Item</button>
        </div>
      </div>
      <div className="list__items"></div>
    </div>
  );
};

export default ShoppingList;
