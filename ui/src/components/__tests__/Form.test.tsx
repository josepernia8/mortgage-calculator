import React from 'react'
import '@testing-library/jest-dom'
import { render, screen, fireEvent } from '@testing-library/react'
import userEvent from '@testing-library/user-event'
import Form from '../Form'

describe('Form', () => {
  it('renders form inputs correctly', () => {
    render(<Form onSubmit={jest.fn()} />)

    // Verify that the form inputs are rendered correctly
    expect(screen.getByTestId(/propertyPrice/i)).toBeInTheDocument()
    expect(screen.getByTestId(/downPayment/i)).toBeInTheDocument()
    expect(screen.getByTestId(/annualInterestRate/i)).toBeInTheDocument()
    expect(screen.getByTestId(/amortizationPeriod/i)).toBeInTheDocument()
    expect(screen.getByTestId(/paymentFrequency/i)).toBeInTheDocument()
  })

  it('handles form submission correctly', async () => {
    const user = userEvent.setup()
    const onSubmit = jest.fn()
    render(<Form onSubmit={onSubmit} />)

    // Fill in the form inputs
    await user.type(screen.getByTestId(/propertyPrice/i), '500000')
    await user.type(screen.getByTestId(/downPayment/i), '100000')
    await user.type(screen.getByTestId(/annualInterestRate/i), '3.5')
    await user.type(screen.getByTestId(/amortizationPeriod/i), '25')
    await user.selectOptions(screen.getByTestId(/paymentFrequency/i), ['monthly'])

    // Submit the form
    fireEvent.submit(screen.getByRole('button', { name: /Calculate/i }))

    // Verify that the form data is passed to the onSubmit callback
    expect(onSubmit).toHaveBeenCalledTimes(1)
    expect(onSubmit).toHaveBeenCalledWith({
      propertyPrice: '500000',
      downPayment: '100000',
      annualInterestRate: '3.5',
      amortizationPeriod: '25',
      paymentFrequency: 'monthly',
    })
  })
})
