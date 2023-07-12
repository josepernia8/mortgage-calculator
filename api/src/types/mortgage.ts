export enum PaymentFrequency {
  AccBiweekly = "accelerated bi-weekly",
  Biweekly = "bi-weekly",
  Monthly = "monthly"
}

export interface MortgageInput {
  propertyPrice: number
  downPayment: number
  annualInterestRate: number
  amortizationPeriod: number
  paymentFrequency: string
}

export interface MortgageOutput {
  payment: number
  totalMortgage: number
  defaultInsurance: number
}
