import type { IHistoryItem } from "../types/app.types";

export const mockHistory: IHistoryItem[] = [
  {
    id: "1",
    currencyFrom: "USD",
    currencyTo: "EUR",
    valueFrom: 1007134676346532,
    valueTo: 9298273416536234,
  },
  {
    id: "2",
    currencyFrom: "EUR",
    currencyTo: "CNY",
    valueFrom: 50,
    valueTo: 2100,
  },
  {
    id: "3",
    currencyFrom: "GBP",
    currencyTo: "USD",
    valueFrom: 75,
    valueTo: 95,
  },
  {
    id: "4",
    currencyFrom: "TRY",
    currencyTo: "USD",
    valueFrom: 0.01,
    valueTo: 680,
  },
  {
    id: "5",
    currencyFrom: "USD",
    currencyTo: "JPY",
    valueFrom: 200,
    valueTo: 29800,
  },
  {
    id: "6",
    currencyFrom: "CAD",
    currencyTo: "EUR",
    valueFrom: 120,
    valueTo: 81.6,
  },
];
