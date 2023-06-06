import cryptoAnimation from "../assets/HomePageAnimation.json";
import Lottie from "lottie-react";

const HomePage = () => {
  return (
    <div className="flex flex-col sm:flex-row items-center justify-between p-5 mt-28 sm:mt-14">
      <div className="bg-gradient-to-r from-indigo-800 to-teal-400
      rounded-3xl sm:h-auto w-150 flex flex-col items-center p-2">
        <p className="text-xl text-white sm:text-4xl text-center mt-4 sm:mt-14 font-bold">
          Discover the fascinating world of cryptocurrencies and unlock the
          power of the crypto verse.
        </p>
        <button className="w-40 bg-gradient-to-r from-indigo-500 via-purple-500 to-pink-500 rounded-full h-10
        sm:h-14 text-white m-5 sm:m-12 font-bold text-lg">
          Get Started
        </button>
      </div>
      <div>
        <Lottie animationData={cryptoAnimation} className="h-3/4" />
      </div>
    </div>
  );
};

export default HomePage;
