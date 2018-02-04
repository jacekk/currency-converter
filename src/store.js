import { combineReducers, compose, createStore, applyMiddleware } from 'redux'
import thunk from 'redux-thunk'
import persistState from 'redux-localstorage'

import reducers from './ducks'

const DEFAULT_STATE = {}

const enhancers = compose(
    applyMiddleware(thunk),
    // persistState(null, {
    //     key: 'currency-converter-v0.1.0',
    // }),
    window.devToolsExtension ? window.devToolsExtension() : (f) => f
)

const store = createStore(combineReducers(reducers), DEFAULT_STATE, enhancers)

export default store
