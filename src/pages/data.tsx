import { api } from "~/utils/api";

export default function Data() {
  const address = "1vTaLKEyj2Wn9xEkUGixBkVXJAd4pzDgXzz9CuVjhVqhHRQ";
  const {
    data: polkadotInfo,
    isLoading,
    isError,
    isSuccess,
  } = api.subscan.polkadot.useQuery({
    address,
  });

  return (
    <>
      {isLoading && <div className="loading">Loading...</div>}
      {isError && <div className="error">Error</div>}
      {isSuccess && (
        <div className="card">
          <div className="title">{polkadotInfo.displayName}</div>
          <div className="users">{polkadotInfo.users}</div>
          <div className="balance">{polkadotInfo.balance}</div>
        </div>
      )}
    </>
  );
}
