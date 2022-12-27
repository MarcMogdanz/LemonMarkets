import { AxiosInstance } from "axios";
import { plainToClass } from "class-transformer";
import {
  LemonMetadata,
  LemonPagination,
  LemonResponse,
} from "../common/classes";
import { LemonBadRequestError, LemonError } from "../common/errors";
import { dateToYYYYMMDD } from "../common/functions";
import {
  LemonCreatedOrder,
  LemonOrder,
  LemonOrderRegulatoryInformation,
} from "./classes";
import {
  ApiCancelOrderResponse,
  ApiGetOrderResponse,
  ApiGetOrdersResponse,
  ApiPlaceOrderResponse,
} from "./interfaces.api";
import {
  ActivateOrderOptions,
  CancelOrderOptions,
  GetOrderOptions,
  GetOrdersOptions,
  PlaceOrderOptions,
} from "./interfaces.options";

export class Orders {
  constructor(private axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public async placeOrder(
    options: PlaceOrderOptions
  ): Promise<LemonResponse<LemonOrder>> {
    if (
      options.expires_at &&
      typeof options.expires_at === "string" &&
      // check if absolute date
      isNaN(Date.parse(options.expires_at)) &&
      // TODO: make regex more precise?
      // check if range of days
      /[\d]{1,2}[d|D]/.exec(options.expires_at) === null
    ) {
      throw new LemonBadRequestError("Date format for `expires_at` is invalid");
    }

    try {
      const res = await this.axiosInstance.post<ApiPlaceOrderResponse>(
        "/orders",
        {
          ...options,
          expires_at:
            options.expires_at instanceof Date
              ? dateToYYYYMMDD(options.expires_at)
              : options.expires_at,
        }
      );
      const apiOrder = res.data.results;

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);
      const order: LemonOrder = plainToClass(LemonOrder, {
        createdAt: new Date(apiOrder.created_at),
        id: apiOrder.id,
        status: apiOrder.status,
        regulatoryInformation: plainToClass(LemonOrderRegulatoryInformation, {
          costsEntry: apiOrder.regulatory_information.costs_entry,
          costsEntryPct: apiOrder.regulatory_information.costs_entry_pct,
          costsRunning: apiOrder.regulatory_information.costs_running,
          costsRunningPct: apiOrder.regulatory_information.costs_running_pct,
          costsProduct: apiOrder.regulatory_information.costs_product,
          costsProductPct: apiOrder.regulatory_information.costs_product_pct,
          costsExit: apiOrder.regulatory_information.costs_exit,
          costsExitPct: apiOrder.regulatory_information.costs_exit_pct,
          yieldReductionYear:
            apiOrder.regulatory_information.yield_reduction_year,
          yieldReductionYearPct:
            apiOrder.regulatory_information.yield_reduction_year_pct,
          yieldReductionYearFollowing:
            apiOrder.regulatory_information.yield_reduction_year_following,
          yieldReductionYearFollowingPct:
            apiOrder.regulatory_information.yield_reduction_year_following_pct,
          yieldReductionYearExit:
            apiOrder.regulatory_information.yield_reduction_year_exit,
          yieldReductionYearExitPct:
            apiOrder.regulatory_information.yield_reduction_year_exit_pct,
          estimatedHoldingDurationYears:
            apiOrder.regulatory_information.estimated_holding_duration_years,
          estimatedYieldReductionTotal:
            apiOrder.regulatory_information.estimated_yield_reduction_total,
          estimatedYieldReductionTotalPct:
            apiOrder.regulatory_information.estimated_yield_reduction_total_pct,
          KIID: apiOrder.regulatory_information.KIID,
          legalDisclaimer: apiOrder.regulatory_information.legal_disclaimer,
        }),
        isin: apiOrder.isin,
        expiresAt: new Date(apiOrder.expires_at),
        side: apiOrder.side,
        quantity: apiOrder.quantity,
        stopPrice: apiOrder.stop_price,
        limitPrice: apiOrder.limit_price,
        venue: apiOrder.venue,
        estimatedPrice: apiOrder.estimated_price,
        estimatedPriceTotal: apiOrder.estimated_price_total,
        notes: apiOrder.notes,
        charge: apiOrder.charge,
        chargeableAt: apiOrder.chargeable_at
          ? new Date(apiOrder.chargeable_at)
          : null,
        keyCreationId: apiOrder.key_creation_id,
        idempotency: apiOrder.idempotency,
      });

      return new LemonResponse(metadata, order);
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while placing order");
    }
  }

  public async activateOrder(
    options: ActivateOrderOptions
  ): Promise<LemonResponse<null>> {
    try {
      const res = await this.axiosInstance.post(
        `/orders/${options.orderId}/activate`,
        { pin: options.pin }
      );

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);

      return new LemonResponse(metadata, null);
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while activating order");
    }
  }

  public async getOrders(
    options?: GetOrdersOptions
  ): Promise<LemonResponse<LemonCreatedOrder[]>> {
    try {
      const res = await this.axiosInstance.get<ApiGetOrdersResponse>(
        "/orders",
        {
          params: {
            from:
              options?.from instanceof Date
                ? dateToYYYYMMDD(options.from)
                : options?.from,
            to:
              options?.to instanceof Date
                ? dateToYYYYMMDD(options.to)
                : options?.to,
            isin: options?.isin,
            side: options?.side,
            status:
              typeof options?.status === "string"
                ? options?.status
                : Array.isArray(options?.status)
                ? options?.status.join(",")
                : undefined,
            type: options?.type,
            key_creation_id: options?.keyCreationId,
            page: options?.page,
            limit: options?.limit,
          },
        }
      );
      const apiOrders = res.data.results;

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);
      const orders: LemonCreatedOrder[] = apiOrders.map((order) =>
        plainToClass(LemonCreatedOrder, {
          createdAt: new Date(order.created_at),
          id: order.id,
          status: order.status,
          regulatoryInformation: plainToClass(LemonOrderRegulatoryInformation, {
            costsEntry: order.regulatory_information.costs_entry,
            costsEntryPct: order.regulatory_information.costs_entry_pct,
            costsRunning: order.regulatory_information.costs_running,
            costsRunningPct: order.regulatory_information.costs_running_pct,
            costsProduct: order.regulatory_information.costs_product,
            costsProductPct: order.regulatory_information.costs_product_pct,
            costsExit: order.regulatory_information.costs_exit,
            costsExitPct: order.regulatory_information.costs_exit_pct,
            yieldReductionYear:
              order.regulatory_information.yield_reduction_year,
            yieldReductionYearPct:
              order.regulatory_information.yield_reduction_year_pct,
            yieldReductionYearFollowing:
              order.regulatory_information.yield_reduction_year_following,
            yieldReductionYearFollowingPct:
              order.regulatory_information.yield_reduction_year_following_pct,
            yieldReductionYearExit:
              order.regulatory_information.yield_reduction_year_exit,
            yieldReductionYearExitPct:
              order.regulatory_information.yield_reduction_year_exit_pct,
            estimatedHoldingDurationYears:
              order.regulatory_information.estimated_holding_duration_years,
            estimatedYieldReductionTotal:
              order.regulatory_information.estimated_yield_reduction_total,
            estimatedYieldReductionTotalPct:
              order.regulatory_information.estimated_yield_reduction_total_pct,
            KIID: order.regulatory_information.KIID,
            legalDisclaimer: order.regulatory_information.legal_disclaimer,
          }),
          isin: order.isin,
          expiresAt: new Date(order.expires_at),
          side: order.side,
          quantity: order.quantity,
          stopPrice: order.stop_price,
          limitPrice: order.limit_price,
          venue: order.venue,
          estimatedPrice: order.estimated_price,
          estimatedPriceTotal: order.estimated_price_total,
          notes: order.notes,
          charge: order.charge,
          chargeableAt: order.chargeable_at
            ? new Date(order.chargeable_at)
            : null,
          keyCreationId: order.key_creation_id,
          idempotency: order.idempotency,
          // additional properties to the base `LemonOrder` class
          keyActivationId: order.key_activation_id,
          type: order.type,
          executedQuantity: order.executed_quantity,
          executedPrice: order.executed_price,
          executedPriceTotal: order.executed_price_total,
          executedAt: order.executed_at ? new Date(order.executed_at) : null,
          rejectedAt: order.rejected_at ? new Date(order.rejected_at) : null,
        })
      );
      const pagination: LemonPagination = plainToClass(LemonPagination, {
        previous: res.data.previous,
        next: res.data.next,
        total: res.data.total,
        page: res.data.page,
        pages: res.data.pages,
      });

      return new LemonResponse(metadata, orders, pagination);
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while getting orders");
    }
  }

  public async getOrder(
    options: GetOrderOptions
  ): Promise<LemonResponse<LemonCreatedOrder>> {
    try {
      const res = await this.axiosInstance.get<ApiGetOrderResponse>(
        `/orders/${options.orderId}`
      );
      const apiOrder = res.data.results;

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);
      const order: LemonCreatedOrder = plainToClass(LemonCreatedOrder, {
        createdAt: new Date(apiOrder.created_at),
        id: apiOrder.id,
        status: apiOrder.status,
        regulatoryInformation: plainToClass(LemonOrderRegulatoryInformation, {
          costsEntry: apiOrder.regulatory_information.costs_entry,
          costsEntryPct: apiOrder.regulatory_information.costs_entry_pct,
          costsRunning: apiOrder.regulatory_information.costs_running,
          costsRunningPct: apiOrder.regulatory_information.costs_running_pct,
          costsProduct: apiOrder.regulatory_information.costs_product,
          costsProductPct: apiOrder.regulatory_information.costs_product_pct,
          costsExit: apiOrder.regulatory_information.costs_exit,
          costsExitPct: apiOrder.regulatory_information.costs_exit_pct,
          yieldReductionYear:
            apiOrder.regulatory_information.yield_reduction_year,
          yieldReductionYearPct:
            apiOrder.regulatory_information.yield_reduction_year_pct,
          yieldReductionYearFollowing:
            apiOrder.regulatory_information.yield_reduction_year_following,
          yieldReductionYearFollowingPct:
            apiOrder.regulatory_information.yield_reduction_year_following_pct,
          yieldReductionYearExit:
            apiOrder.regulatory_information.yield_reduction_year_exit,
          yieldReductionYearExitPct:
            apiOrder.regulatory_information.yield_reduction_year_exit_pct,
          estimatedHoldingDurationYears:
            apiOrder.regulatory_information.estimated_holding_duration_years,
          estimatedYieldReductionTotal:
            apiOrder.regulatory_information.estimated_yield_reduction_total,
          estimatedYieldReductionTotalPct:
            apiOrder.regulatory_information.estimated_yield_reduction_total_pct,
          KIID: apiOrder.regulatory_information.KIID,
          legalDisclaimer: apiOrder.regulatory_information.legal_disclaimer,
        }),
        isin: apiOrder.isin,
        expiresAt: new Date(apiOrder.expires_at),
        side: apiOrder.side,
        quantity: apiOrder.quantity,
        stopPrice: apiOrder.stop_price,
        limitPrice: apiOrder.limit_price,
        venue: apiOrder.venue,
        estimatedPrice: apiOrder.estimated_price,
        estimatedPriceTotal: apiOrder.estimated_price_total,
        notes: apiOrder.notes,
        charge: apiOrder.charge,
        chargeableAt: apiOrder.chargeable_at
          ? new Date(apiOrder.chargeable_at)
          : null,
        keyCreationId: apiOrder.key_creation_id,
        idempotency: apiOrder.idempotency,
        // additional properties to the base `LemonOrder` class
        keyActivationId: apiOrder.key_activation_id,
        type: apiOrder.type,
        executedQuantity: apiOrder.executed_quantity,
        executedPrice: apiOrder.executed_price,
        executedPriceTotal: apiOrder.executed_price_total,
        executedAt: apiOrder.executed_at
          ? new Date(apiOrder.executed_at)
          : null,
        rejectedAt: apiOrder.rejected_at
          ? new Date(apiOrder.rejected_at)
          : null,
      });

      return new LemonResponse(metadata, order);
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while getting order");
    }
  }

  public async cancelOrder(
    options: CancelOrderOptions
  ): Promise<LemonResponse<null>> {
    try {
      const res = await this.axiosInstance.delete<ApiCancelOrderResponse>(
        `/orders/${options.orderId}`
      );

      const metadata: LemonMetadata = LemonMetadata.convert(res.data);

      return new LemonResponse(metadata, null);
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while cancelling order");
    }
  }
}
