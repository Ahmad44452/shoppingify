import "./styles.scss";

import MenuCategory from "./Category";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";

import { fetchAllCategoriesWithItems } from "../../../store/asyncThunks/categoriesThunk";
import { useState } from "react";

const Menu = ({ menuSearchText }) => {
  const dispatch = useDispatch();
  const allCategoriesWithItems = useSelector(
    (state) => state.categoriesSlice.allCategoriesWithItems
  );

  const [allCategoriesWithItemsFiltered, setAllCategoriesWithItemsFiltered] =
    useState([]);

  useEffect(() => {
    if (allCategoriesWithItems === null) {
      dispatch(fetchAllCategoriesWithItems());
    }
  }, []);

  // search performing logic
  useEffect(() => {
    if (menuSearchText !== "" && allCategoriesWithItems) {
      const filteredArray = [];
      allCategoriesWithItems.forEach((category) => {
        const categoryObj = { ...category };
        categoryObj.items = [];

        category.items.forEach((item) => {
          if (item.name.toLowerCase().includes(menuSearchText.toLowerCase())) {
            categoryObj.items.push(item);
          }
        });

        if (categoryObj.items.length > 0) {
          filteredArray.push(categoryObj);
        }
      });

      setAllCategoriesWithItemsFiltered(filteredArray);
    }
  }, [menuSearchText]);

  return (
    <div className="menu__container">
      {menuSearchText === ""
        ? allCategoriesWithItems &&
          allCategoriesWithItems.map((category) => (
            <MenuCategory key={category._id} category={category} />
          ))
        : allCategoriesWithItemsFiltered.map((category) => (
            <MenuCategory key={category._id} category={category} />
          ))}
    </div>
  );
};

export default Menu;
