import '../styles/LandingForms.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signin() {
  const [user, setUser] = useState({
    email: '',
    password: '',
  })
  const [isLoading, setIsLoading] = useState(false)
  const [errors, setErrors] = useState([])
  const navigate = useNavigate()

  const handleChange = (e) => {
    const { name, value } = e.target
    setUser((prevUser) => ({
      ...prevUser,
      [name]: value,
    }))
  }

  const handleSubmit = async (e) => {
    e.preventDefault()
    try {
      setIsLoading(true)
      const response = await axios.post(
        'http://localhost:3000/users/signin',
        user
      )

      localStorage.setItem('token', response.data.token)
      localStorage.setItem('uid', response.data.uid)
      navigate('/goals')
    } catch (error) {
      setErrors(error.response.data)
    } finally {
      setIsLoading(false)
    }
  }

  const getErrorMessage = (field) => {
    const error = errors.find((error) => error.path === field)
    return error ? error.msg : ''
  }

  return (
    <main className='signin'>
      <form className='scale-in-center' onSubmit={handleSubmit}>
        <h1>Login to your account.</h1>
        <div className='formControl'>
          <label htmlFor='email'>Email:</label>
          <input
            type='email'
            name='email'
            id='email'
            value={user.email}
            onChange={handleChange}
            required
          />
          {getErrorMessage('email') && (
            <span className='error'>{getErrorMessage('email')}</span>
          )}
        </div>

        <div className='formControl'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            value={user.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          {getErrorMessage('password') && (
            <span className='error'>{getErrorMessage('password')}</span>
          )}
        </div>

        <button type='submit' className='filled'>
          {isLoading ? 'Loading...' : 'Sign in'}
        </button>

        <p>
          Don&apos;t have an account? <Link to={'/signup'}>Signup</Link>
        </p>
      </form>
    </main>
  )
}
