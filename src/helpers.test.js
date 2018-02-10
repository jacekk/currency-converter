import { limitNumber } from './helpers'

describe('limitNumber', () => {
    it('should limit numbers lower than minimum', () => {
        expect(limitNumber(11, 22, 33)).toEqual(22)
    })
})
