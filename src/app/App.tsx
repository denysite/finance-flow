import { History } from "@/entities/history/History";
import { Main } from "@/entities/main/Main";
import { Save } from "@/entities/save/Save";
import { SwapWindow } from "@/entities/swap-window/SwapWindow";
import {
  useAllCurrencies,
  useFetchHistory,
  useFetchRate,
} from "@/shared/api/currency/currency.query";
import { useAppStore } from "@/shared/store/app.store";

import { useEffect } from "react";
import toast, { Toaster } from "react-hot-toast";

export function App() {
  const { data: allCurrencies, isError: isAllCurrenciesError } =
    useAllCurrencies();
  const {
    setCurrencyFrom,
    setCurrencyTo,
    theme,
    currencyFrom,
    currencyTo,
    range,
  } = useAppStore();

  useFetchRate(currencyFrom, currencyTo);
  useFetchHistory(currencyFrom, currencyTo, range);

  useEffect(() => {
    const root = window.document.documentElement;

    if (theme === "dark") {
      root.classList.add("dark");
    } else {
      root.classList.remove("dark");
    }
  }, [theme]);

  useEffect(() => {
    if (isAllCurrenciesError) toast.error("Error loading currencies");
  }, [isAllCurrenciesError]);

  useEffect(() => {
    if (allCurrencies && allCurrencies.length > 1) {
      setCurrencyFrom(allCurrencies[0][0]);
      setCurrencyTo(allCurrencies[1][0]);
    }
  }, [allCurrencies, setCurrencyFrom, setCurrencyTo]);

  return (
    <>
      <div className="p-2 h-screen">
        <div className="h-3/4 flex">
          <Main />
          <History />
        </div>

        <div className="h-1/4 flex">
          <SwapWindow />
          <Save />
        </div>
      </div>

      <Toaster
        toastOptions={{
          position: "top-left",
          error: {
            style: {
              backgroundColor: "var(--color-background)",
              color: "var(--color-text)",
            },
          },
        }}
      />
    </>
  );
}
