import { useAppStore } from "@/shared/store/app.store";
import type { TRange } from "@/shared/types/app.types";
import { clsx } from "clsx";

export const RangeItem = ({ item }: { item: TRange }) => {
  const { range, setRange } = useAppStore();

  return (
    <li className="text-2xl text-secondary-text  ">
      <button
        className={clsx(
          "rounded-lg p-1 cursor-pointer hover:text-text/85 w-11.25 transition",
          {
            "border border-border": range === item,
          },
        )}
        onClick={() => setRange(item)}
      >
        {item}
      </button>
    </li>
  );
};
