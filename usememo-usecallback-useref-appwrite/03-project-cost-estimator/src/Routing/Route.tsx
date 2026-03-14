import { Routes, Route } from "react-router-dom";
import StopWatch from "../pages/StopWatch";
import ProjectEstimator from "../pages/ProjectEstimator";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<StopWatch />} />
      <Route path="/estimator" element={<ProjectEstimator />} />
    </Routes>
  );
};

export default AppRoutes;
