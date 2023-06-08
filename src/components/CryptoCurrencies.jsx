import { useEffect, useState } from "react";
import { useGetCryptosQuery } from "../services/cryptoApi";
import cryptoLogo from "../assets/cryptoLogo.jpg";
import Lottie from "lottie-react";
import cryptoLoading from "../assets/cryptoLoading2.json";
import millify from "millify";
import { Input } from "@mui/material";
import { Link } from "react-router-dom";

const CryptoCurrencies = ({ simplified }) => {
  const count = simplified ? 10 : 100;

  const { data: cryptosList, isFetching } = useGetCryptosQuery(count);
  const [cryptos, setcryptos] = useState();
  const [searchTerm, setsearchTerm] = useState("");
  // console.log(searchTerm);

  // console.log("data", cryptosList, simplified);

  useEffect(() => {
    setcryptos(cryptosList?.data?.coins);
    const filteredData = cryptosList?.data?.coins.filter((item) =>
      item.name.toLowerCase().includes(searchTerm)
    );
    setcryptos(filteredData);
  }, [searchTerm, cryptosList]);

  if (isFetching) {
    return (
      <div className="m-auto p-4 h-4/5 flex items-center justify-center">
        <Lottie animationData={cryptoLoading} className="h-40 sm:h-52 " />
      </div>
    );
  }

  return (
    <div className="sm:mt-8 mt-16 p-4">
      {!simplified && (
        <div className="flex items-center justify-center sm:mb-8 mb-3">
          <Input
            placeholder="Search Cryptos"
            onChange={(e) => setsearchTerm(e.target.value.toLowerCase())}
            className="border-2 border-gray-400 p-1 rounded-lg"
          />
        </div>
      )}
      <div className="grid grid-cols-2 md:grid-cols-4 2xl:grid-cols-5 gap-3 sm:gap-6">
        {cryptos?.map((crypto) => (
          <Link key={crypto.uuid} to={`/crypto/${crypto.uuid}`}>
            <div
              className="p-4 bg-white rounded-lg hover:shadow-2xl shadow-indigo-500/40 cursor-pointer transform transition-transform duration-300 hover:scale-110"
              key={crypto.uuid}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-5">
                <h1 className="font-bold">
                  {crypto.rank}. {crypto.name}
                </h1>
                <hr className="" />
                <img src={crypto.iconUrl} alt="" className="h-8 rounded-full" />
              </div>
              <hr className="size-2 mb-3 sm:mb-5" />
              <div>
                <p className="text-sm mb-2 font-semibold">Price: {millify(crypto.price)}</p>
                <p className="text-sm mb-2 font-semibold">
                  Market Cap: {millify(crypto.marketCap)}
                </p>
                <p className="text-sm mb-2 font-semibold">
                  DailyChange: {millify(crypto.change)}%
                </p>
              </div>
            </div>
          </Link>
        ))}
      </div>
    </div>
  );
};

export default CryptoCurrencies;
