import { LemonBase } from "../common/classes";
import { AccountMode, TradingPlan, DataPlan, Plan } from "../common/types";

export class LemonAccount extends LemonBase {
  public createdAt!: Date;
  public accountId!: string;
  public firstName!: string;
  public lastName?: string;
  public email!: string;
  public phone?: string;
  public address?: string;
  public billingAddress?: string;
  public billingEmail?: string;
  public billingName?: string;
  public billingVat?: string;
  public mode!: AccountMode;
  public depositId?: string;
  public clientId?: string;
  public accountNumber?: string;
  public ibanBrokerage?: string;
  public ibanOrigin?: string;
  public bankNameOrigin?: string;
  public balance!: number;
  public cashToInvest!: number;
  public cashToWithdraw!: number;
  public amountBoughtIntraday!: number;
  public amountSoldIntraday!: number;
  public amountOpenOrders!: number;
  public amountOpenWithdrawals!: number;
  public amountEstimateTaxes!: number;
  public approvedAt?: Date;
  public tradingPlan!: TradingPlan;
  public dataPlan!: DataPlan;
  public plan!: Plan;
  public taxAllowance?: number;
  public taxAllowanceStart?: Date;
  public taxAllowanceEnd?: Date;
}

export class LemonWithdrawal extends LemonBase {
  public id!: string;
  public amount!: number;
  public createdAt!: Date;
  public date?: Date;
  public idempotency?: string;
}
