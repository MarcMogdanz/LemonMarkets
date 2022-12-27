import { OrderSide, OrderStatus } from "../common/types";

export class LemonOrderRegulatoryInformation {
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

export class LemonOrder {
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

export class LemonCreatedOrder extends LemonOrder {
  /** Will equal the API key it got created with or `dashboard`/`mobile` for creation via dashboard or mobile. */
  public keyActivationId?: string;
  public type!: string;
  public executedQuantity!: number;
  public executedPrice!: number;
  public executedPriceTotal!: number;
  public executedAt?: Date;
  public rejectedAt?: Date;
}
