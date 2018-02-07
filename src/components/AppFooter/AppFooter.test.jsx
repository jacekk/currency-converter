import React from 'react'
import { shallow } from 'enzyme'

import AppFooter from './AppFooter'

describe('AppFooter', ()=> {
    it('should render specific elements', () => {
        const comp = shallow(<AppFooter />)

        expect(comp.is('Adapter')).toEqual(true)
        expect(comp.find('div').length).toEqual(3)
        expect(comp.find('a').length).toEqual(1)
    })
})
