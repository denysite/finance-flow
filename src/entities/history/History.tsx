import { useAppStore } from "@/shared/store/app.store";
import { HistoryIcon } from "lucide-react";
import { HistoryItem } from "./ui/HistoryItem";

export const History = () => {
  const { history, isHistoryOpen } = useAppStore();

  return (
    <div
      className={`section border-l border-border border-b flex flex-col ${isHistoryOpen ? "w-1/4" : "w-0 p-0! border-0! "} transition-all overflow-hidden`}
    >
      <p className="text-4xl text-center mt-5 flex items-center justify-center gap-2">
        <HistoryIcon size={30} />
        History
      </p>

      <ul
        className={`flex-1 flex flex-col mt-5 gap-3 overflow-y-scroll custom-scrollbar ${isHistoryOpen ? "opacity-100" : "opacity-0"}`}
      >
        {history.map((item) => (
          <HistoryItem key={item.id} item={item} />
        ))}
      </ul>
    </div>
  );
};
