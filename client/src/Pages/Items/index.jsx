import Menu from "./Menu";
import HeaderBar from "./HeaderBar";
import "./styles.scss";

const Items = () => {
  return (
    <div className="items__container">
      <HeaderBar />
      <Menu />
    </div>
  );
};

export default Items;
