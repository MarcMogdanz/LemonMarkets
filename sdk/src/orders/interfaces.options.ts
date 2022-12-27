import { PaginationOptions } from "../common/interfaces.options";
import { OrderStatus, OrderType } from "../common/types";

type OrderSide = "buy" | "sell";

export interface PlaceOrderOptions {
  isin: string;
  /**
   * @remarks Respected format for absolute dates: `YYYY-MM-DD`, otherwise a period in days is also accepted: `14D`
   * @remarks May not be more than 30 days in the future.
   * @remarks Only optional if the order is a market order.
   */
  expires_at?: Date | string;
  side: OrderSide;
  quantity: number;
  venue?: string;
  stop_price?: number;
  limit_price?: number;
  notes?: string;
  idempotency?: string;
}

export interface ActivateOrderOptions {
  orderId: string;
  pin: string;
}

export interface GetOrdersOptions extends PaginationOptions {
  /** @remarks Respected format: `YYYY-MM-DD`. */
  from?: Date | string;
  /** @remarks Respected format: `YYYY-MM-DD`. */
  to?: Date | string;
  isin?: string;
  side?: OrderSide;
  status?: OrderStatus | OrderStatus[];
  type?: OrderType;
  keyCreationId?: string;
}
