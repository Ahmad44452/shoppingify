import { NavLink } from "react-router-dom";
import logo from "../../assets/logo.svg";
import { AiOutlineShoppingCart, AiOutlineUnorderedList } from "react-icons/ai";
import { BsArrowCounterclockwise } from "react-icons/bs";
import { BiBarChartSquare } from "react-icons/bi";
import "./styles.scss";
import ToolTip from "../ToolTip/ToolTip";

const Navbar = () => {
  return (
    <nav className="navbar">
      <div className="navbar__logo">
        <img src={logo} alt="Logo" />
      </div>
      <div className="navbar__links">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive
              ? "navbar__link navbar__link--items navbar__link--active"
              : "navbar__link navbar__link--items"
          }
          replace={true}
        >
          <AiOutlineUnorderedList />
          <ToolTip content="Items" />
        </NavLink>

        <NavLink
          to="/history"
          className={({ isActive }) =>
            isActive
              ? "navbar__link navbar__link--history navbar__link--active"
              : "navbar__link navbar__link--history"
          }
          replace={true}
        >
          <BsArrowCounterclockwise />
          <ToolTip content="History" />
        </NavLink>

        <NavLink
          to="/statistics"
          className={({ isActive }) =>
            isActive
              ? "navbar__link navbar__link--statistics navbar__link--active"
              : "navbar__link navbar__link--statistics"
          }
          replace={true}
        >
          <BiBarChartSquare />
          <ToolTip content="Statistics" />
        </NavLink>
      </div>
      <div className="navbar__cart">
        <AiOutlineShoppingCart />
        <p className="navbar__cart--count">3</p>
      </div>
    </nav>
  );
};

export default Navbar;
