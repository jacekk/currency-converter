import React from 'react'
import numeral from 'numeral'
import { Table } from 'antd'

import './Results.css'

const RATE_FORMAT = '0,0.0000'
const CALC_FORMAT = '0,0.0000'
const PERCENT_FORMAT = '(0.00 %)'

const prepareDataSource = ({
    amount,
    comparison,
    currencies,
    hasCals,
    hasComparison,
    rates,
}) =>
    currencies.map((currency) => {
        const rate = rates[currency] || 0

        let comparisonRate = 0
        let calculated = 0
        let compCalculated = 0
        let diff = 0
        let ratio = 0

        if (hasCals) {
            calculated = rate * amount
        }

        if (hasComparison) {
            comparisonRate = comparison[currency]

            if (comparisonRate) {
                diff = rate - comparisonRate
                ratio = rate / comparisonRate

                if (hasCals) {
                    compCalculated = comparisonRate * amount
                }
            }
        }

        return {
            key: currency,
            rate: numeral(rate).format(RATE_FORMAT),
            comparisonRate: numeral(comparisonRate).format(RATE_FORMAT),
            calculated: numeral(calculated).format(CALC_FORMAT),
            compCalculated: numeral(compCalculated).format(CALC_FORMAT),
            diff: numeral(diff).format(CALC_FORMAT),
            ratio: numeral(ratio).format(PERCENT_FORMAT),
        }
    })

export const diffRender = (text) => {
    let cellClass = 'Results-diffIncrease'

    if (text === '0.0000') {
        cellClass = 'Results-noDiff'
    } else if (text[0] === '-') {
        cellClass = 'Results-diffDecrease'
    }

    return <span className={cellClass}>{text}</span>
}

const getColumns = (props) =>
    [
        {
            title: 'currencies',
            dataIndex: 'key',
            key: 'key',
        },
        {
            title: `${props.ratesDate} | rates`,
            dataIndex: 'rate',
            key: 'rate',
        },
        props.hasComparison && {
            title: `${props.comparisonDate} | rates`,
            dataIndex: 'comparisonRate',
            key: 'comparisonRate',
        },
        props.hasCals && {
            title: `${props.ratesDate} | calculated`,
            dataIndex: 'calculated',
            key: 'calculated',
        },
        props.hasComparison &&
            props.hasCals && {
                title: `${props.comparisonDate} | calculated`,
                dataIndex: 'compCalculated',
                key: 'compCalculated',
            },
        props.hasComparison && {
            title: `difference`,
            dataIndex: 'diff',
            key: 'diff',
            render: diffRender,
        },
        props.hasComparison && {
            title: `ratio`,
            dataIndex: 'ratio',
            key: 'ratio',
        },
    ].filter(Boolean)

export default (props) => (
    <Table
        bordered
        className="Results-table"
        columns={getColumns(props)}
        dataSource={prepareDataSource(props)}
        pagination={false}
        size="small"
    />
)
