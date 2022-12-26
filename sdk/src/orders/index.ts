import { AxiosInstance } from "axios";
import { plainToClass } from "class-transformer";
import { LemonMetadata, LemonResponse } from "../common/classes";
import { LemonBadRequestError, LemonError } from "../common/errors";
import { dateToYYYYMMDD } from "../common/functions";
import { LemonOrder, LemonOrderRegulatoryInformation } from "./classes";
import { ApiPlaceOrderResponse } from "./interfaces.api";
import { ActivateOrderOptions, PlaceOrderOptions } from "./interfaces.options";

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

  // TODO: get orders

  // TODO: get one order

  // TODO: delete order
}
