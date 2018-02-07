import { connect } from 'react-redux'

import {
    changeAmount,
    changeComparisonDateAsync,
    changeCurrencyAsync,
    changeMainDateAsync,
    toggleCalculator,
    toggleComparisonAsync,
} from '../../ducks/controls'

import Controls from './Controls'

const mapStateToProps = (state) => ({
    ...state.controls,
})

const mapDispatchToProps = (dispatch) => ({
    onAmountChange: (val) => dispatch(changeAmount(val)),
    onCalculationToggle: (ev) => dispatch(toggleCalculator(ev.target.checked)),
    onComparisonDateChange: (val) => dispatch(changeComparisonDateAsync(val)),
    onComparisonToggle: (ev) => dispatch(toggleComparisonAsync(ev.target.checked)),
    onCurrencyChange: (val) => dispatch(changeCurrencyAsync(val)),
    onMainDateChange: (val) => dispatch(changeMainDateAsync(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
