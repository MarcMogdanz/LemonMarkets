import { AxiosInstance } from "axios";
import { plainToClass } from "class-transformer";
import {
  LemonMetadata,
  LemonPagination,
  LemonResponse,
} from "../common/classes";
import { LemonBadRequestError, LemonError } from "../common/errors";
import { dateToYYYYMMDD } from "../common/functions";
import { Plan } from "../common/types";
import { LemonAccount, LemonBankStatement, LemonWithdrawal } from "./classes";
import {
  ApiCreateWithdrawalResponse,
  ApiGetAccountResponse,
  ApiGetBankStatementsResponse,
  ApiGetWithdrawalsResponse,
} from "./interfaces.api";
import {
  CreateWithdrawalOptions,
  GetBankStatementsOptions,
  GetWithdrawalsOptions,
} from "./interfaces.options";

export class Account {
  constructor(private axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public async getAccount(): Promise<LemonResponse<LemonAccount>> {
    try {
      const res = await this.axiosInstance.get<ApiGetAccountResponse>(
        "/account"
      );
      const apiAccount = res.data.results;

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);
      const account: LemonAccount = plainToClass(LemonAccount, {
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

      return new LemonResponse(metadata, account);
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while getting account");
    }
  }

  public async createWithdrawal(
    options: CreateWithdrawalOptions
  ): Promise<LemonResponse<null>> {
    try {
      const res = await this.axiosInstance.post<ApiCreateWithdrawalResponse>(
        "/account/withdrawals",
        options
      );

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);

      return new LemonResponse(metadata, null);
    } catch (err) {
      throw LemonError.parse(
        err,
        "An error occurred while creating withdrawal"
      );
    }
  }

  public async getWithdrawals(
    options?: GetWithdrawalsOptions
  ): Promise<LemonResponse<LemonWithdrawal[]>> {
    try {
      const res = await this.axiosInstance.get<ApiGetWithdrawalsResponse>(
        "/account/withdrawals",
        { params: { page: options?.page, limit: options?.limit } }
      );
      const apiWithdrawals = res.data.results;

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);
      const withdrawals: LemonWithdrawal[] = apiWithdrawals.map((withdrawal) =>
        plainToClass(LemonWithdrawal, {
          id: withdrawal.id,
          amount: withdrawal.amount,
          createdAt: new Date(withdrawal.created_at),
          date: withdrawal.date ? new Date(withdrawal.date) : null,
          idempotency: withdrawal.idempotency,
        })
      );
      const pagination: LemonPagination = plainToClass(LemonPagination, {
        previous: res.data.previous,
        next: res.data.next,
        total: res.data.total,
        page: res.data.page,
        pages: res.data.pages,
      });

      return new LemonResponse(metadata, withdrawals, pagination);
    } catch (err) {
      throw LemonError.parse(
        err,
        "An error occurred while getting withdrawals"
      );
    }
  }

  // TODO: get documents

  // TODO: get download document

  public async getBankStatements(
    options?: GetBankStatementsOptions
  ): Promise<LemonBankStatement[]> {
    if (
      options?.from &&
      typeof options.from === "string" &&
      !options.fromBeginning &&
      isNaN(Date.parse(options.from))
    ) {
      throw new LemonBadRequestError("Date format for `from` is invalid");
    }

    if (
      options?.to &&
      typeof options.to === "string" &&
      isNaN(Date.parse(options.to))
    ) {
      throw new LemonBadRequestError("Date format for `to` is invalid");
    }

    try {
      const res = await this.axiosInstance.get<ApiGetBankStatementsResponse>(
        "/account/bankstatements",
        {
          params: {
            type: options?.type,
            from: options?.fromBeginning
              ? "beginning"
              : options?.from instanceof Date
              ? dateToYYYYMMDD(options.from)
              : options?.from,
            to:
              options?.to instanceof Date
                ? dateToYYYYMMDD(options.to)
                : options?.to,
            sorting:
              options?.sorting === "OLDEST_FIRST"
                ? "asc"
                : options?.sorting === "NEWEST_FIRST"
                ? "desc"
                : undefined,
            page: options?.page,
            limit: options?.limit,
          },
        }
      );
      const apiBankStatements = res.data.results;

      return apiBankStatements.map((statement) =>
        plainToClass(LemonBankStatement, {
          metadata: LemonMetadata.convert(res.data),
          id: statement.id,
          accountId: statement.account_id,
          type: statement.type,
          date: new Date(statement.date),
          amount: statement.amount,
          isin: statement.isin,
          isinTitle: statement.isin_title,
          createdAt: new Date(statement.created_at),
          quantity: statement.quantity,
        })
      );
    } catch (err) {
      throw LemonError.parse(
        err,
        "An error occurred while getting bank statements"
      );
    }
  }
}
