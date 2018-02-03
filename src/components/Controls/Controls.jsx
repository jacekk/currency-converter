import React from 'react'
import moment from 'moment'
import { DatePicker, Select, Row, Col, Checkbox, InputNumber } from 'antd'

import { CURRENCIES, API_DATE_FORMAT } from '../../constants'

import './Controls.css'

const { Option } = Select

const renderOptions = () =>
    CURRENCIES.map((item) => <Option key={item}>{item}</Option>)

const onCurrencyChange = (value) => console.log('currency changed to:', value)

const onDateChange = (momentDate) =>
    console.log('date changed to:', momentDate.format(API_DATE_FORMAT))

const onCompareDateChange = (momentDate) =>
    console.log(
        'date to compare changed to:',
        momentDate.format(API_DATE_FORMAT)
    )

const onCompareCheckboxChange = (ev) =>
    console.log('compare checkbox changed to:', ev.target.checked)

const onCalculateCheckboxChange = (ev) =>
    console.log('calculate checkbox changed to:', ev.target.checked)

const onAmountChange = (value) => console.log('amount changed to:', value)

export default () => (
    <Row type="flex" justify="center" gutter={16}>
        <Col span={4}>
            <Select
                defaultValue="PLN"
                onChange={onCurrencyChange}
                showSearch
                className="Controls-currencySelect"
            >
                {renderOptions()}
            </Select>
        </Col>
        <Col span={4}>
            <DatePicker
                allowClear={false}
                defaultValue={moment()}
                onChange={onDateChange}
            />
        </Col>
        <Col span={4} className="Controls-checkbox">
            <Checkbox onChange={onCompareCheckboxChange}>Compare?</Checkbox>
        </Col>
        <Col span={4}>
            <DatePicker
                allowClear={false}
                defaultValue={moment().subtract(1, 'months')}
                disabled={true}
                onChange={onCompareDateChange}
            />
        </Col>
        <Col span={4} className="Controls-checkbox">
            <Checkbox onChange={onCalculateCheckboxChange}>Calculate?</Checkbox>
        </Col>
        <Col span={4}>
            <InputNumber
                defaultValue={1}
                disabled={true}
                onChange={onAmountChange}
            />
        </Col>
    </Row>
)
