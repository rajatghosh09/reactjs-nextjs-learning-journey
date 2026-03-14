import { ShoppingBasket } from "lucide-react";
import { NavLink } from "react-router-dom";
import logo from "../assets/Logo.png";
import { useContext } from "react";
import CartContext from "../hooks/CreateCart";

const HeaderNav = () => {
  // const {cart} =useContext(CartContext)
  const cartContext = useContext(CartContext);

  if (!cartContext) {
    throw new Error("CartMenu must be used inside CartProvider");
  }

  const { cart } = cartContext;

  return (
    <header className="sticky top-0 z-50 bg-[#121A1D] backdrop-blur-md border-b border-white/10">
      <div className="max-w-6xl mx-auto flex items-center justify-between px-4 py-4">
        <img src={logo} alt="Logo" className="h-10" />

        <ul className="flex gap-8 text-white font-medium">
          <li>
            <NavLink
              to="/"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400"
                  : "hover:text-yellow-400 transition"
              }
            >
              Home
            </NavLink>
          </li>

          <li>
            <NavLink
              to="/cart"
              className={({ isActive }) =>
                isActive
                  ? "text-yellow-400"
                  : "hover:text-yellow-400 transition"
              }
            >
              Cart
            </NavLink>
          </li>
        </ul>

        <div className="flex items-center gap-7 text-white">
          <NavLink to="/cart" className="relative">
            <ShoppingBasket className="cursor-pointer hover:text-yellow-400 transition" />

            {cart.length > 0 && (
              <span className="absolute -top-2 -right-4 flex h-5 w-5 items-center justify-center rounded-full bg-yellow-500 text-xs font-bold text-black">
                {cart.length}
              </span>
            )}
          </NavLink>

          <button className="bg-yellow-500 hover:bg-yellow-400 transition px-4 py-1.5 rounded-full text-black font-semibold">
            LOGIN
          </button>
        </div>
      </div>
    </header>
  );
};

export default HeaderNav;
