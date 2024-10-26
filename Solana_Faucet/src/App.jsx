import "./App.scss";
import React from "react";
import Airdrop from "./Components/Airdrop/Airdrop";
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
import { MAIN_NET_RPC_URL } from "./Net";
function App() {
  return (
    <Router>
      <ConnectionProvider
        endpoint={
          MAIN_NET_RPC_URL
        }
      >
        <WalletProvider wallets={[]} autoConnect>
          <WalletModalProvider>
            <div className="header">
              <div className="headerMenu">
                <h3>SOLConnect </h3>
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
