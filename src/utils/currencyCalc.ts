import { IListingCurrency } from "../types/response"

export const currencyCalc = (currency:IListingCurrency) => {
    return currency === "USD" ? "$" : "₪"
}