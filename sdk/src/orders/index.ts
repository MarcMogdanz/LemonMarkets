import { AxiosInstance } from "axios";
import { plainToClass } from "class-transformer";
import { LemonBase } from "../common/classes";
import { convertMetadata } from "../common/convertMetadata";
import { LemonError } from "../common/errors";
import { OrderSide, OrderStatus } from "../common/types";
import { ApiOrder } from "./interfaces.api";
import { PlaceOrderOptions } from "./interfaces.internal";

export class Orders {
  constructor(private axiosInstance: AxiosInstance) {
    this.axiosInstance = axiosInstance;
  }

  public async placeOrder(options: PlaceOrderOptions): Promise<LemonOrder> {
    try {
      const res = await this.axiosInstance.post<ApiOrder>("/orders", options);
      const apiOrder = res.data.results;

      return plainToClass(LemonOrder, {
        metadata: convertMetadata(res.data),
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
    } catch (err) {
      throw LemonError.parse(err, "An error occurred while placing order");
    }
  }

  // TODO: activate order

  // TODO: get orders

  // TODO: get one order

  // TODO: delete order
}

//
//
//

class LemonOrderRegulatoryInformation {
  public costsEntry!: number;
  public costsEntryPct!: string;
  public costsRunning!: number;
  public costsRunningPct!: string;
  public costsProduct!: number;
  public costsProductPct!: string;
  public costsExit!: number;
  public costsExitPct!: string;
  public yieldReductionYear!: number;
  public yieldReductionYearPct!: string;
  public yieldReductionYearFollowing!: number;
  public yieldReductionYearFollowingPct!: string;
  public yieldReductionYearExit!: number;
  public yieldReductionYearExitPct!: string;
  public estimatedHoldingDurationYears!: string;
  public estimatedYieldReductionTotal!: number;
  public estimatedYieldReductionTotalPct!: string;
  public KIID!: string;
  public legalDisclaimer!: string;
}

class LemonOrder extends LemonBase {
  public createdAt!: Date;
  public id!: string;
  public status!: OrderStatus;
  public regulatoryInformation!: LemonOrderRegulatoryInformation;
  public isin!: string;
  public expiresAt!: Date;
  public side!: OrderSide;
  public quantity!: number;
  public stopPrice?: number;
  public limitPrice?: number;
  public venue!: string;
  public estimatedPrice!: number;
  public estimatedPriceTotal!: number;
  public notes?: string;
  public charge!: number;
  public chargeableAt?: Date;
  public keyCreationId!: string;
  public idempotency?: string;
}
