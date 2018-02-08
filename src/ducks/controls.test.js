import moment from 'moment'

import { fetchMainRatesAsync, fetchComparisonRatesAsync } from './rates'

import reducer, {
    changeAmount,
    changeComparisonDate,
    changeComparisonDateAsync,
    changeCurrency,
    changeCurrencyAsync,
    changeMainDate,
    changeMainDateAsync,
    DEFAULT_STATE,
    toggleCalculator,
    toggleComparison,
    toggleComparisonAsync,
} from './controls'

jest.mock('./rates')

describe('controls/reducer', () => {
    let reduced
    let state

    beforeEach(() => {
        state = { ...DEFAULT_STATE }
    })

    it('should NOT modify state on invalid action', () => {
        expect(reducer()).toEqual(state)
        expect(reducer(state, { type: 'foo' })).toEqual(state)
    })

    it('should set amount only if numeric value passed', () => {
        const newAmount = state.amount + 11

        reduced = reducer(state, changeAmount('not a number'))

        expect(reduced.amount).toEqual(reduced.amount)

        reduced = reducer(state, changeAmount(newAmount))

        expect(reduced.amount).toEqual(newAmount)
    })

    it('should set calculator flag', () => {
        const name = 'isCalculatorEnabled'

        reduced = reducer(state, toggleCalculator(true))

        expect(reduced[name]).toEqual(true)

        reduced = reducer(state, toggleCalculator(false))

        expect(reduced[name]).toEqual(false)
    })

    it('should set comparison flag', () => {
        const name = 'isComparisonEnabled'

        reduced = reducer(state, toggleComparison(true))

        expect(reduced[name]).toEqual(true)

        reduced = reducer(reduced, toggleComparison(false))

        expect(reduced[name]).toEqual(false)
    })

    it('should set currency only if valid', () => {
        const valid = 'SEK'
        const invalid = 'foo'

        reduced = reducer(state, changeCurrency(valid))

        expect(reduced.currency).toEqual(valid)

        reduced = reducer(reduced, changeCurrency(invalid))

        expect(reduced.currency).toEqual(valid)
    })

    it('should set dates', () => {
        const main = moment()
        const comparison = moment().subtract(1, 'days')

        reduced = reducer(state, changeMainDate(main))
        reduced = reducer(reduced, changeComparisonDate(comparison))

        expect(reduced.mainDate).toEqual(main)
        expect(reduced.comparisonDate).toEqual(comparison)
    })
})

describe('controls/asyncActions', () => {
    it('should dispatch one action on comparison disable', () => {
        const dispatch = jest.fn()

        toggleComparisonAsync(false)(dispatch)

        expect(dispatch.mock.calls).toHaveLength(1)
        expect(dispatch).toHaveBeenCalledWith(toggleComparison(false))
    })

    it('should dispatch two actions on comparison enable', () => {
        const dispatch = jest.fn()

        toggleComparisonAsync(true)(dispatch)

        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith(toggleComparison(true))
        expect(dispatch).toHaveBeenCalledWith(fetchComparisonRatesAsync())
    })

    it('should dispatch two actions on main date change', () => {
        const newDate = moment()
        const dispatch = jest.fn()

        changeMainDateAsync(newDate)(dispatch)

        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith(changeMainDate(newDate))
        expect(dispatch).toHaveBeenCalledWith(fetchMainRatesAsync())
    })

    it('should dispatch two actions on comparison date change', () => {
        const newDate = moment()
        const dispatch = jest.fn()

        changeComparisonDateAsync(newDate)(dispatch)

        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith(changeComparisonDate(newDate))
        expect(dispatch).toHaveBeenCalledWith(fetchComparisonRatesAsync())
    })

    it('should dispatch two actions on currency change when comparison is disabled', () => {
        const dispatch = jest.fn()
        const controls = { isComparisonEnabled: false }
        const getState = () => ({ controls })
        const currency = 'FOO'

        changeCurrencyAsync(currency)(dispatch, getState)

        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith(changeCurrency(currency))
        expect(dispatch).toHaveBeenCalledWith(fetchMainRatesAsync())
    })

    it('should dispatch three actions on currency change when comparison is enabled', () => {
        const dispatch = jest.fn()
        const controls = { isComparisonEnabled: true }
        const getState = () => ({ controls })
        const currency = 'FOO'

        changeCurrencyAsync(currency)(dispatch, getState)

        expect(dispatch.mock.calls).toHaveLength(3)
        expect(dispatch).toHaveBeenCalledWith(fetchComparisonRatesAsync())
    })
})
