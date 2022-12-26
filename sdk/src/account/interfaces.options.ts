import { PaginationOptions } from "../common/interfaces.options";
import { BankStatementType, SortDirection } from "../common/types";

export interface CreateWithdrawalOptions {
  amount: number;
}

export interface GetWithdrawalsOptions extends PaginationOptions {}

export interface GetBankStatementsOptions extends PaginationOptions {
  type?: BankStatementType;
  /** @remarks Preferred over `from`. */
  fromBeginning?: boolean;
  /**
   * @remarks The `fromBeginning` option is preferred over this one.
   * @remarks Respected format: `YYYY-MM-DD`.
   */
  from?: Date | string;
  /** @remarks Respected format: `YYYY-MM-DD`. */
  to?: Date | string;
  sorting?: SortDirection;
}
