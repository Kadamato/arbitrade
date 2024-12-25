import { PrismaClient } from "@prisma/client";

export const prisma = new PrismaClient();

interface Token {
  tokenName: string;
  tokenSymbol: string;
  tokenAddress: string;
}

export function addTokenToDB(token: Token) {
  return prisma.tokens.create({
    data: {
      tokenName: token.tokenName,
      tokenSymbol: token.tokenSymbol,
      tokenAddress: token.tokenAddress,
    },
  });
}

export function checkToken(tokenAddress: string) {
  return prisma.tokens.findMany({
    where: {
      tokenAddress: tokenAddress,
    },
  });
}

export function getAllTokens() {
  return prisma.tokens.findMany();
}
