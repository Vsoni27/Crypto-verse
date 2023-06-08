import { useParams } from "react-router-dom";
import {
  useGetCryptoDetailsQuery,
  useGetCryptoHistoryQuery,
} from "../services/cryptoApi";
import { useState } from "react";
import Lottie from "lottie-react";
import cryptoLoading from "../assets/cryptoLoading2.json";
import Updating from "../assets/updating.json";
import MonetizationOnOutlinedIcon from "@mui/icons-material/MonetizationOnOutlined";
import TagOutlinedIcon from "@mui/icons-material/TagOutlined";
import BoltOutlinedIcon from "@mui/icons-material/BoltOutlined";
import EmojiEventsOutlinedIcon from "@mui/icons-material/EmojiEventsOutlined";
import ShowChartOutlinedIcon from "@mui/icons-material/ShowChartOutlined";
import CurrencyExchangeOutlinedIcon from "@mui/icons-material/CurrencyExchangeOutlined";
import ErrorOutlineOutlinedIcon from "@mui/icons-material/ErrorOutlineOutlined";
import DoneOutlinedIcon from "@mui/icons-material/DoneOutlined";
import CloseOutlinedIcon from "@mui/icons-material/CloseOutlined";
import millify from "millify";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";

const CryptoDetails = () => {
  const { coinId } = useParams();
  const [timePeriod, setTimePeriod] = useState("24h");
  const { data, isFetching } = useGetCryptoDetailsQuery(coinId);
  const { data: coinHistory } = useGetCryptoHistoryQuery({
    coinId,
    timePeriod,
  });
  const cryptoDetails = data?.data?.coin;
  // console.log("cryptoDetails", cryptoDetails);
  // console.log("coinHistory", coinHistory);
  // console.log("this: ",cryptoDetails && cryptoDetails['24hVolume'])

  const time = ["3h", "24h", "7d", "30d", "1y", "3m", "3y", "5y"];

  const stats = [
    {
      title: "Price to USD",
      value: `$ ${cryptoDetails?.price && millify(cryptoDetails?.price)}`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    { title: "Rank", value: cryptoDetails?.rank, icon: <TagOutlinedIcon /> },
    {
      title: "24h Volume",
      value: `$ ${
        cryptoDetails?.volume &&
        millify(cryptoDetails && cryptoDetails["24hVolume"])
      }`,
      icon: <BoltOutlinedIcon />,
    },
    {
      title: "Market Cap",
      value: `$ ${
        cryptoDetails?.marketCap && millify(cryptoDetails?.marketCap)
      }`,
      icon: <MonetizationOnOutlinedIcon />,
    },
    {
      title: "All-time-high(daily avg.)",
      value: `$ ${
        cryptoDetails?.allTimeHigh?.price &&
        millify(cryptoDetails?.allTimeHigh?.price)
      }`,
      icon: <EmojiEventsOutlinedIcon />,
    },
  ];

  const genericStats = [
    {
      title: "Number Of Markets",
      value: cryptoDetails?.numberOfMarkets,
      icon: <ShowChartOutlinedIcon />,
    },
    {
      title: "Number Of Exchanges",
      value: cryptoDetails?.numberOfExchanges,
      icon: <CurrencyExchangeOutlinedIcon />,
    },
    {
      title: "Aprroved Supply",
      value: cryptoDetails?.supply?.confirmed ? (
        <DoneOutlinedIcon />
      ) : (
        <CloseOutlinedIcon />
      ),
      icon: <ErrorOutlineOutlinedIcon />,
    },
    {
      title: "Total Supply",
      value: `$ ${
        cryptoDetails?.supply?.total && millify(cryptoDetails?.supply?.total)
      }`,
      icon: <ErrorOutlineOutlinedIcon />,
    },
    {
      title: "Circulating Supply",
      value: `$ ${
        cryptoDetails?.supply?.circulating &&
        millify(cryptoDetails?.supply?.circulating)
      }`,
      icon: <ErrorOutlineOutlinedIcon />,
    },
  ];

  if (isFetching) {
    return (
      <div className="m-auto p-4 h-4/5 flex items-center justify-center">
        <Lottie animationData={cryptoLoading} className="h-40 sm:h-52 " />
      </div>
    );
  }

  return (
    <div className="sm:mt-8 mt-16 p-4">
      <div className="flex flex-col items-center justify-center mb-5">
        <h1 className="text-3xl text-blue-900 font-extrabold mb-6 ">
          {cryptoDetails.name} ({cryptoDetails.symbol}) Price
        </h1>
        <h1 className="text-lg text-gray-600 font-semibold">
          {cryptoDetails.name} live price in US Dollar (USD), View value
          statistics, makert cap and supply.
        </h1>
      </div>
      <div className="mb-5">
        <Autocomplete
          disablePortal
          id="combo-box-demo"
          options={time}
          getOptionLabel={(option) => option}
          renderOption={(props, option) => <li {...props}>{option}</li>}
          onChange={(event, value) => {
            if (value) {
              setTimePeriod(value);
            }
          }}
          renderInput={(params) => (
            <TextField
              {...params}
              label="Select Days"
              variant="filled"
              sx={{ width: { xs: 180, sm: 150 } }}
              inputProps={{
                style: {
                  height: "20px", // Adjust the desired height here
                },
                ...params.inputProps,
                autoComplete: "off", // due to some weird bug
              }}
            />
          )}
        />
      </div>
      <div className="flex sm:flex-row flex-col items-center justify-center">
        <div className="flex flex-col w-full sm:w-2/5 p-4 mb-2 sm:mr-2">
          <div className="flex flex-col  mb-5">
            <h1 className="text-xl text-blue-950 font-bold mb-2 ">
              {cryptoDetails.name} Value Statistics
            </h1>
            <h1 className="text-md text-gray-600 font-semibold">
              An overview showing the statistics of {cryptoDetails.name}, such
              as the base and quote currency, the rank, and trading volume.
            </h1>
          </div>
          {stats.map(({ icon, title, value }, index) => (
            <div key={index}>
              <div
                className="flex flex-row justify-between p-2 text-gray-800"
                key={index}
              >
                <div className="flex items-center justify-center">
                  <div className="mr-1">{icon}</div>{" "}
                  <h1 className="font-semibold">{title} </h1>
                </div>
                <h1 className="font-bold">{value}</h1>
              </div>
              <hr className="size-1 mb-2 border border-gray-500" />
            </div>
          ))}
        </div>

        <div className="flex flex-col w-full sm:w-2/5  p-4 mb-2 sm:ml-2">
          <div className="flex flex-col  mb-5">
            <h1 className="text-xl text-blue-950 font-bold mb-2 ">
              Other Stats Info
            </h1>
            <h1 className="text-md text-gray-600 font-semibold">
              An overview showing the statistics of all Crypto Currencies.
            </h1>
          </div>
          {genericStats.map(({ icon, title, value }, index) => (
            <div key={index}>
              <div
                className="flex flex-row justify-between p-2 text-gray-800"
                key={index}
              >
                <div className="flex items-center justify-center">
                  <div className="mr-1">{icon}</div>{" "}
                  <h1 className="font-semibold">{title} </h1>
                </div>
                <h1 className="font-bold">{value}</h1>
              </div>
              <hr className="size-1 mb-2 border border-gray-500" />
            </div>
          ))}
        </div>
      </div>

      <div className="flex sm:flex-row flex-col items-center justify-center">
        <div className="sm:w-2/3 p-4 flex flex-col items-center justify-center">
          <h1 className="font-bold text-3xl text-blue-950">Chart</h1>
          <Lottie animationData={Updating} />
        </div>
        <div className="flex flex-col w-full sm:w-1/3  p-4 ">
          <h1 className="text-2xl text-blue-950 font-bold mb-4">
            {cryptoDetails.name} Links
          </h1>
          {cryptoDetails.links?.map((link, index) => (
            <div key={index}>
              <div className="flex flex-row justify-between p-2 text-gray-800">
                <h1 className="font-bold text-blue-950">{link.type}</h1>
                <h1
                  className="font-bold text-blue-800 cursor-pointer"
                  onClick={() => window.open(link.url)}
                >
                  {link.name}k
                </h1>
              </div>
              <hr className="size-1 mb-2 border border-gray-500" />
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CryptoDetails;
