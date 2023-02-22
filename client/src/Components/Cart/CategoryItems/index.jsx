import SingleItem from "./SingleItem";

const CategoryItems = ({ categoryObj }) => {
  return (
    <div className="itemset">
      <h2 className="itemset__heading">{categoryObj.category}</h2>
      {categoryObj.items.map((item) => (
        <SingleItem item={item} />
      ))}
    </div>
  );
};

export default CategoryItems;
