export type TTheme = "light" | "dark";

export const ranges = ["5D", "1M", "1Y"] as const;
export type TRange = (typeof ranges)[number];

export interface IHistoryItem {
  id: string;
  currencyFrom: string;
  currencyTo: string;
  valueFrom: number;
  valueTo: number;
}
