import { useEffect } from "react";
import { useAppdispatch, useAppseletor } from "../Hooks/utils/redux";
import { fetchQuizData } from "../Hooks/ReduxToolkit/slice/quizSlice";
import Quiz from "../components/Quiz";
import Navbar from "../components/Navbar";

const QuizPage = () => {
  const dispatch = useAppdispatch();
  const { status, questions } = useAppseletor((state) => state.quiz);

  useEffect(() => {
    if (status === "idle" && questions.length === 0) {
      dispatch(fetchQuizData() as any);
    }
  }, [dispatch, status, questions.length]);

  if (status === "loading") {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-lg font-medium animate-pulse">
          Loading quiz...
        </p>
      </div>
    );
  }

  if (!questions.length) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <p className="text-red-500">
          Failed to load quiz. Please refresh.
        </p>
      </div>
    );
  }

  return (
    <div className="min-h-screen flex flex-col bg-gradient-to-br from-indigo-100 via-blue-100 to-purple-100">
      <Navbar />

      <main className="flex-1 flex items-center justify-center px-4">
        <div className="w-full max-w-2xl">
          <Quiz />
        </div>
      </main>
    </div>
  );
};

export default QuizPage;
