import { ApiResponseMetadata } from "../common/interfaces.api";
import { AccountMode, DataPlan, Plan, TradingPlan } from "../common/types";

export interface ApiAccount extends ApiResponseMetadata {
  results: {
    created_at: string;
    account_id: string;
    firstname: string;
    lastname?: string;
    email: string;
    phone?: string;
    address?: string;
    billing_address?: string;
    billing_email?: string;
    billing_name?: string;
    billing_vat?: string;
    mode: AccountMode;
    deposit_id?: string;
    client_id?: string;
    account_number?: string;
    iban_brokerage?: string;
    iban_origin?: string;
    bank_name_origin?: string;
    balance: number;
    cash_to_invest: number;
    cash_to_withdraw: number;
    amount_bought_intraday: number;
    amount_sold_intraday: number;
    amount_open_orders: number;
    amount_open_withdrawals: number;
    amount_estimate_taxes: number;
    approved_at?: string;
    trading_plan: TradingPlan;
    data_plan: DataPlan;
    plan: Plan;
    tax_allowance?: number;
    tax_allowance_start?: string;
    tax_allowance_end?: string;
  };
}

export interface ApiWithdrawal extends ApiResponseMetadata {
  results: {
    id: string;
    amount: number;
    created_at: string;
    date?: string;
    idempotency?: string;
  }[];
}
