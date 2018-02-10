import { ZERO_FORMATTED } from '../../constants'

import { prepareDataSource } from './dataSource'

describe('prepareDataSource', () => {
    let defaultProps

    beforeEach(() => {
        defaultProps = {
            hasCals: false,
            hasComparison: false,
            amount: 2,
            currencies: ['PLN'],
            comparisons: { PLN: 1.4},
            rates: { PLN: 1.2 },
        }
    })

    it('should map currencies when both flags are falsy', () => {
        const props = {
            ...defaultProps,
        }
        const expected = [
            {
                calculated: ZERO_FORMATTED,
                comparisonRate: ZERO_FORMATTED,
                compCalculated: ZERO_FORMATTED,
                diff: ZERO_FORMATTED,
                key: 'PLN',
                rate: '1.20',
                ratio: '0.00 %',
            },
        ]

        expect(prepareDataSource(props)).toEqual(expected)
    })

    it('should map currencies when calcs are enabled', () => {
        const props = {
            ...defaultProps,
            hasCals: true,
            hasComparison: false,
        }
        const expected = [
            {
                calculated: '2.40',
                comparisonRate: ZERO_FORMATTED,
                compCalculated: ZERO_FORMATTED,
                diff: ZERO_FORMATTED,
                key: 'PLN',
                rate: '1.20',
                ratio: '0.00 %',
            },
        ]

        expect(prepareDataSource(props)).toEqual(expected)
    })

    it('should map currencies when comprison is enabled', () => {
        const props = {
            ...defaultProps,
            hasCals: false,
            hasComparison: true,
        }
        const expected = [
            {
                calculated: ZERO_FORMATTED,
                comparisonRate: '1.40',
                compCalculated: ZERO_FORMATTED,
                diff: '-0.20',
                key: 'PLN',
                rate: '1.20',
                ratio: '85.71 %',
            },
        ]

        expect(prepareDataSource(props)).toEqual(expected)
    })

    it('should map currencies when both flags are truthy', () => {
        const props = {
            ...defaultProps,
            hasCals: true,
            hasComparison: true,
        }
        const expected = [
            {
                calculated: '2.40',
                comparisonRate: '1.40',
                compCalculated: '2.80',
                diff: '-0.20',
                key: 'PLN',
                rate: '1.20',
                ratio: '85.71 %',
            },
        ]

        expect(prepareDataSource(props)).toEqual(expected)
    })

    it('should map currency without any values', () => {
        const props = {
            ...defaultProps,
            hasComparison: true,
            hasCals: true,
            currencies: ['USD'],
            rates: {},
            comparisons: {},
        }
        const expected = [
            {
                calculated: ZERO_FORMATTED,
                comparisonRate: ZERO_FORMATTED,
                compCalculated: ZERO_FORMATTED,
                diff: ZERO_FORMATTED,
                key: 'USD',
                rate: ZERO_FORMATTED,
                ratio: '0.00 %',
            },
        ]

        expect(prepareDataSource(props)).toEqual(expected)
    })
})
