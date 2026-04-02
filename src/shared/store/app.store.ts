import { historyParse } from "@/entities/history/lib/historyParse";
import { create } from "zustand";
import { devtools } from "zustand/middleware";
import {
  ranges,
  type IHistoryItem,
  type TRange,
  type TTheme,
} from "../types/app.types";
import { localStorageStore } from "./localStorage.store";

interface IAppState {
  theme: TTheme;
  isHistoryOpen: boolean;

  range: TRange;

  history: IHistoryItem[];

  currencyFrom: string;
  currencyTo: string;
  rate: number;

  fromAmount: number;
  toAmount: number;
}

interface IAppActions {
  switchTheme: () => void;
  toggleIsHistoryOpen: () => void;

  setRange: (range: TRange) => void;

  setHistory: (history: IHistoryItem[]) => void;

  setCurrencyFrom: (currency: string) => void;
  setCurrencyTo: (currency: string) => void;

  setRate: (rate: number) => void;

  setFromAmount: (amount: number) => void;
  setToAmount: (amount: number) => void;

  swapFromTo: () => void;
}

interface IAppStore extends IAppState, IAppActions {}

export const useAppStore = create<IAppStore>()(
  devtools((set, get) => ({
    theme: localStorageStore.get<TTheme>(localStorageStore.theme) ?? "dark",
    range: ranges[0],
    history: historyParse(),

    isHistoryOpen: true,
    currencyFrom: "",
    currencyTo: "",
    rate: 0,
    fromAmount: 0,
    toAmount: 0,

    switchTheme: () => {
      set((state) => ({
        theme:
          state.theme === "dark" ? ("light" as TTheme) : ("dark" as TTheme),
      }));

      localStorageStore.set(localStorageStore.theme, get().theme as TTheme);
    },

    setRange: (range: TRange) => {
      set({ range });
    },

    addHistory: (history: IHistoryItem) => {
      set((state) => ({
        history: [...state.history, history],
      }));
    },

    toggleIsHistoryOpen: () => {
      set((state) => ({
        isHistoryOpen: !state.isHistoryOpen,
      }));
    },

    setCurrencyFrom: (currency: string) => {
      set({ currencyFrom: currency });
    },

    setCurrencyTo: (currency: string) => {
      set({ currencyTo: currency });
    },

    setRate: (rate: number) => {
      set({ rate });
    },

    setFromAmount: (amount: number) => {
      set({ fromAmount: amount });
    },
    setToAmount: (amount: number) => {
      set({ toAmount: amount });
    },

    setHistory: (history: IHistoryItem[]) => {
      set({ history });
    },

    swapFromTo: () => {
      set((state) => ({
        currencyFrom: state.currencyTo,
        currencyTo: state.currencyFrom,
        toAmount: 0,
      }));
    },
  })),
);
