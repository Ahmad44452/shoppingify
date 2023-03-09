import "./styles.scss";

import { GrSearch } from "react-icons/gr";

const HeaderBar = ({ setMenuSearchText }) => {
  return (
    <div className="headerbar">
      <h1 className="headerbar__heading">
        <span>Shoppingify</span> allows you take your shopping list wherever you
        go
      </h1>
      <div className="headerbar__search">
        <GrSearch />
        <input
          type="text"
          placeholder="search item"
          onChange={(e) => setMenuSearchText(e.currentTarget.value)}
        />
      </div>
    </div>
  );
};

export default HeaderBar;
