import { SwapItem } from "./ui/SwapItem";

export const SwapWindow = () => {
  return (
    <div className="flex w-full ">
      <SwapItem />

      <SwapItem isLeft={false} />
    </div>
  );
};
