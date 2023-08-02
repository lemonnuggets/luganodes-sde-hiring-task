import Head from "next/head";
import { useState } from "react";
import AdditionCard from "~/components/AdditionCard";
import Card from "~/components/Card";

type StakeInfo = {
  address: string;
  uniqueId: string;
};

export default function Home() {
  const [stakeInfos, setStakeInfos] = useState<Array<StakeInfo>>([
    {
      address: "1vTaLKEyj2Wn9xEkUGixBkVXJAd4pzDgXzz9CuVjhVqhHRQ",
      uniqueId: "DOT",
    },
    {
      address: "E8MByjWbS49hmzFM1U5rvFJES1Xgz1TSBAZLiYqZQiFTNUY",
      uniqueId: "KSM",
    },
  ]);
  return (
    <>
      <Head>
        <title>Luganodes</title>
        <meta
          name="description"
          content="Total Stake Counter application that allows users to track the total stake for three different blockchain networks: Cardano, Polkadot, and Kusama."
        />
        <link rel="icon" href="/favicon.ico" />
      </Head>
      <h1 className="title mt-20 text-center text-2xl font-bold">
        Luganodes Stake Counter
      </h1>
      <main className="grid grid-cols-4 gap-4 p-8">
        {stakeInfos.map((stakeInfo) => (
          <Card
            key={`${stakeInfo.address}-${stakeInfo.uniqueId}`}
            address={stakeInfo.address}
            uniqueId={stakeInfo.uniqueId}
          ></Card>
        ))}
        <AdditionCard
          onAdd={(addr, uniq) => {
            setStakeInfos((prev) => [
              ...prev,
              {
                address: addr,
                uniqueId: uniq,
              },
            ]);
          }}
        ></AdditionCard>
      </main>
    </>
  );
}
