import { MIN_AMOUNT, MAX_AMOUNT } from './constants'

export const limitNumber = (numericValue, min, max) =>
    Math.min(max, Math.max(min, numericValue))

export const limitAmount = (amount) =>
    limitNumber(amount, MIN_AMOUNT, MAX_AMOUNT)
