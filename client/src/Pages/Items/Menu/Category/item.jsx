import { AiOutlinePlus } from "react-icons/ai";
import { modifyAmountOrAddToCart } from "../../../../store/slices/cartSlice";
import { useDispatch, useSelector } from "react-redux";

const MenuItem = ({ item, category }) => {
  const dispatch = useDispatch();
  const itemsInCart = useSelector((state) => state.cartSlice.addedItemIds);

  return (
    <div className="menuCategory__item">
      <h3 className="menuCategory__item--name">{item.name}</h3>
      <button
        className={`menuCategory__item--add ${
          itemsInCart.includes(item._id) ? "menuCategory__item--added" : null
        }`}
        onClick={() => dispatch(modifyAmountOrAddToCart({ item, category }))}
      >
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default MenuItem;
