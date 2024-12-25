// import Base64 from "crypto-js/enc-base64";
// import { HmacSHA256 } from "crypto-js";

// import getCurrentTime from "../utils/getCurrentTime";
// import { addTokenToDB } from "../db/mongodb";
// import findPricePairBest from "../utils/findPriceBest";
// import getPricePairAPI from "./getPricePair";
// import filterTokens from "../utils/filterToken";
// import { DexObject } from "../type";

// export default async function getTokens() {
//   const time = getCurrentTime();
//   const secretKey = "0769D5431BF231851EEDB57C1099876D";
//   const method = "GET";
//   const path = "/api/v5/dex/aggregator/all-tokens?chainId=501";
//   const passphrase = "123@456abcA@";

//   const signKey = Base64.stringify(HmacSHA256(time + method + path, secretKey));

//   try {
//     const resp = await fetch(
//       "https://www.okx.com/api/v5/dex/aggregator/all-tokens?chainId=501",
//       {
//         headers: {
//           "Content-Type": "application/json",
//           "OK-ACCESS-PROJECT": "b515fcfe9852d650ec4fba615435f027",
//           "OK-ACCESS-KEY": "eef668c9-4931-478a-ba61-ca3b85568610",
//           "OK-ACCESS-SIGN": `${signKey}`,
//           "OK-ACCESS-PASSPHRASE": `${passphrase}`,
//           "OK-ACCESS-TIMESTAMP": `${time}`,
//         },
//       }
//     );

//     const data = await resp.json();
//     if (!resp.ok) {
//       throw new Error(`Error fetching tokens: ${resp.statusText}`);
//     }

//     return data.data;
//   } catch (error) {
//     console.error(error);
//   }
// }

// getTokens().then((data) => console.log(data));
