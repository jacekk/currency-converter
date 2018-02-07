import React from 'react'
import { Table } from 'antd'

import { prepareDataSource } from './dataSource'
import { getColumns } from './columns'

import './Results.css'

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
