import Lottie from 'lottie-react'
import Loading from "../services/json/Material wave loading.json";

const Loader = () => {
  return (
      <Lottie animationData={Loading} loop autoplay className="w-40 mx-auto"/>
  );
};

export default Loader