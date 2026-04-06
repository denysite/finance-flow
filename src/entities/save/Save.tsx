import { useAppStore } from "@/shared/store/app.store";
import { SaveIcon } from "lucide-react";
import { addHistory } from "./lib/saveFn";

import { v4 as uuidv4 } from "uuid";

export const Save = () => {
  const { fromAmount, toAmount, currencyFrom, currencyTo } = useAppStore();

  return (
    <div className="w-1/4 flex justify-center">
      <button
        className="bg-[#67696f]/60 m-auto flex-col gap-2 text-4xl dark:text-white/60 text-white px-4 py-7 rounded-lg max-w-[80%] w-full max-h-[80%] h-full transition hover:bg-[#67696f]/75"
        onClick={() =>
          addHistory({
            valueFrom: fromAmount,
            valueTo: toAmount,
            currencyFrom,
            currencyTo,
            id: uuidv4(),
          })
        }
      >
        <SaveIcon size={40} className="mx-auto" />
        <p>Save</p>
      </button>
    </div>
  );
};
