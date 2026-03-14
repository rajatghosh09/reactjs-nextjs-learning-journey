import { useState } from "react";
import Data from "../../Data.json";
import MenuCard from "../components/MenuCard";
import CategoryList from "../components/CategoryList";

const MenuLists = () => {
  const [menuList] = useState(Data.menu);

  return (
    <div className="px-4 bg-[#0A1316] text-white">
      <div className="flex justify-center items-center flex-col">
        
        <span className="text-center text-4xl heading mt-20 font-semibold">
          Our Delicious Menu
        </span>

        <p className="text-center shortheading mt-10 mb-10 font-medium">
          Lorem ipsum dolor sit amet consectetur. Dolor elit vitae nunc varius.
        </p>

        <div className="mb-12">
          <CategoryList />
        </div>

        <div className="grid 2xl:grid-cols-3 xl:grid-cols-3 lg:grid-cols-3 md:grid-cols-3 sm:grid-cols-2 gap-6 lg:px-48">
          {menuList.map((item) => (
            <MenuCard key={item.id} item={item} />
          ))}
        </div>
      </div>
    </div>
  );
};

export default MenuLists;
