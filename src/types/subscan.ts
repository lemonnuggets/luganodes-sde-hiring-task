export type SubscanResponse<T> = {
  code: number;
  message: number;
  generated_at: number;
  data: T;
};
export type AccountDisplay = {
  address: string;
  display: string | null;
  judgements: Array<Judgement>;
  account_index: string;
  identity: boolean;
  parent: {
    address: string;
    display: string;
    sub_symbol: string;
    identity: boolean;
  };
};
export type Judgement = {
  index: number;
  judgement: "FeePaid" | "Reasonable";
};
export type ValidatorInfo = {
  rank_validator: number;
  bonded_nominators: string;
  bonded_owner: string;
  count_nominators: number;
  validator_prefs_value: number;
  latest_mining: number;
  reward_point: number;
  session_key: {
    babe: string;
    grandpa: string;
    im_online: string;
    authority_discovery: string;
  };
  stash_account_display: AccountDisplay;
  controller_account_display: AccountDisplay;
  grandpa_vote: number;
  bonded_total: string;
  status: string;
};

export type TokensNative = {
  symbol: string;
  unique_id: string;
  decimals: number;
  balance: string;
  lock: string;
  reserved: string;
  bonded: string;
  unbonding: string;
  democracy_lock: string;
  conviction_lock: string;
  election_lock: string;
};
