import { ranges } from "@/shared/types/app.types";
import { RangeItem } from "./RangeItem";

export const RangeList = () => {
  return (
    <ul className="flex items-center gap-2">
      {ranges.map((range, index) => (
        <RangeItem key={index} item={range} />
      ))}
    </ul>
  );
};
