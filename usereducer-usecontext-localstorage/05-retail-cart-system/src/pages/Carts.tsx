import { useContext } from "react";
import CartContext from "../hooks/CreateCart";
import CartMenu from "../components/CartMenu";
import { totalItem, totalPrice } from "../hooks/CartReducer";
import { toast } from "sonner";

const Carts = () => {
  const cartContext = useContext(CartContext);
  if (!cartContext) {
    throw new Error("Carts must be used inside CartProvider");
  }

  const { cart } = cartContext;

  return (
    <div className="min-h-screen bg-black text-white px-4 py-10">
      <div className="max-w-5xl mx-auto grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="md:col-span-2">
          <CartMenu />
        </div>

        {cart.length > 0 && (
          <div className="bg-[#121A1D] rounded-xl p-6 h-fit">
            <h3 className="text-xl font-semibold mb-4">Order Summary</h3>

            <div className="flex justify-between mb-2 text-gray-300">
              <span>Total Items</span>
              <span>{totalItem(cart)}</span>
            </div>

            <div className="flex justify-between mb-4 text-gray-300">
              <span>Total Price</span>
              <span>₹{totalPrice(cart)}</span>
            </div>
            
            <button className="w-full bg-yellow-500 hover:bg-yellow-400 transition py-2 rounded-md text-black font-semibold"
              onClick={() => toast.warning("Checkout is under maintenance")
               
              }
            >
              Checkout
            </button>
          </div>
        )}
      </div>
    </div>
  );
};

export default Carts;
