import { MortgageInput, MortgageOutput } from '../types'
import { PaymentFrequency } from "../types/mortgage"

export const getPaymentPerSchedule = (p: number, r: number, n: number, pf: string): number => {
  let paymentPerSchedule = p * (r * Math.pow(1 + r, n)) / (Math.pow(1 + r, n) - 1)

  if (pf === PaymentFrequency.AccBiweekly) {
    paymentPerSchedule = paymentPerSchedule / 2
  }

  return Math.ceil(paymentPerSchedule)
}

export const getDefaultInsuranceRate = (downPaymentPercentage: number): number => {
  switch (true) {
    case downPaymentPercentage < 10:
      return 0.04
    case downPaymentPercentage < 15:
      return 0.031
    case downPaymentPercentage < 20:
      return 0.028
    default:
      return 0
  }
}

export const getPaymentsPerYear = (paymentFrequency: string): number => {
  switch (paymentFrequency) {
    case PaymentFrequency.Biweekly:
      return 26
    case PaymentFrequency.AccBiweekly:
    case PaymentFrequency.Monthly:
      return 12
    default:
      throw new Error('Invalid payment schedule')
  }
}

export default function calculatePayment(input: MortgageInput): MortgageOutput {
  const { propertyPrice, downPayment, annualInterestRate, amortizationPeriod, paymentFrequency } = input

  const loanAmount = propertyPrice - downPayment
  const paymentsPerYear = getPaymentsPerYear(paymentFrequency)
  const totalPayments = amortizationPeriod * paymentsPerYear
  const interestRatePerPayment = annualInterestRate / 100 / paymentsPerYear
  const paymentPerSchedule = getPaymentPerSchedule(loanAmount, interestRatePerPayment, totalPayments, paymentFrequency)

  const downPaymentPercentage = (downPayment / propertyPrice) * 100
  const defaultInsurance = loanAmount * getDefaultInsuranceRate(downPaymentPercentage)
  const totalMortgage = loanAmount + defaultInsurance

  return {
    payment: paymentPerSchedule,
    totalMortgage: totalMortgage,
    defaultInsurance: defaultInsurance
  }
}
