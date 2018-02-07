import React from 'react'
import { shallow } from 'enzyme'
import { Table } from 'antd'

import Results from './Results'

describe('Results', ()=> {
    it('should render specific elements', () => {
        const comp = shallow(<Results currencies={[]} />)

        expect(comp.find(Table).exists()).toBe(true)
    })
})
