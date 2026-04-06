import { useFetchHistory } from "@/shared/api/currency/currency.query";
import type { IHistoryResponse } from "@/shared/api/currency/currency.types";
import { useAppStore } from "@/shared/store/app.store";
import { lazy, Suspense } from "react";
import { Header } from "./ui/header/Header";
import { Settings } from "./ui/settings/Settings";

const Chart = lazy(() =>
  import("./ui/chart/Chart").then((module) => ({ default: module.Chart })),
);

export const Main = () => {
  const { currencyFrom, currencyTo, range } = useAppStore();
  const { data } = useFetchHistory(currencyFrom, currencyTo, range);

  return (
    <div className="border-b border-border flex flex-col w-full">
      <div className="section">
        <Header />

        <Settings />
      </div>

      <div className="px-3 py-3 flex-1 min-h-0 min-w-0 w-full h-full">
        <Suspense
          fallback={
            <div className="w-full h-full rounded-lg bg-text/40 animate-pulse"></div>
          }
        >
          <Chart apiData={data ?? ({} as IHistoryResponse)} />
        </Suspense>
      </div>
    </div>
  );
};
