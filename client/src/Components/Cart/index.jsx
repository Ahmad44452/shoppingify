import { useState, useEffect } from "react";
import { HiPencil } from "react-icons/hi";
import { useFormik } from "formik";
import { useDispatch, useSelector } from "react-redux";
import * as Yup from "yup";

import "./styles.scss";

import bottleImg from "../../assets/source.svg";

import { fetchPendingCart, saveCart } from "../../store/asyncThunks/cartThunk";
import { setCartName, setCartStatus } from "../../store/slices/cartSlice";
import CategoryItems from "./CategoryItems";
import emptyCartImg from "../../assets/womanWithEmptyTrolly.svg";

const Cart = () => {
  const dispatch = useDispatch();
  const cartData = useSelector((state) => state.cartSlice.cart);

  // set cart editing to true if cart does not exist already
  const [isCartEditing, setCartEditing] = useState(false);

  const formik = useFormik({
    initialValues: {
      cartName: (cartData && cartData.name) || "",
    },
    validationSchema: Yup.object({
      cartName: Yup.string().required("Username is required"),
    }),
    onSubmit: (values) => {
      dispatch(setCartName(values.cartName));
      dispatch(saveCart());
      setCartEditing(false);
    },
  });

  const cancelCart = (e) => {
    e.preventDefault();
    dispatch(setCartStatus("cancelled"));
    dispatch(saveCart());
  };

  const completeCart = (e) => {
    e.preventDefault();
    dispatch(setCartStatus("completed"));
    dispatch(saveCart());
  };

  // fetch cart data from backend if it does not already exists
  useEffect(() => {
    if (cartData === null) {
      dispatch(fetchPendingCart());
    }
  }, []);

  // if the fetched cart is not pending set editing to true
  useEffect(() => {
    if (cartData === "Empty") {
      setCartEditing(true);
    }
  }, [cartData]);

  // if user starts to edit the cart, set the value of input element to the previous cart name
  useEffect(() => {
    if (isCartEditing === true && cartData) {
      formik.setFieldValue("cartName", cartData.name || "");
    }
  }, [isCartEditing]);

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
          cartData &&
          (cartData === "Empty" || cartData.categories.length === 0) ? (
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
      <div className="cart__bottom">
        <div className="cart__bottom--container">
          {
            // if cart is being edited show an input field with a save button
            // other wise two buttons for completing and canceling the cart
            isCartEditing ? (
              <form onSubmit={formik.handleSubmit}>
                <div
                  className={`cart__save ${
                    cartData &&
                    (cartData === "Empty" || cartData.categories.length === 0)
                      ? "cart__save--disabled"
                      : ""
                  }`}
                >
                  <input
                    className="cart__save--input"
                    placeholder="Enter a name"
                    type="text"
                    name="cartName"
                    // onChange={formik.handleChange}
                    {...formik.getFieldProps("cartName")}
                  />
                  <button className="cart__save--button" type="submit">
                    Save
                  </button>
                </div>
              </form>
            ) : (
              <div className="cart__options">
                <button
                  className="cart__options--button cart__options--cancel"
                  onClick={cancelCart}
                >
                  cancel
                </button>
                <button
                  className="cart__options--button cart__options--complete"
                  onClick={completeCart}
                >
                  Complete
                </button>
              </div>
            )
          }
        </div>
      </div>
    </div>
  );
};

export default Cart;
