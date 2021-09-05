import * as React from 'react'
import * as auth from 'auth-provider'
import * as colors from 'styles/colors'
import {useAsync} from 'utils/hooks'
import {queryCache} from 'react-query'
import {client} from 'utils/api-client'
import {FullPageSpinner} from 'components/lib'

const AuthContext = React.createContext()
AuthContext.displayName = 'AuthContext'

function useAuth() {
  const context = React.useContext(AuthContext)
  if (context === undefined) {
    throw new Error(`useAuth must be used within an AuthProvider`)
  }
  return context
}

async function getUser() {
  let user = null

  const token = await auth.getToken()
  if (token) {
    const data = await client('me', {token})
    user = data.user
  }

  return user
}

const AuthProvider = props => {
  const {
    run,
    setData,
    data: user,
    isLoading,
    isIdle,
    isSuccess,
    isError,
    error,
  } = useAsync()

  React.useEffect(() => {
    run(getUser())
  }, [run])

  const login = form => auth.login(form).then(user => setData(user))
  const register = form => auth.register(form).then(user => setData(user))
  const logout = () => {
    auth.logout()
    queryCache.clear()
    setData(null)
  }

  if (isLoading || isIdle) {
    return <FullPageSpinner />
  }

  if (isError) {
    return (
      <div
        css={{
          color: colors.danger,
          height: '100vh',
          display: 'flex',
          flexDirection: 'column',
          justifyContent: 'center',
          alignItems: 'center',
        }}
      >
        <p>Uh oh... There's a problem. Try refreshing the app.</p>
        <pre>{error.message}</pre>
      </div>
    )
  }

  if (isSuccess) {
    const value = {user, login, register, logout}
    return <AuthContext.Provider value={value} {...props} />
  }
}

export {useAuth, AuthProvider}
