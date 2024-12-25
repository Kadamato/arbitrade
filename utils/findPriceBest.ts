import type { DexObject } from "../type";

export default function findPricePairBest(tokens: DexObject[]) {
  if (!Array.isArray(tokens) || tokens.length === 0) {
    throw new Error("Invalid input: prices must be a non-empty array.");
  }

  if (tokens.length === 1) {
    throw new Error("Token available in only one dex.");
  }

  let lowPrice: number | null = null;
  let highPrice: number | null = null;

  // token info
  let tokenBoughtOnDex: DexObject | null = null;
  let tokenSoldOnDex: DexObject | null = null;

  tokens.forEach((token) => {
    const price = parseFloat(token.priceUsd);

    if (lowPrice === null || price < lowPrice) {
      if (!tokenSoldOnDex || token.dexId !== tokenSoldOnDex!.dexId) {
        lowPrice = price;
        tokenBoughtOnDex = token;
      }
    }

    if (highPrice === null || price > highPrice) {
      if (!tokenBoughtOnDex || token.dexId !== tokenBoughtOnDex.dexId) {
        highPrice = price;
        tokenSoldOnDex = token;
      }
    }
  });

  return [tokenBoughtOnDex, tokenSoldOnDex];
}
