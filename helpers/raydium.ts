import {
  Keypair,
  Transaction,
  VersionedTransaction,
  sendAndConfirmTransaction,
} from "@solana/web3.js";
import { NATIVE_MINT } from "@solana/spl-token";
import { API_URLS } from "@raydium-io/raydium-sdk-v2";
import axios from "axios";

import { connection, fetchTokenAccountData } from "../config";
import type { SwapCompute } from "../type";
import { BN } from "@coral-xyz/anchor";
import loadKeypair from "../utils/loadKeypair";

//  if input is sol, output is token,
//  if input is token, output is sol

export default async function raydiumSwap(
  inputMint: string,
  outputMint: string,
  amount: number,
  slippage: number,
  owner: Keypair
): Promise<void> {
  const txVersion: string = "V0"; // or LEGACY
  const isV0Tx = txVersion === "V0";

  const [isInputSol, isOutputSol] = [
    inputMint === NATIVE_MINT.toBase58(),
    outputMint === NATIVE_MINT.toBase58(),
  ];

  const { tokenAccounts } = await fetchTokenAccountData();
  const inputTokenAcc = tokenAccounts.find(
    (a: any) => a.mint.toBase58() === inputMint
  )?.publicKey;
  const outputTokenAcc = tokenAccounts.find(
    (a: any) => a.mint.toBase58() === outputMint
  )?.publicKey;

  if (!inputTokenAcc && !isInputSol) {
    console.error("do not have input token account");
    return;
  }

  // get statistical transaction fee from api
  /**
   * vh: very high
   * h: high
   * m: medium
   */
  const { data } = await axios.get<{
    id: string;
    success: boolean;
    data: { default: { vh: number; h: number; m: number } };
  }>(`${API_URLS.BASE_HOST}${API_URLS.PRIORITY_FEE}`);

  const { data: swapResponse } = await axios.get<SwapCompute>(
    `${
      API_URLS.SWAP_HOST
    }/compute/swap-base-in?inputMint=${inputMint}&outputMint=${outputMint}&amount=${amount}&slippageBps=${
      slippage * 100
    }&txVersion=${txVersion}`
  );

  const { data: swapTransactions } = await axios.post<{
    id: string;
    version: string;
    success: boolean;
    data: { transaction: string }[];
  }>(`${API_URLS.SWAP_HOST}/transaction/swap-base-in`, {
    computeUnitPriceMicroLamports: String(data.data.default.h),
    swapResponse,
    txVersion,
    wallet: owner.publicKey.toBase58(),
    wrapSol: isInputSol,
    unwrapSol: isOutputSol, // true means output mint receive sol, false means output mint received wsol
    inputAccount: isInputSol ? undefined : inputTokenAcc?.toBase58(),
    outputAccount: isOutputSol ? undefined : outputTokenAcc?.toBase58(),
  });

  const allTxBuf = swapTransactions.data.map((tx) =>
    Buffer.from(tx.transaction, "base64")
  );
  const allTransactions = allTxBuf.map((txBuf) =>
    isV0Tx ? VersionedTransaction.deserialize(txBuf) : Transaction.from(txBuf)
  );

  let idx = 0;
  if (!isV0Tx) {
    for (const tx of allTransactions) {
      console.log(`${++idx} transaction sending...`);
      const transaction = tx as Transaction;
      transaction.sign(owner);
      const txId = await sendAndConfirmTransaction(
        connection,
        transaction,
        [owner],
        { skipPreflight: true }
      );
      console.log(`${++idx} transaction confirmed, txId: ${txId}`);
    }
  } else {
    for (const tx of allTransactions) {
      idx++;
      const transaction = tx as VersionedTransaction;
      transaction.sign([owner]);

      const txId = await connection.sendTransaction(
        tx as VersionedTransaction,
        { skipPreflight: true }
      );
      const { lastValidBlockHeight, blockhash } =
        await connection.getLatestBlockhash({
          commitment: "finalized",
        });
      console.log(`${idx} transaction sending..., txId: ${txId}`);
      await connection.confirmTransaction(
        {
          blockhash,
          lastValidBlockHeight,
          signature: txId,
        },
        "confirmed"
      );
      console.log(`${idx} transaction confirmed`);
    }
  }
}

(async () => {
  const inputMint = NATIVE_MINT.toBase58();
  const outputMint = "wDgTH1Fiw9z9xRCSz7hBxNZN6MvwSJTj37JwaaZpump";
  const amount = 100000;
  const slippage = 0.05;
  const owner = await loadKeypair();

  try {
    await raydiumSwap(inputMint, outputMint, amount, slippage, owner);
  } catch (error) {
    console.log(error);
  }
})();
