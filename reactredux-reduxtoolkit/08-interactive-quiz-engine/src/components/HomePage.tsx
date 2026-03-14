import Navbar from "./Navbar";
import { useNavigate } from "react-router-dom";

const HomePage = () => {
    const navigate = useNavigate();

    return (
        <div className="h-screen overflow-hidden bg-gradient-to-br from-[#050816] via-[#0a0f2c] to-[#120f3f]">
            <Navbar />

            <main className="h-[calc(100vh-64px)] flex items-center justify-center px-4">
                <div className="text-center max-w-3xl space-y-6">
                    <p className="text-gray-300 text-lg">
                        Welcome to <span className="font-semibold text-white">QuizApp</span>
                    </p>

                    <h1 className="text-4xl sm:text-5xl md:text-6xl font-bold text-white leading-tight">
                        Test what you know. <br />
                        Discover what you don’t.
                    </h1>


                    <button
                        onClick={() => navigate("/quiz")}
                        className="px-10 py-4 rounded-full text-white font-semibold
            bg-gradient-to-r from-purple-500 to-indigo-500
            hover:from-purple-600 hover:to-indigo-600
            shadow-lg shadow-purple-500/30 transition"
                    >
                        Get Started
                    </button>
                </div>
            </main>
        </div>
    );
};

export default HomePage;
