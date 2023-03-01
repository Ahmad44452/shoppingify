import SingleItem from "./SingleItem";

const CategoryItems = ({ category }) => {
  return (
    <div className="itemset">
      <h2 className="itemset__heading">{category.name}</h2>
      {category.items.map((item) => (
        <SingleItem key={item._id} item={item} />
      ))}
    </div>
  );
};

export default CategoryItems;
