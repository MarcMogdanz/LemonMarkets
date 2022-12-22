import { plainToClass } from "class-transformer";
import { LemonMetadata } from "./classes";
import { ApiResponseMetadata } from "./interfaces.api";
import { AccountMode, RequestStatus } from "./types";

export const convertMetadata = (metadata: ApiResponseMetadata) =>
  plainToClass(LemonMetadata, {
    time: new Date(metadata.time),
    mode: metadata.mode as AccountMode,
    status: metadata.status as RequestStatus,
  });
