import "./styles.scss";
import { useEffect } from "react";
import bottleImg from "../../assets/source.svg";
import { HiPencil } from "react-icons/hi";
import { useDispatch, useSelector } from "react-redux";
import { fetchPendingCart } from "../../store/asyncThunks/cartThunk";
import CategoryItems from "./CategoryItems";
import { useState } from "react";
import emptyCartImg from "../../assets/womanWithEmptyTrolly.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartSlice.cart);

  // set cart editing to true if cart does not exist already
  const [isCartEditing, setCartEditing] = useState(false);

  // fetch cart data from backend if it does not already exists
  useEffect(() => {
    if (cartData === null) {
      dispatch(fetchPendingCart());
    }
  }, []);

  useEffect(() => {
    if (cartData === "Empty") {
      setCartEditing(true);
    }
  }, [cartData]);

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
        {
          /*Show no items state if cart is empty*/
          cartData && cartData === "Empty" ? (
            <>
              <h1 className="cart__list--empty-text">No Items</h1>
              <img className="cart__list--empty-img" src={emptyCartImg} />
            </>
          ) : (
            /* display cart if cart exists */
            cartData && (
              <>
                <div className="cart__list--header">
                  <h2>{cartData.name || "Shopping List"}</h2>

                  {
                    /* Show editing icon if cart has a name and is not in edit mode currently */
                    cartData.name && !isCartEditing && (
                      <div onClick={() => setCartEditing(true)}>
                        <HiPencil />
                      </div>
                    )
                  }
                </div>

                <div className="cart__list--items">
                  {
                    /* if cart data is available, loop through it and render it to front end */
                    cartData &&
                      cartData.categories.map((category) => (
                        <CategoryItems
                          key={category._id}
                          category={category}
                          isCartEditing={isCartEditing}
                        />
                      ))
                  }
                </div>
              </>
            )
          )
        }
      </div>
      <div className="cart__search">
        <div className="cart__search--container">
          <input
            className="cart__search--input"
            placeholder="Enter a name"
            type="text"
            disabled={!isCartEditing}
          />
          <button className="cart__search--button">Save</button>
        </div>
      </div>
    </div>
  );
};

export default Cart;
