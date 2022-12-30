import { Currency } from "./Currency"

export class PickerItem {
    label: string
    value: Currency

    constructor(label: string, value: Currency) {
        this.label = label,
            this.value = value
    }
}