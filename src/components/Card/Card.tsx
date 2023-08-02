import Image from "next/image";
import { assets } from "~/data/assets";
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
  const asset = assets[uniqueId as keyof typeof assets];
  return (
    <div className={`${styles.card} min-h-100 relative rounded px-10 py-5`}>
      {isLoading && <div className="loading">Loading...</div>}
      {isError && <div className="error">Error</div>}
      {isSuccess && (
        <>
          <button
            className="close absolute right-3 top-3 cursor-pointer font-extrabold hover:text-red-600"
            onClick={() => close(address, uniqueId)}
          >
            X
          </button>
          <button
            className="close absolute left-3 top-3 cursor-pointer text-xl font-extrabold hover:text-green-600"
            onClick={() => {
              refetch().catch((err) => console.error(err));
            }}
          >
            ⟳
          </button>
          <div className="grid grid-cols-5">
            <div className="left col-span-2 flex flex-col items-start">
              <div className="flex h-full flex-col items-stretch justify-between gap-5">
                <Image
                  src={asset.logoURI}
                  width={150}
                  height={150}
                  alt={`${asset.name} logo`}
                  className="margin-auto"
                ></Image>
                <div className="label text-center text-3xl font-bold uppercase">
                  {asset.name}
                </div>
              </div>
            </div>
            <div className="right col-span-3 flex w-full flex-col justify-between">
              <Tooltip content={data.address}>
                <div
                  className={`${styles.title} mb-4 overflow-hidden overflow-ellipsis text-4xl`}
                >
                  {data.displayName ?? data.address}
                </div>
              </Tooltip>
              <div className="data flex flex-col gap-5">
                <div className="users grid grid-cols-5 items-center text-xl">
                  <div className="label col-span-2 text-2xl">Users</div>
                  <div className={`${styles.content} col-span-3 px-2 py-3`}>
                    {data.users}
                  </div>
                </div>
                <div className="balance grid grid-cols-5 items-center text-xl">
                  <div className="label col-span-2 text-2xl">Balance</div>
                  <div className={`${styles.content} col-span-3 px-2 py-3`}>
                    {data.balance.toFixed(3)} {uniqueId}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </div>
  );
}
