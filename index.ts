import { BN } from "@coral-xyz/anchor";

import getPricePairAPI from "./api/getPricePair";
import findPricePairBest from "./utils/findPriceBest";
import meteora from "./helpers/meteora";
import loadKeypair from "./utils/loadKeypair";
import { PublicKey } from "@solana/web3.js";
import { addTokenToDB, getAllTokens } from "./db/mongodb";
import { DexObject } from "./type";
import filterTokens from "./utils/filterToken";
import dexController from "./utils/dexController";

(async () => {
  const tokenAddress = "2zMMhcVQEXDtdE6vsFS7S7D5oUodfJHE8vd1gnBouauv";
  const tokens = (await getPricePairAPI(tokenAddress)) as DexObject[];
  const filteredTokens = filterTokens(tokens);
  const [tokenBoughtOnDex, tokenSoldOnDex] = findPricePairBest(filteredTokens);

  if (tokenBoughtOnDex && tokenSoldOnDex) {
    const dexToBuy = dexController(tokenBoughtOnDex as DexObject);
    const dexToSell = dexController(tokenSoldOnDex as DexObject);
  }




  
})();

// find token profit from all tokens on 3 chains

// const tokenAddresses = await getAllTokens();
// const provisionalProfit = [];
// console.log("Loading tokens...");
// for await (const ta of tokenAddresses) {
//   const tokenAddress = ta.tokenAddress;
//   const tokenPrices = (await getPricePairAPI(tokenAddress)) as DexObject[];
//   const filteredTokens = filterTokens(tokenPrices);
//   const [tokenLowChain, tokenHighChain] = findPricePairBest(filteredTokens);
//   if (tokenLowChain && tokenHighChain) {
//     const lowPrice = (tokenLowChain as DexObject).priceUsd;
//     const highPrice = (tokenHighChain as DexObject).priceUsd;
//     const profit = parseFloat(highPrice) - parseFloat(lowPrice);
//     provisionalProfit.push({
//       profit: profit.toFixed(10),
//       tokenLowChain,
//       tokenHighChain,
//     });
//   }
// }
// const provisionalProfitSorted = provisionalProfit.sort(
//   (a, b) => parseFloat(b.profit) - parseFloat(a.profit)
// );
// console.log(provisionalProfitSorted);
