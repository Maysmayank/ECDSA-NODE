import Wallet from "./Wallet";
import Transfer from "./Transfer";
import "./App.scss";
import { useState } from "react";
import {keccak256} from 'ethereum-cryptography/keccak.js'
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

function App() {
  const [balance, setBalance] = useState(0);
  const [address, setAddress] = useState("");
  const [recipient,setRecipient]=useState("")
  const [signature,setSignature]=useState(null);

  function hashMessage(message){
    let bytes=utf8ToBytes(message);  //uintarray 
    let hash=keccak256(bytes);      
    return hash             
  }

  function document(){
    return hashMessage(JSON.stringify({
      sender_address:address.toLowerCase(),
      recipient_address: recipient.toLowerCase(),
      sending_balance:parseInt(balance),
    }))
  }
  return (
    <div className="app">
      <Wallet
        balance={balance}
        setBalance={setBalance}
        address={address}
        setAddress={setAddress}
      />
      <Transfer balance={balance} setBalance={setBalance} address={address} recipient={recipient}/>
    </div>
  );
}

export default App;
