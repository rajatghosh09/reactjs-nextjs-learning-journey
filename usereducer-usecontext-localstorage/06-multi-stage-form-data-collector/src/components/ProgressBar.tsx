import { CheckCircle2, Circle } from "lucide-react";
import { useLocation } from "react-router-dom";

const steps = [
  { path: "/", label: "Personal" },
  { path: "/address", label: "Address" },
  { path: "/review", label: "Review" },
];

const ProgressBar = () => {
  const location = useLocation();

  const currentStepIndex = steps.findIndex(
    (step) => step.path === location.pathname
  );

  return (
    <div className="w-full bg-white/80 backdrop-blur-md shadow-sm">
      <div className="mx-auto max-w-md px-4 py-4">
        <div className="flex items-center justify-between">
          {steps.map((step, index) => {
            const isCompleted = index < currentStepIndex;
            const isActive = index === currentStepIndex;

            return (
              <div key={step.path} className="flex-1 flex items-center">
                <div className="flex flex-col items-center">
                  <div
                    className={`flex h-8 w-8 items-center justify-center rounded-full ${
                      isCompleted
                        ? "bg-green-600 text-white"
                        : isActive
                        ? "bg-blue-600 text-white"
                        : "bg-gray-200 text-gray-500"
                    }`}
                  >
                    {isCompleted ? (
                      <CheckCircle2 size={18} />
                    ) : (
                      <Circle size={18} />
                    )}
                  </div>

                  <span
                    className={`mt-2 text-xs font-medium ${
                      isActive
                        ? "text-blue-600"
                        : isCompleted
                        ? "text-green-600"
                        : "text-gray-500"
                    }`}
                  >
                    {step.label}
                  </span>
                </div>

                {index < steps.length - 1 && (
                  <div
                    className={`flex-1 h-[2px] mx-2 ${
                      isCompleted ? "bg-green-600" : "bg-gray-200"
                    }`}
                  />
                )}
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default ProgressBar;
