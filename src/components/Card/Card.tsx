import { api } from "~/utils/api";
import Tooltip from "../Tooltip";
import styles from "./Card.module.css";

type Props = {
  address: string;
  uniqueId: string;
};
export default function Card({ address, uniqueId }: Props) {
  const { data, isLoading, isError, isSuccess } = api.stake.getData.useQuery({
    address,
    uniqueId,
  });

  return (
    <div className={`${styles.card} min-h-100 rounded p-5`}>
      {isLoading && <div className="loading">Loading...</div>}
      {isError && <div className="error">Error</div>}
      {isSuccess && (
        <>
          <Tooltip content={data.address}>
            <div className="title">{data.displayName}</div>
          </Tooltip>
          <div className="users">{data.users}</div>
          <div className="balance">{data.balance}</div>
        </>
      )}
    </div>
  );
}
