
const categoryList = [
  { label: "Indian", value: "indian" },
  { label: "Mexican", value: "Mexican" },
  { label: "Italian", value: "Italian" },
  { label: "Chinese", value: "Chinese" },
  { label: "Bengali", value: "Bengali" },
  { label: "Arabian", value: "Arabian" },
  { label: "Japanese", value: "Japanese" },
];

const CategoryList = () => {
  return (
    <>
     {categoryList?.map((category) => (
       <button className="text-white p-3 mr-3 border border-white rounded-md hover:bg-white hover:text-black"
         key={category.value} onClick={() => console.log("category value", category.value)}>
         {category.label}
       </button>
     ))}

    </>
  );
};

export default CategoryList;
