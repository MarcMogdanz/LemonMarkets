import { PaginationOptions } from "../common/interfaces.options";

export interface CreateWithdrawalOptions {
  amount: number;
}

export interface GetWithdrawalsOptions extends PaginationOptions {}
