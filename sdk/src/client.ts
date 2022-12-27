import axios, { AxiosInstance } from "axios";
import { Account } from "./account";
import { Orders } from "./orders";
import { Positions } from "./positions";

enum LemonMarketsEnvironment {
  PAPER = "PAPER",
  LIVE = "LIVE",
}

interface LemonMarketsOptions {
  env?: LemonMarketsEnvironment;
  tradingKey: string;
  marketDataKey?: string;
}

export class LemonMarkets {
  private tradingClient: TradingClient;

  constructor({
    env = LemonMarketsEnvironment.PAPER,
    tradingKey,
    // eslint-disable-next-line @typescript-eslint/ban-ts-comment
    // @ts-ignore
    // eslint-disable-next-line @typescript-eslint/no-unused-vars
    marketDataKey,
  }: LemonMarketsOptions) {
    this.tradingClient = new TradingClient(env, tradingKey);

    // TODO: market data
  }

  public getTradingClient(): TradingClient {
    return this.tradingClient;
  }
}

class TradingClient {
  private axiosInstance: AxiosInstance;

  public account: Account;
  public orders: Orders;
  public positions: Positions;

  constructor(env: LemonMarketsEnvironment, apiKey: string) {
    this.axiosInstance = axios.create({
      baseURL: `https://${
        env === LemonMarketsEnvironment.PAPER ? "paper-" : ""
      }trading.lemon.markets/v1`,
      headers: {
        "User-Agent": "LemonMarkets-JS-SDK", // TODO: add current version
        Authorization: `Bearer ${apiKey}`,
      },
    });

    this.account = new Account(this.axiosInstance);
    this.orders = new Orders(this.axiosInstance);
    this.positions = new Positions(this.axiosInstance);
  }
}

// TODO
// eslint-disable-next-line @typescript-eslint/ban-ts-comment
// @ts-ignore
// eslint-disable-next-line @typescript-eslint/no-unused-vars
class MarketDataClient {
  //
}
