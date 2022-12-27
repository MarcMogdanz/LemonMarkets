import { PaginationOptions } from "../common/interfaces.options";
import { SortDirection, StatementType } from "../common/types";

export interface GetPositionsOptions extends PaginationOptions {
  isin?: string;
}

export interface GetStatementsOptions extends PaginationOptions {
  type?: StatementType;
}

export interface GetPerformanceOptions extends PaginationOptions {
  isin?: string;
  /** @remarks Respected format: `YYYY-MM-DD`. */
  from?: Date | string;
  /** @remarks Respected format: `YYYY-MM-DD`. */
  to?: Date | string;
  sorting?: SortDirection;
}
