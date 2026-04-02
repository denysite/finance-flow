import type { IHistoryItem } from "@/shared/types/app.types";
import { ArrowRight } from "lucide-react";

import { useFlags } from "@/shared/api/flags/flags.query";
import { formatCurrency } from "@/shared/lib/formatCurrency";
import { CustomSuspense } from "@/shared/ui/CustomSuspense";
import { useEffect } from "react";
import toast from "react-hot-toast";
import styles from "./HistoryItem.module.scss";

export const HistoryItem = ({ item }: { item: IHistoryItem }) => {
  const {
    data: flagFromData,
    isLoading: isLoadingFrom,
    isError: isErrorFrom,
  } = useFlags(item.currencyFrom);

  const {
    data: flagToData,
    isLoading: isLoadingTo,
    isError: isErrorTo,
  } = useFlags(item.currencyTo);

  const flagFrom = flagFromData;
  const flagTo = flagToData;

  useEffect(() => {
    if (isErrorFrom) {
      toast.error(`Error loading flag for ${item.currencyFrom}`, {
        id: `flag-${item.currencyFrom}`,
      });
    }
  }, [isErrorFrom, item.currencyFrom]);

  useEffect(() => {
    if (isErrorTo) {
      toast.error(`Error loading flag for ${item.currencyTo}`, {
        id: `flag-${item.currencyTo}`,
      });
    }
  }, [isErrorTo, item.currencyTo]);

  return (
    <li className="mr-4 p-2 rounded-lg border border-border grid grid-cols-[1fr_auto_1fr] items-center">
      <div className={styles.block}>
        <div className={styles.imageBlock}>
          {isLoadingFrom || isErrorFrom ? (
            <CustomSuspense />
          ) : (
            <img className={styles.image} src={flagFrom} alt="" />
          )}
        </div>
        <div className={styles.currencyBlock}>
          <p>{item.currencyFrom}</p>
          <p className={styles.amount}>{formatCurrency(item.valueFrom)}</p>
        </div>
      </div>

      <div>
        <ArrowRight />
      </div>

      <div className={`${styles.block} justify-self-end`}>
        <div className={styles.currencyBlock}>
          <p>{item.currencyTo}</p>
          <p className={styles.amount}>{formatCurrency(item.valueTo)}</p>
        </div>

        <div className={styles.imageBlock}>
          {isLoadingTo || isErrorTo ? (
            <CustomSuspense />
          ) : (
            <img className={styles.image} src={flagTo} alt="" />
          )}
        </div>
      </div>
    </li>
  );
};
