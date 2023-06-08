import Lottie from "lottie-react";
import constructionAnimation from "../assets/ConstructionAnimation.json"

const Exchange = () => {
  return (
    <div className="m-auto p-4 h-4/5 flex items-center justify-center">
      <Lottie animationData={constructionAnimation} className="h-full"/>
    </div>
  )
}

export default Exchange