import moment from 'moment'

import { fetchMainRates, fetchComparisonRates } from './rates'

const DEFAULT_STATE = {
    amount: 100,
    comparisonDate: moment().subtract(1, 'months'),
    currency: 'PLN',
    isCalculatorEnabled: false,
    isComparisonEnabled: false,
    mainDate: moment(),
}

const AMOUNT_CHANGE = 'controls/AMOUNT_CHANGE'
const CALCULATOR_TOGGLE = 'controls/CALCULATOR_TOGGLE'
const COMPARISION_DATE_CHANGE = 'controls/COMPARISION_DATE_CHANGE'
const COMPARISION_TOGGLE = 'controls/COMPARISION_TOGGLE'
const CURRENCY_CHANGE = 'controls/CURRENCY_CHANGE'
const MAIN_DATE_CHANGE = 'controls/MAIN_DATE_CHANGE'

export const changeAmount = (payload) => ({
    type: AMOUNT_CHANGE,
    payload,
})

export const toggleCalculator = (isEnabled) => ({
    type: CALCULATOR_TOGGLE,
    payload: isEnabled,
})

export const changeComparisionDate = (payload) => (dispatch) => {
    dispatch({
        type: COMPARISION_DATE_CHANGE,
        payload,
    })
    dispatch(fetchComparisonRates())
}

export const toggleComparision = (isEnabled) => (dispatch) => {
    dispatch({
        type: COMPARISION_TOGGLE,
        payload: isEnabled,
    })
    if (isEnabled) {
        dispatch(fetchComparisonRates())
    }
}

export const changeCurrency = (payload) => (dispatch, getState) => {
    const { controls } = getState()

    dispatch({ type: CURRENCY_CHANGE, payload })
    dispatch(fetchMainRates())

    if (controls.isComparisonEnabled) {
        dispatch(fetchComparisonRates())
    }
}

export const changeMainDate = (payload) => (dispatch) => {
    dispatch({ type: MAIN_DATE_CHANGE, payload })
    dispatch(fetchMainRates())
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
        case COMPARISION_DATE_CHANGE:
            return { ...state, comparisonDate: action.payload }
        case COMPARISION_TOGGLE:
            return { ...state, isComparisonEnabled: action.payload }
        case CURRENCY_CHANGE:
            return { ...state, currency: action.payload }
        case MAIN_DATE_CHANGE:
            return { ...state, mainDate: action.payload }
        default:
            return state
    }
}
