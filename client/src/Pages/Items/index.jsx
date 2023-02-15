import Menu from "./Menu";
import ShoppingList from "./ShoppingList";

import "./styles.scss";

const Items = () => {
  return (
    <div className="items__container">
      <Menu />
      <ShoppingList />
    </div>
  );
};

export default Items;
