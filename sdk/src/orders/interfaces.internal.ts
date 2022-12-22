type OrderSide = "buy" | "sell";

export interface PlaceOrderOptions {
  isin: string;
  expires_at: string;
  side: OrderSide;
  quantity: number;
  venue: string;
  stop_price?: number;
  limit_price?: number;
  notes?: string;
  idempotency?: string;
}
