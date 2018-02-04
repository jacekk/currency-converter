import { connect } from 'react-redux'

import {
    changeAmount,
    changeComparisionDate,
    changeCurrency,
    changeMainDate,
    toggleCalculator,
    toggleComparision,
} from '../../ducks/controls'

import Controls from './Controls'

const mapStateToProps = (state) => ({
    ...state.controls,
})

const mapDispatchToProps = (dispatch) => ({
    onAmountChange: (val) => dispatch(changeAmount(val)),
    onCalculationToggle: (ev) => dispatch(toggleCalculator(ev.target.checked)),
    onComparisonDateChange: (val) => dispatch(changeComparisionDate(val)),
    onComparisonToggle: (ev) => dispatch(toggleComparision(ev.target.checked)),
    onCurrencyChange: (val) => dispatch(changeCurrency(val)),
    onMainDateChange: (val) => dispatch(changeMainDate(val)),
})

export default connect(mapStateToProps, mapDispatchToProps)(Controls)
