import Navbar from "./components/Navbar";
import { React, useState, useEffect } from "react";
import { IoIosCreate } from "react-icons/io";
import { FiSend } from "react-icons/fi";
import { Buffer } from "buffer";
import { IoKeyOutline } from "react-icons/io5";

import {
  Connection,
  Keypair,
  LAMPORTS_PER_SOL,
  PublicKey,
  SystemProgram,
  Transaction,
  clusterApiUrl,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
window.Buffer = Buffer;
const url = "https://solscan.io/tx/";
export default function App() {
  const [walletadd, setwalletadd] = useState("");
  const [Con, setCon] = useState();
  const [Fromadd, setFromadd] = useState("");
  const [keypair, setKeyPair] = useState();
  useEffect(() => {
    let connection = new Connection(clusterApiUrl("devnet"));
    console.log("Connected to Solana Devnet Cluster ");
    setCon(connection);
  }, []);

  const CreateKeypair = async () => {
    let keypr = Keypair.generate();
    setKeyPair(keypr);
    setFromadd(keypr.publicKey.toBase58());
    console.log(`New Solana keypair Created 
    PublicKey : ${Fromadd.toString()}`);
    try {
      await Con.requestAirdrop(
        new PublicKey(Fromadd.toString()),
        4 * LAMPORTS_PER_SOL
      );
      console.log(`SOl Tokens  Airdropped  to ${Fromadd.toString()}`);
    } catch (error) {
      console.log(`Error while requesting Airdrop to ${Fromadd.toString()}`);
      console.log(error);
    }
  };
  const TransferFunds = async () => {
    try {
      let transaction = new Transaction();
      const instruction = SystemProgram.transfer({
        fromPubkey: new PublicKey(Fromadd.toString()),
        toPubkey: new PublicKey(walletadd),
        lamports: 2 * LAMPORTS_PER_SOL,
      });
      transaction.add(instruction);

      const signature = await sendAndConfirmTransaction(Con, transaction, [
        keypair,
      ]);
      console.log("Transferred Successfully");
      console.log("Click this link SolScan:  " + url + signature);
    } catch (err) {
      console.log(
        `Error while transferring sol Token to ${Fromadd.toString()}`
      );
      console.log(err);
    }
  };

  return (
    <>
      <div className="bg-gray-950 w-full h-screen">
        <Navbar setwalletadd={setwalletadd} />
        <div className="flex justify-between items-center  text-white w-1/2 mx-auto my-10 px-2">
          <button
            onClick={CreateKeypair}
            className="bg-gray-400 px-8 py-6 rounded-xl flex justify-between items-center hover:scale-105"
          >
            <IoKeyOutline
              className="text-[#047aed] hover:scale-105"
              size={35}
            />
            <span> create an account</span>
          </button>
          <button
            onClick={TransferFunds}
            className="bg-gray-400 px-8 py-6 rounded-xl flex justify-between items-center hover:scale-105"
          >
            <FiSend className="text-[#047aed] hover:scale-105" size={35} />
            Transfer Funds
          </button>
        </div>
      </div>
    </>
  );
}
