import {AuthProvider} from 'context/auth-context'
import React from 'react'
import {ReactQueryConfigProvider} from 'react-query'
import {BrowserRouter as Router} from 'react-router-dom'

const queryConfig = {
  queries: {
    useErrorBoundary: true,
    refetchOnWindowFocus: false,
    retry(failureCount, error) {
      if (error.status === 404) return false
      else if (failureCount < 2) return true
      else return false
    },
  },
}

const AppProviders = ({children}) => {
  return (
    <ReactQueryConfigProvider config={queryConfig}>
      <AuthProvider>
        <Router>{children}</Router>
      </AuthProvider>
    </ReactQueryConfigProvider>
  )
}

export {AppProviders}
