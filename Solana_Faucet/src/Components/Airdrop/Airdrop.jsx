import React, { useState } from "react";
import { useWallet } from "@solana/wallet-adapter-react";
import { Connection } from "@solana/web3.js";
import { DEV_NET_RPC_URL, TEST_NET_RPC_URL } from "../../Net";
import "./Airdrop.scss";

export default function Airdrop() {
  const [amount, setAmount] = useState(0);
  const [net, setNet] = useState("devnet");
  const { publicKey } = useWallet();
  
  const connection = new Connection(
    net === "devnet" ? DEV_NET_RPC_URL : TEST_NET_RPC_URL
  );

  async function requestAirdrop(e) {
    e.preventDefault();
    
    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }
    
    const parsedAmount = parseInt(amount, 10);
    if (isNaN(parsedAmount) || parsedAmount < 1 || parsedAmount > 5) {
      alert("Please enter a valid amount between 1 and 5.");
      return;
    }

    try {
      const LAMPORTS_PER_SOL = 1000000000;
      await connection.requestAirdrop(publicKey, parsedAmount * LAMPORTS_PER_SOL);
      alert(`Airdropped ${parsedAmount} SOL to ${publicKey.toBase58()}`);
    } catch (error) {
      console.error("Airdrop failed:", error);
      alert("Airdrop failed. Please try again.");
    }
  }

  return (
    <div className="airdrop">
      <div className="heading">
        <h1>Solana Faucet</h1>
        <h2>Fuel up your Solana Devnet and Testnet with the ultimate airdrop experience!</h2>
        <h4>Enter a Value Less Than or Equal to 5</h4>
      </div>
      
      <div className="form">
        <form onSubmit={requestAirdrop}>
          <input
            type="number"
            name="solAmount"
            value={amount}
            onChange={(e) => setAmount(e.target.value)}
            min="1"
            max="5"
            placeholder="Amount"
          />
          
          <div className="buttons">
            <button type="submit" onClick={() => setNet("devnet")}>
              Dev Net
            </button>
            <button type="submit" onClick={() => setNet("testnet")}>
              Test Net
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
