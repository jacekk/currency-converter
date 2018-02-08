import moment from 'moment'

import reducer, {
    comparisonRatesFetched,
    DEFAULT_STATE,
    fetchComparisonRates,
    fetchComparisonRatesAsync,
    fetchMainRates,
    fetchMainRatesAsync,
    fetchOnPageLoadAsync,
    mainRatesFetched,
} from './rates'

describe('rates/reducer', () => {
    let ratesMock
    let responseMock
    let reduced
    let state

    beforeEach(() => {
        ratesMock = {
            PLN: 1.2,
            USD: 4,
        }
        responseMock = {
            data: {
                rates: ratesMock,
            },
        }
        state = { ...DEFAULT_STATE }
    })

    it('should NOT modify state on invalid action', () => {
        expect(reducer()).toEqual(state)
        expect(reducer(state, { type: 'foo' })).toEqual(state)
    })

    it('should reset main rates on fetch start', () => {
        state.main = { ...ratesMock }

        reduced = reducer(state, fetchMainRates())

        expect(reduced.main).toEqual({})
    })

    it('should reset main rates on fetch start', () => {
        state.comparison = { ...ratesMock }

        reduced = reducer(state, fetchComparisonRates())

        expect(reduced.comparison).toEqual({})
    })

    it('should save main rates from response', () => {
        reduced = reducer(state, mainRatesFetched(responseMock))

        expect(reduced.main).toEqual(ratesMock)
    })

    it('should save comparison rates from response', () => {
        reduced = reducer(state, comparisonRatesFetched(responseMock))

        expect(reduced.comparison).toEqual(ratesMock)
    })
})

jest.mock('axios', () => ({
    get: (url) =>
        Promise.resolve({
            data: {
                rates: url,
            },
        }),
}))

jest.mock('../constants', () => ({
    API_BASE_URL: '//api/',
    API_DATE_FORMAT: 'YYYY-MM-DD',
}))

describe('rates/asyncActions', () => {
    it('should dispatch one action on page load when comparison is disabled', () => {
        const dispatch = jest.fn()
        const controls = { isComparisonEnabled: false }
        const getState = () => ({ controls })

        fetchOnPageLoadAsync()(dispatch, getState)

        expect(dispatch.mock.calls).toHaveLength(1)
    })

    it('should dispatch two actions on page load when comparison is enabled', () => {
        const dispatch = jest.fn()
        const controls = { isComparisonEnabled: true }
        const getState = () => ({ controls })

        fetchOnPageLoadAsync()(dispatch, getState)

        expect(dispatch.mock.calls).toHaveLength(2)
    })

    it('should fetch main rates from specific url', async () => {
        const dispatch = jest.fn()
        const controls = {
            currency: 'USD',
            mainDate: moment('2017-12-31'),
        }
        const expectedResponse = {
            data: { rates: '//api/2017-12-31?base=USD' },
        }
        const getState = () => ({ controls })

        await fetchMainRatesAsync()(dispatch, getState)

        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith(fetchMainRates())
        expect(dispatch).toHaveBeenCalledWith(
            mainRatesFetched(expectedResponse)
        )
    })

    it('should fetch main rates from specific url', async () => {
        const dispatch = jest.fn()
        const controls = {
            currency: 'USD',
            comparisonDate: moment('2017-12-31'),
        }
        const expectedResponse = {
            data: { rates: '//api/2017-12-31?base=USD' },
        }
        const getState = () => ({ controls })

        await fetchComparisonRatesAsync()(dispatch, getState)

        expect(dispatch.mock.calls).toHaveLength(2)
        expect(dispatch).toHaveBeenCalledWith(fetchComparisonRates())
        expect(dispatch).toHaveBeenCalledWith(
            comparisonRatesFetched(expectedResponse)
        )
    })
})
