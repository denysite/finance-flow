import { useDebounce } from "@/shared/lib/hooks/useDebounce";
import { useAppStore } from "@/shared/store/app.store";
import { useGSAP } from "@gsap/react";
import gsap from "gsap";
import { useEffect, useRef, useState } from "react";

interface IProps {
  isLeft: boolean;
  code: string;
}

export const CurrencyInput = ({ isLeft = true, code }: IProps) => {
  const { fromAmount, toAmount, setFromAmount, setToAmount, rate } =
    useAppStore();

  const externalValue = isLeft ? fromAmount : toAmount;

  const [animatedValueState, setAnimatedValueState] = useState<number>(
    Number(externalValue) || 0,
  );

  const animatedValue = useRef({ val: Number(externalValue) || 0 });

  useGSAP(() => {
    if (!isLeft && typeof externalValue === "number") {
      gsap.to(animatedValue.current, {
        val: externalValue,
        duration: 1,
        ease: "power2.out",
        onUpdate: () => {
          setAnimatedValueState(Number(animatedValue.current.val.toFixed(2)));
        },
      });
    }
  }, [externalValue]);

  const debouncedValue = useDebounce(fromAmount, 500);

  useEffect(() => {
    if (typeof debouncedValue === "number") {
      setToAmount(Number((debouncedValue * rate).toFixed(2)));
    }
  }, [debouncedValue, rate, setToAmount]);

  return (
    <div className="mt-auto flex">
      <input
        type="number"
        className="focus-visible:outline-none border-border border-b text-center text-5xl w-3/4"
        value={isLeft ? fromAmount : animatedValueState}
        onChange={(e) => {
          if (!isLeft) return;

          const val = e.target.value;
          if (val === "") {
            setFromAmount(0);
            return;
          }

          const numValue = parseFloat(val);
          if (!isNaN(numValue)) {
            setFromAmount(numValue);
          }
        }}
        disabled={!isLeft}
        min={0}
      />
      <div className="text-secondary-text m-auto text-6xl w-1/4">{code}</div>
    </div>
  );
};
