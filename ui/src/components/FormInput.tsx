import React from 'react'
import { FormInputProps } from '../types'
import { convertCamelCaseToWords } from '../utils'

const FormInput: React.FC<FormInputProps> = ({ name, value, onChange, noWrap }) => {
  const label = convertCamelCaseToWords(name)

  return (
    <div>
      <label htmlFor={name} className={`text-lg font-medium text-zinc-600 ${noWrap ? 'whitespace-nowrap': ''}`}>
        {label}
      </label>
      <input
        data-testid={name}
        type="number"
        name={name}
        value={value}
        placeholder="0"
        step=".01"
        className="p-1 w-full rounded border border-gray-500 focus:shadow-blue outline-none"
        onChange={onChange}
        required
      />
    </div>
  )
}

export default FormInput
