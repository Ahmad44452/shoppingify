import Menu from "./Menu";
import HeaderBar from "./HeaderBar";
import "./styles.scss";
import { useState } from "react";

const Items = () => {
  const [menuSearchText, setMenuSearchText] = useState("");

  return (
    <div className="items__container">
      <HeaderBar setMenuSearchText={setMenuSearchText} />
      <Menu menuSearchText={menuSearchText} />
    </div>
  );
};

export default Items;
