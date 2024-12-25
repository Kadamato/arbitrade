import fs from "fs";
import { Keypair } from "@solana/web3.js";

export default async function loadKeypair(): Promise<Keypair> {
  const secretKey = JSON.parse(
    fs.readFileSync("/home/kadama/.config/solana/id.json", "utf8")
  );

  const keypair = Keypair.fromSecretKey(Uint8Array.from(secretKey));

  return keypair;
}
