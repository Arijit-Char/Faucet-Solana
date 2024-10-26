import { ed25519 } from "@noble/curves/ed25519";
import { useWallet } from "@solana/wallet-adapter-react";
import bs58 from "bs58";
import React, { useState } from "react";
import "./SignMessage.scss";
export default function SignMessage() {
  const [message, setMessage] = useState("");
  const { publicKey, signMessage } = useWallet();

  async function onClick() {
    if (!publicKey) throw new Error("Wallet not connected!");
    if (!signMessage)
      throw new Error("Wallet does not support message signing!");
    const encodedMessage = new TextEncoder().encode(message);
    const signature = await signMessage(encodedMessage);

    if (!ed25519.verify(signature, encodedMessage, publicKey.toBytes()))
      throw new Error("Message signature invalid!");
    alert("success", `Message signature: ${bs58.encode(signature)}`);
  }

  return (
    <div className="signMessage">
      <div className="heading">
        <h1>Sign Message</h1>
        <p style={{color:"red"}}>Enter Your Message</p>
      </div>
      <div className="formVal">
        <input
          type="text"
          name="message"
          value={message}
          onChange={(e) => setMessage(e.target.value)}
        />
        <button onClick={onClick}>Sign Message</button>
      </div>
    </div>
  );
}
