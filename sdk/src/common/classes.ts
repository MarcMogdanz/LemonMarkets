import { plainToClass } from "class-transformer";
import { ApiResponseMetadata } from "./interfaces.api";
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

  public static convert(metadata: ApiResponseMetadata): LemonMetadata {
    return plainToClass(LemonMetadata, {
      time: new Date(metadata.time),
      mode: metadata.mode as AccountMode,
      status: metadata.status as RequestStatus,
    });
  }
}
