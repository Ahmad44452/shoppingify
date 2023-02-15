import "./styles.scss";

import { GrSearch } from "react-icons/gr";

const HeaderBar = () => {
  return (
    <div className="headerbar">
      <h1 className="headerbar__heading">
        <span>Shoppingify</span> allows you take your shopping list wherever you
        go
      </h1>
      <div className="headerbar__search">
        <GrSearch />
        <input type="text" placeholder="search item" />
      </div>
    </div>
  );
};

export default HeaderBar;
