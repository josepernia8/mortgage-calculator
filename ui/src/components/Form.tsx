import React, { useCallback, useEffect, useRef } from 'react'
import { ActionType, FormProps, State } from '../types'
import useMortgage from '../hooks/useMortgage'
import FormInput from './FormInput'
import FormSelect from './FomSelect'
import { debounce, isEmpty, some } from 'lodash'
import useLoading from '../hooks/useLoading'


const Form: React.FC<FormProps> = ({ onSubmit }) => {
  const [formData, dispatch] = useMortgage()
  const abortControllerRef = useRef<AbortController | null>(null)
  const { loading, toggleLoading } = useLoading()

  const debouncedSubmit = useCallback(
    debounce(async (data: State) => {
      try {
        // Check if there is an ongoing request and abort it
        if (abortControllerRef.current) {
          abortControllerRef.current.abort()
          abortControllerRef.current = null
        }

        // Create a new AbortController for the current request
        const controller = new AbortController()
        abortControllerRef.current = controller

        // Make the API call with the updated data
        await onSubmit(data, controller.signal)
        toggleLoading({ value: false, error: '' })
      } catch (error: unknown) {
        toggleLoading({ value: false, error: (error as Error).message })
      }
    }, 2500), [])

  useEffect(() => {
    // Only send request if all fields are filled and debounce them so it's more efficient
    if (!some(formData, isEmpty)) {
      toggleLoading({ value: true, error: loading.error })
      debouncedSubmit(formData)
    }

    // Cleanup abort controller on unmount
    return () => {
      if (abortControllerRef.current) {
        abortControllerRef.current.abort();
        abortControllerRef.current = null;
      }
    }
  }, [formData, debouncedSubmit])


  const handleChange = (event: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    const { name, value } = event.target
    dispatch({ type: ActionType.UPDATE, field: name, value })
  }

  return (
    <form className="grid sm:grid-cols-3 gap-4 items-end" onSubmit={(event) => event.preventDefault()}>
      {Object.entries(formData).map((entry) => {
        const props = {
          key: entry[0],
          name: entry[0],
          value: entry[1],
          noWrap: false,
          onChange: handleChange
        }

        if (entry[0] !== 'paymentFrequency') {
          if (entry[0] === 'annualInterestRate') props.noWrap = true

          return (
            <FormInput {...props} />
          )
        }

        return <FormSelect {...props} />
      })}
    </form>
  )
}

export default Form
