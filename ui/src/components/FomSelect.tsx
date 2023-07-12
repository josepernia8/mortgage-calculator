import React from 'react'
import { FormInputProps } from '../types'
import { convertCamelCaseToWords } from '../utils'

const FormSelect: React.FC<FormInputProps> = ({ name, value, onChange }) => {
  const label = convertCamelCaseToWords(name)

  return (
    <div>
      <label htmlFor={name} className="text-lg font-medium text-zinc-600">
        {label}
      </label>
      <select
        data-testid={name}
        name={name}
        className="p-1.5 w-full rounded border border-gray-500 focus:shadow-blue outline-none"
        value={value}
        onChange={onChange}
        required
      >
        <option className="text-zinc-400" value="">Select Frequency</option>
        <option value="monthly">Monthly</option>
        <option value="bi-weekly">Bi-Weekly</option>
        <option value="accelerated bi-weekly">Accelerated Bi-Weekly</option>
      </select>
    </div>
  )
}

export default FormSelect
