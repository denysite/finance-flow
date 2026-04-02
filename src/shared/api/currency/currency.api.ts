import type { TRange } from "@/shared/types/app.types";
import type {
  IHistoryResponse,
  IRateResponse,
  TAllCurrencyResponse,
} from "./currency.types";

class Currency {
  baseUrl = "https://api.frankfurter.dev/v1/";

  async getAll(): Promise<TAllCurrencyResponse> {
    const data = await fetch(`${this.baseUrl}currencies`).then((res) =>
      res.json(),
    );

    return data;
  }

  async getRate(from: string, to: string): Promise<number> {
    if (from == "" || to == "") return 0;

    const date = new Date();
    const formattedDate = date.toLocaleDateString("en-CA");

    const data = (await fetch(
      `${this.baseUrl}${formattedDate}?base=${from}&symbols=${to}`,
    ).then((res) => res.json())) as IRateResponse;

    return data.rates[to];
  }

  async getHistory(
    from: string,
    to: string,
    range: TRange,
  ): Promise<IHistoryResponse> {
    if (from == "" || to == "") return {} as IHistoryResponse;

    const today = new Date();

    // Створюємо КОПІЮ поточної дати, яку будемо безпечно змінювати
    const firstDate = new Date(today);

    switch (range) {
      case "5D":
        firstDate.setDate(firstDate.getDate() - 5);
        break;
      case "1M":
        firstDate.setMonth(firstDate.getMonth() - 1);
        break;
      case "1Y":
        firstDate.setFullYear(firstDate.getFullYear() - 1);
        break;
    }

    // today залишився незмінним, а firstDate змінився
    const formattedToday = today.toLocaleDateString("en-CA");
    const formattedFirstDate = firstDate.toLocaleDateString("en-CA");

    const data = await fetch(
      `${this.baseUrl}${formattedFirstDate}..${formattedToday}?base=${from}&symbols=${to}`,
    ).then((res) => res.json());

    return data;
  }
}

export const currencyApi = new Currency();
