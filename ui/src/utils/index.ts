import { State } from '../types'

export const convertCamelCaseToWords = (str: string) => {
  let result = str.charAt(0).toUpperCase()

  for (let i = 1; i < str.length; i++) {
    if (str.charAt(i) === str.charAt(i).toUpperCase()) {
      result += ' ' + str.charAt(i).toUpperCase()
    } else {
      result += str.charAt(i)
    }
  }

  return result
}

export const transformStateDataToNumbers = (data: State) => {
  const obj = data as unknown as Record<string, string>
  const result: Record<string, string | number> = {};

  for (const key in obj) {
    if (Object.prototype.hasOwnProperty.call(obj, key)) {
      let value: string | number = obj[key]

      if (key !== 'paymentFrequency') {
        value = Number(value)
      }

      result[key] = value
    }
  }

  return result
}
