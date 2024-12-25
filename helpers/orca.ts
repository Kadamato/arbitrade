// import { setWhirlpoolsConfig, swapInstructions } from "@orca-so/whirlpools";
// import {
//   createSolanaRpc,
//   devnet,
//   address,
//   Keypair,
//   PublicKey,
// } from "@solana/web3.js";
// import { loadWallet } from "./utils";
// import BN from "bn.js";

// export default async function orcaSwap(
//   pairAddress: PublicKey,
//   swapAmount: BN,
//   owner: Keypair
// ): Promise<void> {
//   await setWhirlpoolsConfig("solanaDevnet");
//   const devnetRpc = createSolanaRpc(devnet("https://api.devnet.solana.com"));
//   const wallet = await loadWallet(); // CAUTION: This wallet is not persistent.
//   const whirlpoolAddress = address(
//     "3KBZiL2g8C7tiJ32hTv5v3KM7aK9htpqTw4cTXz1HvPt"
//   );
//   const mintAddress = address("BRjpCHtyQLNCo8gqRUr8jtdAj5AjPYQaoqbvcZiHok1k");
//   const inputAmount = 100000;

//   const { instructions, quote } = await swapInstructions(
//     devnetRpc,
//     { inputAmount, mint: mintAddress },
//     whirlpoolAddress,
//     100,
//     wallet
//   );

//   console.log(`Quote estimated token out: ${quote.tokenEstOut}`);
//   console.log(`Number of instructions:, ${instructions.length}`);
// }
