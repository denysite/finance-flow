import type { TAllCurrency } from "@/shared/api/currency/currency.types";
import { useFlags } from "@/shared/api/flags/flags.query";
import { useAppStore } from "@/shared/store/app.store";
import { useCallback, useState } from "react";

import clsx from "clsx";
import { ChevronDown } from "lucide-react";
import styles from "./CurrencySelect.module.scss";
import { CurrencySelectItem } from "./CurrencySelectItem";

interface IItem {
  options: TAllCurrency;
  isFrom?: boolean;
}

export const CurrencySelect = ({ options, isFrom = true }: IItem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const { currencyFrom, currencyTo } = useAppStore();

  const active = isFrom ? currencyFrom : currencyTo;
  const { data: activeFlag } = useFlags(active);

  const changeCurrency = useCallback(
    (currency: string) => {
      if (isFrom) {
        useAppStore.getState().setCurrencyFrom(currency);
      } else {
        useAppStore.getState().setCurrencyTo(currency);
      }
      setIsOpen(false);
    },
    [isFrom],
  );

  const activeOption = options?.find((item) => item[0] === active);

  return (
    // 1. Контейнер стає inline-grid
    <div className="relative inline-grid">
      {/* 2. ПРИХОВАНИЙ БЛОК: розтягує ширину контейнера під найдовший текст */}
      <div
        className="invisible pointer-events-none h-0 overflow-hidden col-start-1 row-start-1 flex flex-col"
        aria-hidden="true"
      >
        {options?.map((item) => (
          <div
            key={item[0]}
            className="flex items-center px-2 py-1 gap-3 border border-transparent text-xl"
          >
            <div className={styles.imageBlock} />
            <p className="whitespace-nowrap">
              {item[0]} - {item[1]}
            </p>
            {/* Додаємо ChevronDown, щоб врахувати його ширину та відступи */}
            <ChevronDown />
          </div>
        ))}
      </div>

      {/* 3. ГОЛОВНА КНОПКА: лежить поверх прихованого блоку (col-start-1 row-start-1) і займає 100% (w-full) */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="col-start-1 row-start-1 w-full z-10 outline-none"
      >
        {/* Додано w-full, justify-between та bg-background (щоб не просвічувався фон) */}
        <div className="flex items-center justify-between w-full px-2 py-1 gap-1 border border-border rounded-lg text-xl bg-background">
          <div className="flex items-center gap-3">
            <div className={styles.imageBlock}>
              {activeFlag && (
                <img src={activeFlag} alt="" className={styles.image} />
              )}
            </div>

            <p className="whitespace-nowrap">
              {active} {activeOption ? `- ${activeOption[1]}` : ""}
            </p>
          </div>

          <div>
            <ChevronDown
              className={clsx("transition shrink-0", { "rotate-180": isOpen })}
            />
          </div>
        </div>
      </button>

      {/* 4. ВИПАДАЮЧИЙ СПИСОК: w-full змушує його наслідувати ширину Grid-контейнера */}
      <div
        className={clsx(
          "absolute top-full left-0 w-full z-999 transition-all overflow-hidden mt-2 custom-scrollbar",
          {
            // Додано bg-background, щоб список не був прозорим
            "h-67.5 border border-border overflow-y-scroll rounded-lg bg-background":
              isOpen,
            "h-0 border-none": !isOpen,
          },
        )}
      >
        <ul className="flex flex-col w-full p-2">
          {options
            ?.filter((item) => item[0] !== active)
            .map((item) => (
              <CurrencySelectItem
                key={item[0]}
                code={item[0]}
                label={item[1]}
                onClick={changeCurrency}
              />
            ))}
        </ul>
      </div>
    </div>
  );
};
