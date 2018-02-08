import { get, set } from 'lodash'
import moment from 'moment'
import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import reducers from './ducks'
import { fetchOnPageLoadAsync } from './ducks/rates'

const DEFAULT_STATE = {}

const deserialize = (storedString) => {
    const mainPath = 'controls.mainDate'
    const compPath = 'controls.comparisonDate'

    let parsed = {}

    try {
        parsed = JSON.parse(storedString)
    } catch (ignore) {}

    set(parsed, mainPath, moment(get(parsed, mainPath)))
    set(parsed, compPath, moment(get(parsed, compPath)))

    return parsed
}

const enhancers = compose(
    applyMiddleware(thunk),
    persistState(['controls'], {
        deserialize,
        key: 'currency-converter-v0.1.0',
    }),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

const store = createStore(combineReducers(reducers), DEFAULT_STATE, enhancers)

store.dispatch(fetchOnPageLoadAsync())

export default store
