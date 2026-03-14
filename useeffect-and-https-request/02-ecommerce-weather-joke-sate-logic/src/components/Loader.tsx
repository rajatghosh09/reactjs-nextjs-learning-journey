import Lottie from 'lottie-react'
import Loading from "../Service/json/Material loading.json";

const Loader = () => {
  return (
      <Lottie animationData={Loading} loop autoplay className="w-40 mx-auto"/>
  );
};

export default Loader