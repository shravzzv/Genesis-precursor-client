import '../styles/LandingForms.css'
import { Link } from 'react-router-dom'

export default function Signin() {
  return (
    <main className='signin '>
      <form className='scale-in-center'>
        <h1>Login to your account.</h1>
        <div className='formControl'>
          <label htmlFor='email'>Email:</label>
          <input type='email' name='email' id='email' required />
          <span className='error'></span>
        </div>

        <div className='formControl'>
          <label htmlFor='password'>Password:</label>
          <input
            type='password'
            name='password'
            id='password'
            required
            minLength={8}
          />
          <span className='error'></span>
        </div>

        <button
          type='submit'
          className='filled
        '
        >
          Sign in
        </button>

        <p>
          Don&apos;t have an account? <Link to={'/signup'}>Signup</Link>
        </p>
      </form>
    </main>
  )
}
