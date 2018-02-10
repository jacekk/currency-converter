import numeral from 'numeral'

import {
    RATE_FORMAT,
    CALC_FORMAT,
    PERCENT_FORMAT,
} from '../../constants'

export const prepareDataSource = ({
    amount,
    comparisons,
    currencies,
    hasCals,
    hasComparison,
    rates,
}) =>
    currencies.map((currency) => {
        const rate = rates[currency] || 0

        let comparisonRate = 0
        let calculated = 0
        let compCalculated = 0
        let diff = 0
        let ratio = 0

        if (hasCals) {
            calculated = rate * amount
        }

        if (hasComparison) {
            comparisonRate = comparisons[currency]

            if (comparisonRate) {
                diff = rate - comparisonRate
                ratio = rate / comparisonRate

                if (hasCals) {
                    compCalculated = comparisonRate * amount
                }
            }
        }

        return {
            key: currency,
            rate: numeral(rate).format(RATE_FORMAT),
            comparisonRate: numeral(comparisonRate).format(RATE_FORMAT),
            calculated: numeral(calculated).format(CALC_FORMAT),
            compCalculated: numeral(compCalculated).format(CALC_FORMAT),
            diff: numeral(diff).format(CALC_FORMAT),
            ratio: numeral(ratio).format(PERCENT_FORMAT),
        }
    })
