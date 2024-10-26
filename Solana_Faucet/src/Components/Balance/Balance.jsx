import React, { useState } from "react";
import { DEV_NET_RPC_URL, MAIN_NET_RPC_URL, TEST_NET_RPC_URL } from "../../Net";
import { Connection, LAMPORTS_PER_SOL } from "@solana/web3.js";
import { useWallet } from "@solana/wallet-adapter-react";
import "./Balance.scss";

export default function Balance() {
  const [mainNetBalance, setMainNetBalance] = useState(0);
  const [testNetBalance, setTestNetBalance] = useState(0);
  const [devNetBalance, setDevNetBalance] = useState(0);
  const [buttonText, setButtonText] = useState("Get Your Balance");
  const { publicKey } = useWallet();
  const mainNetConnection = new Connection(MAIN_NET_RPC_URL);
  const devNetConnection = new Connection(DEV_NET_RPC_URL);
  const testNetConnection = new Connection(TEST_NET_RPC_URL);

  const getBalance = async () => {
    if (!publicKey) {
      alert("Please connect your wallet first!");
      return;
    }
alert("Fetching balance...");
    const mainNetBalance = await mainNetConnection.getBalance(publicKey);
    const testNetBalance = await testNetConnection.getBalance(publicKey);
    const devNetBalance = await devNetConnection.getBalance(publicKey);

    setMainNetBalance(mainNetBalance / LAMPORTS_PER_SOL);
    setTestNetBalance(testNetBalance / LAMPORTS_PER_SOL);
    setDevNetBalance(devNetBalance / LAMPORTS_PER_SOL);
    setButtonText("Refresh");
    alert("Balance updated successfully!");
  };

  return (
    <div className="balance-container">
      <button className="balance-btn" onClick={getBalance}>
        {buttonText}
      </button>
      <div className="balance-details">
        <h3>Main Net Balance: <span>{mainNetBalance}</span> SOL</h3>
        <h3>Dev Net Balance: <span>{devNetBalance}</span> SOL</h3>
        <h3>Test Net Balance: <span>{testNetBalance}</span> SOL</h3>
      </div>
    </div>
  );
}
