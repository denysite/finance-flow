// https://flagcdn.com/h60/ua.png

import { currencyMeta } from "@/shared/types/currency-meta";

class FlagsApi {
  baseUrl = "https://flagcdn.com/";

  getFlag(currencyCode: string, size: number = 60) {
    const countryCode = currencyMeta[currencyCode].flagCode;

    return `${this.baseUrl}h${size}/${countryCode.toLowerCase()}.png`;
  }
}

export const flagsApi = new FlagsApi();
