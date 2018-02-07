import { connect } from 'react-redux'

import { API_DATE_FORMAT} from '../../constants'

import Results from './Results'

const mapStateToProps = (state) => ({
    amount: state.controls.amount,
    comparisons: state.rates.comparison,
    comparisonDate: state.controls.comparisonDate.format(API_DATE_FORMAT),
    currencies: Object.keys(state.rates.main),
    hasCals: state.controls.isCalculatorEnabled,
    hasComparison: state.controls.isComparisonEnabled,
    rates: state.rates.main,
    ratesDate: state.controls.mainDate.format(API_DATE_FORMAT),
})

export default connect(mapStateToProps)(Results)
