import React, { useState } from "react";
import "./SendSol.scss";
import { useConnection, useWallet } from "@solana/wallet-adapter-react";
import {
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  Connection,
} from "@solana/web3.js";

export default function SendSol() {
  const [to, setTo] = useState("");
  const [amount, setAmount] = useState(0);
  const wallet = useWallet();
  const { connection } = useConnection();
  const { publicKey } = useWallet();

  async function sendSolana() {
    if (!publicKey) {
      alert("Please connect wallet first");
      return;
    }
    if (!to || !amount) {
      alert("Please enter all fields");
      return;
    }

    if (amount < 0) {
      alert("Amount should be greater than 0");
      return;
    }
    alert("Sending " + amount + " SOL to " + to);
    try {
      const transaction = new Transaction();
      transaction.add(
        SystemProgram.transfer({
          fromPubkey: publicKey,
          toPubkey: new PublicKey(to),
          lamports: amount * LAMPORTS_PER_SOL,
        })
      );
      await wallet.sendTransaction(transaction, connection);
      alert("Sent " + amount + " SOL to " + to);
    } catch (error) {
      alert("Failed to send " + amount + " SOL to " + to);
    }
  }

  return (
    <div className="SendSol">
      <div className="heading">Send Solana</div>
      <div style={{color:"red"}}> Enter Valid Solana Address </div>
      <div className="formComp">
        <form
          action="sendsolana"
          onSubmit={(e) => (e.preventDefault(), sendSolana())}
        >
          <input
            type="text"
            name="to"
            value={to}
            onChange={(e) => setTo(e.target.value)}
          />
          <input
            type="number"
            name="amount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
          />

          <button type="submit">Send Solana</button>
        </form>
      </div>
    </div>
  );
}
