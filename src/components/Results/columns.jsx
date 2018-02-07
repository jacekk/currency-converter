import React from 'react'

export const diffRender = (text) => {
    let cellClass = 'Results-diffIncrease'

    if (text === '0.0000') {
        cellClass = 'Results-noDiff'
    } else if (text[0] === '-') {
        cellClass = 'Results-diffDecrease'
    }

    return <span className={cellClass}>{text}</span>
}

export const getColumns = (props) =>
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
