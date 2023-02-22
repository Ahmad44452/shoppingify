import { useState } from "react";
import { MdDeleteOutline } from "react-icons/md";
import { AiOutlineMinus, AiOutlinePlus } from "react-icons/ai";

const SingleItem = ({ item }) => {
  const [isAmountChanging, setAmountChanging] = useState(false);
  const [isCompleted, setCompleted] = useState(false);

  return (
    <div className="itemset__item">
      <div className="itemset__item--left">
        <div
          className="itemset__item--checkbox"
          onClick={() => setCompleted((prev) => !prev)}
        >
          {isCompleted ? (
            <span className="itemset__item--checkbox-active">&nbsp;</span>
          ) : null}
        </div>
        <span
          className={`itemset__item--name ${
            isCompleted ? "itemset__item--name-completed" : ""
          }`}
        >
          {item.name}
        </span>
      </div>

      <div className="itemset__item--right">
        {!isAmountChanging ? (
          <button
            className="itemset__item--amount"
            onClick={() => setAmountChanging(true)}
          >
            {`${item.amount} pcs`}
          </button>
        ) : (
          <div className="itemset__item--edit">
            <span className="itemset__item--edit-delete">
              <MdDeleteOutline />
            </span>
            <span className="itemset__item--edit-symbol">
              <AiOutlineMinus />
            </span>
            <button
              className="itemset__item--edit-amount"
              onClick={() => setAmountChanging(false)}
            >
              {`${item.amount} pcs`}
            </button>
            <span className="itemset__item--edit-symbol">
              <AiOutlinePlus />
            </span>
          </div>
        )}
      </div>
    </div>
  );
};

export default SingleItem;
