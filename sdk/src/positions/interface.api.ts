import { ApiBaseResponseWithPagination } from "../common/interfaces.api";

// objects
export interface ApiPosition {
  isin: string;
  isin_title: string;
  quantity: number;
  buy_price_avg: number;
  estimated_price_total: number;
  estimated_price: number;
}

export interface ApiStatement {
  id: string;
  order_id: string;
  external_id?: string;
  type: string;
  quantity: number;
  isin: string;
  isin_title: string;
  date: string;
  created_at: string;
}

export interface ApiPerformance {
  isin: string;
  isin_title: string;
  profit: number;
  loss: number;
  quantity_bought: number;
  quantity_sold: number;
  quantity_open: number;
  opened_at: string;
  closed_at?: string;
  fees: number;
}

// responses
export interface ApiGetPositionsResponse
  extends ApiBaseResponseWithPagination<ApiPosition[]> {}

export interface ApiGetStatementsResponse
  extends ApiBaseResponseWithPagination<ApiStatement[]> {}

export interface ApiGetPerformanceResponse
  extends ApiBaseResponseWithPagination<ApiPerformance[]> {}
