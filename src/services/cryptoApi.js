import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiKey = import.meta.env.VITE_RAPID_API_KEY;

const cryptoApiHeaders = {
  "X-RapidAPI-Key": apiKey,
  "X-RapidAPI-Host": "coinranking1.p.rapidapi.com",
};

const baseURL = "https://coinranking1.p.rapidapi.com";

const createRequest = (url) => ({
  url,
  headers: cryptoApiHeaders,
});

export const cryptoApi = createApi({
  reducerPath: "cryptoApi",
  baseQuery: fetchBaseQuery({
    baseUrl: baseURL,
  }),
  endpoints: (build) => ({
    getCryptos: build.query({
      query: (count) => createRequest(`/coins?limit=${count}`),
    }),
    getCryptoDetails: build.query({
      query: (coinId) => createRequest(`/coin/${coinId}`),
    }),
    getCryptoHistory: build.query({
      query: ({coinId, timePeriod}) => createRequest(`/coin/${coinId}/history/?timeperiod=${timePeriod}`),
    }),
  }),
});

export const { useGetCryptosQuery, useGetCryptoDetailsQuery, useGetCryptoHistoryQuery } = cryptoApi;
