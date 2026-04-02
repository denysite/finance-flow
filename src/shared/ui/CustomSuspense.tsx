import styles from "./CustomSuspense.module.scss";

export const CustomSuspense = ({ customClass }: { customClass?: string }) => {
  return (
    <div
      className={`bg-border/80 w-20 h-10 ${styles.animateCustomPulse} ${customClass}`}
    ></div>
  );
};
