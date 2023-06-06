import { useGetCryptoNewsQuery } from "../services/cryptoNewsApi";
import { useGetCryptosQuery } from "../services/cryptoApi";
import Lottie from "lottie-react";
import cryptoLoading from "../assets/cryptoLoading2.json";
import { useEffect, useState } from "react";
import TextField from "@mui/material/TextField";
import Autocomplete from "@mui/material/Autocomplete";
import cryptoLogo from "../assets/cryptoLogo.jpg";
import moment from "moment/moment";

const News = ({ simplified }) => {
  const [newsCategory, setNewsCategory] = useState("Bitcoin");
  const { data: cryptoNews, isFetching } = useGetCryptoNewsQuery({
    count: simplified ? 6 : 15,
    newsCategory: newsCategory,
  });
  const { data: cryptosList } = useGetCryptosQuery(100);
  // console.log("news", cryptoNews);
  // console.log("cryptos", cryptosList);

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
        <div className="mb-8">
          <Autocomplete
            disablePortal
            id="combo-box-demo"
            options={cryptosList?.data?.coins}
            getOptionLabel={(option) => option.name}
            renderOption={(props, option) => (
              <li {...props}>
                <img
                  loading="lazy"
                  width="20"
                  src={option.iconUrl}
                  alt={option.name}
                  style={{ marginRight: "10px" }}
                />
                {option.name}
              </li>
            )}
            onChange={(event, value) => {
              if (value) {
                setNewsCategory(value.name);
              }
            }}
            renderInput={(params) => (
              <TextField
                {...params}
                label="Search Cryptos"
                // color = "secondary"
                variant="filled"
                sx={{ width: { xs: 180, sm: 200 } }}
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
      )}
      <div className="grid grid-cols-1 md:grid-cols-3 3xl:grid-cols-4 gap-3 sm:gap-6">
        {cryptoNews.value.map((news, index) => (

            <div
              className="p-4 bg-white rounded-lg hover:shadow-2xl shadow-indigo-500/40 cursor-pointer"
              onClick={() => window.open(news.url)}
              key={index}
            >
              <div className="flex items-center justify-between mb-3 sm:mb-5">
                <h1 className="font-bold">{news.name}</h1>
                <img
                  src={news?.image?.thumbnail?.contentUrl || cryptoLogo}
                  alt=""
                  className="h-12 rounded-sm"
                />
              </div>
              <p className="text-sm mb-6">
                {news.description.length > 100
                  ? `${news.description.substring(0, 100)}...`
                  : news.description}
              </p>
              <div className="flex items-center justify-between">
                <div className="flex items-center justify-center">
                  <img
                    src={
                      news.provider[0]?.image?.thumbnail?.contentUrl ||
                      cryptoLogo
                    }
                    alt=""
                    className="h-8 rounded-full mr-2"
                  />
                  <h1 className="font-semibold mr-1">{news.provider[0]?.name}</h1>
                </div>
                <h1>{moment(news.datePublished).startOf("ss").fromNow()}</h1>
              </div>
            </div>

        ))}
      </div>
    </div>
  );
};

export default News;
