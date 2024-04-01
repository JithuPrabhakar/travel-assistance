export const LoginPage = () => {
  return (
    <div className='mt-4'>
      <h2 className='text-4xl text-center'>Login</h2>
      <form className='max-w-md mx-auto border'>
        <input type='email' placeholder='your@email.com' />
        <input type='password' placeholder='your password' />
        <button>Login</button>
      </form>
    </div>
  )
}
