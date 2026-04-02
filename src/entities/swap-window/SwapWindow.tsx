import { SwapItem } from "./ui/SwapItem";

export const SwapWindow = () => {
  return (
    <div className="flex">
      <SwapItem />

      <SwapItem isLeft={false} />
    </div>
  );
};
