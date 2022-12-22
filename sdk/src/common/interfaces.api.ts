import { AccountMode } from "./types";

export interface ApiResponseMetadata {
  time: string;
  mode: AccountMode;
  status: "ok" | "error";
}
