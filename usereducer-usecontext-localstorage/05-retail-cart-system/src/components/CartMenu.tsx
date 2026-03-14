import { useContext } from "react";
import { Trash2, Plus, Minus, X, ShoppingCart } from "lucide-react";
import CartContext from "../hooks/CreateCart";
import { toast } from "sonner";

const CartMenu = () => {
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartMenu must be used inside CartProvider");
  }

  const { cart, dispatch } = cartContext;

  if (cart.length === 0) {
    return (
      <div className="min-h-screen bg-black text-white flex items-center justify-center">
        <p className="text-gray-400 text-lg flex gap-2">
          Your cart is empty
          <ShoppingCart size={18} className="mt-2" />
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="max-w-3xl mx-auto space-y-4">
        {cart.map((item) => (
          <div
            key={item.id}
            className="flex items-center justify-between bg-[#121A1D] rounded-xl p-4"
          >
            <div className="flex items-center gap-4">
              <img
                src={item.img}
                alt={item.name}
                className="w-20 h-20 rounded-lg object-cover"
              />

              <div>
                <h3 className="font-semibold text-lg mb-2">{item.name}</h3>
                <p className="text-gray-400 flex">
                  ₹{item.price} <X size={16} className="mt-1" /> {item.quantity}
                </p>
              </div>
            </div>

            <div className="flex items-center gap-3">
              <button
                onClick={() => dispatch({ type: "DECREASE", payload: item.id })}
                disabled={item.quantity === 1}
                className="p-2 border rounded-full hover:bg-gray-700 disabled:opacity-40 disabled:cursor-not-allowed"
              >
                <Minus size={16} />
              </button>

              <span className="min-w-[20px] text-center">{item.quantity}</span>

              <button
                onClick={() => dispatch({ type: "INCREASE", payload: item.id })}
                className="p-2 border rounded-full hover:bg-gray-700"
              >
                <Plus size={16} />
              </button>

              <button
                onClick={() => {
                  dispatch({ type: "REMOVE_FROM_CART", payload: item.id });
                  toast.success(`${item.name} removed from cart`);
                }}
                className="p-2 border border-red-500 text-red-500 rounded-full hover:bg-red-500 hover:text-white"
              >
                <Trash2 size={16} />
              </button>
            </div>
          </div>
        ))}
      </div>

      <div className="flex justify-center mt-12">
        <button
          onClick={() => {
            dispatch({ type: "CLEAR_CART" });
            toast.success("Clear all items");
          }}
          className="px-4 py-2 rounded-md bg-red-500 hover:bg-red-600 text-white font-semibold transition flex gap-1"
        >
          <Trash2 size={16} className="mt-1" /> Clear Cart
        </button>
      </div>
    </div>
  );
};

export default CartMenu;
