import { expect } from 'chai'
import validateMortgageInput from './'
import { MortgageInput } from '../types'

describe('Mortgage Input Validator Util', () => {
  it('should return validation success for valid input', () => {
    const input: MortgageInput = {
      propertyPrice: 500000,
      downPayment: 100000,
      annualInterestRate: 5,
      amortizationPeriod: 25,
      paymentFrequency: 'monthly',
    }

    const result = validateMortgageInput(input)

    expect(result.error).to.be.undefined
    expect(result.value).to.deep.equal(input)
  })

  it('should return validation error for negative downPayment', () => {
    const input: MortgageInput = {
      propertyPrice: 500000,
      downPayment: -100000,
      annualInterestRate: 5,
      amortizationPeriod: 25,
      paymentFrequency: 'monthly',
    }

    const result = validateMortgageInput(input)

    expect(result.error).to.exist
    expect(result.error?.message).to.include('Down payment must be a positive number.')
  })

  it('should return validation error for downPayment greater than propertyPrice', () => {
    const input: MortgageInput = {
      propertyPrice: 500000,
      downPayment: 600000,
      annualInterestRate: 5,
      amortizationPeriod: 25,
      paymentFrequency: 'monthly',
    }

    const result = validateMortgageInput(input)

    expect(result.error).to.exist
    expect(result.error?.message).to.include('Down payment cannot be greater than the property price.')
  })

  it('should return validation error for invalid paymentFrequency', () => {
    const input: MortgageInput = {
      propertyPrice: 500000,
      downPayment: 100000,
      annualInterestRate: 5,
      amortizationPeriod: 25,
      paymentFrequency: 'weekly',
    }

    const result = validateMortgageInput(input)

    expect(result.error).to.exist
    expect(result.error?.message).to.include('Payment frequency must be one of: "accelerated bi-weekly", "bi-weekly", or "monthly".')
  })

  // Add more test cases here...

})
