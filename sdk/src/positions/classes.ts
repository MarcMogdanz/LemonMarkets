import { StatementType } from "../common/types";

export class LemonPosition {
  public isin!: string;
  public isinTitle!: string;
  public quantity!: number;
  public buyPriceAvg!: number;
  public estimatedPriceTotal!: number;
  public estimatedPrice!: number;
}

export class LemonStatement {
  public id!: string;
  public orderId!: string;
  public externalId?: string;
  public type!: StatementType;
  public quantity!: number;
  public isin!: string;
  public isinTitle!: string;
  public date!: Date;
  public createdAt!: Date;
}

export class LemonPerformance {
  public isin!: string;
  public isinTitle!: string;
  public profit!: number;
  public loss!: number;
  public quantityBought!: number;
  public quantitySold!: number;
  public quantityOpen!: number;
  public openedAt!: Date;
  public closedAt?: Date;
  public fees!: number;
}
