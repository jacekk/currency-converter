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
                calculated: '0.0000',
                comparisonRate: '0.0000',
                compCalculated: '0.0000',
                diff: '0.0000',
                key: 'PLN',
                rate: '1.2000',
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
                calculated: '2.4000',
                comparisonRate: '0.0000',
                compCalculated: '0.0000',
                diff: '0.0000',
                key: 'PLN',
                rate: '1.2000',
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
                calculated: '0.0000',
                comparisonRate: '1.4000',
                compCalculated: '0.0000',
                diff: '-0.2000',
                key: 'PLN',
                rate: '1.2000',
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
                calculated: '2.4000',
                comparisonRate: '1.4000',
                compCalculated: '2.8000',
                diff: '-0.2000',
                key: 'PLN',
                rate: '1.2000',
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
                calculated: '0.0000',
                comparisonRate: '0.0000',
                compCalculated: '0.0000',
                diff: '0.0000',
                key: 'USD',
                rate: '0.0000',
                ratio: '0.00 %',
            },
        ]

        expect(prepareDataSource(props)).toEqual(expected)
    })
})
