import { useState } from "react";
import styles from "./AdditionCard.module.css";
type Props = {
  onAdd: (address: string, uniqueId: string) => void;
};
export default function AdditionCard({ onAdd }: Props) {
  const [showForm, setShowForm] = useState(false);
  const [address, setAddress] = useState("");
  const [uniqueId, setUniqueId] = useState("DOT");
  return (
    <div
      className={`${styles.card} flex items-center justify-center rounded bg-slate-400 p-5`}
    >
      {!showForm && (
        <button
          className="h-full w-full text-4xl font-bold"
          onClick={() => {
            setShowForm(true);
          }}
        >
          +
        </button>
      )}
      {showForm && (
        <form
          className={`${styles.form} grid gap-2`}
          onSubmit={(e) => {
            e.preventDefault();
            onAdd(address, uniqueId);
          }}
        >
          <label htmlFor="address">Address</label>
          <input
            type="text"
            name="address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
          />
          <label htmlFor="unique_id">Asset ID</label>
          <select
            name="unique_id"
            value={uniqueId}
            onChange={(e) => setUniqueId(e.target.value)}
          >
            <option value="DOT">Polkadot - DOT</option>
            <option value="KSM">Kusama - KSM</option>
          </select>
          <input
            className="col-span-2 cursor-pointer border-2 border-black"
            type="submit"
            value="Add"
          />
        </form>
      )}
    </div>
  );
}
