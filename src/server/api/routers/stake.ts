import axios, { type AxiosInstance } from "axios";
import { z } from "zod";
import { assets } from "~/data/assets";
import { env } from "~/env.mjs";
import { createTRPCRouter, publicProcedure } from "~/server/api/trpc";
import {
  type SubscanResponse,
  type TokensNative,
  type ValidatorInfo,
} from "~/types/subscan";

export const stakeRouter = createTRPCRouter({
  getData: publicProcedure
    .input(z.object({ address: z.string(), uniqueId: z.string() }))
    .query(({ input }) => {
      switch (input.uniqueId) {
        case assets.DOT.uniqueId:
          return getSubscanData(polkadot, input.address, input.uniqueId);
        case assets.KSM.uniqueId:
          return getSubscanData(kusama, input.address, input.uniqueId);
        default:
          throw new Error("Invalid unique ID");
      }
    }),
});

const polkadot = axios.create({
  baseURL: "https://polkadot.api.subscan.io/api",
  headers: {
    "X-API-Key": env.SUBSCAN_API_KEY,
    "Content-Type": "application/json",
  },
});

const kusama = axios.create({
  baseURL: "https://kusama.api.subscan.io/api",
  headers: {
    "X-API-Key": env.SUBSCAN_API_KEY,
    "Content-Type": "application/json",
  },
});

async function getSubscanData(
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
    info: ValidatorInfo | null;
  }>;
  if (validatorData.info == null) {
    throw new Error("Unable to find validator data");
  }
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
    address,
  };
}
