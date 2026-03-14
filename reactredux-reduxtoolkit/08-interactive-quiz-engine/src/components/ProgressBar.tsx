import { useAppseletor } from "../Hooks/utils/redux";

const ProgressBar = () => {
  const { currentIndex, questions } = useAppseletor((state) => state.quiz);

  const progress = ((currentIndex + 1) / questions.length) * 100;

  return (
    <div className="w-full bg-gray-200 rounded h-2 mb-4">
      <div
        className="bg-blue-500 h-2 rounded"
        style={{ width: `${progress}%` }}
      />
    </div>
  );
};

export default ProgressBar;
