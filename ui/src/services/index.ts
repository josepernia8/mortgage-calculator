import { State } from '../types'
import { transformStateDataToNumbers } from '../utils'

const API_ULR = 'http://localhost:8000'

export const getMortgage = async (data: State, signal: AbortSignal) => {
  try {
    const response = await fetch(`${API_ULR}/mortgage`, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ ...transformStateDataToNumbers(data) }),
      signal
    })

    const jsonResponse = await response.json()

    if (!response.ok) {
      throw new Error(jsonResponse.error)
    }

    return jsonResponse

  } catch (error: unknown) {
    throw new Error((error as Error).message)
  }
}