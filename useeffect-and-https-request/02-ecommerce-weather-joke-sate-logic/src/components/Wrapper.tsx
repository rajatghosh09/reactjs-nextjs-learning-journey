import Navbar from "./Navbar";
import { Outlet } from "react-router-dom";

const Wrapper = () => {
  return (
    <div className="w-full flex flex-col m-0 p-0">

      <div className="h-[35%] bg-[#c5e0b4]">
        <Navbar />                                
      </div>

      <div className="flex flex-row">
        <div className="w-[100%]">
          <Outlet />
        </div>
      </div>

    </div>
  );
};

export default Wrapper;
