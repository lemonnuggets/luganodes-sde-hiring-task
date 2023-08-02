import styles from "./Tooltip.module.css";
type Props = {
  content: string;
  children: React.ReactNode;
};
const Tooltip = ({ content, children }: Props) => {
  return (
    <div className={`${styles.tooltipWrapper} w-fit`}>
      <div className={styles.tooltip}>{content}</div>
      {children}
    </div>
  );
};

export default Tooltip;
