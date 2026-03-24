import Lottie from "lottie-react";
import loadingAnimation from "../../assets/animation/Loading.json";

const Loading = ({ loading }) => {
  if (!loading) return null;

  return (
    <div className="fixed top-0 left-0 w-full h-full bg-black/50 flex items-center justify-center z-50">
      <div className="w-70">
        <Lottie animationData={loadingAnimation} loop />
      </div>
    </div>
  );
};

export default Loading;