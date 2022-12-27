# LemonMarkets

<p align="center">
  <a href="https://github.com/MarcMogdanz/LemonMarkets/actions/workflows/ci.yml">
    <img src="https://github.com/MarcMogdanz/LemonMarkets/actions/workflows/ci.yml/badge.svg" />
  </a>
</p>

## API coverage

### Trading API

#### Account

| Name                | Route                        | Status |
| :------------------ | :--------------------------- | :----- |
| Get Account         | `GET /api/v1/account`        | ✅     |
| Create Withdrawal   | `POST /api/v1/withdrawals`   | ✅     |
| Get Withdrawals     | `GET /api/v1/withdrawals`    | ✅     |
| Get Documents       | `GET /api/v1/documents`      | ❌     |
| Download Document   | `GET /api/v1/documents/:id`  | ❌     |
| Get Bank Statements | `GET /api/v1/bankstatements` | ✅     |

#### Orders

| Name           | Route                               | Status |
| :------------- | :---------------------------------- | :----- |
| Place Order    | `POST /api/v1/orders`               | ✅     |
| Activate Order | `POST /api/v1/orders/{id}/activate` | ✅     |
| Get Orders     | `GET /api/v1/orders`                | ✅     |
| Get One Order  | `GET /api/v1/orders/{id}`           | ✅     |
| Cancel Order   | `DELETE /api/v1/orders/{id}`        | ✅     |

#### Positions

| Name            | Route                               | Status |
| :-------------- | :---------------------------------- | :----- |
| Get Positions   | `GET /api/v1/positions`             | ❌     |
| Get Statements  | `GET /api/v1/positions/statements`  | ❌     |
| Get Performance | `GET /api/v1/positions/performance` | ❌     |

### Market Data API

Not supported yet.
