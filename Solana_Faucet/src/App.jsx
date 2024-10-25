import "./App.scss";
import React from "react";
import Airdrop from "./Airdrop";
import {
  ConnectionProvider,
  WalletProvider,
  useWallet,
} from "@solana/wallet-adapter-react";
import {
  WalletModalProvider,
  WalletDisconnectButton,
  WalletMultiButton,
} from "@solana/wallet-adapter-react-ui";
function App() {
  return (
    <ConnectionProvider
      endpoint={
        "https://solana-mainnet.g.alchemy.com/v2/R9GU0hMRumdyZ1wQvpvDBXHBsGWzJM67"
      }
    >
      <WalletProvider wallets={[]} autoConnect>
        <WalletModalProvider>
          <WalletMultiButton />
          <WalletDisconnectButton />
          <h1>Solana Faucet</h1>
          <Airdrop />
        </WalletModalProvider>
      </WalletProvider>
    </ConnectionProvider>
  );
}

export default App;
