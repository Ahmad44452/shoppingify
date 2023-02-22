import "./styles.scss";
import bottleImg from "../../assets/source.svg";
import { HiPencil } from "react-icons/hi";

import CategoryItems from "./CategoryItems";

const Cart = () => {
  const shoppingListItems = [
    {
      category: "Fruit and vegetables",
      items: [
        { name: "Acocado", amount: 1 },
        { name: "Pre-cooked corn 450g", amount: 1 },
      ],
    },
    {
      category: "Meat and Fish",
      items: [
        { name: "Chicken 1kg", amount: 1 },
        { name: "Pork fillets 450g", amount: 1 },
        { name: "Salmon 1kg", amount: 1 },
      ],
    },
  ];

  return (
    <div className="cart">
      <div className="cart__add">
        <img src={bottleImg} className="cart__add--img" alt="bottle" />
        <div className="cart__add--content">
          <p className="cart__add--text">
            Didn't find what you
            <br />
            need?
          </p>
          <button className="cart__add--button">Add Item</button>
        </div>
      </div>
      <div className="cart__list">
        <div className="cart__list--header">
          <h2>Shopping List</h2>
          <div>
            <HiPencil />
          </div>
        </div>

        <div className="cart__list--items">
          {shoppingListItems.map((categoryObj) => (
            <CategoryItems categoryObj={categoryObj} />
          ))}
        </div>
      </div>
      <div className="cart__search">
        <div className="cart__search--container">
          <input
            className="cart__search--input"
            placeholder="Enter a name"
            type="text"
          />
          <button className="cart__search--button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
