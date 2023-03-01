import MenuItem from "./item";
import "./styles.scss";

const MenuCategory = ({ category }) => {
  return (
    <div className="menuCategory">
      <h1 className="menuCategory__name">{category.name}</h1>
      <div className="menuCategory__items">
        {category.items &&
          category.items.map((item) => <MenuItem key={item._id} item={item} />)}
      </div>
    </div>
  );
};

export default MenuCategory;
