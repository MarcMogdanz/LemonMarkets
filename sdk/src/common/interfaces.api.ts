import { AccountMode } from "./types";

// objects
export interface ApiResponseMetadata {
  time: string;
  mode: AccountMode;
  status: "ok" | "error";
}

export interface ApiPagination {
  previous?: string;
  next?: string;
  total: number;
  page: number;
  pages: number;
}

// responses
export interface ApiBaseResponse<T> extends ApiResponseMetadata {
  results: T;
}

export interface ApiBaseResponseWithPagination<T>
  extends ApiBaseResponse<T>,
    ApiPagination {}
