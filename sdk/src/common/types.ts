export type AccountMode = "paper" | "live";
export type TradingPlan = "go" | "investor" | "trader" | "b2b";
export type DataPlan = "go" | "investor" | "trader" | "b2b";
export type Plan = "go" | "investor" | "trader" | "b2b";
export type OrderStatus =
  | "inactive"
  | "activated"
  | "open"
  | "canceling"
  | "canceled"
  | "executed"
  | "expired";
export type OrderType = "market" | "limit" | "stop" | "stop_limit";
export type OrderSide = "buy" | "sell";
export type RequestStatus = "ok" | "error";
export type BankStatementType =
  | "pay_in"
  | "pay_out"
  | "order_buy"
  | "order_sell"
  | "eod_balance"
  | "dividend"
  | "tax_refunded";
export type SortDirection = "OLDEST_FIRST" | "NEWEST_FIRST"; // asc = oldest first; desc = newest first
