export type TAllCurrencyResponse = Record<string, string>;

export type TAllCurrency = [string, string][];

export interface IRateResponse {
  base: string;
  date: string;
  rates: Record<string, number>;
}

export interface IHistoryResponse {
  amount: string;
  base: string;
  start_date: string;
  end_date: string;
  rates: Record<string, Record<string, number>>;
}
