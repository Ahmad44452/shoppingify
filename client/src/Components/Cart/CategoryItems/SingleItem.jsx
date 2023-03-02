import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";
import { useEffect } from "react";
import { useDispatch } from "react-redux";
import {
  modifyAmountOrAddToCart,
  deleteItemFromCart,
} from "../../../store/slices/cartSlice";

const SingleItem = ({ item, isCartEditing, category }) => {
  const [isAmountChanging, setAmountChanging] = useState(false);
  const [isCompleted, setCompleted] = useState(false);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isCartEditing && isAmountChanging) {
      setAmountChanging(false);
    }
  }, [isCartEditing]);

  return (
    <div className="itemset__item">
      <div className="itemset__item--left">
        {
          /* if cart is being editied do not show the check boxes */
          isCartEditing ? null : (
            <div
              className="itemset__item--checkbox"
              onClick={() => setCompleted((prev) => !prev)}
            >
              {
                /* if an item has been checked fill the checkbox */
                isCompleted ? (
                  <span className="itemset__item--checkbox-active">&nbsp;</span>
                ) : null
              }
            </div>
          )
        }

        {/* if item has been checked, add relevant class */}
        <span
          className={`itemset__item--name ${
            isCompleted ? "itemset__item--name-completed" : ""
          }`}
        >
          {item.name}
        </span>
      </div>

      <div className="itemset__item--right">
        {
          /** if amount is not changing or cart is not being edited then just show amount without additional controls */
          !isAmountChanging || !isCartEditing ? (
            /** if cart is not being edited, then add relevant class to remove hover effect*/
            <button
              className={`itemset__item--amount ${
                !isCartEditing ? "itemset__item--amount-notEditable" : null
              }`}
              onClick={() => {
                if (isCartEditing) setAmountChanging(true);
              }}
            >
              {`${item.amount} pcs`}
            </button>
          ) : (
            /** if amount of items is changing show additional controls  */
            /** such as increment,decrement,delete */
            <div className="itemset__item--edit">
              <span
                className="itemset__item--edit-delete"
                onClick={() => dispatch(deleteItemFromCart({ item, category }))}
              >
                <MdDeleteOutline />
              </span>
              <span
                className="itemset__item--edit-symbol"
                onClick={() =>
                  dispatch(
                    modifyAmountOrAddToCart({ item, category, toSub: true })
                  )
                }
              >
                <AiOutlineMinus />
              </span>
              <button
                className={`itemset__item--edit-amount`}
                onClick={() => setAmountChanging(false)}
              >
                {`${item.amount} pcs`}
              </button>
              <span
                className="itemset__item--edit-symbol"
                onClick={() =>
                  dispatch(modifyAmountOrAddToCart({ item, category }))
                }
              >
                <AiOutlinePlus />
              </span>
            </div>
          )
        }
      </div>
    </div>
  );
};

export default SingleItem;
