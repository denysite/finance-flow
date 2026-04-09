import { useAllCurrencies } from "@/shared/api/currency/currency.query";
import { CurrencySelect } from "./ui/CurrencySelect";
import { RangeList } from "./ui/RangeList";

export const Settings = () => {
  const { data: currencies } = useAllCurrencies();

  return (
    <div className="flex items-center justify-between max-md:justify-center gap-5 flex-wrap">
      <div className="flex items-center gap-2 flex-wrap max-md:justify-center">
        <CurrencySelect options={currencies ?? []} />
        <CurrencySelect options={currencies ?? []} isFrom={false} />
      </div>

      <div>
        <RangeList />
      </div>
    </div>
  );
};
