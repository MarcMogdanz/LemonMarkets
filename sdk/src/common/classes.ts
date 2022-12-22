import { AccountMode, RequestStatus } from "./types";

export class LemonBase {
  public metadata!: LemonMetadata;
}

export class LemonMetadata {
  time!: Date;
  mode!: AccountMode;
  status!: RequestStatus;
}
