export class Currency {
    country: string
    code: string
    rate: number
    amount: number
    currency: string

    constructor(country: string, currency: string, amount: number, rate: number, code: string) {
        this.country = country
        this.rate = rate
        this.code = code
        this.amount = amount
        this.currency = currency
    }
}