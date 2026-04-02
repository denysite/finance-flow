import { localStorageStore } from "@/shared/store/localStorage.store";
import type { IHistoryItem } from "@/shared/types/app.types";
import toast from "react-hot-toast";

export const historyParse = (): IHistoryItem[] => {
  const rawData = localStorageStore.get<IHistoryItem[]>(
    localStorageStore.history,
  );

  if (!rawData) return [];

  if (Array.isArray(rawData)) return rawData;

  if (typeof rawData === "string") {
    try {
      const parsed = JSON.parse(rawData);
      return Array.isArray(parsed) ? parsed : [];
    } catch (error) {
      toast.error(`Error parsing history ${error}`);
      return [];
    }
  }

  return [];
};
