import axios, { type AxiosInstance } from "axios";
import { z } from "zod";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  type SubscanResponse,
  type TokensNative,
  type ValidatorInfo,
} from "~/types/subscan";

const polkadot = axios.create({
  baseURL: "https://polkadot.api.subscan.io/api",
  headers: {
    "X-API-Key": env.SUBSCAN_API_KEY,
    "Content-Type": "application/json",
  },
});
const DOT_ID = "DOT";

const kusama = axios.create({
  baseURL: "https://kusama.api.subscan.io/api",
  headers: {
    "X-API-Key": env.SUBSCAN_API_KEY,
    "Content-Type": "application/json",
  },
});
const KSM_ID = "KSM";

export const subscanRouter = createTRPCRouter({
  polkadot: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(({ input }) => {
      return getData(polkadot, input.address, DOT_ID);
    }),
  kusama: publicProcedure
    .input(z.object({ address: z.string() }))
    .query(({ input }) => {
      return getData(kusama, input.address, KSM_ID);
    }),
});

async function getData(
  instance: AxiosInstance,
  address: string,
  uniqueId: string
) {
  const validatorResponse = await instance.post("/scan/staking/validator", {
    stash: address,
  });
  const tokensResponse = await instance.post("/scan/account/tokens", {
    address: address,
  });

  const { data: validatorData } = validatorResponse.data as SubscanResponse<{
    info: ValidatorInfo;
  }>;
  const { data: tokensData } = tokensResponse.data as SubscanResponse<{
    native: Array<TokensNative>;
  }>;

  const tokenData = tokensData.native.find(
    (token) => token.unique_id == uniqueId
  );
  if (tokenData === undefined) {
    throw new Error(`Unable to find data for ${uniqueId} token`);
  }

  return {
    displayName: validatorData.info.stash_account_display.display,
    users: validatorData.info.count_nominators,
    balance: parseInt(tokenData.balance) / Math.pow(10, tokenData.decimals),
  };
}
