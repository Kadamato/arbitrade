import { DexObject } from "../type";

export default async function getPricePairAPI(
  address: string
): Promise<DexObject[] | undefined> {
  try {
    const response = await fetch(
      `https://api.dexscreener.com/latest/dex/tokens/${address}`,
      {
        method: "GET",
      }
    );
    const data = await response.json();

    return data.pairs;
  } catch (error) {
    console.error("Error:", error);
  }
}
