import { useQuery } from "@tanstack/react-query";
import { flagsApi } from "./flags.api";

export const useFlags = (currencyCode: string) => {
  return useQuery({
    queryKey: ["flags", currencyCode],
    queryFn: () => flagsApi.getFlag(currencyCode),
    staleTime: Infinity,
  });
};
