import { useAppStore } from "@/shared/store/app.store";
import { localStorageStore } from "@/shared/store/localStorage.store";
import type { IHistoryItem } from "@/shared/types/app.types";

export const addHistory = (item: IHistoryItem) => {
  localStorage.setItem(
    localStorageStore.history,
    JSON.stringify([
      ...JSON.parse(localStorageStore.get(localStorageStore.history) || "[]"),
      item,
    ]),
  );

  const currentHistory = useAppStore.getState().history;

  useAppStore.getState().setHistory([item, ...currentHistory]);
};
