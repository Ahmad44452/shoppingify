import "./styles.scss";

import MenuCategory from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchAllCategoriesWithItems } from "../../../store/asyncThunks/categoriesThunk";

const Menu = () => {
  const dispatch = useDispatch();
  const allCategoriesWithItems = useSelector(
    (state) => state.categoriesSlice.allCategoriesWithItems
  );

  useEffect(() => {
    if (allCategoriesWithItems === null) {
      dispatch(fetchAllCategoriesWithItems());
    }
  }, []);

  return (
    <div className="menu__container">
      {allCategoriesWithItems &&
        allCategoriesWithItems.map((category) => (
          <MenuCategory key={category._id} category={category} />
        ))}
    </div>
  );
};

export default Menu;
