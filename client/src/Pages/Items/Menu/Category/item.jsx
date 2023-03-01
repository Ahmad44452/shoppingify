import { AiOutlinePlus } from "react-icons/ai";

const MenuItem = ({ item }) => {
  return (
    <div className="menuCategory__item">
      <h3 className="menuCategory__item--name">{item.name}</h3>
      <button className="menuCategory__item--add">
        <AiOutlinePlus />
      </button>
    </div>
  );
};

export default MenuItem;
