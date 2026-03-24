import Lottie from "lottie-react";
import animationData from "../../assets/animation/DataPrivacy.json";

const SecurityAnimation = () => {
  return (
    <div className="hidden lg:flex justify-center items-center my-10">
      <Lottie
        animationData={animationData}
        loop={true}
        className="w-64 md:w-96"
      />
    </div>
  )
}

export default SecurityAnimation