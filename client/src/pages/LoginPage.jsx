import { Link } from 'react-router-dom'

export const LoginPage = () => {
  return (
    <div className='mt-4 grow flex items-center justify-around'>
      <div className='mb-64'>
        <h2 className='text-4xl text-center mb-4'>Login</h2>
        <form className='max-w-md mx-auto'>
          <input type='email' placeholder='your@email.com' />
          <input type='password' placeholder='your password' />
          <button className='primary'>Login</button>
          <div className='text-center py-2 text-gray-500'>
            Don&apos;t have an account yet?{' '}
            <Link to='/register' className='underline'>
              Register now
            </Link>
          </div>
        </form>
      </div>
    </div>
  )
}
