import meteoraSwap from "../helpers/meteora";
import raydiumSwap from "../helpers/raydium";
import { DexObject } from "../type";

export default function dexController(token: DexObject) {
  if (token.dexId === "meteora") {
    return meteoraSwap;
  }
  if (token.dexId === "raydium") {
    return raydiumSwap;
  }
  if (token.dexId === "orca") {
    return "orca";
  }
}
