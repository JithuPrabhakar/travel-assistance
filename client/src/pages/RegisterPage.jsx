import { useState } from 'react'
import { Link } from 'react-router-dom'
import axios from 'axios'

export const RegisterPage = () => {
  const [name, setName] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  function registerUser(e) {
    e.preventDefault()
    axios.post('/register', { name, email, password })
  }

  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h2 className='text-4xl text-center mb-4'>Register</h2>
        <form className='max-w-md mx-auto' onSubmit={registerUser}>
          <input
            type='text'
            placeholder='Your Name'
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
          <input
            type='email'
            placeholder='your@email.com'
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
          <input
            type='password'
            placeholder='your password'
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button className='primary'>Register</button>
          <div className='text-center py-2 text-gray-500'>
            Already a member?{' '}
            <Link to='/login' className='underline'>
              Login
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
