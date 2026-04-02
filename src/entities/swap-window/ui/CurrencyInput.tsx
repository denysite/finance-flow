import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useAppStore } from "@/shared/store/app.store";
import { useEffect, useState } from "react";

interface IProps {
  isLeft: boolean;
  code: string;
}

export const CurrencyInput = ({ isLeft = true, code }: IProps) => {
  const { fromAmount, toAmount, setFromAmount, setToAmount, rate } =
    useAppStore();

  const externalValue = isLeft ? fromAmount : toAmount;

  const [inputValue, setInputValue] = useState<number | "">(externalValue);

  const [prevExternalValue, setPrevExternalValue] = useState(externalValue);

  if (externalValue !== prevExternalValue) {
    setPrevExternalValue(externalValue);
    setInputValue(externalValue);
  }

  const debouncedValue = useDebounce(inputValue, 500);

  useEffect(() => {
    if (isLeft && typeof debouncedValue === "number") {
      setFromAmount(debouncedValue);
      setToAmount(Number((debouncedValue * rate).toFixed(2)));
    }
  }, [debouncedValue, isLeft, rate, setFromAmount, setToAmount]);

  return (
    <div className="mt-auto flex">
      <input
        type="number"
        className="focus-visible:outline-none border-border border-b text-center text-5xl w-3/4"
        value={inputValue}
        onChange={(e) => {
          const val = e.target.value;
          if (val === "") {
            setInputValue("");
            return;
          }
          const numValue = parseFloat(val);
          if (!isNaN(numValue)) {
            setInputValue(numValue);
          }
        }}
        disabled={!isLeft}
        min={0}
      />
      <div className="text-secondary-text m-auto text-6xl w-1/4">{code}</div>
    </div>
  );
};
