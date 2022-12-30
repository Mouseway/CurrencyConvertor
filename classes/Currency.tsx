export class Currency {
    country: string
    code: string
    rate: number
    currency: string

    constructor(country: string, currency: string, rate: number, code: string) {
        this.country = country
        this.rate = rate
        this.code = code
        this.currency = currency
    }
}