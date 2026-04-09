import { useFetchRate } from "@/shared/api/currency/currency.query";
import { useAppStore } from "@/shared/store/app.store";
import { ArrowLeftRight } from "lucide-react";
import { CurrencyInput } from "./CurrencyInput";

import { useEffect } from "react";

interface IProps {
  isLeft?: boolean;
}

export const SwapItem = ({ isLeft = true }: IProps) => {
  const {
    currencyFrom,
    currencyTo,
    swapFromTo,
    setRate,
    setToAmount,
    fromAmount,
  } = useAppStore();

  const { data: iHaveText } = useFetchRate(currencyFrom, currencyTo);
  const { data: IWantText } = useFetchRate(currencyTo, currencyFrom);

  const swap = () => {
    swapFromTo();
  };

  useEffect(() => {
    if (iHaveText && fromAmount > 0) {
      setRate(iHaveText);
      setToAmount(Number((fromAmount * iHaveText).toFixed(2)));
    }
  }, [iHaveText, fromAmount, setRate, setToAmount]);

  return (
    <div
      className={`w-1/2 max-md:w-full max-md:items-center p-4 max-md:py-8 pl-7 flex flex-col relative ${isLeft ? "border-r border-border max-md:border-r-0 border-b" : ""}`}
    >
      <div className="text-3xl max-xl:text-2xl max-md:text-3xl max-sm:text-2xl">
        {isLeft ? "I have" : "I want"}
      </div>

      <div className="text-secondary-text text-2xl mt-7 max-xl:text-xl max-md:text-2xl max-sm:text-xl">
        {isLeft ? (
          <p>
            1 {currencyFrom} = {iHaveText} {currencyTo}
          </p>
        ) : (
          <p>
            1 {currencyTo} = {IWantText} {currencyFrom}
          </p>
        )}
      </div>

      <div className="mt-auto">
        <CurrencyInput
          isLeft={isLeft}
          code={isLeft ? currencyFrom : currencyTo}
        />
      </div>

      {isLeft && (
        <button
          className="absolute right-0 translate-x-1/2 top-1/2 -translate-y-1/2 cursor-pointer z-10 max-md:right-1/2 max-md:translate-x-1/2 max-md:bottom-0 max-md:translate-y-1/2"
          onClick={swap}
        >
          <div className="bg-background p-2 border border-border rounded-lg hover:bg-muted transition-colors">
            <ArrowLeftRight size={30} />
          </div>
        </button>
      )}
    </div>
  );
};
