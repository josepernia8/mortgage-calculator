import { expect } from 'chai'
import { MortgageInput, MortgageOutput } from '../types'
import { calculatePayment, getPaymentPerSchedule, getDefaultInsuranceRate, getPaymentsPerYear } from '../services'

describe('Mortgage Calculator Service', () => {
  describe('getPaymentPerSchedule', () => {
    it('should calculate payment per schedule correctly for monthly payment frequency', () => {
      const paymentPerSchedule = getPaymentPerSchedule(200000, 0.04, 240, 'monthly')
      expect(paymentPerSchedule).to.equal(8001)
    })

    it('should calculate payment per schedule correctly for bi-weekly payment frequency', () => {
      const paymentPerSchedule = getPaymentPerSchedule(200000, 0.04, 480, 'bi-weekly')
      expect(paymentPerSchedule).to.equal(8001)
    })

    it('should calculate payment per schedule correctly for accelerated bi-weekly payment frequency', () => {
      const paymentPerSchedule = getPaymentPerSchedule(200000, 0.04, 480, 'accelerated bi-weekly')
      expect(paymentPerSchedule).to.equal(4001)
    })
  })

  describe('getDefaultInsuranceRate', () => {
    it('should return the correct default insurance rate for a down payment less than 10%', () => {
      const insuranceRate = getDefaultInsuranceRate(8)
      expect(insuranceRate).to.equal(0.04)
    })

    it('should return the correct default insurance rate for a down payment between 10% and 14.99%', () => {
      const insuranceRate = getDefaultInsuranceRate(12)
      expect(insuranceRate).to.equal(0.031)
    })

    it('should return the correct default insurance rate for a down payment between 15% and 19.99%', () => {
      const insuranceRate = getDefaultInsuranceRate(18)
      expect(insuranceRate).to.equal(0.028)
    })

    it('should return 0 for a down payment of 20% or more', () => {
      const insuranceRate = getDefaultInsuranceRate(22)
      expect(insuranceRate).to.equal(0)
    })
  })

  describe('getPaymentsPerYear', () => {
    it('should return the correct number of payments per year for monthly payment frequency', () => {
      const paymentsPerYear = getPaymentsPerYear('monthly')
      expect(paymentsPerYear).to.equal(12)
    })

    it('should return the correct number of payments per year for accelerated bi-weekly payment frequency', () => {
      const paymentsPerYear = getPaymentsPerYear('accelerated bi-weekly')
      expect(paymentsPerYear).to.equal(12)
    })

    it('should return the correct number of payments per year for bi-weekly payment frequency', () => {
      const paymentsPerYear = getPaymentsPerYear('bi-weekly')
      expect(paymentsPerYear).to.equal(26)
    })

    it('should throw an error for an invalid payment frequency', () => {
      expect(() => getPaymentsPerYear('invalid')).to.throw('Invalid payment schedule')
    })
  })

  describe('calculatePayment', () => {
    it('should calculate the mortgage payment correctly', () => {
      const input: MortgageInput = {
        propertyPrice: 500000,
        downPayment: 50000,
        annualInterestRate: 5.12,
        amortizationPeriod: 15,
        paymentFrequency: 'monthly',
      }

      const output: MortgageOutput = calculatePayment(input)

      expect(output.payment).to.equal(3587)
      expect(output.totalMortgage).to.equal(463950)
      expect(output.defaultInsurance).to.equal(13950)
    })
  })
})
