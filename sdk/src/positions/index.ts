import { AxiosInstance } from "axios";
import { plainToClass } from "class-transformer";
import {
  LemonMetadata,
  LemonPagination,
  LemonResponse,
} from "../common/classes";
import { LemonBadRequestError, LemonError } from "../common/errors";
import { dateToYYYYMMDD } from "../common/functions";
import { LemonPerformance, LemonPosition, LemonStatement } from "./classes";
import {
  ApiGetPerformanceResponse,
  ApiGetPositionsResponse,
  ApiGetStatementsResponse,
} from "./interface.api";
import {
  GetPerformanceOptions,
  GetPositionsOptions,
  GetStatementsOptions,
} from "./interface.options";

export class Positions {
  constructor(private axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public async getPositions(
    options?: GetPositionsOptions
  ): Promise<LemonResponse<LemonPosition[]>> {
    try {
      const res = await this.axiosInstance.get<ApiGetPositionsResponse>(
        "/positions",
        {
          params: {
            isin: options?.isin,
            page: options?.page,
            limit: options?.limit,
          },
        }
      );
      const apiPositions = res.data.results;

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);
      const positions: LemonPosition[] = apiPositions.map((position) =>
        plainToClass(LemonPosition, {
          isin: position.isin,
          isinTitle: position.isin_title,
          quantity: position.quantity,
          buyPriceAvg: position.buy_price_avg,
          estimatedPriceTotal: position.estimated_price_total,
          estimatedPrice: position.estimated_price,
        })
      );
      const pagination: LemonPagination = plainToClass(LemonPagination, {
        previous: res.data.previous,
        next: res.data.next,
        total: res.data.total,
        page: res.data.page,
        pages: res.data.pages,
      });

      return new LemonResponse(metadata, positions, pagination);
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while getting positions");
    }
  }

  public async getStatements(
    options?: GetStatementsOptions
  ): Promise<LemonResponse<LemonStatement[]>> {
    try {
      const res = await this.axiosInstance.get<ApiGetStatementsResponse>(
        "/positions/statements",
        {
          params: {
            type: options?.type,
            page: options?.page,
            limit: options?.limit,
          },
        }
      );
      const apiStatements = res.data.results;

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);
      const statements: LemonStatement[] = apiStatements.map((statement) =>
        plainToClass(LemonStatement, {
          id: statement.id,
          orderId: statement.order_id,
          externalId: statement.external_id,
          type: statement.type,
          quantity: statement.quantity,
          isin: statement.isin,
          isinTitle: statement.isin_title,
          date: new Date(statement.date),
          createdAt: new Date(statement.created_at),
        })
      );
      const pagination: LemonPagination = plainToClass(LemonPagination, {
        previous: res.data.previous,
        next: res.data.next,
        total: res.data.total,
        page: res.data.page,
        pages: res.data.pages,
      });

      return new LemonResponse(metadata, statements, pagination);
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while getting statements");
    }
  }

  public async getPerformance(
    options?: GetPerformanceOptions
  ): Promise<LemonResponse<LemonPerformance[]>> {
    if (
      options?.from &&
      typeof options.from === "string" &&
      isNaN(Date.parse(options.from))
    ) {
      throw new LemonBadRequestError("Date format for `from` is invalid");
    }

    if (
      options?.to &&
      typeof options.to === "string" &&
      isNaN(Date.parse(options.to))
    ) {
      throw new LemonBadRequestError("Date format for `to` is invalid");
    }

    try {
      const res = await this.axiosInstance.get<ApiGetPerformanceResponse>(
        "/positions/performance",
        {
          params: {
            isin: options?.isin,
            from:
              options?.from instanceof Date
                ? dateToYYYYMMDD(options.from)
                : options?.from,
            to:
              options?.to instanceof Date
                ? dateToYYYYMMDD(options.to)
                : options?.to,
            sorting:
              options?.sorting === "OLDEST_FIRST"
                ? "asc"
                : options?.sorting === "NEWEST_FIRST"
                ? "desc"
                : undefined,
            page: options?.page,
            limit: options?.limit,
          },
        }
      );
      const apiPerformances = res.data.results;

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);
      const performances: LemonPerformance[] = apiPerformances.map(
        (performance) =>
          plainToClass(LemonPerformance, {
            isin: performance.isin,
            isinTitle: performance.isin_title,
            profit: performance.profit,
            loss: performance.loss,
            quantityBought: performance.quantity_bought,
            quantitySold: performance.quantity_sold,
            quantityOpen: performance.quantity_open,
            openedAt: new Date(performance.opened_at),
            closedAt: performance.closed_at
              ? new Date(performance.closed_at)
              : null,
            fees: performance.fees,
          })
      );
      const pagination: LemonPagination = plainToClass(LemonPagination, {
        previous: res.data.previous,
        next: res.data.next,
        total: res.data.total,
        page: res.data.page,
        pages: res.data.pages,
      });

      return new LemonResponse(metadata, performances, pagination);
    } catch (err) {
      throw LemonError.parse(
        err,
        "An error occurred while getting performance"
      );
    }
  }
}
