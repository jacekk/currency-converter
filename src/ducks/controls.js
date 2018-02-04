import moment from 'moment'

const DEFAULT_STATE = {
    amount: 1,
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

export const toggleCalculator = (payload) => ({
    type: CALCULATOR_TOGGLE,
    payload,
})

export const changeComparisionDate = (payload) => ({
    type: COMPARISION_DATE_CHANGE,
    payload,
})

export const toggleComparision = (payload) => ({
    type: COMPARISION_TOGGLE,
    payload,
})

export const changeCurrency = (payload) => ({
    type: CURRENCY_CHANGE,
    payload,
})

export const changeMainDate = (payload) => ({
    type: MAIN_DATE_CHANGE,
    payload,
})

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
