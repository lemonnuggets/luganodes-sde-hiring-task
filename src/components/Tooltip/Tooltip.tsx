import styles from "./Tooltip.module.css";
type Props = {
  content: string;
  children: React.ReactNode;
};
const Tooltip = ({ content, children }: Props) => {
  return (
    <div className={`${styles.tooltipWrapper} w-fit`} data-title={content}>
      {/* <div className={`${styles.tooltip} rounded-sm px-2`}>{content}</div> */}
      {children}
    </div>
  );
};

export default Tooltip;
