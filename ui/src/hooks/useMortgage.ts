import { useReducer } from 'react'
import { Action, ActionType, State } from '../types'

const initialState: State = {
  propertyPrice: '',
  downPayment: '',
  annualInterestRate: '',
  amortizationPeriod: '',
  paymentFrequency: '',
}

const reducer = (
  state: State,
  action: Action
): State => {
  switch (action.type) {
    case ActionType.UPDATE:
      return { ...state, [action.field]: action.value }
    case ActionType.RESET:
      return initialState
    default:
      return state
  }
}

const useMortgage = (): [State, (action: Action) => void] => {
  const [state, dispatch] = useReducer(reducer, initialState)

  return [state, dispatch]
}

export default useMortgage
