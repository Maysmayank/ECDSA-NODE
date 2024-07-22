import server from "./server";
import {secp256k1} from "@noble/curves/secp256k1"
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";

function Wallet({ address, setAddress, balance, setBalance}) {
  async function onChange(evt) {
    const address = evt.target.value;
    setAddress(address);
    // address=toHex(secp256k1.getPublicKey(privateKey))
    // setAddress(address)

    
    if (address) {
      const {
        data: { balance },
      } = await server.get(`balance/${address}`);
      setBalance(balance);
    } else {
      setBalance(0);
    }
  }

  return (
    <div className="container wallet">
      <h1>Your Wallet</h1>

      <label>
       Your address 
        <input placeholder="Type an address, for example: 0x1" value={address} onChange={onChange}></input>
      </label>
      <div>
       Your Address: {address}
      </div>
      <div className="balance">Balance: {balance}</div>
    </div>
  );
}

export default Wallet;
