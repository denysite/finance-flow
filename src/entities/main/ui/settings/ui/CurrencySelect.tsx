import type { TAllCurrency } from "@/shared/api/currency/currency.types";
import { useFlags } from "@/shared/api/flags/flags.query";
import { useAppStore } from "@/shared/store/app.store";
import { useCallback, useMemo, useState } from "react"; // Додано useMemo

import clsx from "clsx";
import { ChevronDown, Search } from "lucide-react"; // Додано Search
import styles from "./CurrencySelect.module.scss";
import { CurrencySelectItem } from "./CurrencySelectItem";

interface IItem {
  options: TAllCurrency;
  isFrom?: boolean;
}

export const CurrencySelect = ({ options, isFrom = true }: IItem) => {
  const [isOpen, setIsOpen] = useState<boolean>(false);
  const [searchQuery, setSearchQuery] = useState<string>(""); // Стан для пошуку

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
      setSearchQuery(""); // Скидаємо пошук при виборі
    },
    [isFrom],
  );

  // Фільтрація опцій на основі пошуку
  const filteredOptions = useMemo(() => {
    if (!options) return [];
    return options.filter(
      (item) =>
        item[0].toLowerCase().includes(searchQuery.toLowerCase()) ||
        item[1].toLowerCase().includes(searchQuery.toLowerCase()),
    );
  }, [options, searchQuery]);

  const activeOption = options?.find((item) => item[0] === active);

  return (
    <div className="relative inline-grid">
      {/* 1. ПРИХОВАНИЙ БЛОК (для розрахунку ширини під найдовший текст) */}
      <div
        className="invisible pointer-events-none h-0 overflow-hidden col-start-1 row-start-1 flex flex-col"
        aria-hidden="true"
      >
        {options?.map((item) => (
          <div
            key={item[0]}
            className="flex items-center px-2 py-1 gap-3 text-xl"
          >
            <p className="whitespace-nowrap">
              {item[0]} - {item[1]}
            </p>
            <ChevronDown />
          </div>
        ))}
      </div>

      {/* 2. ГОЛОВНА КНОПКА */}
      <button
        onClick={() => setIsOpen((prev) => !prev)}
        className="col-start-1 row-start-1 w-full z-10 outline-none"
      >
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
          <ChevronDown
            className={clsx("transition shrink-0", { "rotate-180": isOpen })}
          />
        </div>
      </button>

      {/* 3. ВИПАДАЮЧИЙ СПИСОК */}
      <div
        className={clsx(
          "absolute top-full left-0 w-full z-999 transition-all mt-2 flex flex-col bg-background rounded-lg border border-border shadow-lg",
          {
            "max-h-80 opacity-100 visible": isOpen,
            "max-h-0 opacity-0 invisible overflow-hidden border-none": !isOpen,
          },
        )}
      >
        {/* ПОЛЕ ПОШУКУ всередині списку */}
        <div className="p-2 border-b rounded-lg border-border sticky top-0 bg-background z-10">
          <div className="relative flex items-center">
            <Search className="absolute left-2 w-4 h-4 text-muted-foreground" />
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="w-full pl-8 pr-2 py-1.5 text-base border rounded-md focus:outline-none focus:ring-1 focus:ring-primary bg-transparent placeholder:text-text"
              onClick={(e) => e.stopPropagation()} // Щоб не закривався список при кліку на інпут
            />
          </div>
        </div>

        {/* СПИСОК ЕЛЕМЕНТІВ */}
        <ul className="flex flex-col w-full p-1 overflow-y-auto custom-scrollbar">
          {filteredOptions.length > 0 ? (
            filteredOptions
              .filter((item) => item[0] !== active)
              .map((item) => (
                <CurrencySelectItem
                  key={item[0]}
                  code={item[0]}
                  label={item[1]}
                  onClick={changeCurrency}
                />
              ))
          ) : (
            <li className="p-3 text-center text-sm text-muted-foreground">
              Nothing found
            </li>
          )}
        </ul>
      </div>
    </div>
  );
};
