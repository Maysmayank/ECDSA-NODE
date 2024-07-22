import { secp256k1 } from '@noble/curves/secp256k1';
import { hexToBytes, toHex, utf8ToBytes } from "ethereum-cryptography/utils.js";
import { keccak256 } from "ethereum-cryptography/keccak.js";
let privateKey=secp256k1.utils.randomPrivateKey();
let publicKey=secp256k1.getPublicKey(privateKey)
function getAddress(publicKey){                     // keccak256 works on uintArray dont put string
    return (keccak256(publicKey.slice(1)).slice(-20))
}
let address=toHex(getAddress(publicKey))

console.log("privateKey is : ",toHex(privateKey ));
console.log("Public Key is : ",toHex(publicKey) );
console.log("address derived from publicKey is : ",address);  // it will be wallet address in this project or can use public key but not using it just for now
