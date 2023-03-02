import SingleItem from "./SingleItem";

const CategoryItems = ({ category, isCartEditing }) => {
  return (
    <div className="itemset">
      <h2 className="itemset__heading">{category.name}</h2>
      {category.items.map((item) => (
        <SingleItem
          key={item._id}
          item={item}
          isCartEditing={isCartEditing}
          category={{ _id: category._id, name: category.name }}
        />
      ))}
    </div>
  );
};

export default CategoryItems;
