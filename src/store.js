import { combineReducers, compose, createStore } from 'redux'
import persistState from 'redux-localstorage';

import reducers from './ducks'

const DEFAULT_STATE = {}

const enhancers = compose(
    // persistState(null, {
    //     key: 'currency-converter-v0.1.0',
    // }),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

const store = createStore(combineReducers(reducers), DEFAULT_STATE, enhancers)

export default store
