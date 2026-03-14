// import { resetQuiz } from "../Hooks/ReduxToolkit/slice/quizSlice";
// import { useAppdispatch, useAppseletor } from "../Hooks/utils/redux";


// const Result = () => {
//   const dispatch = useAppdispatch();
//   const { score, questions } = useAppseletor((state) => state.quiz);

//   return (
//     <div className="text-center p-6 bg-white rounded-xl shadow">
//       <h2 className="text-2xl font-bold mb-4">Quiz Completed</h2>
//       <p className="mb-4">
//         Score: <strong>{score}</strong> / {questions.length}
//       </p>

//       <button
//         onClick={() => dispatch(resetQuiz())}
//         className="px-4 py-2 bg-blue-500 text-white rounded"
//       >
//         Restart Quiz
//       </button>
//     </div>
//   );
// };

// export default Result;


import { resetQuiz } from "../Hooks/ReduxToolkit/slice/quizSlice";
import { useAppdispatch, useAppseletor } from "../Hooks/utils/redux";

const Result = () => {
    const dispatch = useAppdispatch();
    const { score, questions, answers } = useAppseletor(
        (state) => state.quiz
    );

    return (
        <div className="bg-white rounded-xl shadow-lg p-6 max-w-2xl mx-auto space-y-6 mt-11">
            <h2 className="text-3xl font-bold text-center">
                Quiz Completed
            </h2>


            <p className="text-center text-lg">
                Score:
                <span className="font-bold text-indigo-600 ml-1">
                    {score}
                </span>
                / {questions.length}
            </p>

            <div className="text-center">
                <button
                    onClick={() => dispatch(resetQuiz())}
                    className="px-6 py-3 bg-indigo-600 hover:bg-indigo-700 text-white rounded-lg font-medium transition"
                >
                    Restart Quiz
                </button>
            </div>

            <div className="space-y-4">
                {answers.map((ans, index) => (
                    <div
                        key={index}
                        className={`p-4 rounded-lg border
                            ${ans.isCorrect
                                ? "border-green-400 bg-green-50"
                                : "border-red-400 bg-red-50"
                            }`}
                    >
                        <p className="font-medium">
                            Q{index + 1}. {ans.question}
                        </p>

                        <p className="mt-2">
                            Your Answer:
                            <span
                                className={`font-semibold ml-1
                                    ${ans.isCorrect
                                        ? "text-green-600"
                                        : "text-red-600"
                                    }`}
                            >
                                {ans.userAnswer}
                            </span>
                        </p>

                        {!ans.isCorrect && (
                            <p className="mt-1 text-green-600">
                                Correct Answer:
                                <span className="font-semibold ml-1">
                                    {ans.correctAnswer}
                                </span>
                            </p>
                        )}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default Result;
