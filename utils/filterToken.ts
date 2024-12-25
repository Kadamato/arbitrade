import { DexObject } from "../type";

enum Dexs {
  meteora = "meteora",
  raydium = "raydium",
  orca = "orca",
}

export default function filterTokens(tokens: DexObject[]) {
  const tokenList = tokens.filter((token) => {
    return (
      (token.dexId === Dexs.meteora ||
        token.dexId === Dexs.raydium ||
        token.dexId === Dexs.orca) &&
      token.quoteToken.symbol === "SOL"
    );
  });

  return tokenList;
}
