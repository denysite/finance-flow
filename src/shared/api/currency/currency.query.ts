import { useAppStore } from "@/shared/store/app.store";
import type { TRange } from "@/shared/types/app.types";
import { useQuery } from "@tanstack/react-query";
import { currencyApi } from "./currency.api";
import type { TAllCurrency } from "./currency.types";

export const useAllCurrencies = () => {
  return useQuery({
    queryKey: ["all currencies"],
    queryFn: async () => {
      const data = await currencyApi.getAll();

      return Object.entries(data) as TAllCurrency;
    },
    staleTime: 1000 * 60 * 1440 * 7,
  });
};

export const useFetchRate = (from: string, to: string) => {
  return useQuery({
    queryKey: ["rate", from, to],
    queryFn: async () => {
      const data = await currencyApi.getRate(from, to);

      useAppStore.getState().setRate(data);

      return data;
    },
    staleTime: 1000 * 60 * 1440,
  });
};

export const useFetchHistory = (from: string, to: string, range: TRange) => {
  return useQuery({
    queryKey: ["history", from, to, range],
    queryFn: async () => {
      const data = await currencyApi.getHistory(from, to, range);

      return data;
    },
    staleTime: 1000 * 60 * 1440,
  });
};
