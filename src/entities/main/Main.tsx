import { useFetchHistory } from "@/shared/api/currency/currency.query";
import type { IHistoryResponse } from "@/shared/api/currency/currency.types";
import { useAppStore } from "@/shared/store/app.store";
import { Chart } from "./ui/chart/Chart";
import { Header } from "./ui/header/Header";
import { Settings } from "./ui/settings/Settings";

export const Main = () => {
  const { currencyFrom, currencyTo, range } = useAppStore();
  const { data } = useFetchHistory(currencyFrom, currencyTo, range);

  return (
    <div className="border-b border-border h-full flex flex-col">
      <div className="section">
        <Header />

        <Settings />
      </div>

      <div className="px-3 py-3 flex-1 min-h-0 min-w-0 w-full h-full">
        <Chart apiData={data ?? ({} as IHistoryResponse)} />
      </div>
    </div>
  );
};
