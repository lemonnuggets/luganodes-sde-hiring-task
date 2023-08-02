import { api } from "~/utils/api";
import Tooltip from "../Tooltip";
import styles from "./Card.module.css";

type Props = {
  address: string;
  uniqueId: string;
  close: (address: string, unique_id: string) => void;
};
export default function Card({ address, uniqueId, close }: Props) {
  const { data, isLoading, isError, isSuccess, refetch } =
    api.stake.getData.useQuery({
      address,
      uniqueId,
    });
  return (
    <div className={`${styles.card} min-h-100 relative rounded p-5`}>
      {isLoading && <div className="loading">Loading...</div>}
      {isError && <div className="error">Error</div>}
      {isSuccess && (
        <>
          <Tooltip content={data.address}>
            <div className="title">{data.displayName}</div>
          </Tooltip>
          <div className="users">Users: {data.users}</div>
          <div className="balance">
            Balance: {data.balance.toFixed(3)} {uniqueId}
          </div>
          <button
            className="close absolute right-3 top-3 cursor-pointer font-extrabold text-red-700"
            onClick={() => close(address, uniqueId)}
          >
            X
          </button>
          <button
            className="close absolute right-2 top-8 cursor-pointer text-xl font-extrabold text-green-700"
            onClick={() => {
              refetch().catch((err) => console.error(err));
            }}
          >
            ⟳
          </button>
        </>
      )}
    </div>
  );
}
