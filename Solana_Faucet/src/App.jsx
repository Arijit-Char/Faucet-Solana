import "./App.scss";
import React from "react";
import Airdrop from "./Components/Airdrop";
import {
  ConnectionProvider,
  WalletProvider,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
function App() {
  return (
    <Router>
      <ConnectionProvider
        endpoint={
          "https://solana-mainnet.g.alchemy.com/v2/R9GU0hMRumdyZ1wQvpvDBXHBsGWzJM67"
        }
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="header">
              <div className="headerMenu">
               <button><Link to="/">Home</Link></button> 
                <button><Link to="/balance">Wallet balance</Link></button>
                <button><Link to="/sendsol">Send Sol</Link></button>
              </div>
              <div className="connectDisconnect">
                {" "}
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </div>

            <Routes>
              <Route path="/" element={<Airdrop />} />
            </Routes>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  );
}

export default App;
