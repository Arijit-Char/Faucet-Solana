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
import Balance from "./Components/Balance/Balance";
import SendSol from "./Components/SendSol/SendSol";
import SignMessage from "./Components/SignMessage/SignMessage";
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
               <button><Link to="/">Airdrop</Link></button> 
                <button><Link to="/balance">Wallet balance</Link></button>
                <button><Link to="/sendsol">Send Sol</Link></button>
                <button><Link to="/signmessage">Sign Message</Link></button>
              </div>
              <div className="connectDisconnect">
                {" "}
                <WalletMultiButton />
                <WalletDisconnectButton />
              </div>
            </div>

            <Routes>
              <Route path="/" element={<Airdrop />} />
              <Route path="/balance" element={<Balance />} />
              <Route path="/sendsol" element={<SendSol />} />
              <Route path="/signmessage" element={<SignMessage />} />
            </Routes>
          </WalletModalProvider>
        </WalletProvider>
      </ConnectionProvider>
    </Router>
  );
}

export default App;
