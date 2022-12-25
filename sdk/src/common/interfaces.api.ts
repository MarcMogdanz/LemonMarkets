import { AccountMode } from "./types";

export interface ApiResponseMetadata<T> {
  time: string;
  mode: AccountMode;
  status: "ok" | "error";
  results: T;
}
