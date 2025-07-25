import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const currencyAPI = createApi({
  reducerPath: "currencyAPI",
  baseQuery: fetchBaseQuery({
    baseUrl: "https://api.exchangerate-api.com/v4/latest/",
  }),
  endpoints: (builder) => ({
    getRates: builder.query<Record<string, number>, string>({
      query: (base: string) => `${base}`,
      transformResponse: (response: { rates: Record<string, number> }) => response.rates,
    }),
  }),
});

export const { useGetRatesQuery } = currencyAPI;