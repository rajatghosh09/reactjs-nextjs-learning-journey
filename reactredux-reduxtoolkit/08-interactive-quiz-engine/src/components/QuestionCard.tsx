import { useMemo } from "react";
import { answerQuestion } from "../Hooks/ReduxToolkit/slice/quizSlice";
import { useAppdispatch, useAppseletor } from "../Hooks/utils/redux";

const QuestionCard = () => {
    const dispatch = useAppdispatch();
    const { questions, currentIndex, selectedAnswer } = useAppseletor((state) => state.quiz);

    const question = questions[currentIndex];

     const options = useMemo(() => {
    return [
      question.correctAnswer,
      ...question.incorrectAnswers,
    ].sort(() => Math.random() - 0.5);
  }, [question.id]);

    return (
        <div>
            <h2 className="text-lg font-semibold mb-6 text-center">
                {question.question.text}
            </h2>

            <div className="space-y-3">
                {options.map((opt, index) => (
                    <button
                        key={opt}
                        onClick={() => dispatch(answerQuestion(opt))}
                        disabled={!!selectedAnswer}
                        style={{ animationDelay: `${index * 120}ms` }}
                        className={`w-full text-left px-4 py-3 rounded-lg border transition
              animate-fadeInUp
              ${selectedAnswer === opt
                                ? "bg-indigo-600 text-white border-indigo-600"
                                : "bg-gray-50 hover:bg-indigo-50"
                            }`}
                    >
                        {opt}
                    </button>
                ))}
            </div>
        </div>
    );
};

export default QuestionCard;
