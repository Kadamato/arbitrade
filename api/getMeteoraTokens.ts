import { addTokenToDB } from "../db/mongodb";
import { DexObject } from "../type";
import filterTokens from "../utils/filterToken";
import findPricePairBest from "../utils/findPriceBest";
import getPricePairAPI from "./getPricePair";

const NATIVE_SOL = "So11111111111111111111111111111111111111112";

export default async function getMeteoraTokens() {
  const page = 2;
  const size = 200;
  const url = `https://app.meteora.ag/amm/pools/search?page=${page}&size=${size}&sort_key=tvl&order_by=desc`;

  try {
    const resp = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
      },
    });

    const data = await resp.json();

    const tokens = data.data;

    const filteredTokens = tokens.filter((token: any) => {
      const address = token.pool_token_mints.find(
        (add: any) => add === NATIVE_SOL
      );

      return address;
    });

    const tokenList = new Set();

    filteredTokens.map((token: any) => {
      const tokenAddress = token.pool_token_mints.filter(
        (ta: any) => ta !== NATIVE_SOL
      )[0];
      tokenList.add({
        tokenAddress,
        token,
      });
    });

    console.log("Loading tokens...");

    tokenList.forEach(async (token: any) => {
      const tokenPrices = (await getPricePairAPI(
        token.tokenAddress
      )) as DexObject[];

      if (tokenPrices && tokenPrices.length > 0) {
        const filteredTokens = filterTokens(tokenPrices);

        if (filteredTokens.length >= 2) {
          await addTokenToDB({
            tokenName: token.token.pool_name,
            tokenSymbol: "",
            tokenAddress: token.tokenAddress,
          });
        }
      }
    });

    console.log("Tokens loaded successfully!");
  } catch (error) {
    console.error(error);
  }
}

getMeteoraTokens().then((data) => console.log(data));
