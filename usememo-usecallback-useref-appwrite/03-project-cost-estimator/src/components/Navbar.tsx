import { NavLink } from "react-router-dom";

const Navbar = () => {
  return (
    <nav className="flex items-center justify-between px-8 py-4 bg-gray-900 text-white">
      
      <div className="flex items-center gap-2">
        <div className="w-10 h-10 bg-green-500 rounded-full flex items-center justify-center font-bold">
          SW
        </div>
        <span className="font-semibold text-lg">StopWatch</span>
      </div>

      <div className="flex gap-6">
        <NavLink
          to="/"
          className={({ isActive }) =>
            isActive ? "text-green-400 font-semibold" : "text-white"
          }
        >
          StopWatch
        </NavLink>

        <NavLink
          to="/estimator"
          className={({ isActive }) =>
            isActive ? "text-yellow-400 font-semibold" : "text-white"
          }
        >
          Estimator
        </NavLink>
      </div>

      <div className="w-10 h-10 bg-yellow-400 rounded-full flex items-center justify-center font-bold text-black">
        PE
      </div>
    </nav>
  );
};

export default Navbar;
