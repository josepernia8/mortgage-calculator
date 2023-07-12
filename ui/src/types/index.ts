export enum PaymentFrequency {
  AccBiweekly = "accelerated bi-weekly",
  Biweekly = "bi-weekly",
  Monthly = "monthly"
}

export enum ActionType {
  UPDATE,
  SUBMIT,
  RESET
}

export interface State {
  propertyPrice: string
  downPayment: string
  annualInterestRate: string
  amortizationPeriod: string
  paymentFrequency: string
}

export type Action =
  | {
    type: ActionType.UPDATE
    field: string
    value: string
  }
  | { type: ActionType.RESET }

export interface FormProps {
  onSubmit: (data: State, signal: AbortSignal) => void
}

export interface FormInputProps {
  name: string
  value: string
  noWrap?: boolean
  onChange: (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => void
}

export interface ResultCardProps {
  payment?: number
  totalMortgage?: number
  defaultInsurance?: number
}
