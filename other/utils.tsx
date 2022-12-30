const roundDecimal = (num: number, decimals: number) => {
    const a = Math.pow(10, decimals)
    return Math.round((num + Number.EPSILON) * a) / a
}

export {roundDecimal}