import React, { useState } from 'react'
import Form from './components/Form'
import ResultCard from './components/ResultCard'
import { State } from './types'
import { getMortgage } from './services'
import { LoadingProvider } from './hooks/useLoading'

const initialValues = {
  payment: 0,
  totalMortgage: 0,
  defaultInsurance: 0
}

function App() {
  const [result, setResult] = useState(initialValues)

  const handleFormSubmit = async (formData: State, signal: AbortSignal) => {
    try {
      const data = await getMortgage(formData, signal)
      setResult(data)
    } catch (error: unknown) {
      setResult(initialValues)
      throw new Error((error as Error).message)
    }
  }

  return (
    <main className="min-h-screen w-full bg-slate-100">
      <LoadingProvider>
        <div className="pt-10">
          <h1 className="mx-auto mb-3 sm:w-4/5 text-lg text-center bg-main rounded text-white">Jose's mortgage payment calculator</h1>
        </div>
        <div className="mx-auto sm:w-4/5 px-6 bg-white shadow-xl rounded-lg">
          <div className="pt-3">Fill all the form inputs to start!</div>
          <div className="p-6 border-b border-gray-300">
            <Form onSubmit={handleFormSubmit} />
          </div>
          <div className="p-6 mt-4">
            <ResultCard {...result} />
          </div>
        </div>
      </LoadingProvider>
    </main>
  )
}

export default App
