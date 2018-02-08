import moment from 'moment'

import { fetchMainRatesAsync, fetchComparisonRatesAsync } from './rates'
import { CURRENCIES } from '../constants'

export const DEFAULT_STATE = {
    amount: 100,
    comparisonDate: moment().subtract(1, 'months'),
    currency: 'PLN',
    isCalculatorEnabled: false,
    isComparisonEnabled: false,
    mainDate: moment(),
}

export const AMOUNT_CHANGE = 'controls/AMOUNT_CHANGE'
export const CALCULATOR_TOGGLE = 'controls/CALCULATOR_TOGGLE'
export const COMPARISON_DATE_CHANGE = 'controls/COMPARISON_DATE_CHANGE'
export const COMPARISON_TOGGLE = 'controls/COMPARISON_TOGGLE'
export const CURRENCY_CHANGE = 'controls/CURRENCY_CHANGE'
export const MAIN_DATE_CHANGE = 'controls/MAIN_DATE_CHANGE'

// sync

export const changeAmount = (payload) => ({
    type: AMOUNT_CHANGE,
    payload,
})

export const toggleCalculator = (isEnabled) => ({
    type: CALCULATOR_TOGGLE,
    payload: isEnabled,
})

export const changeComparisonDate = (newDate) => ({
    type: COMPARISON_DATE_CHANGE,
    payload: newDate,
})

export const changeCurrency = (payload) => ({
    type: CURRENCY_CHANGE,
    payload,
})

export const changeMainDate = (payload) => ({
    type: MAIN_DATE_CHANGE,
    payload,
})

export const toggleComparison = (isEnabled) => ({
    type: COMPARISON_TOGGLE,
    payload: isEnabled,
})

// async

export const changeMainDateAsync = (momentDate) => (dispatch) => {
    dispatch(changeMainDate(momentDate))
    dispatch(fetchMainRatesAsync())
}

export const changeComparisonDateAsync = (momentDate) => (dispatch) => {
    dispatch(changeComparisonDate(momentDate))
    dispatch(fetchComparisonRatesAsync())
}

export const toggleComparisonAsync = (isEnabled) => (dispatch) => {
    dispatch(toggleComparison(isEnabled))
    if (isEnabled) {
        dispatch(fetchComparisonRatesAsync())
    }
}

export const changeCurrencyAsync = (currency) => (dispatch, getState) => {
    const { controls } = getState()

    dispatch(changeCurrency(currency))
    dispatch(fetchMainRatesAsync())

    if (controls.isComparisonEnabled) {
        dispatch(fetchComparisonRatesAsync())
    }
}

export default function controlsReducer(state = DEFAULT_STATE, action = {}) {
    switch (action.type) {
        case AMOUNT_CHANGE:
            const amount = parseFloat(action.payload)
            if (isNaN(amount)) {
                return state
            }
            return { ...state, amount }
        case CALCULATOR_TOGGLE:
            return { ...state, isCalculatorEnabled: action.payload }
        case COMPARISON_DATE_CHANGE:
            return { ...state, comparisonDate: action.payload }
        case COMPARISON_TOGGLE:
            return { ...state, isComparisonEnabled: action.payload }
        case CURRENCY_CHANGE:
            if (!~CURRENCIES.indexOf(action.payload)) {
                return state
            }
            return { ...state, currency: action.payload }
        case MAIN_DATE_CHANGE:
            return { ...state, mainDate: action.payload }
        default:
            return state
    }
}
