import React from 'react'
import { shallow } from 'enzyme'

import { diffRender, getColumns } from './columns'

const DECREASE = 'Results-diffDecrease'
const INCREASE = 'Results-diffIncrease'
const NEUTRAL = 'Results-noDiff'

describe('diffRender', () => {
    it('should return "decrease" class for texts with negative numbers', () => {
        ;['-', '-12', '-12.56'].forEach((item) => {
            expect(shallow(diffRender(item)).hasClass(DECREASE)).toBe(true)
        })
    })

    it('should return "neutral" class for specific text', () => {
        expect(shallow(diffRender('0.00')).hasClass(NEUTRAL)).toBe(true)
    })

    it('should return "increase" class for texts with positive numbers', () => {
        ;['', '12', '12.56'].forEach((item) => {
            expect(shallow(diffRender(item)).hasClass(INCREASE)).toBe(true)
        })
    })
})

describe('getColumns', () => {
    it('should return two elements for both flags falsy', () => {
        const props = {
            comparisonDate: 'foo',
            hasCals: false,
            hasComparison: false,
            ratesDate: 'bar',
        }

        expect(getColumns(props)).toHaveLength(2)
    })

    it('should return three elements if cals is truthy', () => {
        const props = {
            comparisonDate: 'foo',
            hasCals: true,
            hasComparison: false,
            ratesDate: 'bar',
        }

        expect(getColumns(props)).toHaveLength(3)
    })

    it('should return five elements if comparison is truthy', () => {
        const props = {
            comparisonDate: 'foo',
            hasCals: false,
            hasComparison: true,
            ratesDate: 'bar',
        }

        expect(getColumns(props)).toHaveLength(5)
    })

    it('should return two elements for both flags truthy', () => {
        const props = {
            comparisonDate: 'foo',
            hasCals: true,
            hasComparison: true,
            ratesDate: 'bar',
        }

        expect(getColumns(props)).toHaveLength(7)
    })
})
