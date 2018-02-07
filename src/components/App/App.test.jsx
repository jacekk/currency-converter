import React from 'react'
import { shallow } from 'enzyme'

import AppFooter from '../AppFooter'
import Controls from '../Controls'
import Results from '../Results'

import App from './App'

describe('App', () => {
    it('should render specific elements', () => {
        const comp = shallow(<App />)

        expect(comp.find(AppFooter).length).toEqual(1)
        expect(comp.find(Controls).length).toEqual(1)
        expect(comp.find(Results).length).toEqual(1)
    })
})
