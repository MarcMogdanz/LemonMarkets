import { AccountMode, RequestStatus } from "./types";

export class LemonResponse<T> {
  public metadata!: LemonMetadata;
  public data!: T;

  constructor(metadata: LemonMetadata, data: T) {
    this.metadata = metadata;
    this.data = data;
  }
}

export class LemonMetadata {
  time!: Date;
  mode!: AccountMode;
  status!: RequestStatus;
}
