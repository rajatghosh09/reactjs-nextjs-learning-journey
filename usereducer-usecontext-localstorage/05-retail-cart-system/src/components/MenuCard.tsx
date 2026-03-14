import { ShoppingBasket } from "lucide-react";
import type { Menu } from "../Typescript/interface";
import StarRating from "./StarRating";
import { useContext } from "react";
import CartContext from "../hooks/CreateCart";
import { toast } from "sonner";

interface MenuCardProps {
  item: Menu;
}

const MenuCard = ({ item }: MenuCardProps) => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("MenuCard must be used inside CartProvider");
  }

  const { dispatch } = cartContext;

  const handleAddToCart = () => {
    dispatch({
      type: "ADD_TO_CART",
      payload: {
        id: item.id,
        name: item.name,
        price: item.price,
        img: item.img,
        quantity: 1,
      },
    });
    toast.success("Item added to cart")
  };



  return (
    <div className="bg-[#121A1D] rounded-2xl p-4 transform transition duration-300 hover:scale-105 cursor-pointer">
      <div className="flex justify-center mb-3">
        <img src={item.img} alt={item.name} />
      </div>

      {item.rating && <StarRating rating={item.rating} />}

      <h3 className="font-semibold text-2xl py-3 dishname">
        {item.name}
      </h3>

      <p className="details">{item.description}</p>

      <div className="flex justify-between items-center mt-5">
        <span className="text-xl dishprice"> RS {item.price}</span>

        <button className="border rounded-full p-2 icon-broder" onClick={handleAddToCart}>
          <ShoppingBasket color="#ffffff" />
        </button>
      </div>
    </div>
  );
};

export default MenuCard;