import '../styles/LandingForms.css'
import { useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import axios from 'axios'

export default function Signup() {
  const [user, setUser] = useState({
    email: '',
    password: '',
    passwordConfirm: '',
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
        'http://localhost:3000/users/signup',
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
    <main className='signup'>
      <form className='scale-in-center' onSubmit={handleSubmit}>
        <h1>Create your account</h1>
        <div className='formControl'>
          <label htmlFor='email'>Email*:</label>
          <input
            type='email'
            id='email'
            name='email'
            value={user.email}
            onChange={handleChange}
            required
          />
          {getErrorMessage('email') && (
            <span className='error'>{getErrorMessage('email')}</span>
          )}
        </div>

        <div className='formControl'>
          <label htmlFor='password'>Password*:</label>
          <input
            type='password'
            id='password'
            name='password'
            value={user.password}
            onChange={handleChange}
            required
            minLength={8}
          />
          {getErrorMessage('password') && (
            <span className='error'>{getErrorMessage('password')}</span>
          )}
        </div>

        <div className='formControl'>
          <label htmlFor='passwordConfirm'>Confirm Password*:</label>
          <input
            type='password'
            id='passwordConfirm'
            name='passwordConfirm'
            value={user.passwordConfirm}
            onChange={handleChange}
            required
            minLength={8}
          />
          {getErrorMessage('passwordConfirm') && (
            <span className='error'>{getErrorMessage('passwordConfirm')}</span>
          )}
        </div>

        <button type='submit' className='filled'>
          {isLoading ? 'Loading...' : 'Sign Up'}
        </button>
        <p>
          Already have an account? <Link to={'/signin'}>Signin</Link>
        </p>
      </form>
    </main>
  )
}
