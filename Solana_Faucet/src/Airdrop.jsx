import React, { useMemo, useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { DEV_NET_RPC_URL, TEST_NET_RPC_URL } from "./Net";
export default function Airdrop() {
  const [amount, setAmount] = useState(0);
  const [net, setNet] = useState("devnet");
  let { publicKey } = useWallet();
  const connection = new Connection(
    net === "devnet" ? DEV_NET_RPC_URL : TEST_NET_RPC_URL
  );
  async function requestAirdrop() {
    const LAMPORTS_PER_SOL = 1000000000;
    await connection.requestAirdrop(publicKey, amount * LAMPORTS_PER_SOL);
    alert("Airdropped " + amount + " SOL to " + publicKey.toBase58());
  }

  return (
    <div>
      <form
        action="submit"
        onSubmit={(e) => (e.preventDefault(), requestAirdrop())}
      >
        <input
          type="number"
          name="solAmount"
          onChange={(e) => (e.preventDefault(), setAmount(e.target.value))}
        />
        <button type="submit" onClick={() => setNet("devnet")}>
          Dev Net
        </button>
        <button type="submit" onClick={() => setNet("testnet")}>
          Test Net
        </button>
      </form>
    </div>
  );
}
