import { useGetCryptosQuery } from "../services/cryptoApi";
import Lottie from "lottie-react";
import cryptoLoading from "../assets/cryptoLoading2.json";
import millify from "millify";
import { Link } from "react-router-dom";
import { CryptoCurrencies, News } from "../components";

const Dashboard = () => {
  const { data, isFetching } = useGetCryptosQuery(10);
  // console.log(data);
  const globalStats = data?.data?.stats;

  if (isFetching) {
    return (
      <div className="m-auto p-4 h-4/5 flex items-center justify-center">
        <Lottie animationData={cryptoLoading} className="h-40 sm:h-52 " />
      </div>
    );
  }

  return (
    <div className="sm:mt-5 mt-16 p-4">
      <div>
        <h1 className="text-3xl sm:text-4xl text-blue-950 font-bold mb-8">
          Global Crypto Stats
        </h1>
        <div className="flex flex-wrap justify-between max-w-full  rounded-2xl p-3 bg-gradient-to-r from-indigo-900 via-indigo-700 to-indigo-500">
          <div className="w-full sm:w-1/2 mb-4 p-2">
            <h3 className="font-bold text-violet-300">
              Total Cryptocurrencies
            </h3>
            <br />
            <span className="text-xl sm:text-3xl font-bold text-violet-300">
              {globalStats.total}
            </span>
          </div>
          <div className="w-full sm:w-1/2 mb-4 p-2">
            <h3 className="font-bold text-violet-300">Total Exchanges</h3>
            <br />
            <span className="text-xl sm:text-3xl font-bold text-violet-300">
              {millify(globalStats.totalExchanges)}
            </span>
          </div>
          <div className="w-full sm:w-1/2 mb-4 p-2">
            <h3 className="font-bold text-violet-300">Total Market Cap</h3>
            <br />
            <span className="text-xl sm:text-3xl font-bold text-violet-300">
              ${millify(globalStats.totalMarketCap)}
            </span>
          </div>
          <div className="w-full sm:w-1/2 mb-4 p-2">
            <h3 className="font-bold text-violet-300">Total 24th Volume</h3>
            <br />
            <span className="text-xl sm:text-3xl font-bold text-violet-300">
              ${millify(globalStats.total24hVolume)}
            </span>
          </div>
          <div className="w-full sm:w-1/2 mb-4 p-2">
            <h3 className="font-bold text-violet-300">Total Coins</h3>
            <br />
            <span className="text-xl sm:text-3xl font-bold text-violet-300">
              {millify(globalStats.totalCoins)}
            </span>
          </div>
          <div className="w-full sm:w-1/2 mb-4 p-2">
            <h3 className="font-bold text-violet-300">Total Markets</h3>
            <br />
            <span className="text-xl sm:text-3xl font-bold text-violet-300">
              {millify(globalStats.totalMarkets)}
            </span>
          </div>
        </div>

        <div className="flex flex-row justify-between item-center mt-8">
          <h1 className="text-3xl sm:text-4xl text-blue-950 font-bold">
            Top 10 cryptos in the world
          </h1>

          <Link to="/cryptocurrencies" className="my-auto">
            <h1 className="text-xl sm:text-xl text-blue-900 font-bold ">
              Show More
            </h1>
          </Link>
        </div>
        <CryptoCurrencies simplified={true} />
        <div className="flex flex-row justify-between item-center mt-8">
          <h1 className="text-3xl sm:text-4xl text-blue-950 font-bold">
            Trending News
          </h1>

          <Link to="/news" className="my-auto">
            <h1 className="text-xl sm:text-xl text-blue-900 font-bold ">
              Show More
            </h1>
          </Link>
        </div>
        <News simplified={true} />
      </div>
    </div>
  );
};

export default Dashboard;
