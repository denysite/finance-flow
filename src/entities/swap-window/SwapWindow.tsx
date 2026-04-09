import { SwapItem } from "./ui/SwapItem";

export const SwapWindow = () => {
  return (
    <div className="flex w-full max-md:flex-col">
      <SwapItem />

      <SwapItem isLeft={false} />
    </div>
  );
};
