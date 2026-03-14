import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAppdispatch, useAppseletor } from "../Hooks/utils/redux";
import {
    nextQuestion,
    resetQuiz,
} from "../Hooks/ReduxToolkit/slice/quizSlice";
import QuestionCard from "./QuestionCard";
import ProgressBar from "./ProgressBar";
import Result from "./Result";
import { TiStopwatch } from "react-icons/ti";





const QUESTION_TIME = 10;

const Quiz = () => {
    const dispatch = useAppdispatch();
    const navigate = useNavigate();

    const {
        status,
        selectedAnswer,
        currentIndex,
    } = useAppseletor((state) => state.quiz);

    const [timeLeft, setTimeLeft] = useState<number>(QUESTION_TIME);


    useEffect(() => {
        setTimeLeft(QUESTION_TIME);
    }, [currentIndex]);


    useEffect(() => {
        if (status !== "idle") return;

        if (timeLeft === 0) {
            dispatch(nextQuestion());
            return;
        }

        const timer = setTimeout(() => {
            setTimeLeft((prev) => Math.max(prev - 1, 0));
        }, 1000);

        return () => clearTimeout(timer);
    }, [timeLeft, status, dispatch]);

    const handleExit = () => {
        dispatch(resetQuiz());
        navigate("/");
    };

    if (status === "completed") {
        return <Result />;
    }

    return (
        <div className="bg-white rounded-2xl shadow-xl p-6 space-y-6 relative">
            <button
                onClick={handleExit}
                className="absolute top-4 right-4 text-sm text-red-500 hover:underline"
            >
                Exit
            </button>

            <div className="flex justify-between items-center">
                <ProgressBar />
                <div
                    className={`px-3 py-1 rounded-full text-sm font-semibold
            ${timeLeft <= 3
                            ? "bg-red-100 text-red-600 animate-pulse"
                            : "bg-indigo-100 text-indigo-600"
                        }`}
                >
                    <TiStopwatch /> {timeLeft}s
                </div>
            </div>

            <QuestionCard />

            {selectedAnswer && (
                <button
                    onClick={() => dispatch(nextQuestion())}
                    className="w-full bg-indigo-600 hover:bg-indigo-700 text-white py-3 rounded-lg font-medium transition"
                >
                    Next Question
                </button>
            )}
        </div>
    );
};

export default Quiz;
