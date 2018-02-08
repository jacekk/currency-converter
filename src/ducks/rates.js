import axios from 'axios'
import { get } from 'lodash'

import { API_BASE_URL, API_DATE_FORMAT } from '../constants'

export const DEFAULT_STATE = {
    comparison: {},
    main: {},
}

const FETCH_MAIN_START = 'rates/FETCH_MAIN_START'
const FETCH_MAIN_SUCCESS = 'rates/FETCH_MAIN_SUCCESS'
const FETCH_COMPARISON_START = 'rates/FETCH_COMPARISON_START'
const FETCH_COMPARISON_SUCCESS = 'rates/FETCH_COMPARISON_SUCCESS'

// sync

export const fetchMainRates = () => ({
    type: FETCH_MAIN_START,
})

export const fetchComparisonRates = () => ({
    type: FETCH_COMPARISON_START,
})

export const mainRatesFetched = (response) => ({
    type: FETCH_MAIN_SUCCESS,
    payload: get(response, 'data.rates'),
})

export const comparisonRatesFetched = (response) => ({
    type: FETCH_COMPARISON_SUCCESS,
    payload: get(response, 'data.rates'),
})

// async

export const fetchOnPageLoadAsync = () => (dispatch, getState) => {
    dispatch(fetchMainRatesAsync())

    if (get(getState(), 'controls.isComparisonEnabled')) {
        dispatch(fetchComparisonRatesAsync())
    }
}

export const fetchMainRatesAsync = () => (dispatch, getState) => {
    const { controls } = getState()
    const dateFormatted = controls.mainDate.format(API_DATE_FORMAT)
    const base = controls.currency
    const fullUrl = `${API_BASE_URL}${dateFormatted}?base=${base}`

    dispatch(fetchMainRates())

    return axios.get(fullUrl).then((response) => {
        dispatch(mainRatesFetched(response))
    })
}

export const fetchComparisonRatesAsync = () => (dispatch, getState) => {
    const { controls } = getState()
    const dateFormatted = controls.comparisonDate.format(API_DATE_FORMAT)
    const base = controls.currency
    const fullUrl = `${API_BASE_URL}${dateFormatted}?base=${base}`

    dispatch(fetchComparisonRates())

    return axios.get(fullUrl).then((response) => {
        dispatch(comparisonRatesFetched(response))
    })
}

export default function ratesReducer(state = DEFAULT_STATE, action = {}) {
    switch (action.type) {
        case FETCH_MAIN_START:
            return { ...state, main: {} }
        case FETCH_MAIN_SUCCESS:
            return { ...state, main: action.payload }
        case FETCH_COMPARISON_START:
            return { ...state, comparison: {} }
        case FETCH_COMPARISON_SUCCESS:
            return { ...state, comparison: action.payload }
        default:
            return state
    }
}
