import { useAppStore } from "@/shared/store/app.store";
import { Moon, SidebarClose, SidebarOpen, Sun } from "lucide-react";
import darkLogo from "/dark-logo.svg";
import lightLogo from "/light-logo.svg";

export const Header = () => {
  const { switchTheme, theme, toggleIsHistoryOpen, isHistoryOpen } =
    useAppStore();

  const iconSize = 35;

  return (
    <header className="flex items-center justify-between gap-15 border-b border-border pb-2 mb-2">
      <div>
        <button
          onClick={switchTheme}
          className="text-gray-400 transition hover:text-accent/80"
        >
          {theme === "dark" ? (
            <Sun size={iconSize} />
          ) : (
            <Moon size={iconSize} />
          )}
        </button>
      </div>

      <div className="max-w-13 aspect-square">
        <img
          src={`${theme === "dark" ? darkLogo : lightLogo}`}
          alt=""
          className="w-full"
        />
      </div>

      <div className="max-lg:hidden">
        <button
          aria-label="Switch theme"
          onClick={toggleIsHistoryOpen}
          className="text-gray-400 transition hover:text-accent/80"
        >
          {isHistoryOpen ? (
            <SidebarClose size={iconSize} />
          ) : (
            <SidebarOpen size={iconSize} />
          )}
        </button>
      </div>
    </header>
  );
};
