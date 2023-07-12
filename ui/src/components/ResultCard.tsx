import React from 'react'
import { ResultCardProps } from '../types'
import useLoading from '../hooks/useLoading'

const ResultCard: React.FC<ResultCardProps> = ({ payment, totalMortgage, defaultInsurance }) => {
  const { loading: { value, error } } = useLoading()

  const formatCurrency = (value?: number) => {
    if(value) {
      return new Intl.NumberFormat('en-CA', { style: 'currency', currency: 'CAD' }).format(value)
    }
  }

  return (
    <div className={`${value ? 'animate-pulse': ''}`}>
    {!!error
      ? (
        <>
          <h2 className="text-red-500 text-2xl font-medium">Mortgage Calculation Error</h2>
          <h3 className="p-3 text-red-700">{error}</h3>
        </>
      )
      : (
        <>
          <h2 className="text-2xl font-bold text-main mb-3">Mortgage Calculation Result</h2>
          <div className="flex flex-col justify-between text-lg pb-4 mb-3">
            <div>
              <span className="font-medium mr-2">Total Mortgage:</span>
              {totalMortgage
                ? <span>{formatCurrency(totalMortgage)}</span>
                : <span className="font-bold">-</span>
              }
            </div>
            <div>
              <span className="font-medium mr-2">CMHC Insurance:</span>
              {defaultInsurance
                ? <span>{formatCurrency(defaultInsurance)}</span>
                : <span className="font-bold">-</span>
              }
            </div>
            <div className="bg-main-extra-light text-main font-bold w-fit p-1 rounded">
              <span className="mr-2">Payment:</span>
              {payment
                ? <span>{formatCurrency(payment)}</span>
                : <span className="text-main font-bold">-</span>
              }
            </div>
          </div>
        </>
      )}
    </div>
  )
}

export default ResultCard
