import React from 'react'
import { Table } from 'antd'

import { CURRENCIES } from '../../constants'

const dataSource = CURRENCIES.map((item) => ({
    key: item,
    rate: 4,
    calculated: 4 * 4,
    compareRate: 3.8,
    compareCalculated: 3.8 * 4,
    diff: -0.2,
    diffPercent: 3.8 / 4,
}))

const columns = [
    {
        title: '',
        dataIndex: 'key',
        key: 'key',
    },
    {
        title: 'Rate 1',
        dataIndex: 'rate',
        key: 'rate',
    },
    {
        title: 'Calculated 1',
        dataIndex: 'calculated',
        key: 'calculated',
    },
    {
        title: 'Rate 2',
        dataIndex: 'compareRate',
        key: 'compareRate',
    },
    {
        title: 'Calculated 2',
        dataIndex: 'compareCalculated',
        key: 'compareCalculated',
    },
    {
        title: 'Diff',
        dataIndex: 'diff',
        key: 'diff',
    },
    {
        title: 'Diff %',
        dataIndex: 'diffPercent',
        key: 'diffPercent',
    },
]

export default () => (
    <div>
        <Table
            className="Results-table"
            columns={columns}
            dataSource={dataSource}
            pagination={false}
            size="small"
        />
    </div>
)
