import { AxiosInstance } from "axios";
import { plainToClass } from "class-transformer";
import { LemonBase } from "../common/classes";
import { convertMetadata } from "../common/convertMetadata";
import { LemonError } from "../common/errors";
import { AccountMode, DataPlan, Plan, TradingPlan } from "../common/types";
import { ApiAccount, ApiWithdrawal } from "./interfaces.api";
import {
  CreateWithdrawalOptions,
  GetWithdrawalsOptions,
} from "./interfaces.internal";

export class Account {
  constructor(private axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public async getAccount(): Promise<LemonAccount> {
    try {
      const res = await this.axiosInstance.get<ApiAccount>("/account");
      const apiAccount = res.data.results;

      return plainToClass(LemonAccount, {
        metadata: convertMetadata(res.data),
        createdAt: new Date(apiAccount.created_at),
        accountId: apiAccount.account_id,
        firstName: apiAccount.firstname,
        lastName: apiAccount.lastname,
        email: apiAccount.email,
        phone: apiAccount.phone,
        address: apiAccount.address,
        billingAddress: apiAccount.billing_address,
        billingEmail: apiAccount.billing_email,
        billingName: apiAccount.billing_name,
        billingVat: apiAccount.billing_vat,
        mode: apiAccount.mode,
        depositId: apiAccount.deposit_id,
        clientId: apiAccount.client_id,
        accountNumber: apiAccount.account_number,
        ibanBrokerage: apiAccount.iban_brokerage,
        ibanOrigin: apiAccount.iban_origin,
        bankNameOrigin: apiAccount.bank_name_origin,
        balance: apiAccount.balance,
        cashToInvest: apiAccount.cash_to_invest,
        cashToWithdraw: apiAccount.cash_to_withdraw,
        amountBoughtIntraday: apiAccount.amount_bought_intraday,
        amountSoldIntraday: apiAccount.amount_sold_intraday,
        amountOpenOrders: apiAccount.amount_open_orders,
        amountOpenWithdrawals: apiAccount.amount_open_withdrawals,
        amountEstimateTaxes: apiAccount.amount_estimate_taxes,
        approvedAt: apiAccount.approved_at
          ? new Date(apiAccount.approved_at)
          : null,
        tradingPlan: apiAccount.trading_plan,
        dataPlan: apiAccount.data_plan,
        plan: apiAccount.plan as Plan,
        taxAllowance: apiAccount.tax_allowance,
        taxAllowanceStart: apiAccount.tax_allowance_start
          ? new Date(apiAccount.tax_allowance_start)
          : null,
        taxAllowanceEnd: apiAccount.tax_allowance_end
          ? new Date(apiAccount.tax_allowance_end)
          : null,
      });
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while getting account");
    }
  }

  public async createWithdrawal(
    options: CreateWithdrawalOptions
  ): Promise<void> {
    try {
      await this.axiosInstance.post("/account/withdrawals", {
        amount: options.amount,
      });
    } catch (err) {
      throw LemonError.parse(
        err,
        "An error occurred while creating withdrawal"
      );
    }
  }

  public async getWithdrawals(
    options?: GetWithdrawalsOptions
  ): Promise<LemonWithdrawal[]> {
    try {
      const res = await this.axiosInstance.get<ApiWithdrawal>(
        "/account/withdrawals",
        { params: { page: options?.page, limit: options?.limit } }
      );
      const apiWithdrawals = res.data.results;

      return apiWithdrawals.map((withdrawal) =>
        plainToClass(LemonWithdrawal, {
          metadata: convertMetadata(res.data),
          id: withdrawal.id,
          amount: withdrawal.amount,
          createdAt: new Date(withdrawal.created_at),
          date: withdrawal.date ? new Date(withdrawal.date) : null,
          idempotency: withdrawal.idempotency,
        })
      );
    } catch (err) {
      throw LemonError.parse(
        err,
        "An error occurred while getting withdrawals"
      );
    }
  }

  // TODO: get documents

  // TODO: get download document

  // TODO: get bank statements
}

//
//
//

class LemonAccount extends LemonBase {
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

class LemonWithdrawal extends LemonBase {
  public id!: string;
  public amount!: number;
  public createdAt!: Date;
  public date?: Date;
  public idempotency?: string;
}
