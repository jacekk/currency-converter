import axios from 'axios'
import { get } from 'lodash'

import { API_BASE_URL, API_DATE_FORMAT } from '../constants'

const DEFAULT_STATE = {
    comparison: {},
    main: {},
}

const FETCH_MAIN_START = 'rates/FETCH_MAIN_START'
const FETCH_MAIN_SUCCESS = 'rates/FETCH_MAIN_SUCCESS'
const FETCH_COMPARISON_START = 'rates/FETCH_COMPARISON_START'
const FETCH_COMPARISON_SUCCESS = 'rates/FETCH_COMPARISON_SUCCESS'

export const fetchMainRates = () => (dispatch, getState) => {
    const { controls } = getState()
    const dateFormatted = controls.mainDate.format(API_DATE_FORMAT)
    const base = controls.currency
    const fullUrl = `${API_BASE_URL}${dateFormatted}?base=${base}`

    dispatch({ type: FETCH_MAIN_START })

    return axios.get(fullUrl).then((response) => {
        dispatch(mainRatesFetched(response))
    })
}

export const fetchComparisonRates = () => (dispatch, getState) => {
    const { controls } = getState()
    const dateFormatted = controls.comparisonDate.format(API_DATE_FORMAT)
    const base = controls.currency
    const fullUrl = `${API_BASE_URL}${dateFormatted}?base=${base}`

    dispatch({ type: FETCH_COMPARISON_START })

    return axios.get(fullUrl).then((response) => {
        dispatch(comparisonRatesFetched(response))
    })
}

export const mainRatesFetched = (response) => ({
    type: FETCH_MAIN_SUCCESS,
    payload: get(response, 'data.rates'),
})

export const comparisonRatesFetched = (response) => ({
    type: FETCH_COMPARISON_SUCCESS,
    payload: get(response, 'data.rates'),
})

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
