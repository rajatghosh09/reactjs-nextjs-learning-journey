import { useNavigate } from "react-router-dom";

const navItems = [
  { label: "Home", path: "/" },
  { label: "Products", path: "/product" },
  { label: "Author", path: "/author" },
  { label: "WeatherApp", path: "/weatherapp" },
  { label: "Joke", path: "/joke" },
];


const Navbar = () => {
  const navigate = useNavigate();

  return (
    <>
      <nav className="w-full bg-gradient-to-r from-[#f5f7fa] to-[#dfe9f3] py-3 shadow-sm border-b border-gray-200">
        <div className="max-w-7xl mx-auto flex justify-between items-center px-6">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-gray-800 tracking-wide cursor-pointer"
          >
            Soft<span className="text-indigo-500">UI</span>
          </h1>

          <div className="flex items-center gap-10 font-medium text-gray-600 text-lg">
            {navItems.map((item) => (
              <span
                key={item.path}
                onClick={() => navigate(item.path)}
                className="cursor-pointer relative hover:text-indigo-600 transition
              after:absolute after:left-0 after:-bottom-1 after:w-0 after:h-[2px] after:bg-indigo-400
              hover:after:w-full after:transition-all after:duration-300"
              >
                {item.label}
              </span>
            ))}
          </div>

          <button className="bg-indigo-500 text-white px-6 py-2 rounded-full shadow hover:bg-indigo-600 hover:shadow-md active:scale-95 transition">
            Sign Up
          </button>
        </div>
      </nav>
    </>
  );
};

export default Navbar;