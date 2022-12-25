import { plainToClass } from "class-transformer";
import { ApiResponseMetadata } from "./interfaces.api";
import { AccountMode, RequestStatus } from "./types";

export class LemonResponse<T> {
  public metadata!: LemonMetadata;
  public data!: T;
  public pagination?: LemonPagination;

  constructor(metadata: LemonMetadata, data: T, pagination?: LemonPagination) {
    this.metadata = metadata;
    this.data = data;
    this.pagination = pagination;
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

export class LemonPagination {
  previous?: string;
  next?: string;
  total!: number;
  page!: number;
  pages!: number;
}
