import React from 'react'
import { DatePicker, Select, Row, Col, Checkbox, InputNumber } from 'antd'

import { CURRENCIES } from '../../constants'

import './Controls.css'

const { Option } = Select

const renderOptions = () =>
    CURRENCIES.map((item) => <Option key={item}>{item}</Option>)

export default (props) => (
    <Row type="flex" justify="center" gutter={16}>
        <Col span={4}>
            <Select
                className="Controls-currencySelect"
                onChange={props.onCurrencyChange}
                showSearch
                value={props.currency}
            >
                {renderOptions()}
            </Select>
        </Col>
        <Col span={4}>
            <DatePicker
                allowClear={false}
                onChange={props.onMainDateChange}
                value={props.mainDate}
            />
        </Col>
        <Col span={4} className="Controls-checkbox">
            <Checkbox
                checked={props.isComparisonEnabled}
                onChange={props.onComparisonToggle}
            >
                Compare?
            </Checkbox>
        </Col>
        <Col span={4}>
            <DatePicker
                allowClear={false}
                disabled={!props.isComparisonEnabled}
                onChange={props.onComparisonDateChange}
                value={props.comparisonDate}
            />
        </Col>
        <Col span={4} className="Controls-checkbox">
            <Checkbox
                checked={props.isCalculatorEnabled}
                onChange={props.onCalculationToggle}
            >
                Calculate?
            </Checkbox>
        </Col>
        <Col span={4}>
            <InputNumber
                disabled={!props.isCalculatorEnabled}
                onChange={props.onAmountChange}
                value={props.amount}
            />
        </Col>
    </Row>
)
