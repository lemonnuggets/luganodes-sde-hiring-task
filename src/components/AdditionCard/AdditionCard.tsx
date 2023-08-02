import { useState } from "react";
type Props = {
  onAdd: (address: string, uniqueId: string) => void;
};
export default function AdditionCard({ onAdd }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [uniqueId, setUniqueId] = useState("DOT");
  return (
    <div className="card flex items-center justify-center rounded bg-slate-400 p-5">
      {!showForm && (
        <button
          className="m-auto w-1/2"
          onClick={() => {
            setShowForm(true);
          }}
        >
          +
        </button>
      )}
      {showForm && (
        <form
          className="form"
          onSubmit={(e) => {
            e.preventDefault();
            onAdd(address, uniqueId);
          }}
        >
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <select
            name="unique_id"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
          >
            <option value="DOT">Polkadot - DOT</option>
            <option value="KSM">Kusama - KSM</option>
          </select>
          <input type="submit" value="Add" />
        </form>
      )}
    </div>
  );
}
