import Lottie from "lottie-react"
import Notfound from "../Service/json/Page Not Found 404.json"

const NotFound = () => {
  return (
    <div>
      <Lottie animationData={Notfound} loop autoplay className="w-full"/>
    </div>
  )
}

export default NotFound
