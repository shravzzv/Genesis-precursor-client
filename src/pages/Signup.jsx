import '../styles/Signup.css'
import { Link } from 'react-router-dom'

export default function Signup() {
  return (
    <main className='signup'>
      <form>
        <h1>Create your acccount</h1>
        <div className='formControl'>
          <label htmlFor='email'>Email*:</label>
          <input type='email' id='email' name='email' required />
          <span className='error'></span>
        </div>

        <div className='formControl'>
          <label htmlFor='password'>Password*:</label>
          <input
            type='password'
            id='password'
            name='password'
            required
            minLength={8}
          />
          <span className='error'></span>
        </div>

        <div className='formControl'>
          <label htmlFor='passwordConfirm'>Confirm Password*:</label>
          <input
            type='password'
            id='passwordConfirm'
            name='passwordConfirm'
            required
            minLength={8}
          />
          <span className='error'></span>
        </div>

        <button type='submit' className='filled'>
          Sign Up
        </button>
        <p>
          Already have an account? <Link to={'/signin'}>Signin</Link>
        </p>
      </form>
    </main>
  )
}
