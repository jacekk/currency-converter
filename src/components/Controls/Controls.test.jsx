import React from 'react'
import { shallow } from 'enzyme'
import { DatePicker, Select, Row, Col, Checkbox, InputNumber } from 'antd'

import Controls from './Controls'

describe('Controls', () => {
    it('should render specific elements', () => {
        const comp = shallow(<Controls />)

        expect(comp.find(DatePicker).length).toEqual(2)
        expect(comp.find(Select).length).toEqual(1)
        expect(comp.find(Row).length).toEqual(1)
        expect(comp.find(Col).length).toEqual(6)
        expect(comp.find(Checkbox).length).toEqual(2)
        expect(comp.find(InputNumber).length).toEqual(1)
    })
})
