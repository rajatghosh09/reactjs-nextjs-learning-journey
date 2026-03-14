import { useNavigate } from "react-router-dom";
import { useAppseletor } from "../Hooks/utils/redux";


const Navbar = () => {
    const navigate = useNavigate();
    const { currentIndex, questions } = useAppseletor((state) => state.quiz);

    return (
        <nav className="w-full bg-white shadow-sm px-6 py-4 flex justify-between items-center">
            <h1 className="text-xl font-bold text-blue-600 " onClick={()=> navigate("/")}>
                Quiz App
            </h1>

            {questions.length > 0 && (
                <div className="text-sm text-gray-700">
                    Questions:
                    <span className="font-semibold ml-1">
                        {currentIndex + 1}
                    </span>
                    /{questions.length}
                </div>
            )}
        </nav>
    );
};

export default Navbar;
