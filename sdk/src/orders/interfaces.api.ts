import { ApiResponseMetadata } from "../common/interfaces.api";
import { OrderSide, OrderStatus } from "../common/types";

interface ApiOrder {
  created_at: string;
  id: string;
  status: OrderStatus;
  regulatory_information: {
    costs_entry: number;
    costs_entry_pct: string;
    costs_running: number;
    costs_running_pct: string;
    costs_product: number;
    costs_product_pct: string;
    costs_exit: number;
    costs_exit_pct: string;
    yield_reduction_year: number;
    yield_reduction_year_pct: string;
    yield_reduction_year_following: number;
    yield_reduction_year_following_pct: string;
    yield_reduction_year_exit: number;
    yield_reduction_year_exit_pct: string;
    estimated_holding_duration_years: string;
    estimated_yield_reduction_total: number;
    estimated_yield_reduction_total_pct: string;
    KIID: string;
    legal_disclaimer: string;
  };
  isin: string;
  expires_at: string;
  side: OrderSide;
  quantity: number;
  stop_price?: number;
  limit_price?: number;
  venue: string;
  estimated_price: number;
  estimated_price_total: number;
  notes?: string;
  charge: number;
  chargeable_at?: string;
  key_creation_id: string;
  idempotency?: string;
}

export interface ApiPlaceOrderResponse extends ApiResponseMetadata<ApiOrder> {}
