import "./styles.scss";
import { useEffect } from "react";
import bottleImg from "../../assets/source.svg";
import { HiPencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingCart } from "../../store/asyncThunks/cartThunk";
import CategoryItems from "./CategoryItems";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartSlice.cart);

  useEffect(() => {
    if (cartData === null) {
      dispatch(fetchPendingCart());
    }
  }, []);

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
          {cartData &&
            cartData.categories.map((category) => (
              <CategoryItems key={category._id} category={category} />
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
