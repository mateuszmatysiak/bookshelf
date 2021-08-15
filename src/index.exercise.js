import Dialog from '@reach/dialog'
import '@reach/dialog/styles.css'
import React, {useState} from 'react'
import ReactDOM from 'react-dom'
import {Logo} from './components/logo'

const App = () => {
  const [openModal, setOpenModal] = useState('none')

  function login(formData) {
    console.log('login', formData)
  }

  function register(formData) {
    console.log('register', formData)
  }
  return (
    <div>
      <Logo width={80} height={80} />
      <h1>Bookshelf</h1>
      <button onClick={() => setOpenModal('login')}>Login</button>
      <button onClick={() => setOpenModal('register')}>Register</button>

      <Dialog
        aria-label="Login Form Dialog"
        isOpen={openModal === 'login'}
        onDismiss={() => setOpenModal('none')}
      >
        <button onClick={() => setOpenModal('none')}>Close</button>

        <h3>Login</h3>
        <LoginForm onSubmit={login} buttonText="Login" />
      </Dialog>

      <Dialog
        aria-label="Register Form Dialog"
        isOpen={openModal === 'register'}
        onDismiss={() => setOpenModal('none')}
      >
        <button onClick={() => setOpenModal('none')}>Close</button>

        <h3>Register</h3>
        <LoginForm onSubmit={register} buttonText="Register" />
      </Dialog>
    </div>
  )
}

const LoginForm = ({onSubmit, buttonText}) => {
  const handleSubmit = event => {
    const {username, password} = event.target.elements

    event.preventDefault()
    onSubmit({
      username: username.value,
      password: password.value,
    })
  }

  return (
    <form onSubmit={handleSubmit}>
      <div>
        <label htmlFor="username">Nazwa użytkownika</label>
        <input id="username" type="text" />
      </div>

      <div>
        <label htmlFor="password">Hasło użytkownika</label>
        <input id="password" type="password" />
      </div>

      <div>
        <button type="submit">{buttonText}</button>
      </div>
    </form>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
