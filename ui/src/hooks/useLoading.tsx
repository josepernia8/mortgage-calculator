import React, { PropsWithChildren, createContext, useContext, useState } from 'react'

interface LoadingValue {
  value: boolean
  error: string
}

interface LoadingContextType {
  loading: { value: boolean, error: string }
  toggleLoading: ({ value, error }: LoadingValue) => void
}

const LoadingContext = createContext<LoadingContextType>({
  loading: { value: false, error: '' },
  toggleLoading: () => {},
})

export const LoadingProvider: React.FC<PropsWithChildren> = ({ children }) => {
  const [loading, setLoading] = useState({ value: false, error: '' })
  const toggleLoading = ({ value, error }: LoadingValue) => setLoading({ value, error })

  return (
    <LoadingContext.Provider value={{ loading, toggleLoading }}>
      {children}
    </LoadingContext.Provider>
  )
}

const useLoading = () => {
  const context = useContext(LoadingContext)
  if (!context) throw new Error('useLoading must be used within a LoadingProvider')

  return context
}

export default useLoading;
