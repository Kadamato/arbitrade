import DLMM from "@meteora-ag/dlmm";

import { PublicKey, sendAndConfirmTransaction, Keypair } from "@solana/web3.js";
import { BN } from "@coral-xyz/anchor";
import { connection } from "../config";
import loadKeypair from "../utils/loadKeypair";

// You can get your desired pool address from the API https://dlmm-api.meteora.ag/pair/all

export default async function meteoraSwap(
  pairAddress: PublicKey,
  swapAmount: BN,
  owner: Keypair
): Promise<void> {
  const dlmmPool = await DLMM.create(connection, pairAddress);

  // Swap quote
  const swapYtoX = true;
  const binArrays = await dlmmPool.getBinArrayForSwap(swapYtoX);

  console.log("Bin arrays", binArrays);

  // const swapQuote = await dlmmPool.swapQuote(
  //   swapAmount,
  //   swapYtoX,
  //   new BN(10),
  //   binArrays
  // );

  // console.log("Swap quote", swapQuote);

  // Swap
  // const swapTx = await dlmmPool.swap({
  //   inToken: dlmmPool.tokenX.publicKey,
  //   binArraysPubkey: swapQuote.binArraysPubkey,
  //   inAmount: swapAmount,
  //   lbPair: dlmmPool.pubkey,
  //   user: owner.publicKey,
  //   minOutAmount: swapQuote.minOutAmount,
  //   outToken: dlmmPool.tokenY.publicKey,
  // });

  try {
    // const swapTxHash = await sendAndConfirmTransaction(connection, swapTx, [
    //   owner,
    // ]);
    // await connection.simulateTransaction(swapTx, [owner]);
  } catch (error) {
    console.log("🚀 ~ error:", JSON.parse(JSON.stringify(error)));
  }
}

(async () => {
  const pairAddress = new PublicKey(
    "BhxXk5y2zdtCEJzzBHWUrCCVxSNwn7faCzcvK9D4mvjN"
  );
  const swapAmount = new BN(100);
  const owner = await loadKeypair();

  await meteoraSwap(pairAddress, swapAmount, owner);
})();
