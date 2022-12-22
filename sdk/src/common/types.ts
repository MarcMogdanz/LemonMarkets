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
export type OrderSide = "buy" | "sell";
export type RequestStatus = "ok" | "error";
