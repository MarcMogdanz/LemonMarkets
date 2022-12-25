import { AccountMode } from "./types";

// objects
export interface ApiResponseMetadata {
  time: string;
  mode: AccountMode;
  status: "ok" | "error";
}

// responses
export interface ApiBaseResponse<T> extends ApiResponseMetadata {
  results: T;
}
