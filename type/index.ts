interface Token {
  address: string;
  name: string;
  symbol: string;
}

interface PriceChange {
  m5: number;
  h1: number;
  h6: number;
  h24: number;
}

interface Volume {
  h24: number;
  h6: number;
  h1: number;
  m5: number;
}

interface Liquidity {
  usd: number;
  base: number;
  quote: number;
}

interface Info {
  imageUrl: string;
  header: string;
  openGraph: string;
  websites: string[];
  socials: string[];
}

export interface DexObject {
  chainId: string;
  dexId: string;
  url: string;
  pairAddress: string;
  labels: string[];
  baseToken: Token;
  quoteToken: Token;
  priceNative: string;
  priceUsd: string;
  txns: {
    m5: object;
    h1: object;
    h6: object;
    h24: object;
  };
  volume: Volume;
  priceChange: PriceChange;
  liquidity: Liquidity;
  fdv: number;
  marketCap: number;
  pairCreatedAt: number;
  info: Info;
}



export interface SwapCompute {
  id: string;
  success: true;
  version: "V0" | "V1";
  openTime?: undefined;
  msg: undefined;
  data: {
    swapType: "BaseIn" | "BaseOut";
    inputMint: string;
    inputAmount: string;
    outputMint: string;
    outputAmount: string;
    otherAmountThreshold: string;
    slippageBps: number;
    priceImpactPct: number;
    routePlan: {
      poolId: string;
      inputMint: string;
      outputMint: string;
      feeMint: string;
      feeRate: number;
      feeAmount: string;
    }[];
  };
}