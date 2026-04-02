import { useFlags } from "@/shared/api/flags/flags.query";

import style from "./CurrencySelect.module.scss";

interface IProps {
  code: string;
  label: string;
  onClick: (currency: string) => void;
}

export const CurrencySelectItem = ({ code, label, onClick }: IProps) => {
  const { data: flag } = useFlags(code);

  return (
    <button
      // Додано w-full та text-left для коректного позиціонування
      className={`w-full text-left flex items-center gap-3 py-2 not-last:border-b border-border`}
      onClick={() => onClick(code)}
    >
      <div className={style.imageBlock}>
        {flag && <img className={`${style.image}`} src={flag} alt="" />}
      </div>
      <p className="whitespace-nowrap">
        {code} - {label}
      </p>
    </button>
  );
};
